@extends('layouts.app')
@section('content') 
<!-- Main content -->
<div class="content-wrapper">
    <!-- Page header -->
    <div class="page-header page-header-light">
        <div class="page-header-content header-elements-md-inline">
            <div class="page-title d-flex">
                <h4><i class="icon-arrow-left52 mr-2"></i> <span class="font-weight-semibold">User </span> - New Record</h4>
                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
            </div>
        </div>
        <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
            <div class="d-flex">
                <div class="breadcrumb">
                      <a href="{{ route('home') }}" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Home</a>
                      <a href="{{ url('user/user_list') }}" class="breadcrumb-item">User</a>
                </div>
                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
            </div>
            <div class="header-elements d-none">
                <div class="breadcrumb justify-content-center">
                    <a href="#" class="breadcrumb-elements-item"><i class="icon-comment-discussion mr-2"></i> Support</a>
                    <div class="breadcrumb-elements-item dropdown p-0">
                        <a href="#" class="breadcrumb-elements-item dropdown-toggle" data-toggle="dropdown">
                            <i class="icon-gear mr-2"></i>Settings</a>
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
         <?php   
               if(!empty(session('error')))
               {
                echo '<div class="alert alert-info">
                <button type="button" class="close" data-dismiss="alert">×</button>
                '.session('error').'
                </div>';    

            }

            session(['error'=>'']);
            ?>

            <div id="error_messages"></div>

            @if ($errors->any())
            <div class="alert alert-info">
                <ul>
                    @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
            @endif

        <!-- Content area -->
        <div class="content">

            <form role="form" class="form-horizontal" enctype="multipart/form-data" method="post" action="{{ URL::to('user/submit_add') }}" name="user_form" id="user_form">
                
               @csrf

              
            <!-- 2 columns form -->
            <div class="card">
               <div class="card-header header-elements-inline">
                   <h5 class="card-title">User Information</h5>
                   <div class="header-elements">
                       <div class="list-icons">
                        <a class="list-icons-item" data-action="reload"></a>
                    </div>
                </div>
            </div>
            <div class="card-body">
             <div class="row">
                <div class="col-md-6">
                   <fieldset>
                      <legend class="font-weight-semibold"><i class="icon-reading text-primary mr-2"></i></i> User details</legend>

                       <div class="form-group row">
                            <label class="col-lg-3 col-form-label">First Name</label>
                            <div class="col-lg-9">
                            <input type="text" placeholder="Enter firstname.."  name="FirstName" class="form-control" title="First Name" autocomplete="off" value="" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Middle Initial</label>
                            <div class="col-lg-9">
                            <input type="text" name="MI" placeholder="Enter middle initial.." class="form-control" title="Middle Initial" autocomplete="off" value="" maxlength="1" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Last Name</label>
                            <div class="col-lg-9">
                            <input type="text" name="LastName" placeholder="Enter Last Name" class="form-control" title="Last Name" autocomplete="off" value="" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Address line 1</label>
                            <div class="col-lg-9">
                            <input type="text" name="address1" placeholder="Enter your address1 here.." class="form-control" title="Address line 1" autocomplete="off" value="" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Address line 2</label>
                            <div class="col-lg-9">
                            <input type="text" name="address2" class="form-control"  placeholder="Enter your address2 here.."title="Address line 1" autocomplete="off" value="" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">City</label>
                            <div class="col-lg-9">
                            <input type="text" name="city" class="form-control" placeholder="Enter City" title="Address line 1" autocomplete="off" value="" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Province</label>
                            <div class="col-lg-9">
                            <input type="text" name="province" class="form-control"  placeholder="Enter Province" title="Address line 1" autocomplete="off" value="" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Zip Code</label>
                            <div class="col-lg-9">
                            <input type="text" name="zipcode" class="form-control"  title="Zip Code" autocomplete="off"  placeholder="Enter your zip code here.." value="" />
                            </div>
                        </div>
                  

