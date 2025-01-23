<?php

namespace App\Http\Middleware;
use Illuminate\Support\Facades\DB;
use Closure;

class SetDatabase
{
    public function handle($request, Closure $next)
    {
        //$cDatabase = session('cDatabase');
        session(['cDatabase' => 'COM_BILLING_DEV']);
        $cDatabase = 'COM_BILLING_DEV';
        // $query = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME =  '".$cDatabase."'";
        // $db = DB::select($query);
        // if (!empty($db)) {
        //     config(['database.connections.dynamic.database' => $cDatabase]);
        //     DB::setDefaultConnection('dynamic');
        // }
        config(['database.connections.dynamic.database' => $cDatabase]);
            DB::setDefaultConnection('dynamic');
        // dd(session('cSeparateBD'));

        return $next($request);
    }
}
