@extends('layouts.print')
@section('content') 

					<div class="card">
						<div class="card-header header-elements-md-inline">
							
                        </div>
						<div class="card-body">
							<div class="row container-fluid">
								<div class="col-md-8">
									<div class="mb-4">
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
                                         
                                            <dt>Department: {{ $dept_desc }}</dt>
                                            <dt>Role: {{ $RoleID }}</dt>
                                            <dt>Email: {{ $email }}</dt>
                                        </dl>
		                            </div>
								</div>
		                    </div>
                    
		</div>
		@include('partials.card_footer')

		
</div>

    <!-- Theme JS files -->
	<script src="{{ asset('global_assets/js/plugins/editors/summernote/summernote.min.js' ) }}"></script>
	<script src="{{ asset('global_assets/js/plugins/extensions/jquery_ui/widgets.min.js') }}"></script>
	<script src="{{ asset('global_assets/js/demo_pages/task_manager_detailed.js') }}"></script>
	<!-- /theme JS files -->
	<script type="text/javascript">
        function print_page(){
            $('#print_btn').hide();
            window.print();
        }
    </script>

    <style media="print">
     @page {
      size: auto;
      margin: 0;
           }
    </style>
@endsection