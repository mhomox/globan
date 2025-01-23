@extends('layouts.app')
@section('content')

    <link href="{{ asset('assets/libs/jquery-validation-1.19.1/demo/css/screen.css') }}" rel="stylesheet" type="text/css">


    <!-- Main content -->
    <div class="content-wrapper">
        <!-- Page header -->
        <div class="page-header page-header-light">
            <div class="page-header-content header-elements-md-inline">
                <div class="page-title d-flex">
                    <h4><i class="icon-arrow-left52 mr-2"></i> <span class="font-weight-semibold">Customers </span> -
                        View</h4>
                    <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                </div>
            </div>
            <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                <div class="d-flex">
                    <div class="breadcrumb">
                        <a href="{{ route('home') }}" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Home</a>
                        <a href="{{ url('customers/create') }}" class="breadcrumb-item">Customers</a>
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
                    <span class="font-size-sm text-uppercase font-weight-semibold">Customers Information </span>

                </div>

                <fieldset class="gray_box">

                    <form role="form" class="form-horizontal" method="post"
                        action="{{ route('customers.show', $customer->id) }}" name="customers_form" id="customers_form">

                        @csrf
                        @method('PUT')
                        @if (session('success'))
                            <div class="alert alert-success">
                                {{ session('success') }}
                            </div>
                        @endif

                        <input type="hidden" name="item" value="" />
                        <div id="customer_details_div"></div>

                        <!-- 2 columns form -->

                        <div class="card-body">
                            <input type="hidden" name="an" id="an" value="" />
                            <div class="row">
                                <div class="col-md-6">
                                    <fieldset>
                                        <legend class="font-weight-semibold"><i class="icon-info22 text-success mr-2"></i>
                                            Customer details</legend>
                                        <div class="form-group row">
                                            <label class="col-lg-3 col-form-label">Client ID</label>
                                            <div class="col-lg-9">
                                                <input type="text" name="cCode" class="form-control" title="Client ID"
                                                    autocomplete="off" value="{{ old('cCode', $customer->cCode) }}"
                                                    readonly />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-lg-3 col-form-label">Client Name</label>
                                            <div class="col-lg-9">
                                                <div class="row">
                                                    <div class="col-md-8">
                                                        <input data-placeholder="Select customer" type="text"
                                                            name="cName" id="cName" class="form-control"
                                                            title="Customer Name" autocomplete="off"
                                                            value="{{ old('cName', $customer->cName) }}" readonly />
                                                    </div>
                                                    <div class="col-md-4">
                                                        <select name="cCustomerType" id="s_id" class="form-control"
                                                            title="Customer Type" autocomplete="off">

                                                            <option value="">Type</option>
                                                            <!-- Default, empty option -->
                                                            <option value="Regular"
                                                                {{ old('cCustomerType', $customer->cCustomerType) == 'Regular' ? 'selected' : '' }}>
                                                                Regular</option>
                                                            <option value="Residential"
                                                                {{ old('cCustomerType', $customer->cCustomerType) == 'Residential' ? 'selected' : '' }}>
                                                                Residential</option>
                                                            <option value="School"
                                                                {{ old('cCustomerType', $customer->cCustomerType) == 'School' ? 'selected' : '' }}>
                                                                School</option>
                                                            <option value="Parish"
                                                                {{ old('cCustomerType', $customer->cCustomerType) == 'Parish' ? 'selected' : '' }}>
                                                                Parish</option>
                                                            <option value="Religious"
                                                                {{ old('cCustomerType', $customer->cCustomerType) == 'Religious' ? 'selected' : '' }}>
                                                                Religious</option>

                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <label class="col-sm-3 col-form-label">Address</label>
                                            <div class="col-sm-9">
                                                <div class="form-group form-group-feedback form-group-feedback-left">
                                                    <input type="text" name="cAddress" class="form-control"
                                                        id="cAddress" title="Address" autocomplete="off" readonly
                                                        value="{{ old('cAddress', $customer->cAddress) }}"
                                                        placeholder="Enter Address" />
                                                    <div class="form-control-feedback">
                                                        <i class="icon-pin-alt"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label class="col-lg-3 col-form-label">City / Province</label>
                                            <div class="col-lg-9">
                                                <div class="row">
                                                    <div class="col-md-8">
                                                        <input placeholder="City" type="text" name="cCity"
                                                            id="cCity" class="form-control" title="City"
                                                            autocomplete="off"
                                                            value="{{ old('cCity', $customer->cCity) }}" readonly />
                                                    </div>
                                                    <div class="col-md-4">
                                                        <input placeholder="Province" type="text" name="cState"
                                                            id="cState" class="form-control" title="State"
                                                            autocomplete="off"
                                                            value="{{ old('cState', $customer->cState) }}" readonly />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label class="col-lg-3 col-form-label">Country / Zip</label>
                                            <div class="col-lg-9">
                                                <div class="row">
                                                    <div class="col-md-8">
                                                        <input placeholder="Country" type="text" name="cCountry"
                                                            id="cCountry" class="form-control" title="Country"
                                                            autocomplete="off"
                                                            value="{{ old('cCountry', $customer->cCountry) }}" readonly />
                                                    </div>
                                                    <div class="col-md-4">
                                                        <input placeholder="Zip" type="text" name="cZip"
                                                            id="cZip" class="form-control" title="Zip"
                                                            autocomplete="off" value="{{ old('cZip', $customer->cZip) }}"
                                                            readonly />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label class="col-lg-3 col-form-label">Contact</label>
                                            <div class="col-lg-9">
                                                <input name="cContact"type="text" id="cContact" class="form-control"
                                                    title="Contact" autocomplete="off"
                                                    value="{{ old('cContact', $customer->cContact) }}" readonly />
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="col-md-6">
                                    <fieldset>
                                        <legend class="font-weight-semibold"><i class="icon-info22 text-success mr-2"></i>
                                            Shipping Information</legend>
                                        <div class="row">
                                            <label class="col-sm-3 col-form-label">Phone#1 /
                                                Phone#2</label>
                                            <div class="col-sm-9">
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-sm-6">
                                                            <input placeholder="Phone # 1" type="text" name="cTel1"
                                                                id="cTel1" class="form-control"
                                                                value="{{ old('phone', $customer->cTel1) }}" readonly
                                                                title="Phone # 1" />
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <input placeholder="Phone # 2" type="text" name="cTel2"
                                                                id="cTel2" class="form-control" title="Phone # 2"
                                                                autocomplete="off"
                                                                value="{{ old('cTel2', $customer->cTel2) }}" readonly />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label">Mobile No.</label>
                                            <div class="col-lg-9">
                                                <input placeholder="(+63)" class="form-control" name="cFax"
                                                    id="cFax" title="Mobile No."
                                                    value="{{ old('cFax', $customer->cFax) }}" readonly />
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label">Email #1</label>
                                            <div class="col-lg-9">
                                                <input placeholder="Email 1" class="form-control" name="email"
                                                    id="email" title="Email 01"
                                                    value="{{ old('email', $customer->email) }}"readonly />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label">Email #2</label>
                                            <div class="col-lg-9">
                                                <input placeholder="Email 02" class="form-control" name="cEMail2"
                                                    id="cEMail2" title="Email 02"
                                                    value="{{ old('cEMail2', $customer->cEMail2) }}" readonly />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-lg-3 col-form-label">Business Type</label>
                                            <div class="col-lg-9">
                                                <input name="cTradeName" type="text" id="cTradeName"
                                                    class="form-control" title="Business Type"
                                                    value="{{ old('cTradeName', $customer->cTradeName) }}"
                                                    autocomplete="off" readonly />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-lg-3 col-form-label">Parent Company</label>
                                            <div class="col-lg-9">
                                                <input type="text" id="name" name="name" class="form-control"
                                                    title="Parent Company" autocomplete="off"
                                                    value="{{ old('name', $customer->name) }}" readonly />
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>

                        </div>

                        <div class="card-header bg-indigo d-flex justify-content-between">
                            <span class="font-size-sm text-uppercase font-weight-semibold"></span>

                        </div>
            </div>
            </form>
        </div>

        <ul class="fab-menu fab-menu-fixed fab-menu-bottom-right" data-fab-toggle="click">
            <li>
                <a href="{{ URL::to('customers/print_customer/') }}" target="_blank"
                    class="fab-menu-btn btn bg-warning-400 btn-float rounded-round btn-icon">
                    <i class="fab-icon-open icon-printer"></i>
                </a>

            </li>
        </ul>

        @push('scripts')
            <script src="{{ asset('global_assets/js/plugins/tables/datatables/datatables.min.js') }}"></script>
            <script src="{{ asset('global_assets/js/plugins/tables/datatables/extensions/responsive.min.js') }}"></script>
            <script src="{{ asset('global_assets/js/plugins/forms/selects/select2.min.js') }}"></script>
            <script src="{{ asset('global_assets/js/plugins/forms/styling/uniform.min.js') }}"></script>
            <script src="{{ asset('global_assets/js/demo_pages/form_layouts.js') }}"></script>
            <script src="{{ asset('assets/libs/jquery-validation-1.19.1/dist/jquery.validate.min.js') }}"></script>
            <script src="{{ asset('assets/libs/jquery-validation-1.19.1/dist/additional-methods.js') }}"></script>

            <script>
                document.addEventListener("DOMContentLoaded", function() {
                    // Disable the dropdown menu
                    document.getElementById("s_id").setAttribute("disabled", true);
                });
            </script>
        @endpush('scripts')


    @endsection
