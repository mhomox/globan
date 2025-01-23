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
                        List</h4>
                    <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                </div>
            </div>
            <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                <div class="d-flex">
                    <div class="breadcrumb">
                        <a href="{{ route('home') }}" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Home</a>
                        <a href="{{ url('customers') }}" class="breadcrumb-item">Manage Customers</a>
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
                    <span class="font-size-sm text-uppercase font-weight-semibold">Customers</span>

                </div>

                <fieldset class="gray_box">

                    <form role="form" class="form-horizontal" method="GET"
                        action="{{ URL::to('customers') }}" name="customers_form" id="customers_form">

                        @csrf

                        @if (session('success'))
                            <div class="alert alert-success">{{ session('success') }}</div>
                        @endif

                        <div class="table-responsive" style="padding: 5px">
                            <table id="customerTable" class="table datatable-responsive table-bordered">
                                <thead>
                                    <tr>
                                        <th>No #</th>
                                        <th>Code</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Mobile No.</th>
                                        <th>Tel No.</th>
                                        <th>Address</th>
                                        <th>CustomerType</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($customers as $customer)
                                        <tr>
                                            <td style="text-align: center">{{ $customer->id }}</td>
                                            <td>{{ $customer->cCode }}</td>
                                            <td>{{ $customer->cName }}</td>
                                            <td>{{ $customer->cEMail2 }}</td>
                                            <td>{{ $customer->cFax }}</td>
                                            <td>{{ $customer->cTel1 }}</td>
                                            <td>{{ $customer->cAddress }}</td>
                                            <td>{{ $customer->cCustomerType }}</td>
                                            <td class="text-center">
                                                <div class="list-icons">
                                                    <div class="dropdown">
                                                        <a href="#" class="list-icons-item" data-toggle="dropdown">
                                                            <i class="icon-menu9"></i>
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right"
                                                            style="z-index: 1050;">
                                                            <a href="{{ route('customers.show', $customer->id) }}"
                                                                class="dropdown-item">
                                                                <i
                                                                    class="icon-file-text2 fa_20 text-dark"></i>
                                                                View
                                                            </a>
                                                            <a href="{{ route('customers.edit', $customer->id) }}"
                                                                class="dropdown-item">
                                                                <i
                                                                    class="icon-database-edit2 fa_20 text-dark"></i>
                                                                Edit
                                                            </a>
                                                            <!-- Delete -->
                                                            <form action="{{ route('customers.destroy', $customer->id) }}"
                                                                method="POST" style="display:inline;">
                                                                @csrf
                                                                @method('DELETE')
                                                                <button type="submit" class="dropdown-item"
    onclick="if(confirm('Are you sure you want to delete this customer?')) this.closest('form').submit(); return false;">
    <i class="icon-trash fa_20 marginr10 text-dark"></i> Delete
</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>

                        <div class="card-body">
                            <fieldset class="gray_box">
                                <!-- Submit Button -->
                            </fieldset>
                        </div>
            </div>
            </form>
        </div>
        <ul class="fab-menu fab-menu-fixed fab-menu-bottom-right" data-fab-toggle="click" data-fab-state="closed">
            <li>
                <a href="{{ url('/customers/create') }}" class="fab-menu-btn btn bg-danger-400 btn-float rounded-round btn-icon">
                    <i class="fab-icon-open icon-plus3"></i>
                    <i class="fab-icon-close icon-cross2"></i>
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
                $(document).ready(function () {
                    $('#customerTable').DataTable({
                        "autoWidth": !1,
                        "responsive": !0,
                        "paging": true, // Enable pagination
                        "pageLength": 10, // Default rows per page
                        "lengthMenu": [10, 25, 50, 100], // Options for rows per page
                        "searching": { regex: true }, // Enable search bar
                        "ordering": true, // Enable column sorting
                    });
                });
            </script>
        @endpush('scripts')
    @endsection
