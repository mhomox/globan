@extends('layouts.app')
@section('content')

    <link href="{{ asset('assets/libs/jquery-validation-1.19.1/demo/css/screen.css') }}" rel="stylesheet" type="text/css">
    <meta name="csrf-token" content="{{ csrf_token() }}"> <!-- Include CSRF token -->

    <!-- Main content -->
    <div class="content-wrapper">
        <!-- Page header -->
        <div class="page-header page-header-light">
            <div class="page-header-content header-elements-md-inline">
                <div class="page-title d-flex">
                    <h4><i class="icon-arrow-left52 mr-2"></i> <span class="font-weight-semibold">Billing Statement </span> -
                        Update Record</h4>
                    <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                </div>
            </div>
            <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                <div class="d-flex">
                    <div class="breadcrumb">
                        <a href="{{ route('home') }}" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Home</a>
                        <a href="{{ url('billing_statement/create') }}" class="breadcrumb-item">Billing Statement</a>
                    </div>
                    <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                </div>
            </div>
        </div>
        <!-- /page header -->
        <!-- Content area -->
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
        <!-- /page header -->
        <!-- Content area -->
        <div class="content">
            <div class="card">
                <div class="card-header bg-indigo d-flex justify-content-between">
                    <span class="font-size-sm text-uppercase font-weight-semibold">Billing Information </span>

                </div>

                <fieldset class="gray_box">

                    <form role="form" class="form-horizontal" method="POST" enctype="multipart/form-data"
                        action="{{ route('billing_statement.update', $sales->cInvNo) }}" name="bs_form" id="bs_form">

                        @csrf
                        @if (session('success'))
                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                {{ session('success') }}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">×</button>
                            </div>
                        @endif

                        @if (session('error'))
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                {{ session('error') }}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">×</button>
                            </div>
                        @endif

                        <!-- 2 columns form -->

                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <fieldset>
                                        <legend class="font-weight-semibold"><i class="icon-info22 text-success mr-2"></i>
                                            Customer details</legend>
                                        <div class="form-group row">
                                            <label class="col-lg-3 col-form-label font-weight-semibold">Reference #</label>
                                            <div class="col-lg-9">
                                                <input type="text"
                                                name="cInvNo"
                                                class="form-control"
                                                title="Billing Number"
                                                autocomplete="off"
                                                value="{{ old('cInvNo', $sales->cInvNo) }}"
                                                readonly
                                                required />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label
                                                class="col-lg-3 col-form-label text-danger font-weight-semibold">Date*</label>
                                            <div class="col-lg-9">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="input-group">
                                                            <span class="input-group-prepend"> <span
                                                                    class="input-group-text"><i
                                                                        class="icon-calendar22"></i></span></span>
                                                            <input type="date" name="dDate"
                                                                class="form-control daterange-single" required
                                                                value="{{ old('dDate', $sales->dDate) }}">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label
                                                class="col-lg-3 col-form-label text-danger font-weight-semibold">Customer*</label>
                                            <div class="col-lg-9">
                                                <div class="row">
                                                    <div class="col-md-8">
                                                        <input data-placeholder="Select customer" type="text"
                                                            name="cName" id="cName" class="form-control"
                                                            title="Customer Name" autocomplete="off"
                                                            value="{{ old('cName', $sales->cName) }}" required />
                                                        <input type="hidden" name="cName" id="hiddenCName" />
                                                    </div>
                                                    <div class="col-md-4">
                                                        <input type="text" name="cCode" id="cCode"
                                                            value="{{ old('cCode', $sales->cCode) }}" class="form-control"
                                                            title="Customer Code" autocomplete="on" readonly required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <label
                                                class="col-sm-3 col-form-label text-danger font-weight-semibold">Address*</label>
                                            <div class="col-sm-9">
                                                <div class="form-group form-group-feedback form-group-feedback-left">
                                                    <input type="text" name="cAddress" class="form-control"
                                                        value="{{ old('cAddress') ?? ($sales->cAddress ?? '') }}"
                                                        id="cAddress" title="Address" placeholder="Enter Address" />
                                                    <div class="form-control-feedback">
                                                        <i class="icon-pin-alt"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label
                                                class="col-lg-3 col-form-label text-danger font-weight-semibold">Remarks*</label>
                                            <div class="col-lg-9">
                                                <textarea name="cRemarks" rows="1" cols="1" class="form-control" placeholder="Enter remarks here .. "
                                                    required>{{ old('cRemarks') ?? ($sales->cRemarks ?? '') }}</textarea>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <div class="row">
                                        <label class="col-sm-3 col-form-label font-weight-semibold">Attachments</label>
                                        <div class="col-sm-9">
                                            <div class="form-group">
                                                <div class="row mt-1">
                                                    <div class="col-sm-6">
                                                        <input placeholder="Upload an Attachment" type="file"
                                                            name="cAttachment1" id="cAttachment1"
                                                            style="border-color:darkgrey" />
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <input placeholder="Upload an Attachment" type="file"
                                                            name="cAttachment2" id="cAttachment2"
                                                            style="border-color:darkgrey" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <fieldset>
                                        <legend class="font-weight-semibold"><i class="icon-info22 text-success mr-2"></i>
                                            Billing Type</legend>

                                        <div class="form-group row">
                                            <label class="col col-form-label text-danger font-weight-semibold">Billing
                                                Period*</label>
                                            <div class="col-lg-9">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="input-group">
                                                            <label class="col-form-label p-1">From:</label><span
                                                                class="input-group-prepend"> </span>
                                                            <input type="date" name="dBillFrom"
                                                                class="form-control daterange-single" required
                                                                value="{{ old('dBillFrom', $sales->dBillFrom) }}"><br />
                                                            <label class="col-form-label p-1">To:</label><span
                                                                class="input-group-prepend"> </span>
                                                            <input type="date" name="dBillTo"
                                                                class="form-control daterange-single" required
                                                                value="{{ old('dBillTo', $sales->dBillTo) }}"><br />
                                                            <label class="col-form-label p-1">Due Date:</label><span
                                                                class="input-group-prepend"> </span>
                                                            <input type="date" name="dDueDate"
                                                                class="form-control daterange-single" required
                                                                value="{{ old('dDueDate', $sales->dDueDate) }}"><br />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col col-form-label text-danger font-weight-semibold">Billing
                                                Number*</label>
                                            <div class="col-lg-9">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="input-group">
                                                            <input type="text" name="cRefNo" id="cRefNo"
                                                                placeholder="00-00000-00-0000"
                                                                value="{{ old('cRefNo', $sales->cRefNo) }}"
                                                                class="form-control daterange-single" required />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <label class="col-sm-3 col-form-label text-danger font-weight-semibold">Tax
                                                Type*</label>
                                            <div class="col-sm-9">
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-sm-6">
                                                            <select data-placeholder="Select Tax Type" type="text"
                                                                name="cTaxType" id="cTaxType" class="form-control"
                                                                required title="Tax Type">
                                                                <option value="VAT"
                                                                    {{ old('cTaxType', $sales->cTaxType) == 'VAT' ? 'selected' : '' }}>
                                                                    VAT</option>
                                                                <option value="Non-Vat"
                                                                    {{ old('cTaxType', $sales->cTaxType) == 'Non-Vat' ? 'selected' : '' }}>
                                                                    Non-Vat</option>
                                                                <option value="Vat-Exempt"
                                                                    {{ old('cTaxType', $sales->cTaxType) == 'Vat-Exempt' ? 'selected' : '' }}>
                                                                    Vat-Exempt</option>
                                                                <option value="Zero-Rated"
                                                                    {{ old('cTaxType', $sales->cTaxType) == 'Zero-Rated' ? 'selected' : '' }}>
                                                                    Zero-Rated</option>
                                                            </select>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <input type="text" name="nTaxRate" id="nTaxRate"
                                                                value="{{ old('nTaxRate', $sales->nTaxRate) }}"
                                                                class="form-control" title="Tax Rate" autocomplete="off"
                                                                placeholder="Tax Rate" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label font-weight-semibold">Internal
                                                Terms</label>
                                            <div class="col-lg-9">

                                                <select data-placeholder="Select Internal Terms" class="form-control"
                                                    name="cIntTerm" id="cIntTerm" title="Internal Terms">
                                                    <option value=""></option>
                                                    <option value="COD"
                                                        {{ old('cTerm') ?? ($sales->cTerm ?? '') == 'COD' ? 'selected' : '' }}>
                                                        COD</option>
                                                    <option value="15 Days"
                                                        {{ old('cTerm') ?? ($sales->cTerm ?? '') == '15 Days' ? 'selected' : '' }}>
                                                        15 Days</option>
                                                    <option value="30 Days"
                                                        {{ old('cTerm') ?? ($sales->cTerm ?? '') == '30 Days' ? 'selected' : '' }}>
                                                        30 Days</option>
                                                    <option value="CWO"
                                                        {{ old('cTerm') ?? ($sales->cTerm ?? '') == 'CWO' ? 'selected' : '' }}>
                                                        CWO</option>
                                                    <option value="60 Days"
                                                        {{ old('cTerm') ?? ($sales->cTerm ?? '') == '60 Days' ? 'selected' : '' }}>
                                                        60 Days</option>
                                                    <option value="45 Days"
                                                        {{ old('cTerm') ?? ($sales->cTerm ?? '') == '45 Days' ? 'selected' : '' }}>
                                                        45 Days</option>
                                                    <option value="10 Days"
                                                        {{ old('cTerm') ?? ($sales->cTerm ?? '') == '10 Days' ? 'selected' : '' }}>
                                                        10 Days</option>
                                                    <option value="Progress"
                                                        {{ old('cTerm') ?? ($sales->cTerm ?? '') == 'Progress' ? 'selected' : '' }}>
                                                        Progress</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label for="cTerm"
                                                class="col-sm-3 col-form-label font-weight-semibold">Customer Terms</label>
                                            <div class="col-sm-9">
                                                <div class="form-group" required>
                                                    <select data-placeholder="Select Customer Terms" class="form-control"
                                                        name="cTerm" title="Customer Terms" id="cTerm">
                                                        <option value=""></option>
                                                        <option value="COD"
                                                            {{ old('cTerm') ?? ($sales->cTerm ?? '') == 'COD' ? 'selected' : '' }}>
                                                            COD</option>
                                                        <option value="15 Days"
                                                            {{ old('cTerm') ?? ($sales->cTerm ?? '') == '15 Days' ? 'selected' : '' }}>
                                                            15 Days</option>
                                                        <option value="30 Days"
                                                            {{ old('cTerm') ?? ($sales->cTerm ?? '') == '30 Days' ? 'selected' : '' }}>
                                                            30 Days</option>
                                                        <option value="CWO"
                                                            {{ old('cTerm') ?? ($sales->cTerm ?? '') == 'CWO' ? 'selected' : '' }}>
                                                            CWO</option>
                                                        <option value="60 Days"
                                                            {{ old('cTerm') ?? ($sales->cTerm ?? '') == '60 Days' ? 'selected' : '' }}>
                                                            60 Days</option>
                                                        <option value="45 Days"
                                                            {{ old('cTerm') ?? ($sales->cTerm ?? '') == '45 Days' ? 'selected' : '' }}>
                                                            45 Days</option>
                                                        <option value="10 Days"
                                                            {{ old('cTerm') ?? ($sales->cTerm ?? '') == '10 Days' ? 'selected' : '' }}>
                                                            10 Days</option>
                                                        <option value="Progress"
                                                            {{ old('cTerm') ?? ($sales->cTerm ?? '') == 'Progress' ? 'selected' : '' }}>
                                                            Progress</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label for="cPayType"
                                                class="col-sm-3 col-form-label font-weight-semibold">Payment Type</label>
                                            <div class="col-sm-9">
                                                <div class="form-group" required>
                                                    <select data-placeholder="Select Payment type" name="cPayType"
                                                        class="form-control" title="Payment Type" autocomplete="off">
                                                        <option value=""></option>
                                                        <option value="Cash"
                                                            {{ old('cPayType') ?? ($sales->cPayType ?? '') == 'Cash' ? 'selected' : '' }}>
                                                            Cash</option>
                                                        <option
                                                            value="Credit"{{ old('cPayType') ?? ($sales->cPayType ?? '') == 'Credit' ? 'selected' : '' }}>
                                                            Credit</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                    </fieldset>
                                </div>
                            </div>

                        </div>

                        <div class="card-header bg-indigo d-flex justify-content-between">
                            <span class="font-size-sm text-uppercase font-weight-semibold">Billing Details </span>

                        </div>
                        <div class="card-body">
                            <fieldset class="gray_box">
                                <div class="table-responsive">
                                    <table class="table table-bordered" style="text-align: center">
                                        <thead>
                                            <tr>
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
                                                <th scope="col">ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody id="invoiceItems">
                                            @if (isset($sales) && count($sales->salesDetails) > 0)
                                                @foreach ($sales->salesDetails as $key => $detail)
                                                    <tr>
                                                        <td><input type="date" name="dDateFlight[]"
                                                                class="form-control" value="{{ $detail->dDateFlight }}">
                                                        </td>
                                                        <td><input type="text" name="cFlightType[]"
                                                                class="form-control" value="{{ $detail->cFlightType }}">
                                                        </td>
                                                        <td><input type="text" name="cCallSign[]" class="form-control"
                                                                value="{{ $detail->cCallSign }}"></td>
                                                        <td><input type="text" name="cRegMark[]" class="form-control"
                                                                value="{{ $detail->cRegMark }}"></td>
                                                        <td><input type="text" name="cAcftType[]" class="form-control"
                                                                value="{{ $detail->cAcftType }}"></td>
                                                        <td><input type="text" name="cDeparture[]"
                                                                class="form-control" value="{{ $detail->cDeparture }}">
                                                        </td>
                                                        <td><input type="text" name="cDestination[]"
                                                                class="form-control" value="{{ $detail->cDestination }}">
                                                        </td>
                                                        <td><input type="text" name="nDistance[]" class="form-control"
                                                                value="{{ $detail->nDistance }}"></td>
                                                        <td><input type="text" name="nWeight[]" class="form-control"
                                                                value="{{ $detail->nWeight }}"></td>
                                                        <td><input type="text" name="nFactor[]" class="form-control"
                                                                value="{{ $detail->nFactor }}" readonly></td>
                                                        <td><input type="text" name="nAmount[]" class="form-control"
                                                                value="{{ $detail->nAmount }}" readonly></td>
                                                        <td>
                                                            <button type="button"
                                                                class="btn btn-danger btn-sm">Remove</button>
                                                        </td>
                                                    </tr>
                                                @endforeach
                                            @else
                                                <tr>
                                                    <td colspan="12">No flight details found.</td>
                                                </tr>
                                            @endif
                                        </tbody>
                                    </table>
                                    <button type="button" class="btn btn-lg bg-blue mt-2" onclick="addInvoiceItem()">Add
                                        new line<i class="icon-add ml-2"></i></button>
                                </div>

                                <!-- Total Amount Section -->
                                <div class="d-flex justify-content-end mt-1">
                                    <div class="form-group col-md-3">
                                        <label for="totalAmount" style="font-size: 18px;"><b>Grand Total Amount
                                                :</b></label>
                                                <input type="text"
                                                class="form-control text-end"
                                                style="font-size: 18px"
                                                id="totalAmount"
                                                disabled
                                                readonly
                                                value="{{ number_format(old('totalAmount', $sales->salesDetails->sum('nAmount')), 2) }}">
                                    </div>
                                </div>

                                <!-- Submit Button -->
                                <div class="text-right mt-2">
                                    <button type="submit" class="btn btn-success" style="float: right">SAVE BILLING<i
                                            class="icon-file-check ml-2"></i></b></button>

                                    {{-- <button type="button" class="btn btn-danger mr-2" style="float: right"
                                        onclick="previewAndPrintInvoice()">Print <i class="icon-gear ml-2"></i></button> --}}
                                </div>
                            </fieldset>
                        </div>
            </div>

            <!-- /2 columns form -->
            </form>
        </div>

        @push('scripts')
            <script src="{{ asset('global_assets/js/plugins/tables/datatables/datatables.min.js') }}"></script>
            <script src="{{ asset('global_assets/js/plugins/tables/datatables/extensions/responsive.min.js') }}"></script>

            <script src="{{ asset('global_assets/js/plugins/forms/selects/select2.min.js') }}"></script>
            <script src="{{ asset('global_assets/js/plugins/forms/styling/uniform.min.js') }}"></script>
            <script src="{{ asset('global_assets/js/demo_pages/form_layouts.js') }}"></script>

            <script src="{{ asset('assets/libs/jquery-validation-1.19.1/dist/jquery.validate.min.js') }}"></script>
            <script src="{{ asset('assets/libs/jquery-validation-1.19.1/dist/additional-methods.js') }}"></script>

            <script src="{{ asset('assets/js/bs.js') }}"></script>
            <script src="{{ asset('assets/js/invoice.js') }}"></script>
        @endpush
    @endsection
