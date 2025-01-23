@extends('layouts.app')
@section('content') 

<link href="{{ asset('assets/libs/jquery-validation-1.19.1/demo/css/screen.css') }}" rel="stylesheet" type="text/css">
		<!-- Main content -->
		<div class="content-wrapper">
			<!-- Page header -->
			<div class="page-header page-header-light">
				<div class="page-header-content header-elements-md-inline">
					<div class="page-title d-flex">
						<h4><i class="icon-arrow-left52 mr-2"></i> <span class="font-weight-semibold">User</span> - Details</h4>
						<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
					</div>

					<!-- <div class="header-elements d-none">
						<div class="d-flex justify-content-center">
							<a href="#" class="btn btn-link btn-float text-default"><i class="icon-bars-alt text-primary"></i><span>Statistics</span></a>
							<a href="#" class="btn btn-link btn-float text-default"><i class="icon-calculator text-primary"></i> <span>Invoices</span></a>
							<a href="#" class="btn btn-link btn-float text-default"><i class="icon-calendar5 text-primary"></i> <span>Schedule</span></a>
						</div>
					</div> -->
				</div>

				<div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
					<div class="d-flex">
						<div class="breadcrumb">
							<a href="{{ route('home') }}" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Home</a>
							<a href="{{ url('user/my_profile') }}" class="breadcrumb-item">Profile</a>
							<span class="breadcrumb-item active">Details</span>
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


		<!-- Content area -->
		<div class="content">

			<!-- Inner container -->
			<div class="d-md-flex align-items-md-start">

				<!-- Left sidebar component -->
				<div class="sidebar sidebar-light bg-transparent sidebar-component sidebar-component-left wmin-300 border-0 shadow-0 sidebar-expand-md">

					<!-- Sidebar content -->
					<div class="sidebar-content">

						<!-- Navigation -->
						<div class="card">
							<div class="card-body bg-success-400 text-center card-img-top" style="background-image: url({{ asset('assets/img/user_bg2.jpg') }}); height:100%; width:100%;">

								<div class="card-img-actions d-inline-block mb-3">
									<img class="img-fluid rounded-circle" src="{{ asset('users/'.(Auth::user()->photo)) }}" width="170" height="170" alt="">
								</div>

								<?php
									$fullname = $FirstName.' '.$LastName;
								?>
					    		<h6 class="font-weight-semibold mb-0 text-indigo">{{ $fullname }}</h6>
					    		<span class="d-block opacity-75 text-white">{{ $Role }}</span>

					    	</div>


							<div class="card-body p-0">
								<div class="card-body pb-0">
						<h4 class="font-weight-light mb-0">
							

							<span class="d-block">{{ date("M jS, Y") }}</span>
						</h4>
					</div>
								<ul class="nav nav-sidebar mb-2">
									<li class="nav-item-header">Navigation</li>
									<li class="nav-item">
										<a href="#profile" class="nav-link active" data-toggle="tab">
											<i class="icon-user"></i>
											 My profile
										</a>
									</li>
									
									
									
									<li class="nav-item-divider"></li>
									<!-- <li class="nav-item">
										<a href="{{ url('logout') }}" class="nav-link" data-toggle="tab">
											<i class="icon-switch2"></i>
											Logout
										</a>
									</li> -->

									<li class="nav-item">
										<a href="#change_password" class="nav-link" data-toggle="tab">
											<i class="icon-envelop2"></i>
											Change Password
											
										</a>
									</li>
								</ul>
							</div>
						</div>
						<!-- /navigation -->

					</div>
					<!-- /sidebar content -->

				</div>
				<!-- /left sidebar component -->


				<!-- Right content -->
				<div class="tab-content w-100">
					<div class="tab-pane fade active show" id="profile">

						<!-- Profile info -->
						<div class="card">
							<div class="card-header bg-indigo text-white d-flex justify-content-between">
									<span class="font-size-sm text-uppercase font-weight-semibold"><i class="icon-info22 mr-3  text-white"></i>Profile Information </span>
								</div>

							<div class="card-body">
								<form role="form" class="form-horizontal" enctype="multipart/form-data" method="post" action="{{ URL::to('user/submit_profile') }}" name="profile_form" id="profile_form">
                
			                @csrf

			                <?php   
			                    $n = 0;
			                    if(!empty(session('success')))
			                        $n = 1;

			                    echo '<input type="hidden" name="success" id="success" value="'.$n.'" />';
			                    echo '<input type="hidden" id="message" value="'.session('success').'" />';
			                    session(['success'=>'']);
			                ?>

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

			                    <input type="hidden" name="an" value="">
									<div class="form-group">
										<div class="row">
											<div class="col-md-6">
												<label>First Name</label>
												<input type="text" name="FirstName" value="{{ $FirstName }}" class="form-control">
											</div>
											<div class="col-md-6">
												<label>Last Name</label>
												<input type="text" name="LastName" class="form-control" value="{{ $LastName }}">
											</div>
										</div>
									</div>

									<div class="form-group">
										<div class="row">
											<div class="col-md-4">
												<label>Company</label>
												<input type="text" name="" value="<?php echo (session('cCompanyName')); ?>" class="form-control" readonly>
											</div>

											<div class="col-md-4">
												<label>Department</label>
												<input type="text" name="" value="{{ $DeptID }}" class="form-control" readonly>
											</div>
											<div class="col-md-4">
												<label>Role</label>
												<input type="text" name="" value="{{ $Role }}" class="form-control" readonly>
											</div>
										</div>
									</div>

									<div class="form-group">
										<div class="row">
											<div class="col-md-6">
												<label>Address line 1</label>
												<input type="text" name="address1" value="{{ $address1 }}" class="form-control">
											</div>
											<div class="col-md-6">
												<label>Address line 2</label>
												<input type="text" name="address2" value="{{ $address2 }}" class="form-control">
											</div>
										</div>
									</div>

									<div class="form-group">
										<div class="row">
											<div class="col-md-4">
												<label>City</label>
												<input type="text" name="city" value="{{ $city }}" class="form-control">
											</div>
											<div class="col-md-4">
												<label>State/Province</label>
												<input type="text" name="province" value="{{ $province }}" class="form-control">
											</div>
											<div class="col-md-4">
												<label>ZIP code</label>
												<input type="text" name="zipcode" value="{{ $zipcode }}" class="form-control">
											</div>
										</div>
									</div>

									<div class="form-group">
			                        	<div class="row">
			                        		<div class="col-md-6">
												<label>Phone #</label>
												<input type="text" name="phone" value="{{ $phone }}" class="form-control">
												<span class="form-text text-muted">Format: 09250000000</span>
			                        		</div>

											<div class="col-md-6">
												<label>Email</label>
												<input type="text" name="email" value="{{ $email }}" class="form-control">
											</div>
			                        	</div>

			                        <div class="form-group">
			                        	<div class="row">
			                        		
											<div class="col-md-6">
												<label>Upload profile image</label>
			                                    <input type="file" name="photo" class="form-input-styled" data-fouc>
			                                    <span class="form-text text-muted">Accepted formats: gif, png, jpg. Max file size 2Mb</span>
											</div>
			                        	</div>
			                        </div>

			                        <div class="text-right">
			                        	<button type="submit" class="btn btn-success btn-lg">Update Profile</button>
			                        </div>
								</form>
							</div>
						</div>
						
					</div>
				    </div>

				    <div class="tab-pane fade" id="change_password">

						<div class="card">
							<div class="card-header bg-indigo text-white d-flex justify-content-between">
									<span class="font-size-sm text-uppercase font-weight-semibold"><i class="icon-info22 mr-3  text-white"></i>Change Password </span>
								</div>

							<div class="card-body">
								<form role="form" class="form-horizontal" enctype="multipart/form-data" method="post" action="{{ URL::to('user/submit_change_password') }}" name="password_form" id="password_form">
                
			                	@csrf

				                <?php   
				                    $n = 0;
				                    if(!empty(session('success')))
				                        $n = 1;

				                    echo '<input type="hidden" name="success" id="success" value="'.$n.'" />';
				                    echo '<input type="hidden" id="message" value="'.session('success').'" />';
				                    session(['success'=>'']);
				                ?>

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
			                    <input type="hidden" name="item" value="{{ $UserID }}">
									<div class="form-group">
										<div class="row">
											<div class="col-md-6">
												<label>Username</label>
												<input type="text" value="{{ $UserID }}" readonly="readonly" class="form-control">
											</div>
											
										</div>
									</div>

									<div class="form-group">
										<div class="row">
											<div class="col-md-6">
												<label>New password</label>
												<input type="password" name="password" placeholder="Enter new password" class="form-control">
											</div>

											<div class="col-md-6">
												<label>Repeat password</label>
												<input type="password" name="confirm_password" placeholder="Repeat new password" class="form-control">
											</div>
										</div>
									</div>

			                        <div class="text-right">
			                        	<button type="submit" class="btn btn-primary">Save changes</button>
			                        </div>

		                        </form>
							</div>
						</div>

			    	</div>

			    	
				</div>
				<!-- /right content -->

			</div>
			<!-- /inner container -->

		</div>


@push('scripts')
	<script src="{{ asset('global_assets/js/demo_pages/user_pages_profile_tabbed.js') }}"></script>
	<script src="{{ asset('global_assets/js/plugins/forms/styling/uniform.min.js') }}"></script>

	<script src="{{ asset('assets/libs/jquery-validation-1.19.1/dist/jquery.validate.min.js') }}"></script>
    <script src="{{ asset('assets/libs/jquery-validation-1.19.1/dist/additional-methods.js') }}"></script>

	<script src="{{ asset('assets/js/profile.js') }}"></script>
@endpush('scripts')
@endsection