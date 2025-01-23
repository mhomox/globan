<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Billing Web Application @yield('title')</title>

    <link rel="icon" href="{{ asset('favicon.ico') }}">
    <!-- Global stylesheets -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900" rel="stylesheet" type="text/css">
    <link href="{{ asset('global_assets/css/icons/icomoon/styles.min.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('assets/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('assets/css/bootstrap_limitless.min.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('assets/css/layout.min.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('assets/css/components.min.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('assets/css/colors.min.css') }}" rel="stylesheet" type="text/css">
    <!-- /global stylesheets -->
    <link href="{{ asset('assets/css/custom.css') }}" rel="stylesheet" type="text/css">

    <!-- Core JS files -->
    <script src="{{ asset('global_assets/js/main/jquery.min.js') }}"></script>
    <script src="{{ asset('global_assets/js/main/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('global_assets/js/plugins/loaders/blockui.min.js') }}"></script>

    <!-- /core JS files -->

    <script src="{{ asset('assets/Bootstrap4/vendors/bower_components/datatables.net/js/jquery.dataTables.min.js') }}">
    </script>

    <script src="{{ asset('assets/Bootstrap4/vendors/bower_components/datatables.net/js/jquery.dataTables.min.js') }}">
    </script>
    <script
        src="{{ asset('assets//Bootstrap4/vendors/bower_components/datatables.net-buttons/js/dataTables.buttons.min.js') }}">
    </script>
    <script src="{{ asset('assets/Bootstrap4/vendors/bower_components/datatables.net-buttons/js/buttons.print.min.js') }}">
    </script>
    <script src="{{ asset('assets/Bootstrap4/vendors/bower_components/jszip/dist/jszip.min.js') }}"></script>
    <script src="{{ asset('assets/Bootstrap4/vendors/bower_components/datatables.net-buttons/js/buttons.html5.min.js') }}">
    </script>
    <script type="text/javascript" src="{{ asset('assets/libs/select2-4.0.12/dist/js/select2.min.js') }}"></script>

    <script src="{{ asset('global_assets/js/plugins/notifications/jgrowl.min.js') }}"></script>
    <script src="{{ asset('global_assets/js/plugins/notifications/noty.min.js') }}"></script>
    <script src="{{ asset('global_assets/js/plugins/spinner/bootstrap-input-spinner.js') }}"></script>

    <!--  <script src="{{ asset('global_assets/js/plugins/extensions/jquery_ui/interactions.min.js') }}"></script>
  <script src="{{ asset('global_assets/js/plugins/extensions/jquery_ui/widgets.min.js') }}"></script>
  <script src="{{ asset('global_assets/js/plugins/extensions/jquery_ui/effects.min.js') }}"></script>
  <script src="{{ asset('global_assets/js/plugins/extensions/mousewheel.min.js') }}"></script>
  <script src="{{ asset('global_assets/js/plugins/extensions/jquery_ui/globalize/globalize.js') }}"></script>
  <script
      src="{{ asset('global_assets/js/plugins/extensions/jquery_ui/globalize/cultures/globalize.culture.de-DE.js') }}">
  </script>
  <script
      src="{{ asset('global_assets/js/plugins/extensions/jquery_ui/globalize/cultures/globalize.culture.ja-JP.js') }}">
  </script> -->

    <script src="{{ asset('assets/js/app.js') }}"></script>
    <script src="{{ asset('global_assets/js/demo_pages/jqueryui_forms.js') }}"></script>
    <script type="text/javascript">
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        var URL = "{{ URL::to('/') }}";
    </script>
</head>

<body>
    <!-- Header -->
    @includeWhen(Auth::user(), 'partials.header')

    <!-- Page content -->
    <div class="page-content">

        <!-- Sidebar -->
        @includeWhen(Auth::user(), 'partials.sidebar')

        <!-- Contents -->

        @yield('content')

        <!-- Footer -->
        @includeWhen(Auth::user(), 'partials.footer')


        <!-- Utils -->
        @auth
            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                @csrf
            </form>
        @endauth



        <!-- Theme JS files -->


        <!-- /theme JS files -->

        <script type="text/javascript">
            function numberWithCommas(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        </script>
        @stack('scripts')
</body>

</html>