</fieldset>
</div>

<div class="col-md-6">
   <fieldset>
      <legend class="font-weight-semibold"><i class="icon-info22 text-success mr-2"></i>User Account</legend>


            
 <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Phone</label>
                            <div class="col-lg-9">
                            <input type="text" name="phone" placeholder="Enter phone" class="form-control" title="Address line 1" autocomplete="off" value="" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Company</label>
                            <div class="col-lg-9">
                                <select data-placeholder="Select Company"  class="form-control form-control-select2" name="cCompanyID[]" class="form-control" title="Company" multiple>
                                    
                                    <option value=""></option>
                                    
                                    <?php

                                        foreach ($companies as $k => $v){
                                            $v = (array) $v;                                            
                                            echo '<option value="'.$v['cCompanyID'].'">'.$v['cCompanyName'].'</option>';

                                        }

                                    ?>

                                </select>                    

                            </div>

                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Department</label>
                            <div class="col-lg-9">
                                <select data-placeholder="Select Department" name="DeptID" class="form-control form-control-select2" title="Department">
                                    
                                    <option value=""></option>
                                    
                                    <?php

                                        foreach ($departments as $k => $v){
                                            $v = (array) $v;                                            
                                            echo '<option value="'.$v['dept_code'].'">'.$v['dept_desc'].'</option>';

                                        }

                                    ?>

                                </select>                    

                            </div>

                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Role</label>
                            <div class="col-lg-9">
                                <select data-placeholder="Select Role" name="RoleID" class="form-control form-control-select2" title="Role">
                                    
                                    <option value=""></option>
                                    
                                    <?php

                                        foreach ($user_roles as $k => $v){
                                            $v = (array) $v;                                            
                                            echo '<option value="'.$v['RoleID'].'">'.$v['Description'].'</option>';

                                        }

                                    ?>

                                </select>                    

                            </div>

                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Email</label>
                            <div class="col-lg-9">
                                <input type="email" name="email" class="form-control" title="Email" placeholder="Enter email" autocomplete="off" value=""/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">User ID</label>
                            <div class="col-lg-9">
                            <input type="text" name="UserID"  placeholder="Enter your user id"class="form-control" title="User ID" autocomplete="off" value="" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Password</label>
                            <div class="col-lg-9">
                            <input type="password" name="Password2" class="form-control" placeholder="Enter your password " title="Password" autocomplete="off" value="" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Upload profile image</label>
                            <div class="col-lg-9">
                                <input type="file" name="photo" class="form-input-styled" data-fouc>
                                <span class="form-text text-muted">Accepted formats: gif, png, jpg. Max file size 2Mb</span>
                            </div>
                        </div>

</fieldset>
</div>
</div>

<div class="text-right">
    <button type="submit" class="btn btn-primary">Save New User <i class="icon-paperplane ml-2"></i></button>
</div>
</form>
</div>
</div>
<!-- /2 columns form -->

</div>
<!-- /content area -->

@push('scripts')
    <script src="{{ asset('global_assets/js/plugins/tables/datatables/datatables.min.js') }}"></script>
    <script src="{{ asset('global_assets/js/plugins/tables/datatables/extensions/responsive.min.js') }}"></script>

    <script src="{{ asset('global_assets/js/plugins/forms/selects/select2.min.js') }}"></script>
    
    <script src="{{ asset('assets/libs/jquery-validation-1.19.1/dist/jquery.validate.min.js') }}"></script>
    <script src="{{ asset('assets/libs/jquery-validation-1.19.1/dist/additional-methods.js') }}"></script>
    
    <script src="{{ asset('global_assets/js/plugins/forms/styling/uniform.min.js') }}"></script>

    <script src="{{ asset('global_assets/js/demo_pages/form_layouts.js') }}"></script>

    
    <script src="{{ asset('assets/js/user.js') }}"></script>

@endpush('scripts')
@endsection


