@extends('layouts.app')
@section('content')
		<!-- Main content -->
		<div class="content-wrapper">
			<!-- Page header -->
			<div class="page-header page-header-light">
				<div class="page-header-content header-elements-md-inline">
					<div class="page-title d-flex">
						<h4><i class="icon-arrow-left52 mr-2"></i> <span class="font-weight-semibold">User - </span>Upload Template</h4>
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
							<a href="index.html" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Home</a>
							<a href="{{ url('user/user_list') }}" class="breadcrumb-item">User</a>
							<span class="breadcrumb-item active">Upload Template</span>
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

            <div class="col-sm12">
			<!-- /page header -->	 
				<?php	
					$n = 0;
					if(!empty(session('success')))
						$n = 1;

					echo '<input type="hidden" name="success" id="success" value="'.$n.'" />';
					echo '<input type="hidden" id="message" value="'.session('success').'" />';

					session(['success'=>'']);
				?></div>

			<!-- Content area -->
			<div class="content">

				<!-- Bootstrap file input -->
				<div class="card">
					<div class="card-header header-elements-inline">
						<h5 class="panel-title">Upload file</h5>
						<div class="header-elements">
							<div class="list-icons">
		                		<a class="list-icons-item" data-action="collapse"></a>
		                		<a class="list-icons-item" data-action="reload"></a>
		                		<a class="list-icons-item" data-action="remove"></a>
		                	</div>
	                	</div>
					</div>

					<div class="card-body">
						
                    <form method="post" enctype="multipart/form-data" action="{{ url('user/upload_user/import') }}">
                        @csrf
							<div class="form-group row">
								<label class="col-lg-2 col-form-label font-weight-semibold">Single file upload:</label>
								<div class="col-lg-10">
									<input type="file" name="import_file" class="file-input" data-fouc>
									<span class="form-text text-muted">Automatically convert a file input to a bootstrap file input widget by setting its class as <code>file-input</code>.</span>
								</div>
							</div>
					</form>
					</div>
				</div>
				<!-- /bootstrap file input -->

			</div>
			<!-- /content area -->


@push('scripts')
    <!-- Theme JS files -->
	<script src="{{ asset('global_assets/js/plugins/uploaders/fileinput/plugins/purify.min.js') }}"></script>
	<script src="{{ asset('global_assets/js/plugins/uploaders/fileinput/plugins/sortable.min.js') }}"></script>
	<script src="{{ asset('global_assets/js/plugins/uploaders/fileinput/fileinput.min.js') }}"></script>
	<script src="{{ asset('global_assets/js/demo_pages/uploader_bootstrap.js') }}"></script>
    <script src="{{ asset('global_assets/js/plugins/notifications/jgrowl.min.js') }}"></script>
	<script src="{{ asset('global_assets/js/plugins/notifications/noty.min.js') }}"></script>

    <script type="text/javascript">
        $(function(){
            
            if($('#success').val() == 1){
                new Noty({
                    layout: 'bottomRight',
                    theme: 'alert-styled-left bg-success',
                    text: $('#message').val(),
                    type: 'success',
                    progressBar: false,
                    closeWith: ['button']
                }).show();
            }
        });
    </script>
@endpush('scripts')
@endsection