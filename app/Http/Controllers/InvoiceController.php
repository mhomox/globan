<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\Payments;
use App\Models\Discount;
use App\Models\Tax;
use Illuminate\Http\Request;
use App\Models\Customer;
use App\Models\Item;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{

    public function create()
    {
        $customers = Customer::all();
        $discounts = Discount::all();
        $taxes = Tax::all();

        return view('invoices.create', compact('customers', 'discounts', 'taxes'));
    }

    public function store(Request $request)
    {
        // Validate the input data
        $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'discount_id' => 'nullable|exists:discounts,id',
            'tax_id' => 'nullable|exists:taxes,id',
        ]);

        // Start a database transaction
        DB::beginTransaction();

        try {
            // Create invoice
            $invoice = Invoice::create([
                'invoice_number' => 'INV-' . time(),
                'customer_id' => $request->customer_id,
                'date' => now(),
                'status' => 'Pending',
            ]);

            $totalAmount = 0;

            // Create invoice items
            foreach ($request->items as $item) {
                $product = Item::find($item['product_id']);
                if (!$product) {
                    return response()->json(['message' => 'Product not found'], 404);
                }
                $lineTotal = $product->price * $item['quantity'];
                InvoiceItem::create([
                    'invoice_id' => $invoice->id,
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'total' => $lineTotal,
                ]);
                $totalAmount += $lineTotal;
            }

            // Apply discount if any
            if ($request->discount_id) {
                $discount = Discount::find($request->discount_id);
                if ($discount->discount_type == 'percentage') {
                    $discountAmount = ($totalAmount * $discount->discount_value) / 100;
                } else {
                    $discountAmount = $discount->discount_value;
                }
                $totalAmount -= $discountAmount;
            }

            // Apply tax if any
            if ($request->tax_id) {
                $tax = Tax::find($request->tax_id);
                $taxAmount = ($totalAmount * $tax->tax_rate) / 100;
                $totalAmount += $taxAmount;
            }

            // Update the invoice total with taxes and discounts applied
            $invoice->update(['total' => $totalAmount]);

            // Commit the transaction
            DB::commit();

            return response()->json(['message' => 'Invoice created successfully!', 'invoice' => $invoice], 201);

        } catch (\Exception $e) {
            // Rollback the transaction if something goes wrong
            DB::rollback();
            return response()->json(['message' => 'Error creating invoice: ' . $e->getMessage()], 500);
        }
    }


    public function recordPayment(Request $request, $invoiceId)
    {
        // Validate the input
        $request->validate([
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string|in:credit_card,bank_transfer,cash',
        ]);

        // Find the invoice, if not found return an error
        $invoice = Invoice::find($invoiceId);
        if (!$invoice) {
            return response()->json(['message' => 'Invoice not found.'], 404);
        }

        // Record payment
        $payment = Payments::create([
            'invoice_id' => $invoiceId,
            'amount' => $request->amount,
            'payment_date' => now(),
            'payment_method' => $request->payment_method,
        ]);

        // Update invoice status
        $invoice->status = $invoice->total <= $payment->amount ? 'Paid' : ($payment->amount > $invoice->total ? 'Overpaid' : 'Partial');
        $invoice->save();

        return response()->json([
            'message' => 'Payment recorded successfully!',
            'payment' => $payment,
            'invoice_status' => $invoice->status,
            'invoice_total' => $invoice->total
        ], 201);
    }

}
