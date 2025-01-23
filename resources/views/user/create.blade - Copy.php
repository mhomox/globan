@extends('layouts.app')
@section('content') 
         
<link href="{{ asset('assets/libs/jquery-validation-1.19.1/demo/css/screen.css') }}" rel="stylesheet" type="text/css">

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
<!-- Content area -->
<!-- /page header -->
<!-- Content area -->
<div class="content"> 
    <div class="card">
        <div class="card-body">
        <?php   

            if(!empty(session('error')))
            {
                echo '<div class="alert alert-danger">
                        <button type="button" class="close" data-dismiss="alert">×</button>
                        '.session('error').'
                    </div>';    
                
            }

            session(['error'=>'']);
        ?>

        <fieldset class="gray_box">
        
                <form role="form" class="form-horizontal" enctype="multipart/form-data" method="post" action="{{ URL::to('user/submit_add') }}" name="user_form" id="user_form">
                
                @csrf

                
                
                <?php   

                    if(!empty(session('error')))
                    {
                        echo '<div class="alert alert-danger">
                                <button type="button" class="close" data-dismiss="alert">×</button>
                                '.session('error').'
                            </div>';    
                        
                    }

                    session(['error'=>'']);
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

                <input type="hidden" name="item" value="" />
                <div id="inv_details_div"></div>

			<div class="card-header header-elements-inline">
				<h5 class="card-title">User Information</h5>
				<div class="header-elements">
                     <div class="text-right">
                         <button type="submit" class="btn btn-md bg-indigo-400 btn-labeled btn-labeled-left rounded-round"><b><i class="icon-paperplane"></i></b> Submit Form</button>
					</div>
            	</div>
			</div>
			<div class="card-body">

            <input type="hidden" name="an" id="an" value="" />
			<div class="row">
				<div class="col-md-6">
					<fieldset>
						
                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">First Name</label>
                            <div class="col-lg-9">
                            <input type="text" name="FirstName" class="form-control" title="First Name" autocomplete="off" value="" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Middle Initial</label>
                            <div class="col-lg-9">
                            <input type="text" name="MI" class="form-control" title="Middle Initial" autocomplete="off" value="" maxlength="1" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Last Name</label>
                            <div class="col-lg-9">
                            <input type="text" name="LastName" class="form-control" title="Last Name" autocomplete="off" value="" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Address line 1</label>
                            <div class="col-lg-9">
                            <input type="text" name="address1" class="form-control" title="Address line 1" autocomplete="off" value="" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Address line 2</label>
                            <div class="col-lg-9">
                            <input type="text" name="address2" class="form-control" title="Address line 1" autocomplete="off" value="" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">City</label>
                            <div class="col-lg-9">
                            <input type="text" name="city" class="form-control" title="Address line 1" autocomplete="off" value="" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Province</label>
                            <div class="col-lg-9">
                            <input type="text" name="province" class="form-control" title="Address line 1" autocomplete="off" value="" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Zip Code</label>
                            <div class="col-lg-9">
                            <input type="text" name="zipcode" class="form-control" title="Zip Code" autocomplete="off" value="" />
                            </div>
                        </div>

                    </div>
                    <div class="col-md-6">

                       <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Phone</label>
                            <div class="col-lg-9">
                            <input type="text" name="phone" class="form-control" title="Address line 1" autocomplete="off" value="" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Company</label>
                            <div class="col-lg-9">
                                <select name="cCompanyID[]" class="form-control" title="Company" multiple>
                                    
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
                                <select name="DeptID" class="form-control" title="Department">
                                    
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
                                <select name="RoleID" class="form-control" title="Role">
                                    
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
                                <input type="email" name="email" class="form-control" title="Email" autocomplete="off" value=""/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">User ID</label>
                            <div class="col-lg-9">
                            <input type="text" name="UserID" class="form-control" title="User ID" autocomplete="off" value="" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Password</label>
                            <div class="col-lg-9">
                            <input type="password" name="Password2" class="form-control" title="Password" autocomplete="off" value="" />
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
           
			
			</div>
		</div>
		<!-- /2 columns form -->
    </form>
</div>

</div>

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


