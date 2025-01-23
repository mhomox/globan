@extends('layouts.app')
@section('content')
<body class="bg-slate-800">
    <!-- Page content -->
    <div class="page-content">
        <!-- Main content -->
        <div class="content-wrapper">
            <!-- Content area -->
            <div class="col-sm12">
                <?php
                    $n = 0;
                    if(!empty(session('errors')))
                        $n = 1;
                        echo '<input type="hidden" name="errors" id="errors" value="'.$n.'" />';

                                session(['errors'=>'']);
                ?>
            </div>

            <div class="content d-flex justify-content-center align-items-center">
                <!-- Login card -->
                <form class="login-form" method="POST" action="{{ route('login') }}">
                @csrf
                    <div class="card bg-light mb-0 p-2">
                        <div class="card-body"><br>
                            <div  class="content d-flex justify-content-center align-items-center mb-3">

                                <img src="{{ asset('assets/img/logo.png') }}" height="auto" width="130%" alt=""><br>

                                <!-- <span class="d-block text-muted">Login Your credentials</span> -->
                            </div>
                            <div class="form-group form-group-feedback form-group-feedback-left">
                                <input type="text" id="username" name="userID" class="form-control @error('username') is-invalid @enderror" value="{{ old('userid') }}" placeholder="User ID" required autofocus>
                                <div class="form-control-feedback">
                                    <i class="icon-user text-muted"></i>
                                </div>
                            </div>

                            <div class="form-group form-group-feedback form-group-feedback-left">
                            <input type="password" id="password" name="password" class="form-control @error('password') is-invalid @enderror" placeholder="Password" required>
                                <div class="form-control-feedback">
                                    <i class="icon-lock2 text-muted"></i>
                                </div>

                            </div>



                            <div class="form-group d-flex align-items-center">

                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                        <label class="form-check-label" for="remember">
                                            {{ __('Remember Me') }}
                                        </label>
                                    </div>

                            </div>

                            <div class="form-group mt-3">
                                <button type="submit" class="btn btn-success btn-block">Sign in <i class="icon-circle-right2 ml-2"></i></button>
                            </div>
                            <br>
                            <br>

                            <span class="form-text text-center text-muted">Welcome to ComUnion Billing Portal <Br>Powered by:  <a href="#">ComUnion Technologies Inc.,</a></span>
                        </div>
                    </div>
                </form>
                <!-- /login card -->
            </div>
            <!-- /content area -->
      @push('scripts')
    <script src="{{ asset('global_assets/js/plugins/notifications/jgrowl.min.js') }}"></script>
    <script src="{{ asset('global_assets/js/plugins/notifications/noty.min.js') }}"></script>
    <script src="{{ asset('global_assets/js/demo_pages/extra_jgrowl_noty.js') }}"></script>

    @endpush('scripts')
@endsection
