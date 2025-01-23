<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\BillingController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ReportsController;
use Illuminate\Support\Facades\Http;
use App\Models\Sales;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function () {
    if (Auth::user()) {
        return redirect()->route('home');
    }
    return view('auth.login');
});


Route::get('/logout', [App\Http\Controllers\Auth\LoginController::class, 'logout'])->name('logout');

Route::middleware(['auth'])->group(function () {

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

 // Invoice routes
 Route::post('invoices', [InvoiceController::class, 'store']);
 Route::post('invoices', [App\Http\Controllers\InvoiceController::class, 'store']);
 Route::get('invoices/{invoiceId}/payments', [App\Http\Controllers\InvoiceController::class, 'recordPayment']);
 Route::get('/invoices/create', [App\Http\Controllers\InvoiceController::class, 'create'])->name('invoices.create');
 Route::get('/invoices/list', [App\Http\Controllers\InvoiceController::class, 'invoiceList'])->name('invoices.list'); // Optional for invoice list

//billing
//Route::get('/billing_statement/create', [App\Http\Controllers\BillingController::class, 'create'])->name('billing_statement.create');
Route::get('/billing_statement/create', [BillingController::class, 'create'])->name('billing.create');
Route::post('/billing_statement/submit_add', [BillingController::class, 'submitAdd']);
// Route::get('/billing_statement/preview-billing', [BillingController::class, 'printBilling'])->name('preview.billing');
Route::resource('/billing_statement', BillingController::class);
Route::get('/billing_statement/{id}', [BillingController::class, 'show'])->name('billing_statement.show');
Route::get('/billing_statement/{id}/edit', [BillingController::class, 'edit'])->name('billing_statement.edit');
Route::delete('/billing_statement/{cInvNo}', [BillingController::class, 'destroy'])->name('billing_statement.destroy');
Route::get('/billing_statement/pdf/{cInvNo}', [BillingController::class, 'generatePDF'])->name('billing.pdf');
Route::get('/billing_statement/print/{cInvNo}', [BillingController::class, 'printBilling'])->name('preview.billing');

//customer
Route::get('/customers/create', [App\Http\Controllers\CustomerController::class, 'create'])->name('customers.create');
Route::post('/customers/submit_add', [CustomerController::class, 'submitAdd']);
Route::resource('customers/manage_customers', CustomerController::class);
Route::resource('customers', CustomerController::class);
Route::get('/customers/{id}', [CustomerController::class, 'show'])->name('customers.show');
Route::get('/customers/{id}/edit', [CustomerController::class, 'edit'])->name('customers.edit');
Route::delete('/customers/{id}', [CustomerController::class, 'destroy'])->name('customers.destroy');
Route::get('/customers', [CustomerController::class, 'getCustomers']);
Route::get('/customers/{id}/details', [CustomerController::class, 'getCustomerById'])->name('customers.details');

//reports
// Route::get('/reports/manage_reports', [ReportsController::class, 'viewList'])->name('reports.list');
// Route::get('/reports/manage_reports/{cInvNo}', [ReportsController::class, 'show'])->name('reports.show');

Route::get('/get-last-transaction-no', function () {
    $lastTransaction = Sales::latest('cInvNo')->first();
    return response()->json([
        'lastTransactionNo' => $lastTransaction ? $lastTransaction->cInvNo : null,
    ]);
});

// //curency /routes/web.php
// Route::get('/exchange-rates', function () {
//     $response = Http::get('https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_YZzCBmrdxWu877h9ixo6IhVIZN8MehhlEq2oRIbW&currencies=USD%2CPHP');
//     return $response->json();
// });

});

Auth::routes();
