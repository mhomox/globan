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
        
                <form role="form" class="form-horizontal" enctype="multipart/form-data"  method="post" action="{{ URL::to('user/submit_update') }}" name="user_form" id="user_form">
                
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

                    if(!empty(session('success')))
                    {
                        echo '<div class="alert alert-info">
                                <button type="button" class="close" data-dismiss="alert">×</button>
                                '.session('success').'
                            </div>';    
                        
                    }

                    session(['success'=>'']);
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

                <input type="hidden" name="item" value="{{ $UserID }}" />
                <div id="inv_details_div"></div>

			<div class="card-header header-elements-inline">
				<h5 class="card-title">User Information</h5>
				<div class="header-elements">
                     <div class="text-right">
                         <button type="button" onclick="delResetDialog('<?php echo $UserID; ?>')" class="btn btn-md bg-blue-400 btn-labeled btn-labeled-left rounded-round"><b><i class="icon-paperplane"></i></b> Reset Password</button>
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
                            <input type="text" name="FirstName" class="form-control" title="First Name" autocomplete="off" value="{{ $FirstName }}" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Middle Initial</label>
                            <div class="col-lg-9">
                            <input type="text" name="MI" class="form-control" title="Middle Initial" autocomplete="off" value="{{ $MI }}" maxlength="1" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Last Name</label>
                            <div class="col-lg-9">
                            <input type="text" name="LastName" class="form-control" title="Last Name" autocomplete="off" value="{{ $LastName }}" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Address line 1</label>
                            <div class="col-lg-9">
                            <input type="text" name="address1" class="form-control" title="Address line 1" autocomplete="off" value="{{ $address1 }}" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Address line 2</label>
                            <div class="col-lg-9">
                            <input type="text" name="address2" class="form-control" title="Address line 1" autocomplete="off" value="{{ $address2 }}" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">City</label>
                            <div class="col-lg-9">
                            <input type="text" name="city" class="form-control" title="Address line 1" autocomplete="off" value="{{ $city }}" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Province</label>
                            <div class="col-lg-9">
                            <input type="text" name="province" class="form-control" title="Province" autocomplete="off" value="{{ $province }}" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Zip Code</label>
                            <div class="col-lg-9">
                            <input type="text" name="zipcode" class="form-control" title="Zip Code" autocomplete="off" value="{{ $zipcode }}" />
                            </div>
                        </div>

                    </div>
                    <div class="col-md-6">
                        
                        
                       
                       <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Phone</label>
                            <div class="col-lg-9">
                            <input type="text" name="phone" class="form-control" title="Address line 1" autocomplete="off" value="{{ $phone }}" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Company</label>
                            <div class="col-lg-9">
                                <select name="cCompanyID[]" class="form-control" title="Company" multiple>
                                    
                                    <option value=""></option>
                                    
                                    <?php
                                        $c = explode('|', $cCompanyID);
                                        foreach ($companies as $k => $v){
                                            $v = (array) $v;                                            
                                            echo '<option value="'.$v['cCompanyID'].'"';

                                            if(in_array($v['cCompanyID'],$c))
                                                echo ' selected ';

                                            echo '>'.$v['cCompanyName'].'</option>';

                                        }

                                    ?>

                                </select>                    

                            </div>

                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Department</label>
                            <div class="col-lg-9">
                                <select name="DeptID" class="form-control" title="Company">
                                    
                                    <option value=""></option>
                                    
                                    <?php

                                        foreach ($departments as $k => $v){
                                            $v = (array) $v;                                            
                                            echo '<option value="'.$v['dept_code'].'"';

                                            if($v['dept_code'] == $DeptID)
                                                echo ' selected ';

                                            echo '>'.$v['dept_desc'].'</option>';

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
                                            echo '<option value="'.$v['RoleID'].'"';

                                            if($RoleID == $v['RoleID'])
                                                echo ' selected ';

                                            echo '>'.$v['Description'].'</option>';

                                        }

                                    ?>

                                </select>                    

                            </div>

                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Email</label>
                            <div class="col-lg-9">
                                <input type="email" name="email" class="form-control" title="Email" autocomplete="off" value="{{ $email }}" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">User ID</label>
                            <div class="col-lg-9">
                            <input type="text" name="UserID" class="form-control" title="User ID" autocomplete="off" value="{{ $UserID }}" readonly />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label">Upload profile image</label>
                            <div class="col-lg-9">
                                <input type="file" name="photo" class="form-input-styled" data-fouc>
                                <span class="form-text text-muted">Accepted formats: gif, png, jpg. Max file size 2Mb</span>

                                <img src="{{ asset('users/'.$photo) }}" style="max-height: 50px">
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

<div class="modal fade" id="modal-reset" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title pull-left">Reset Password</h5>
                </div>
                <div class="modal-body">
                    
                    Are you sure you want to reset password for this user?
                    <input type="hidden" name="d_userID" id="d_userID" />
                </div>
                <div class="modal-footer">
                    <a type="button" class="btn btn-success" rel="0" id="del_details">Reset</a>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
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


