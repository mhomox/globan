<?php

namespace App\Http\Controllers;

use App\Models\Sales;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class ReportsController extends Controller
{
    public function viewList()
    {
        $sales = Sales::with('salesDetails')->get(); // Retrieve all sales
        return view('reports.list', compact('sales'));
    }

    public function show($cInvNo)
    {
        try {
            $sales = Sales::with('salesDetails')->where('cInvNo', $cInvNo)->firstOrFail();
            return view('reports.show', compact('sales'));
        } catch (ModelNotFoundException $e) {
            return redirect()->route('reports.list')->with('error', 'Sales record not found.');
        }
    }

}
