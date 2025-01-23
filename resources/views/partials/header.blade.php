 <!-- Main navbar -->
 <div class="navbar navbar-expand-md navbar-dark">
    <div class="navbar-brand">
        <a href="{{ url('/home') }}" class="d-inline-block">
            <img src="{{ url('assets/img/logo.png') }}" alt="">
        </a>
    </div>

    <div class="d-md-none">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-mobile">
            <i class="icon-tree5"></i>
        </button>
        <button class="navbar-toggler sidebar-mobile-main-toggle" type="button">
            <i class="icon-paragraph-justify3"></i>
        </button>
    </div>

    <div class="collapse navbar-collapse" id="navbar-mobile">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a href="#" class="navbar-nav-link sidebar-control sidebar-main-toggle d-none d-md-block">
                    <i class="icon-paragraph-justify3"></i>
                </a>
            </li>


        </ul>

        <!-- <span class="badge bg-violet "></span> -->
        {{-- <span class="badge badge-pill badge-primary ml-md-3 mr-md-auto font-size-lg font-weight-semibold"><font color="white"> FIGARO Branch Code :</font> <font color="black">{{ (Auth::user()->cDivision) }}</font></span> --}}
        <span class="badge badge-pill badge-primary ml-md-3 mr-md-auto font-size-lg font-weight-semibold">BIlling Web Application</span>
        <ul class="navbar-nav">


            <li class="nav-item dropdown dropdown-user">
                <a href="#" class="navbar-nav-link d-flex align-items-center dropdown-toggle" data-toggle="dropdown">
                    {{-- <img src="{{ asset('users/'.(Auth::user()->photo)) }}" class="rounded-circle mr-2" height="34" alt=""> --}}

                </a>

                <div class="dropdown-menu dropdown-menu-right">
                    <a href="{{ url('user/my_profile') }}" class="dropdown-item"><i class="icon-user-plus"></i>
                    Profile</a>


                    <div class="dropdown-divider"></div>

                    <a href="{{ route('logout') }}" class="dropdown-item"><i class="icon-switch2"></i> Sign Out</a>
                </div>
            </li>
        </ul>
    </div>
</div>
<!-- /main navbar -->
