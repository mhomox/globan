<?php

namespace App\Http\Controllers;

use App\Models\Sales;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Response;

class BillingController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function create()
    {
        return view('billing_statement.create');
    }

    public function submitAdd(Request $request)
    {
        $validatedData = $this->validateBillingData($request);

        $cInvNo = $this->generateInvoiceNumber($request, $validatedData);

        // Handle file uploads for attachments
        if ($request->hasFile('cAttachment1')) {
            $validatedData['cAttachment1'] = $request->file('cAttachment1')->store('attachments', 'public');
        }
        if ($request->hasFile('cAttachment2')) {
            $validatedData['cAttachment2'] = $request->file('cAttachment2')->store('attachments', 'public');
        }

        try {
            DB::beginTransaction();
            $this->saveSalesData($validatedData, $cInvNo);
            $this->saveSalesItems($validatedData['item'], $cInvNo);
            DB::commit();

            session()->flash('success', 'Record successfully added!');
            return redirect()->route('billing_statement.create');
        } catch (\Exception $e) {
            DB::rollBack();
            $this->logError('Error in BillingController@submitAdd: ' . $e->getMessage(), $request->all());
            return redirect()->back()->with('error', 'Error saving billing statement: ' . $e->getMessage());
        }
    }

    protected function generateInvoiceNumber(Request $request, array $validatedData)
    {
        $cInvNo = $validatedData['cInvNo'] ?? null;

        if (!$cInvNo) {
            $generatedInvNo = DB::select('EXEC GenerateTransactionNo');
            $cInvNo = $generatedInvNo[0]->cInvNo ?? 'DEFAULT_INV_NO';
        }

        return $cInvNo;
    }

    protected function saveSalesData(array $validatedData, string $cInvNo)
    {
        DB::table('SALES')->insert([
            'cInvNo'       => $cInvNo,
            'dDate'        => $validatedData['dDate'],
            'cName'        => $validatedData['cName'],
            'cCode'        => $validatedData['cCode'],
            'cAddress'     => $validatedData['cAddress'],
            'cRemarks'     => $validatedData['cRemarks'],
            'dBillFrom'    => $validatedData['dBillFrom'],
            'dBillTo'      => $validatedData['dBillTo'],
            'dDueDate'     => $validatedData['dDueDate'],
            'cRefNo'       => $validatedData['cRefNo'],
            'cTaxType'     => $validatedData['cTaxType'],
            'nTaxRate'     => $validatedData['nTaxRate'] ?? null,
            'cIntTerm'     => $validatedData['cIntTerm'] ?? null,
            'cTerm'        => $validatedData['cTerm'] ?? null,
            'cPayType'     => $validatedData['cPayType'] ?? null,
            'cAttachment1' => $validatedData['cAttachment1'] ?? null,
            'cAttachment2' => $validatedData['cAttachment2'] ?? null,
            'created_at'   => now(),
            'updated_at'   => now(),
        ]);
    }

    protected function saveSalesItems(array $items, string $cInvNo)
    {
        if (!empty($items)) {
            $itemsData = array_map(function ($item) use ($cInvNo) {
                return [
                    'cInvNo'      => $cInvNo,
                    'dDateFlight' => $item['dDateFlight'],
                    'cFlightType' => $item['cFlightType'],
                    'cCallSign'   => $item['cCallSign'],
                    'cRegMark'    => $item['cRegMark'],
                    'cAcftType'   => $item['cAcftType'],
                    'cDeparture'  => $item['cDeparture'],
                    'cDestination' => $item['cDestination'],
                    'nDistance'   => $this->sanitizeNumeric($item['nDistance']),
                    'nWeight'     => $this->sanitizeNumeric($item['nWeight']),
                    'nFactor'     => $this->sanitizeNumeric($item['nFactor']),
                    'nAmount'     => $this->sanitizeNumeric($item['nAmount']),
                    'created_at'  => now(),
                    'updated_at'  => now(),
                ];
            }, $items);

            DB::table('SALES_T')->insert($itemsData);
        }
    }

    protected function logError($message, $data = [])
    {
        $sanitizedData = array_filter($data, function ($key) {
            return !in_array($key, ['password', 'token']);
        }, ARRAY_FILTER_USE_KEY);

        Log::error($message, $sanitizedData);
    }

    protected function validateBillingData(Request $request)
    {
        $items = $request->input('item', []);
        if (is_array($items)) {
            $sanitizedItems = array_map(function ($item) {
                return $this->sanitizeItemValues($item);
            }, $items);
            $request->merge(['item' => $sanitizedItems]);
        }

        return $request->validate([
            'cInvNo'    => 'required|string|max:50',
            'dDate'     => 'required|date',
            'cName'     => 'required|string',
            'cCode'     => 'nullable|string|max:50',
            'cAddress'  => 'nullable|string|max:255',
            'cRemarks'  => 'nullable|string|max:255',
            'dBillFrom' => 'required|date|before_or_equal:dBillTo',
            'dBillTo'   => 'required|date|after_or_equal:dBillFrom',
            'dDueDate'  => 'required|date|after_or_equal:dBillTo',
            'cRefNo'    => 'required|string|max:20',
            'cTaxType'  => 'required|string',
            'nTaxRate'  => 'nullable|numeric',
            'cIntTerm'  => 'nullable|string',
            'cTerm'     => 'nullable|string',
            'cPayType'  => 'nullable|string',
            'cAttachment1' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'cAttachment2' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'item'      => 'nullable|array|min:1',
            'item.*.dDateFlight' => 'required|date',
            'item.*.cFlightType' => 'required|string|max:50',
            'item.*.cCallSign'   => 'required|string|max:50',
            'item.*.cRegMark'    => 'required|string|max:50',
            'item.*.cAcftType'   => 'required|string|max:50',
            'item.*.cDeparture'  => 'required|string|max:50',
            'item.*.cDestination' => 'required|string|max:50',
            'item.*.nDistance'   => 'required|numeric',
            'item.*.nWeight'     => 'required|numeric',
            'item.*.nFactor'     => 'required|numeric',
            'item.*.nAmount'     => 'required|numeric',
        ], [
            'cAttachment1.mimes' => 'Attachment 1 must be a file of type: jpg, jpeg, png, pdf.',
            'cAttachment1.max' => 'Attachment 1 must not exceed 2MB.',
            'cAttachment2.mimes' => 'Attachment 2 must be a file of type: jpg, jpeg, png, pdf.',
            'cAttachment2.max' => 'Attachment 2 must not exceed 2MB.',
            'item.*.dDateFlight.required' => 'The flight date is required for each item.',
            'item.*.cFlightType.required' => 'The flight type is required for each item.',
            'item.*.cCallSign.required' => 'The call sign is required for each item.',
            'item.*.cRegMark.required' => 'The registration mark is required for each item.',
            'item.*.cAcftType.required' => 'The aircraft type is required for each item.',
            'item.*.cDeparture.required' => 'The departure location is required for each item.',
            'item.*.cDestination.required' => 'The destination is required for each item.',
            'item.*.nDistance.required' => 'The distance is required for each item.',
            'item.*.nWeight.required' => 'The weight is required for each item.',
            'item.*.nFactor.required' => 'The factor is required for each item.',
            'item.*.nAmount.required' => 'The amount is required for each item.',
        ]);
    }

    protected function sanitizeItemValues($item)
    {
        $item['nAmount'] = str_replace(',', '', $item['nAmount'] ?? 0);
        $item['nDistance'] = str_replace(',', '', $item['nDistance'] ?? 0);
        $item['nWeight'] = str_replace(',', '', $item['nWeight'] ?? 0);
        $item['nFactor'] = str_replace(',', '', $item['nFactor'] ?? 0);
        return $item;
    }

    public function sanitizeNumeric($value)
    {
        $cleanValue = str_replace(',', '', $value);
        return is_numeric($cleanValue) ? $cleanValue : 0;
    }

    public function index()
    {
        $sales = Sales::with('customer')->get();
        return view('billing_statement.index', compact('sales'));
    }

    public function show($cInvNo)
    {
        $sales = Sales::with('salesDetails')->where('cInvNo', $cInvNo)->firstOrFail();
        return view('billing_statement.show', compact('sales'));
    }

    public function edit($cInvNo)
    {
        $sales = Sales::with('salesDetails')->where('cInvNo', $cInvNo)->firstOrFail();
        return view('billing_statement.edit', compact('sales'));
    }

    public function destroy($cInvNo)
{
    Log::info("Deleting sales with Invoice: $cInvNo");

    try {
        $sales = Sales::where('cInvNo', $cInvNo)->firstOrFail();
        $sales->delete();
        return redirect()->back()->with('success', 'Sales deleted successfully.');
    } catch (\Exception $e) {
        Log::error("Failed to delete sales with Invoice: $cInvNo. Error: " . $e->getMessage());
        return redirect()->back()->with('error', 'Failed to delete sales.');
    }
}

public function printBilling($cInvNo)
{
    $sale = Sales::with('customer')->find($cInvNo);

    if (!$sale) {
        return abort(404, 'Sale not found.');
    }

    $pdf = PDF::loadView('billing_statement.print', compact('sale'));

    // Check for the "action" parameter
    $action = request('action', 'view');
    if ($action === 'download') {
        return $pdf->download('Billing_Statement.pdf');
    }

    // Default: Stream the PDF to the browser
    return $pdf->stream('Billing_Statement.pdf');
}

    public function generatePDF($cInvNo)
    {
        // Fetch a Sales record with its customer details
        $sale = Sales::with('customer')->find($cInvNo);

        // Check if the sale exists
        if (!$sale) {
            return response()->json(['message' => 'Sale not found'], 404);
        }

        // Check if the customer exists for this sale
        if (!$sale->customer) {
            return response()->json(['message' => 'Customer not found for this sale'], 404);
        }

        // Generate PDF from the view
        $pdf = PDF::loadView('billing_statement.pdf', compact('sale'));

        // Stream the PDF back to the browser
        return $pdf->stream('Billing_Statement.pdf');
    }
}
