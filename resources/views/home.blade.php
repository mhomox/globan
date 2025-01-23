@extends('layouts.app')

@section('content')


    <!-- Main content -->
    <div class="content-wrapper">

<!-- Page header -->
<div class="page-header page-header-light">
    <div class="page-header-content header-elements-md-inline">
        <div class="page-title d-flex">
            <h4><span class="font-weight-semibold">Dashboard V.1</span></h4>
            <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
        </div>

        <div class="header-elements d-none">
            <div class="d-flex justify-content-center">

                {{-- <a href="#" class="btn btn-link btn-float text-default"><i class="icon-lan2 text-warning"></i><span>System Process</span></a> --}}
                <a href="#" class="btn btn-link btn-float text-default"><i class="icon-info22 text-success"></i><span>FAQ's</span></a>
            </div>
        </div>
    </div>

    <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
        <div class="d-flex">
            <div class="breadcrumb">
                <!-- <a href="index.html" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Home</a> -->
                <span class="breadcrumb-item active"><i class="icon-home2 mr-2"></i>  Dashboard</span>
            </div>

            <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
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
        <div class="col-xl-12">
            <!-- Simple statistics -->
                    <div class="row">
                        <div class="col-sm-6 col-xl-3">
                            <div class="card card-body">
                                <div class="media">
                                    <div class="mr-3 align-self-center">
                                        <i class="icon-new icon-3x text-success-400"></i>
                                    </div>

                                    <div class="media-body text-right">
                                        {{-- <h3 class="font-weight-semibold mb-0">{{ $new_sales_order_today_count }}</h3> --}}
                                        <span class="text-uppercase font-size-sm text-dark">Today's New Order</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6 col-xl-3">
                            <div class="card card-body">
                                <div class="media">
                                    <div class="mr-3 align-self-center">
                                        <i class="icon-bell3 icon-3x text-pink-400"></i>
                                    </div>

                                    <div class="media-body text-right">
                                        {{-- <h3 class="font-weight-semibold mb-0">{{ $pre_approved }}</h3> --}}
                                        <span class="text-uppercase font-size-sm text-dark">Pre Approval</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6 col-xl-3">
                            <div class="card card-body">
                                <div class="media">
                                    <div class="media-body">
                                        {{-- <h3 class="font-weight-semibold mb-0">{{ $final_approved }}</h3> --}}
                                        <span class="text-uppercase font-size-sm text-dark">Approved Order</span>
                                    </div>

                                    <div class="ml-3 align-self-center">
                                        <i class="icon-clipboard icon-3x text-primary-400"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6 col-xl-3">
                            <div class="card card-body">
                                <div class="media">
                                    <div class="media-body">
                                        {{-- <h3 class="font-weight-semibold mb-0">{{ $total_order }}</h3> --}}
                                        <span class="text-uppercase font-size-sm text-dark">Total Order</span>
                                    </div>

                                    <div class="ml-3 align-self-center">
                                        <i class="icon-clipboard icon-3x text-primary-400"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 col-xl-3">
                            <div class="card card-body">
                                <div class="media">
                                    <div class="mr-3 align-self-center">
                                        <i class="icon-calendar icon-3x text-primary-400"></i>
                                    </div>

                                    <div class="media-body text-right">
                                        {{-- <h3 class="font-weight-semibold mb-0">{{ $total_order }}</h3> --}}
                                        <span class="text-uppercase font-size-sm text-dark">Monthly Order</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6 col-xl-3">
                            <div class="card card-body">
                                <div class="media">
                                    <div class="mr-3 align-self-center">
                                        <i class="icon-dropbox icon-3x text-indigo-400"></i>
                                    </div>

                                    <div class="media-body text-right">
                                        <h3 class="font-weight-semibold mb-0">0</h3>
                                        <span class="text-uppercase font-size-sm text-dark">Product</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6 col-xl-3">
                            <div class="card card-body">
                                <div class="media">
                                    <div class="media-body">
                                        <h3 class="font-weight-semibold mb-0">0</h3>
                                        <span class="text-uppercase font-size-sm text-success">Reports</span>
                                    </div>

                                    <div class="ml-3 align-self-center">
                                        <i class="icon-printer icon-3x text-warning-400"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6 col-xl-3">
                            <div class="card card-body">
                                <div class="media">
                                    <div class="media-body">
                                        <h3 class="font-weight-semibold mb-0">0</h3>
                                        <span class="text-uppercase font-size-sm text-success">Total Salesman</span>
                                    </div>

                                    <div class="ml-3 align-self-center">
                                        <i class="icon-users4 icon-3x text-indigo-400"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            <!-- /simple statistics -->
        </div>


    </div>



    <!-- /main charts -->




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
    <script src="{{ asset('global_assets/js/demo_charts/pages/dashboard/light/streamgraph.js') }}"></script>
    <script src="{{ asset('global_assets/js/demo_charts/pages/dashboard/light/sparklines.js') }}"></script>
    <script src="{{ asset('global_assets/js/demo_charts/pages/dashboard/light/lines.js') }}"></script>
    <script src="{{ asset('global_assets/js/demo_charts/pages/dashboard/light/areas.js') }}"></script>
    <script src="{{ asset('global_assets/js/demo_charts/pages/dashboard/light/donuts.js') }}"></script>
    <script src="{{ asset('global_assets/js/demo_charts/pages/dashboard/light/bars.js') }}"></script>
    <script src="{{ asset('global_assets/js/demo_charts/pages/dashboard/light/progress.js') }}"></script>
    <script src="{{ asset('global_assets/js/demo_charts/pages/dashboard/light/heatmaps.js') }}"></script>
    <script src="{{ asset('global_assets/js/demo_charts/pages/dashboard/light/pies.js') }}"></script>
    <script src="{{ asset('global_assets/js/demo_charts/pages/dashboard/light/bullets.js') }}"></script>
    <script src="{{ asset('global_assets/js/demo_pages/widgets_content.js') }}"></script>

    <script src="{{ asset('global_assets/js/plugins/forms/styling/uniform.min.js') }}"></script>
    <script src="{{ asset('global_assets/js/plugins/forms/styling/switchery.min.js') }}"></script>
    <script src="{{ asset('global_assets/js/plugins/forms/selects/select2.min.js') }}"></script>


    <script type="text/javascript">

        $(function(){

            if($('#success').val() == 1){
            $('body').find('.jGrowl').attr('class', '').attr('id', '').hide();
            $.jGrowl('Hi, {{ (Auth::user()->userID) }} <br> Welcome to Billing Web Application, You have Successfully Login!.', {
                position: 'bottom-right',
                theme: 'bg-dark text-white',
                header: '<img src="{{ asset('assets/img/login1.png') }}"height="50px;" width="50px" alt=""> ComUnion Technologies Inc.,'
                });
            }
        });
    </script>

    @endpush('scripts')
@endsection


