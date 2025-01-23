<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">

    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">

    <!-- Scripts -->
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])

    <!-- Add Custom CSS for Sidebar -->
    <style>
        body {
            display: flex;
            min-height: 100vh;
            flex-direction: column;
            font-family: 'Nunito', sans-serif;
        }

        #app {
            display: flex;
            flex: 1;
        }

        .sidebar {
            width: 250px;
            background: #f0f0f0; /* Soft light gray background */
            padding: 20px;
            border-right: 1px solid #e0e0e0; /* Light gray border */
            transition: width 0.3s ease;
            position: relative;
        }

        .sidebar.collapsed {
            width: 80px;
            padding: 10px;
        }

        .sidebar.collapsed h5,
        .sidebar.collapsed .nav-link span {
            display: none;
        }

        .sidebar.collapsed .nav-link {
            text-align: center;
        }

        .hamburger {
            font-size: 1.5rem;
            cursor: pointer;
            position: absolute;
            top: 10px;
            right: 10px;
            transition: transform 0.3s ease;
        }

        .sidebar.collapsed .hamburger {
            transform: rotate(180deg);
        }

        .content {
            flex: 1;
            padding: 20px;
        }

        .navbar {
            flex-shrink: 0;
        }

        .sidebar .nav-item {
            margin-bottom: 10px;
        }

        .sidebar a {
            text-decoration: none;
        }

        /* Text and Icon Colors */
        .nav-link {
            color: #333; /* Dark text color for better readability */
            font-size: 16px;
            font-weight: 400;
            transition: color 0.3s ease;
        }

        /* Icons in Sidebar */
        .sidebar .nav-link i {
            color: #666; /* Muted icon color */
            margin-right: 10px;
            transition: color 0.3s ease;
        }

        /* Sidebar Item Hover Effect */
        .nav-link:hover, .dropdown-item:hover {
            color: #007bff; /* Soft blue color for hover */
            background-color: #e9ecef; /* Light background for hover */
        }

        .dropdown-menu {
            display: none;
            opacity: 0;
            transition: opacity 0.5s ease;
        }

        /* Show dropdown on hover */
        .dropdown:hover .dropdown-menu {
            display: block;
            opacity: 1;
        }

        /* Sidebar Collapsed State */
        .sidebar.collapsed .nav-link {
            text-align: center;
            color: #666; /* Muted color for collapsed state */
        }

        /* Tooltip Styling */
        .sidebar.collapsed .nav-link:hover::after {
            content: attr(data-tooltip);
            position: absolute;
            top: 50%;
            left: 100%;
            transform: translateY(-50%);
            padding: 5px;
            background-color: #333;
            color: white;
            font-size: 12px;
            border-radius: 5px;
            white-space: nowrap;
            margin-left: 10px;
        }

        /* Dropdown Item Styling */
        .dropdown-menu {
            background-color: #ffffff;
            border-radius: 5px;
        }

        /* Sidebar toggle button */
        .sidebar .hamburger {
            color: #333; /* Dark color for the hamburger icon */
        }

    </style>
</head>
<body>
    <div id="app">
        @auth
        <!-- Sidebar -->
        <div id="sidebar" class="sidebar">
            <h5>Billing Sys.</h5>
            <span class="hamburger" id="toggleSidebar">&#9776;</span>
            <ul class="nav flex-column pt-5">
                <li class="nav-item">
                    <div class="dropdown">
                    <a class="nav-link dropdown-toggle" href="{{ url('/home') }}" data-tooltip="Dashboard">
                        <i class="bi bi-house-door"></i> <span>Dashboard</span>
                    </a>
                    </div>
                </li>
                <li class="nav-item">
                    <div class="dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="invoicesDropdown" data-bs-toggle="dropdown" aria-expanded="false" data-tooltip="Invoices">
                            <i class="bi bi-file-earmark-text"></i> <span>Invoices</span>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="invoicesDropdown">
                            <li><a class="dropdown-item" href="{{ url('/invoices/create') }}">Create Invoice</a></li>
                            <li><a class="dropdown-item" href="{{ url('/invoices/list') }}">Manage Invoices</a></li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <div class="dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="productsDropdown" data-bs-toggle="dropdown" aria-expanded="false" data-tooltip="Products">
                            <i class="bi bi-box"></i> <span>Products</span>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="productsDropdown">
                            <li><a class="dropdown-item" href="{{ url('/products/create') }}">Add Product</a></li>
                            <li><a class="dropdown-item" href="{{ url('/products') }}">Manage Products</a></li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <div class="dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="customersDropdown" data-bs-toggle="dropdown" aria-expanded="false" data-tooltip="Customers">
                            <i class="bi bi-people"></i> <span>Customers</span>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="customersDropdown">
                            <li><a class="dropdown-item" href="{{ url('/customers/create') }}">Add Customer</a></li>
                            <li><a class="dropdown-item" href="{{ url('/customers') }}">Manage Customers</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        @endauth

        <!-- Main Content -->
        <div class="content">
            <!-- Navbar -->
            <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
                <div class="container">
                    <a class="navbar-brand" href="{{ url('/') }}">
                        {{ config('app.name', 'Laravel') }}
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <!-- Left Side Of Navbar -->
                        <ul class="navbar-nav me-auto">
                        </ul>

                        <!-- Right Side Of Navbar -->
                        <ul class="navbar-nav ms-auto">
                            <!-- Authentication Links -->
                            @guest
                                @if (Route::has('login'))
                                    <li class="nav-item">
                                        <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                                    </li>
                                @endif

                                @if (Route::has('register'))
                                    <li class="nav-item">
                                        <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                                    </li>
                                @endif
                            @else
                                <li class="nav-item dropdown">
                                    <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                        {{ Auth::user()->name }}
                                    </a>

                                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item" href="{{ url('/profile') }}">
                                            Profile
                                        </a>
                                        <a class="dropdown-item" href="{{ route('logout') }} "
                                           onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                            {{ __('Logout') }}
                                        </a>

                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                            @csrf
                                        </form>
                                    </div>
                                </li>
                            @endguest
                        </ul>
                    </div>
                </div>
            </nav>

            <!-- Page Content -->
            <main class="py-4">
                @yield('content')
            </main>
        </div>
    </div>

    <!-- Sidebar Toggle Script -->
    <script>
        const toggleSidebarButton = document.getElementById('toggleSidebar');
        const sidebar = document.getElementById('sidebar');

        toggleSidebarButton.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    </script>
</body>
</html>
