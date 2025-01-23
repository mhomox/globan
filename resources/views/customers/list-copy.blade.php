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
                        <a href="{{ url('customers/manage_customers') }}" class="breadcrumb-item">Manage Customers</a>
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
                <div class="card-header bg-dark d-flex justify-content-between">
                    <span class="font-size-sm text-uppercase font-weight-semibold">Customers</span>

                </div>

                <fieldset class="gray_box">

                    <form role="form" class="form-horizontal" method="GET"
                        action="{{ URL::to('customers/manage_customers') }}" name="customers_form" id="customers_form">

                        @csrf



                        @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($customers as $customer)
                <tr>
                    <td>{{ $customer->name }}</td>
                    <td>{{ $customer->email }}</td>
                    <td>{{ $customer->phone }}</td>
                    <td>
                        <a href="{{ route('customers.edit', $customer->id) }}" class="btn btn-sm btn-primary">
                            <i class="fas fa-edit"></i>
                        </a>
                        <form action="{{ route('customers.destroy', $customer->id) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Are you sure?')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>


                        <div class="card-header bg-dark d-flex justify-content-between">
                            <span class="font-size-sm text-uppercase font-weight-semibold"></span>

                        </div>

                        <div class="card-body">
                            <fieldset class="gray_box">
                                <!-- Submit Button -->
                            </fieldset>
                        </div>
                </div>
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
        @endpush('scripts')

        <script>
            $(document).ready(function() {
                $('#customerTable').DataTable();
            });
        </script>


    @endsection
