    <!-- Main sidebar -->
    <div class="sidebar sidebar-dark sidebar-main sidebar-expand-md">

        <!-- Sidebar mobile toggler -->
        <div class="sidebar-mobile-toggler text-center">
            <a href="#" class="sidebar-mobile-main-toggle">
                <i class="icon-arrow-left8"></i>
            </a>
            Navigation
            <a href="#" class="sidebar-mobile-expand">
                <i class="icon-screen-full"></i>
                <i class="icon-screen-normal"></i>
            </a>
        </div>
        <!-- /sidebar mobile toggler -->

        <!-- Sidebar content -->
        <div class="sidebar-content">

            <!-- User menu -->
            <div class="sidebar-user">
                <div class="card-body">
                    <div class="media">
                        {{-- <div class="mr-3">
                            <a href="#"><img src="{{ asset('users/'.(Auth::user()->photo)) }}" width="38" height="38" class="rounded-circle" alt=""></a>
                        </div>

                        <div class="media-body">
                            <div class="media-title font-weight-semibold font-size-lg">{{ (Auth::user()->name.' '.Auth::user()->email) }}</div>
                            <div class="font-size-xs opacity-50 font-weight-semibold text-white">
                                <i class="icon-shield2 font-size-sm"></i> &nbsp;
                               {{ Auth::user()->userID }}

                            </div>
                        </div>

                        <div class="ml-3 align-self-center">
                            <a href="#" class="text-white"><i class="icon-cog3"></i></a>
                        </div> --}}
                    </div>
                </div>
            </div>
            <!-- /user menu -->


            <!-- Main navigation -->
            <div class="card card-sidebar-mobile">
                <ul class="nav nav-sidebar" data-nav-type="accordion">

                    <!-- Main -->
                    <li class="nav-item-header"><div class="text-uppercase font-size-xs line-height-xs">Main</div> <i class="icon-menu" title="Main"></i></li>
                    <li class="nav-item">
                        <a href="{{ route('home') }}" class="nav-link {{ (request()->is('home')) ? 'nav-link active' : '' }}"><i class="icon-pie-chart2"></i><span>Dashboard</span></a>
                    </li>

                    {{-- @if(Auth::user()->RoleID == 'BRANCH')
                    <li class="nav-item">
                        <a href="{{ url('sales_order/so_list') }}" class="nav-link {{ (request()->is('sales_order*')) ? 'nav-link active' : '' }}"><i class="icon-copy"></i><span>Sales Order</span></a>
                    </li>
                    @endif

                    @if(Auth::user()->RoleID == 'BRNCHMNGER')
                    <li class="nav-item">
                        <a href="{{ url('sales_order/so_list') }}" class="nav-link {{ (request()->is('sales_order*')) ? 'nav-link active' : '' }} "><i class="icon-bell3"></i><span>Sales Order</span><span class="badge badge-pill bg-warning-400  align-self-center ml-auto"><?php echo session('approval_count'); ?></span></a>
                    </li>
                    <li class="nav-item">
                        <a href="{{ url('delivery_receipt/dr_list') }}" class="nav-link {{ (request()->is('delivery_receipt*')) ? 'nav-link active' : '' }}"><i class="icon-truck"></i><span>Delivery Receipt</span></a>
                    </li>
                    @endif

                    <!-- <li class="nav-item">
                            <a href="{{ url('report_center') }}" class="nav-link {{ (request()->is('report_center')) ? 'nav-link active' : '' }}"><i class="icon-printer"></i><span>Report Center</span></a>
                        </li> -->

                     <!-- @if(Auth::user()->RoleID == 'APPROVER' || Auth::user()->RoleID == 'SUPERUSER')
                    <li class="nav-item">
                        <a href="{{ url('approval/approval_list') }}" class="nav-link {{ (request()->is('approval*')) ? 'nav-link active' : '' }} "><i class="icon-bell3"></i><span>For Approval</span><span class="badge badge-pill bg-warning-400  align-self-center ml-auto"><?php echo session('approval_count'); ?></span></a>

                    </li>
                    @endif -->
        <!--
                    @if(Auth::user()->RoleID == 'SUPERUSER')
                        <li class="nav-item">
                            <a href="{{ url('report_center') }}" class="nav-link {{ (request()->is('report_center')) ? 'nav-link active' : '' }}"><i class="icon-printer"></i><span>Report Center</span></a>
                        </li>
                    @endif --> --}}


                    <li class="nav-item nav-item-submenu">
                        <a href="{{ url('billing_statement') }}"  class="nav-link {{ (request()->is('billing_statement*')) ? 'nav-link active' : '' }}"><i class="icon-stats-growth"></i><span>Billing Statement</span></a>
                        {{-- <ul class="nav nav-group-sub" data-submenu-title="Starter kit">
                            <li class="nav-item"><a href="{{ url('sales_order/so_list') }}" class="nav-link"><i class="icon-cart-add2"></i><span>Sales Order</span></a></li>
                            <li class="nav-item"><a href="{{ url('billing_statement/create') }}" class="nav-link {{ (request()->is('billing_statement*')) ? 'nav-link active' : '' }}"><i class="icon-add"></i><span>Create Billing</span></a></li>
                            <li class="nav-item"><a href="{{ url('billing_satement/bs_list') }}"  class="nav-link {{ (request()->is('billing_list*')) ? 'nav-link active' : '' }}"><i class="icon-file-text2"></i><span>Collection Receipt</span></a></li>
                        </ul> --}}
                    </li>

                    <li class="nav-item nav-item-submenu">
                        <a href="{{ url('customers/manage_customers') }}"  class="nav-link {{ (request()->is('customers/manage_customers')) ? 'nav-link active' : '' }}"><i class="icon-user"></i><span>Customers</span></a>
                        {{-- <ul class="nav nav-group-sub" data-submenu-title="Starter kit">
                            <li class="nav-item"><a href="{{ url('customers/create') }}" class="nav-link {{ (request()->is('customers*')) ? 'nav-link active' : '' }}"><i class="icon-add"></i><span>Add Customer</span></a></li>
                            <li class="nav-item"><a href="{{ url('customers/manage_customers') }}"  class="nav-link {{ (request()->is('customers*')) ? 'nav-link active' : '' }}"><i class="icon-reading"></i><span>Manage Customer</span></a></li>
                        </ul> --}}
                    </li>

                    <li class="nav-item nav-item-submenu">
                        <a href="#" class="nav-link {{ (request()->is('services*','sales_invoice*')) ? 'nav-link active' : '' }}"><i class="icon-wrench2"></i><span>Services</span></a>
                        <ul class="nav nav-group-sub" data-submenu-title="Starter kit">
                            <li class="nav-item"><a href="{{ url('services/add_services') }}" class="nav-link {{ (request()->is('billing_statement*')) ? 'nav-link active' : '' }}"><i class="icon-add"></i><span>Add Services</span></a></li>
                            <li class="nav-item"><a href="{{ url('services/manage_services') }}"  class="nav-link {{ (request()->is('collection_receipt*')) ? 'nav-link active' : '' }}"><i class="icon-reading"></i><span>Manage Services</span></a></li>
                        </ul>
                    </li>

                    <li class="nav-item nav-item-submenu">
                        <a href="{{ url ('reports/manage_reports') }}" class="nav-link {{ (request()->is('reports/manage_reports')) ? 'nav-lionk active' : ''}}"><i class="icon-file-text2"></i><span>Reports</span></a>

                    </li>
                    {{-- <li class="nav-item nav-item-submenu">
                        <a href="#" class="nav-link {{ (request()->is('invoices*','sales_invoice*')) ? 'nav-link active' : '' }}"><i class="icon-file-text2"></i><span>Create Invoice</span></a>
                        <ul class="nav nav-group-sub" data-submenu-title="Starter kit"> --}}
                            {{-- <li class="nav-item"><a href="{{ url('sales_order/so_list') }}" class="nav-link"><i class="icon-cart-add2"></i><span>Sales Order</span></a></li> --}}
                            {{-- <li class="nav-item"><a href="{{ url('invoices/create') }}" class="nav-link {{ (request()->is('invoices*')) ? 'nav-link active' : '' }}"><i class="icon-add"></i><span>Add Invoice</span></a></li>
                            <li class="nav-item"><a href="{{ url('services/manage_services') }}"  class="nav-link {{ (request()->is('collection_receipt*')) ? 'nav-link active' : '' }}"><i class="icon-reading"></i><span>Manage Services</span></a></li>
                        </ul>
                    </li> --}}

                    {{-- <li class="nav-item nav-item-submenu">
                        <a href="#" class="nav-link {{ (request()->is('sales_order*','sales_invoice*')) ? 'nav-link active' : '' }}"><i class="icon-stats-growth"></i><span>Billing & Collection</span></a>
                        <ul class="nav nav-group-sub" data-submenu-title="Starter kit">
                            <li class="nav-item"><a href="{{ url('sales_order/so_list') }}" class="nav-link"><i class="icon-cart-add2"></i><span>Sales Order</span></a></li>
                            <li class="nav-item"><a href="{{ url('sales_invoice/si_list') }}" class="nav-link {{ (request()->is('sales_invoice*')) ? 'nav-link active' : '' }}"><i class="icon-cash"></i><span>Sales Invoice</span></a></li>
                            <li class="nav-item"><a href="{{ url('collection_receipt/cr_list') }}"  class="nav-link {{ (request()->is('collection_receipt*')) ? 'nav-link active' : '' }}"><i class="icon-file-text2"></i><span>Collection Receipt</span></a></li>
                            <li class="nav-item"><a href="{{ url('ar_adjustments/ar_list') }}" class="nav-link"><i class="icon-wrench2"></i><span>AR Adjustment</span></a></li>
                        </ul>
                    </li> --}}

        <!--
                    <li class="nav-item nav-item-submenu">
                        <a href="#" class="nav-link {{ (request()->is('collection_receipt*')) ? 'nav-link active' : '' }}"><i class="icon-cash3"></i><span>Cashiering</span></a>
                        <ul class="nav nav-group-sub" data-submenu-title="Starter kit">

                            <li class="nav-item"><a href="{{ url('deposit_slip/ds_list') }}" class="nav-link"><i class="icon-stack"></i><span>Deposit Slip</span></a></li>
                            <li class="nav-item"><a href="../seed/sidebar_main.html" class="nav-link"><i class="icon-drawer-in"></i><span>Return/Bounced Check</span></a></li>
                            <li class="nav-item"><a href="../seed/sidebar_main.html" class="nav-link"><i class="icon-drawer3"></i><span>Pulled Out Check</span></a></li>
                            <li class="nav-item"><a href="../seed/sidebar_main.html" class="nav-link"><i class="icon-clippy"></i><span>Check Replacement</span></a></li>

                            <li class="nav-item"><a href="../seed/sidebar_main.html" class="nav-link"><i class="icon-file-eye"></i><span>Check Clearing</span></a></li>
                            <li class="nav-item"><a href="{{ url('check_issuance/ci_list') }}" class="nav-link"><i class="icon-folder-check"></i><span>Check Issuance</span></a></li>
                            <li class="nav-item"><a href="../seed/sidebar_main.html" class="nav-link"><i class="icon-file-check"></i><span>Acknowledgement Receipt</span></a></li>
                        </ul>
                    </li>


                    <li class="nav-item nav-item-submenu">
                        <a href="#" class="nav-link {{ (request()->is('purchase_request*','purchase_order*')) ? 'nav-link active' : '' }}"><i class="icon-stats-bars2"></i><span>Purchasing & Payables</span></a>
                        <ul class="nav nav-group-sub" data-submenu-title="Starter kit">
                            <li class="nav-item"><a href="{{ url('purchase_request/pr_list') }}" class="nav-link {{ (request()->is('purchase_request*')) ? 'nav-link active' : '' }}"><i class="icon-file-text2"></i><span>Purchase Request</span></a></li>
                            <li class="nav-item"><a href="{{ url('purchase_order/po_list') }}" class="nav-link {{ (request()->is('purchase_order*')) ? 'nav-link active' : '' }}"><i class="icon-cart2"></i><span>Purchase Order</span></a></li>
                            <li class="nav-item"><a href="{{ url('check_voucher/cv_list') }}" class="nav-link {{ (request()->is('check_voucher*')) ? 'nav-link active' : '' }}"><i class="icon-folder"></i><span>Check Voucher</span></a></li>
                            <li class="nav-item"><a href="{{ url('payables/pay_list') }}" class="nav-link"><i class="icon-cog5"></i><span>Payable Setup</span></a></li>
                            <li class="nav-item"><a href="{{ url('ap_adjustments/ap_list') }}" class="nav-link"><i class="icon-wrench2"></i><span>AP Adjusments</span></a></li>

                        </ul>
                    </li>
                    <li class="nav-item nav-item-submenu">
                        <a href="#" class="nav-link {{ (request()->is('delivery_receipt*')) ? 'nav-link active' : '' }}"><i class="icon-dropbox"></i><span>Inventory Management</span></a>
                        <ul class="nav nav-group-sub" data-submenu-title="Starter kit">
                            <li class="nav-item"><a href="{{ url('delivery_receipt/dr_list') }}" class="nav-link {{ (request()->is('delivery_receipt*')) ? 'nav-link active' : '' }}"><i class="icon-truck"></i><span>Delivery Receipt</span></a></li>
                            <li class="nav-item"><a href="{{ url('goods_receipt/wrr_list') }}" class="nav-link"><i class="icon-reading"></i><span>Goods Receipt</span></a></li>
                            <li class="nav-item"><a href="{{ url('return_good_slip/rgs_list') }}" class="nav-link"><i class="icon-clippy"></i><span>Return Good Slip</span></a></li>
                            <li class="nav-item"><a href="{{ url('wrr_non_trade/wnt_list') }}" class="nav-link"><i class="icon-stack3"></i><span>WRR Non Trade</span></a></li>
                            <li class="nav-item"><a href="{{ url('inventory_adjustment/ia_list') }}" class="nav-link"><i class="icon-upload10"></i><span>Inventory Adjustment</span></a></li>
                            <li class="nav-item"><a href="{{ url('inventory_transfer/it_list') }}" class="nav-link"><i class="icon-copy2"></i><span>Inventory Transfer</span></a></li>
                        </ul>
                    </li> -->
                    <!-- <li class="nav-item nav-item-submenu">
                        <a href="#" class="nav-link"><i class="icon-books"></i><span>General Ledger</span></a>
                        <ul class="nav nav-group-sub" data-submenu-title="Starter kit">
                            <li class="nav-item"><a href="../seed/layout_nav_horizontal.html" class="nav-link"><i class="icon-bars-alt"></i><span>Fixed Asset Depreciation</span></a></li>
                            <li class="nav-item"><a href="{{ url('glactivity/gl_list') }}" class="nav-link"><i class="icon-graph"></i><span>GL Activity</span></a></li>
                            <li class="nav-item"><a href="{{ url('journal_entry/je_list') }}" class="nav-link"><i class="icon-folder-plus"></i><span>Journal Entry</span></a></li>
                        </ul>
                    </li>

                    -->

                     <!-- <li class="nav-item nav-item-submenu">
                        <a href="#" class="nav-link "><i class="icon-store2"></i><span>Point of Sales</span></a>
                        <ul class="nav nav-group-sub" data-submenu-title="Starter kit">
                            <li class="nav-item"><a href="{{ url('pos/dashboard') }}" class="nav-link"><i class="icon-stats-dots"></i><span>POS Dashboard</span></a></li>

                            <li class="nav-item"><a href="{{ url('products/products_list') }}" class="nav-link"><i class="icon-cube4"></i><span>Products</span></a></li>

                            <li class="nav-item"><a href="{{ url('product_categories/pc_list') }}" class="nav-link"><i class="icon-cube4"></i><span>Products Categories</span></a></li>

                            <li class="nav-item"><a href="{{ url('products/products_list') }}" class="nav-link"><i class="icon-cart"></i><span>Orders History</span></a></li>

                            <li class="nav-item"><a href="{{ url('products/products_list') }}" class="nav-link"><i class="icon-user"></i><span>Customer History</span></a></li>

                            <li class="nav-item"><a href="{{ url('sales_invoice/si_list') }}" class="nav-link {{ (request()->is('sales_invoice*')) ? 'nav-link active' : '' }}"><i class="icon-cash"></i><span>Sales Invoice</span></a></li>
                        </ul>
                    </li> -->

                    <!-- <li class="nav-item nav-item-submenu">
                        <a href="#" class="nav-link"><i class="icon-database"></i><span>Maintenance</span></a>
                        <ul class="nav nav-group-sub" data-submenu-title="Maps integration">
                            <li class="nav-item"><a href="{{ url('account/account_list') }}" class="nav-link"><i class="icon-library2"></i><span>Chart of Accounts</span></a></li>
                            <li class="nav-item"><a href="{{ url('client_customer/customer_list') }}" class="nav-link"><i class="icon-reading"></i><span>Customer</a></li>
                             <li class="nav-item nav-item-submenu">
                                <a href="#" class="nav-link"><i class="icon-reading"></i><span>Client Supplier</span></a>
                                    <ul class="nav nav-group-sub">
                                        <li class="nav-item"><a href="{{ url('client_supplier/supplier_list') }}" class="nav-link">Supplier Trade</span></a></li>
                                        <li class="nav-item"><a href="{{ url('client_supplier/supplier_list_nt') }}" class="nav-link">Supplier Non Trade</span></a></li>

                                    </ul>
                            </li>
                            <li class="nav-item"><a href="{{ url('employee/employee_list') }}" class="nav-link"><i class="icon-user-tie"></i><span>Employee</span></a></li>
                            <li class="nav-item nav-item-submenu">
                                <a href="#" class="nav-link"><i class="icon-office"></i><span>Company Info</span></a>
                                    <ul class="nav nav-group-sub">
                                        <li class="nav-item"><a href="{{ url('company/company_list') }}" class="nav-link"><i class="icon-cog5"></i><span>Company Setup</span></a></li>
                                        <li class="nav-item"><a href="{{ url('department/department_list') }}" class="nav-link"><i class="icon-cube2"></i><span>Department</span></a></li>
                                        <li class="nav-item"><a href="{{ url('market_segment/market_segment_list') }}" class="nav-link"><i class="icon-stats-bars2"></i><span>Market Segment</span></a></li>
                                    </ul>
                            </li>
                            <li class="nav-item nav-item-submenu">
                                <a href="#" class="nav-link"><i class="icon-server"></i><span>Bank Info</span></a>
                                    <ul class="nav nav-group-sub">
                                        <li class="nav-item"><a href="{{ url('bank/bank_list') }}" class="nav-link"><i class="icon-library2"></i><span>Bank</span></a></li>
                                    </ul>
                            </li>
                            <li class="nav-item nav-item-submenu">
                                <a href="#" class="nav-link"><i class="icon-pie-chart2"></i><span>Inventory</span></a>
                                    <ul class="nav nav-group-sub">
                                        <li class="nav-item"><a href="{{ url('warehouse/warehouse_list') }}" class="nav-link"><i class="icon-library2"></i><span>Warehouse</span></a></li>
                                        <li class="nav-item"><a href="{{ url('item/item_list') }}" class="nav-link"><i class="icon-cube4"></i><span>Product</span></a></li>
                                        <li class="nav-item"><a href="{{ url('product_division/product_division_list') }}" class="nav-link"><i class="icon-pie-chart2"></i><span>Product Division</span></a></li>
                                        <li class="nav-item"><a href="maps_google_markers.html" class="nav-link"><i class="icon-stats-bars4"></i><span>Fixed Assets</span></a></li>
                                    </ul>
                            </li>

                            <li class="nav-item"><a href="{{ url('employee/employee_list') }}" class="nav-link"><i class="icon-stack-text"></i><span>Checks on Hand</span></a></li>
                            </ul>
                    </li>
                    <li class="nav-item nav-item-submenu">
                        <a href="#" class="nav-link"><i class="icon-shield-check "></i><span>Security</span></a>
                        <ul class="nav nav-group-sub" data-submenu-title="Starter kit">
                            <li class="nav-item"><a href="{{ url('user/my_profile') }}" class="nav-link"><i class="icon-user"></i><span>Change Profile</span></a></li>
                        </ul>
                    </li>
                    <li class="nav-item nav-item-submenu">
                        <a href="#" class="nav-link"><i class="icon-hammer-wrench "></i><span>Tools</span></a>
                        <ul class="nav nav-group-sub" data-submenu-title="Starter kit">
                            <li class="nav-item"><a href="{{ url('audit_trail/log_list') }}" class="nav-link"><i class="icon-history"></i><span>Audit Trail</span></a></li>
                            <li class="nav-item"><a href="../seed/sidebar_none.html" class="nav-link"><i class="icon-book"></i><span>General ledger Interface</span></a></li>
                        </ul>
                    </li>
                     -->
                    <!-- /main -->


                    <!-- @if(Auth::user()->RoleID == 'SUPERUSER')

                        <li class="nav-item nav-item-submenu">
                            <a href="#" class="nav-link"><i class="icon-cube3"></i><span>Administrative Module</span></a>
                            <ul class="nav nav-group-sub" data-submenu-title="Starter kit">
                                <li class="nav-item"><a href="{{ url('user/user_list') }}" class="nav-link"><i class="icon-user"></i><span>Users</span></a></li>
                                <li class="nav-item"><a href="{{ url('user_role/urole_list') }}" class="nav-link"><i class="icon-cube4"></i><span>User Role</span></a></li>
                                <li class="nav-item"><a href="{{ url('user_access_level/uacl_list') }}" class="nav-link"><i class="icon-accessibility"></i><span>User Access Level</span></a></li>
                            </ul>
                        </li>

                    @endif -->

                    <!-- <li class="nav-item">
                        {{-- <a href="{{ route('process.index') }}" class="nav-link"> --}}
                            <i class="icon-lan2"></i>
                            <span>
                            Sales Order
                            </span>
                        </a>
                    </li> -->
                    <!-- /layout -->
                </ul>
            </div>
            <!-- /main navigation -->

        </div>
        <!-- /sidebar content -->

        </div>
        <!-- /main sidebar -->

