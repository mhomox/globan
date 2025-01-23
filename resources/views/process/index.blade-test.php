@extends('layouts.app')
@section('content')
    <!-- Main content -->
    <div class="content-wrapper">

<!-- Page header -->
<div class="page-header page-header-light">
    <div class="page-header-content header-elements-md-inline">
        <div class="page-title d-flex">
            <h4><i class="icon-arrow-left52 mr-2"></i> <span class="font-weight-semibold">ComUnion ERP</span> - Process</h4>
            <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
        </div>

        <div class="header-elements d-none">
            <div class="d-flex justify-content-center">
                <a href="#" class="btn btn-link btn-float text-default"><i class="icon-bars-alt text-primary"></i><span>Statistics</span></a>
                <a href="#" class="btn btn-link btn-float text-default"><i class="icon-calculator text-primary"></i> <span>Invoices</span></a>
                <a href="#" class="btn btn-link btn-float text-default"><i class="icon-calendar5 text-primary"></i> <span>Schedule</span></a>
            </div>
        </div>
    </div>

    <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
        <div class="d-flex">
            <div class="breadcrumb">
                <a href="index.html" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Home</a>
                <span class="breadcrumb-item active">Dashboard</span>
            </div>

            <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
        </div>

        <div class="header-elements d-none">
            <div class="breadcrumb justify-content-center">
                <a href="#" class="breadcrumb-elements-item">
                    <i class="icon-comment-discussion mr-2"></i>
                    Support
                </a>

                <div class="breadcrumb-elements-item dropdown p-0">
                    <a href="#" class="breadcrumb-elements-item dropdown-toggle" data-toggle="dropdown">
                        <i class="icon-gear mr-2"></i>
                        Settings
                    </a>

                    <div class="dropdown-menu dropdown-menu-right">
                        <a href="#" class="dropdown-item"><i class="icon-user-lock"></i> Account security</a>
                        <a href="#" class="dropdown-item"><i class="icon-statistics"></i> Analytics</a>
                        <a href="#" class="dropdown-item"><i class="icon-accessibility"></i> Accessibility</a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item"><i class="icon-gear"></i> All settings</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- /page header -->
<div class="col-sm12">
    <?php
        $n = 0;
        if(!empty(session('success')))
            $n = 1;
            echo '<input type="hidden" name="success" id="success" value="'.$n.'" />';
            echo '<input type="hidden" id="message" value="'.session('success').'" />';
                    session(['success'=>'']);
    ?>
</div>
<!-- Content area -->
<div class="content">

    <!-- Main charts -->
    <div class="row">
        <!-- <div class="col-xl-12">

            <img src="{{ url('assets/img/dashboard/different_industries.jpg') }}">

        </div> -->

        <div class="col-xl-12">

              <div class="drow">
                <h5>ACCOUNTS RECEIVABLE</h5>
                <img src="{{ url('assets/img/dashboard/account_receivable.png') }}" usemap="#armap">

                <map name="armap">
                    <area target="_blank" alt="" title="" href="{{ url('sales_order/so_list') }}" coords="1,0,154,176" shape="rect">
                    <area target="_blank" alt="" title="" href="{{ url('delivery_receipt/dr_list') }}" coords="217,3,369,175" shape="rect">
                    <area target="_blank" alt="" title="" href="{{ url('sales_invoice/si_list') }}" coords="434,3,589,172" shape="rect">
                    <area target="_blank" alt="" title="" href="{{ url('collection_receipt/cr_list') }}" coords="658,2,811,174" shape="rect">
                    <area target="_blank" alt="" title="" href="{{ url('deposit_slip/ds_list') }}" coords="876,2,1029,175" shape="rect">
                </map>
            </div>



        </div>

        <div class="col-xl-12">


            <div class="drow">
                <h5>ACCOUNTS PAYABLE</h5>
                <img src="{{ url('assets/img/dashboard/accounts_payable.png') }}"  usemap="#apmap">
                <map name="apmap">
                   <area target="_blank" alt="" title="" href="{{ url('purchase_request/pr_list') }}" coords="150,174,1,5" shape="rect">
                    <area target="_blank" alt="" title="" href="{{ url('purchase_order/po_list') }}" coords="218,1,368,172" shape="rect">
                    <area target="_blank" alt="" title="" href="{{ url('#') }}" coords="434,0,589,175" shape="rect">
                    <area target="_blank" alt="" title="" href="{{ url('#') }}" coords="813,172,656,1" shape="rect">
                    <area target="_blank" alt="" title="" href="{{ url('#') }}" coords="881,1,1034,172" shape="rect">
                </map>
            </div>

        </div>

        <div class="col-xl-12">

            <div class="drow">
                <h5>OTHER MODULES</h5>
                <img src="{{ url('assets/img/dashboard/other_modules.png') }}" usemap="#ommap">
                <map name="ommap">
                    <area target="_blank" alt="" title="" href="{{ url('#') }}" coords="0,1,153,171" shape="rect">
                    <area target="_blank" alt="" title="" href="{{ url('#') }}" coords="174,0,328,172" shape="rect">
                    <area target="_blank" alt="" title="" href="{{ url('#') }}" coords="352,1,504,169" shape="rect">
                    <area target="_blank" alt="" title="" href="{{ url('#') }}" coords="526,0,678,170" shape="rect">
                </map>
            </div>

        </div>
    </div>
    <!-- /main charts -->


    <!-- Dashboard content -->
    <div class="row">
        <div class="col-xl-8">

        </div>

        <div class="col-xl-4">




        </div>
    </div>
    <!-- /dashboard content -->

</div>
<!-- /content area -->


@push('scripts')
    <script src="{{ asset('global_assets/js/plugins/notifications/jgrowl.min.js') }}"></script>
    <script src="{{ asset('global_assets/js/plugins/notifications/noty.min.js') }}"></script>
    <script src="{{ asset('global_assets/js/demo_pages/extra_jgrowl_noty.js') }}"></script>
    <script src="{{ asset('global_assets/js/plugins/visualization/d3/d3.min.js') }}"></script>
    <script src="{{ asset('global_assets/js/plugins/visualization/d3/d3_tooltip.js') }}"></script>
    <script src="{{ asset('global_assets/js/plugins/forms/styling/switchery.min.js') }}"></script>
    <script src="{{ asset('global_assets/js/plugins/ui/moment/moment.min.js') }}"></script>
    <script src="{{ asset('global_assets/js/plugins/pickers/daterangepicker.js') }}"></script>

    <script src="{{ asset('global_assets/js/demo_pages/dashboard.js') }}"></script>



    <script type="text/javascript">

        $(function(){

            if($('#success').val() == 1){
                new Noty({
                    theme: ' alert alert-success alert-styled-left p-0 bg-white',
                    text: $('#message').val(),
                    type: 'success',
                    progressBar: false,
                    closeWith: ['button']
                }).show();
            }
        });
    </script>

    @endpush('scripts')
@endsection


