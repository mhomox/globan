@extends('layouts.app')
@section('content')
    <!-- Main content -->
    <div class="content-wrapper">
        <!-- Page header -->
        <div class="page-header page-header-light">
            <div class="page-header-content header-elements-md-inline">
                <div class="page-title d-flex">
                    <h4><i class="icon-arrow-left52 mr-2"></i> <span class="font-weight-semibold">Billing Statement</span> -
                        Details
                    </h4>
                    <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                </div>


            </div>

            <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                <div class="d-flex">
                    <div class="breadcrumb">
                        <a href="{{ route('home') }}" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Home</a>
                        <a href="{{ url('billing_statement') }}" class="breadcrumb-item">Billings</a>
                        <span class="breadcrumb-item active">Details</span>
                    </div>

                    <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                </div>
            </div>
        </div>
        <!-- /page header -->
        <?php
        if (!empty(session('error'))) {
            echo '<div class="alert alert-danger">
                                                       <button type="button" class="close" data-dismiss="alert">×</button>
                                                        ' .
                session('error') .
                '
                                                      </div>';
        }
        session(['error' => '']);
        ?>

        <div id="error_messages"></div>

        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <!-- Content area -->
        <div class="content">
            <!-- Invoice template -->
            <div class="card"><br>
                <div class="card-body">
                    <div class="text-center">
                        <span class="text-muted">
                            <h1>
                                <b>
                                    <span>
                                        <img src="{{ url('assets/img/logo.png') }}" style="width: auto; height:60px;"
                                            alt=""><br>
                                        <br>
                                        Billing Statement Form
                                    </span>
                                </b>
                            </h1>
                        </span>
                    </div>
                    <div class="d-md-flex flex-md-wrap">
                        <div class="mb-4 ml-1">
                            {{-- <h2 class="text-muted"><b>Bill To:</b></h2> --}}
                            <div class="d-flex flex-wrap wmin-md-450">
                                <ul class="list list-unstyled mb-0">
                                    <li>Bill Number :</li>
                                    <li>Customer ID :</li>
                                    <li>Customer Name :</li>
                                    <li>Address :</li>
                                    <li>Contact :</li>
                                    <li>Remarks :</li>
                                </ul>

                                <ul class="list list-unstyled text-left mb-0 ml-auto">
                                    <li><span class="font-weight-semibold text-danger">{{ $sales->cRefNo }}</span></li>
                                    <li><span class="font-weight-semibold">{{ $sales->cCode }}</span></li>
                                    <li>{{ $sales->cName }}</li>
                                    <li>{{ $sales->cAddress }}</li>
                                    <li>{{ $sales->customer->cContact ?? 'N/A' }}</li>
                                    <li>{{ $sales->cRemarks }}</li>
                                </ul>
                            </div>
                        </div>
                        <br>
                        <div class="mb-10 ml-auto">
                            {{-- <h2 class="text-muted"><b>Mail To:</b></h2> --}}
                            <div class="d-flex flex-wrap wmin-md-450">
                                <ul class="list list-unstyled mb-0">
                                    <li>Date :</li>
                                    <li>Bill From :</li>
                                    <li>Bill To :</li>
                                    <li>Due Date :</li>
                                    <li>Internal Terms :</li>
                                    <li>Terms :</li>
                                </ul>
                                <ul class="list list-unstyled text-right mb-0 ml-auto">
                                    <li><span class="font-weight-semibold">{{ formatDate($sales->dDate) }}</span></li>
                                    <li><span class="font-weight-semibold">{{ formatDate($sales->dBillFrom) }}</span></li>
                                    <li><span class="font-weight-semibold">{{ formatDate($sales->dBillTo) }}</span></li>
                                    <li><span class="font-weight-semibold">{{ formatDate($sales->dDueDate) }}</span></li>
                                    <li>{{ $sales->cIntTerm }}</li>
                                    <li>{{ $sales->cTerm }}</li>
                                    <li></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <div class="table-responsive">
                    <table class="table table-lg">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th scope="col">DATE OF FLIGHT</th>
                                <th scope="col">FLIGHT TYPE</th>
                                <th scope="col">CALLSIGN</th>
                                <th scope="col">REG MARK</th>
                                <th scope="col">ACFT TYPE</th>
                                <th scope="col">DEP</th>
                                <th scope="col">DES</th>
                                <th scope="col">DIST(KM)</th>
                                <th scope="col">WEIGHT(TONS)</th>
                                <th scope="col">FAC</th>
                                <th scope="col">AMOUNT</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($sales->salesDetails as $detail)
                                <tr>
                                    <td>{{ $loop->iteration }}</td>
                                    <td>{{ $detail->dDateFlight }}</td>
                                    <td>{{ $detail->cFlightType }}</td>
                                    <td>{{ $detail->cCallSign }}</td>
                                    <td>{{ $detail->cRegMark }}</td>
                                    <td>{{ $detail->cAcftType }}</td>
                                    <td>{{ $detail->cDeparture }}</td>
                                    <td>{{ $detail->cDestination }}</td>
                                    <td>{{ number_format($detail->nDistance, 2) }}</td>
                                    <td>{{ number_format($detail->nWeight, 2) }}</td>
                                    <td>{{ number_format($detail->nFactor, 0) }}</td>
                                    <td>{{ number_format($detail->nAmount, 2) }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>

                <div class="card-body">
                    <div class="d-md-flex flex-md-wrap">
                        <!-- <div class="pt-2 mb-3">
                        <h6 class="mb-3">Authorized person</h6>
                        <div class="mb-3">
                         <img src="../../../../global_assets/images/signature.png" width="150" alt="">
                        </div>

                        <ul class="list-unstyled text-muted">
                         <li>Eugene Kopyov</li>
                         <li>2269 Elba Lane</li>
                         <li>Paris, France</li>
                         <li>888-555-2311</li>
                        </ul>
                       </div> -->
                        <div class="pt-2 mb-3 wmin-md-400 ml-auto">
                            <br>
                            <div class="table-responsive">
                                <table class="table">
                                    <tbody>


                                        <tr>
                                            <th class="bg-white" style="font-size: 18px">Total Amount:</th>
                                            <td class="text-right bg-primary">
                                                <h5 class="font-weight-semibold" style="font-size: 24px">$
                                                    {{ number_format($sales->salesDetails->sum('nAmount'), 2) }}</h5>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-footer">
                    <span class="text-muted">Thank you for using ComUnionERP </span>
                </div>
            </div>
            <!-- /invoice template -->

        </div>
        <ul class="fab-menu fab-menu-fixed fab-menu-bottom-right" data-fab-toggle="click">
            <li>
                <!-- View in new tab -->
<a href="{{ route('preview.billing', ['cInvNo' => $sales->cInvNo, 'action' => 'view']) }}" target="_blank"
    class="fab-menu-btn btn bg-warning-400 btn-float rounded-round btn-icon">
     <i class="fab-icon-open icon-printer"></i>
 </a>

 <!-- Download PDF -->
 <a href="{{ route('preview.billing', ['cInvNo' => $sales->cInvNo, 'action' => 'download']) }}"
    class="fab-menu-btn btn bg-success-400 btn-float rounded-round btn-icon">
     <i class="fab-icon-download icon-download"></i>
 </a>
                {{-- <a href="{{ route('preview.billing', ['cInvNo' => $sales->cInvNo, 'action' => 'open']) }}" target="_blank"
                    class="fab-menu-btn btn bg-warning-400 btn-float rounded-round btn-icon">
                    <i class="fab-icon-open icon-printer"></i>
                </a> --}}
                {{-- <a href="{{ route('billing.pdf',  ['cInvNo' => $sales->cInvNo]) }}" target="_blank"
                    class="fab-menu-btn btn bg-warning-400 btn-float rounded-round btn-icon">
                    <i class="fab-icon-open icon-printer"></i>
                </a> --}}
            </li>
        </ul>
        @push('scripts')
            <script src="{{ asset('global_assets/js/plugins/notifications/jgrowl.min.js') }}"></script>
            <script src="{{ asset('global_assets/js/plugins/notifications/noty.min.js') }}"></script>
            <script src="{{ asset('global_assets/js/demo_pages/extra_jgrowl_noty.js') }}"></script>
        @endpush
    @endsection
