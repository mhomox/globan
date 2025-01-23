@extends('layouts.app')
@section('content') 
		<!-- Main content -->
		<div class="content-wrapper">
			<!-- Page header -->
			<div class="page-header page-header-light">
				<div class="page-header-content header-elements-md-inline">
					<div class="page-title d-flex">
						<h4><i class="icon-arrow-left52 mr-2"></i> <span class="font-weight-semibold">User</span> - Details</h4>
						<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
					</div>

					<div class="header-elements d-none">
						<div class="d-flex justify-content-center">
							<a href="#" class="btn btn-link btn-float text-default"><i class="icon-bars-alt text-primary"></i><span>Statistics</span></a>
							<a href="#" class="btn btn-link btn-float text-default"><i class="icon-calculator text-primary"></i> <span>Invoices</span></a>
							<a href="#" class="btn btn-link btn-float text-default"><i class="icon-calendar5 text-primary"></i> <span>Schedule</span></a>
						</div>
					</div>
				</div>

				<div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
					<div class="d-flex">
						<div class="breadcrumb">
							<a href="{{ route('home') }}" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Home</a>
							<a href="{{ url('user/user_list') }}" class="breadcrumb-item">Users</a>
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
			
				<!-- Invoice template -->
				<div class="card">
							<div class="card-body"><br><br>
								<div class="row container-fluid">
									<div class="col-md-8">
										<div class="mb-4">
											<input type="hidden" name="UserID" id="UserID" value="{{ $UserID }}" />
											<dl>
												<h4><b>User Record</b></h4>

												<?php
													$mi_val = '';
													if($MI)
														$mi_val = ' '.$MI;

													$fullname = $FirstName.$mi_val.' '.$LastName;
												?>

				                               	<dt>Full Name: {{ $fullname }}</dt>
												<dt>User ID: {{ $UserID }}</dt>
				                                <dt>Company: {{ $cCompanyName }}</dt>
                                                
                                             </dl>
			                            </div>
									</div>

									<div class="col-md-4">
										<div class="mb-4">
											<dl>
												<h5>&nbsp;</h5>
												<dt>Department: {{ $dept_desc }}</dt>
				                                <dt>Role: {{ $RoleID }}</dt>
                                                <dt>Email: {{ $email }}</dt>
				                            </dl>
			                            </div>
									</div>
			                    </div>
                        
                        <Legend></Legend><br/>	
						
			</div>
			<?php echo view('partials/card_footer'); ?>
					
			</div>
		</div>	
	
	<ul class="fab-menu fab-menu-fixed fab-menu-bottom-right" data-fab-toggle="click" data-fab-state="closed">
		<li>
			<a href="{{ url('user/print_user/'.$UserID) }}" target="_blank" class="fab-menu-btn btn bg-primary-400 btn-float rounded-round btn-icon">
			<i class="fab-icon-open icon-printer"></i>
		
			</a>
		</li>
	</ul>
@endsection