@extends('layouts.app')
@section('content')
<!-- Main content -->
<div class="content-wrapper">
	<!-- Page header -->
	<div class="page-header page-header-light">
		<div class="page-header-content header-elements-md-inline">
			<div class="page-title d-flex">
				<h4><i class="icon-arrow-left52 mr-2"></i> <span class="font-weight-semibold">Users</span> - List <i class="icon-user mr-3 icon-2x text-success"></i></h4>
				<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
			</div>
			<div class="header-elements d-none">
				<div class="d-flex justify-content-center">
					<a href="{{ url('user/upload_user') }}" class="btn btn-link btn-float text-default"><i class="icon-upload  text-primary"></i> <span>Upload</span></a>
					<a href="{{ URL::to('user/exportTemplateUser') }}" class="btn btn-link btn-float text-default"><i class="icon-file-excel  text-success"></i> <span>Export Upload Template</span></a>
					<a href="{{ URL::to('user/exportDataUser/All') }}" class="btn btn-link btn-float text-default" id="export_table"><i class="icon-file-excel  text-success"></i> <span>Export Table</span></a>
				</div>
			</div>
		</div>
		<div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
			<div class="d-flex">
				<div class="breadcrumb">
					<a href="{{ route('home') }}" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Home</a>
					<a href="{{ url('user/user_list') }}" class="breadcrumb-item">Users</a>
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
	<div class="col-sm12">
		<!-- /page header -->	 
		<?php	
		$n = 0;
		if(!empty(session('success')))
			$n = 1;

		echo '<input type="hidden" name="success" id="success" value="'.$n.'" />';
		echo '<input type="hidden" id="message" value="'.session('success').'" />';

		session(['success'=>'']);
		?>
	</div>
	<!-- Content area -->
	<div class="content">
			<!-- Basic responsive configuration -->
		<div class="card">
			<div class="tab-content">
				<div class="tab-pane active fade show" id="all_sales_order" role="tabpanel">
					<div class="table-responsive">
						<table id="tbl_users" class="table datatable-responsive table-bordered">
							<thead>	
								<tr>
									<th>Date Created</th>
				                    <th>UserID</th>
									<th>First Name</th>
									<th>Last Name</th>
									<th>Role</th>
									<th>Department</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>

							</tbody>
						</table>
						<!-- /.table-responsive -->
					</div>
				</div>
			</div>
		</div>	
	<!-- /content area --> 
</div>
<ul class="fab-menu fab-menu-fixed fab-menu-bottom-right" data-fab-toggle="click" data-fab-state="closed">
	<li>
		<a href="{{ url('user/add') }}" class="fab-menu-btn btn bg-success-400 btn-float rounded-round btn-icon">
		<i class="fab-icon-open icon-plus3"></i>
		<i class="fab-icon-close icon-cross2"></i>
		</a>
	</li>
</ul>
<div id="delete_confirm_div" style="display:none;text-align:center" title="Delete Record">
		Are you sure you want to delete this record?<br/><br/>
		<div class="clear"></div>
		<a href="javascript:void(0)" id = "select_yes" class="btn btn-success" />Yes</a>
		<a href="javascript:void(0)" id = "select_no" class="btn btn-warning" />No</a>
	</div>

	<div class="modal fade" id="modal-delete" tabindex="-1">
	    <div class="modal-dialog">
	        <div class="modal-content">
	            <div class="modal-header">
	                <h5 class="modal-title pull-left">Delete Item</h5>
	            </div>
	            <div class="modal-body">
	                
	                Are you sure you want to delete this record?
	                <input type="hidden" name="d_userID" id="d_userID" />
	            </div>
	            <div class="modal-footer">
	                <a type="button" class="btn btn-success" rel="0" id="del_details">Delete</a>
	                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
	            </div>
	        </div>
	    </div>
	</div>
    @push('scripts')
     <!-- Theme JS files -->
	<script src="{{ asset('global_assets/js/plugins/tables/datatables/datatables.min.js') }}"></script>
	<script src="{{ asset('global_assets/js/plugins/tables/datatables/extensions/responsive.min.js') }}"></script>
	<script src="{{ asset('global_assets/js/plugins/forms/selects/select2.min.js') }}"></script>
	<script src="{{ asset('global_assets/js/demo_pages/datatables_responsive.js') }}"></script>
	<!-- /theme JS files -->

	<script type="text/javascript">

		$(function(){
			
			if($('#success').val() == 1){
				new Noty({
		            theme: ' alert alert-success alert-styled-left p-0 bg-white',
		            text: $('#message').val(),
		            type: 'success',
		            progressBar: false,
		            closeWith: ['button']
		        }).show();
			}
			
			$('#select_no').click(function(){
				$('#delete_confirm_div').dialog('close');			
			});
			
			var t = $('#tbl_users').DataTable({
				"autoWidth": !1,
		        "responsive": !0,
		        "stripeClasses": [ 'odd-row', 'even-row' ],
				"processing": true,
		        "serverSide": true,
				"paging": true,
				"searching": { "regex": true },
				"lengthMenu": [ [10, 25, 50, 100], [10, 25, 50, 100] ],
				"pageLength": 10,
		        "ajax": {
					url : "{{ URL::to('/user/get_list') }}",
					type : "POST"
				},
				 "columns": [
				 	{ "data": "created_atD" },
					{ "data": "UserID" },
					{ "data": "FirstName" },
					{ "data": "LastName" },
					{ "data": "RoleID" },
					{ "data": "DeptID" },					
					{
					"render": function ( data, type, full, meta ) {
							
							var actionStr = '<td class="text-center"><div class="list-icons"><div class="dropdown"><a href="#" class="list-icons-item" data-toggle="dropdown"><i class="icon-menu9"></i></a><div class="dropdown-menu dropdown-menu-right"><a href="{{ URL::to('/user/view_user') }}/' + full.UserID + '" class="dropdown-item"><i class="icon-folder-open  marginr10 text-dark"></i> View</a><a href="{{ URL::to('/user/edit_user') }}/' + full.UserID + '" class="dropdown-item"><i class="icon-database-edit2 fa_20 marginr10 text-dark"></i> Edit</a><a href="javascript:void(0)" onClick="delARDialog(\''+full.UserID + '\')" class="dropdown-item"><i class="icon-trash fa_20 marginr10 text-dark"></i> Delete</a></div></div></div></td>';

							return actionStr;

						},
					sortable: false,
					orderable: false 
					}
				],
				"order": [[ 1, "desc" ]],
				"destroy": true,
				"dom": '<"datatable-header"fl><t><"datatable-footer"ip>',
						language: {
						search: '<span>Search:</span> _INPUT_',
						// searchPlaceholder: 'Enter UserID#...',
						lengthMenu: '<span>Show:</span> _MENU_',
						paginate: { 'first': 'First', 'last': 'Last', 'next': $('html').attr('dir') == 'rtl' ? '&larr;' : '&rarr;', 'previous': $('html').attr('dir') == 'rtl' ? '&rarr;' : '&larr;' }
					},
				"initComplete": function(a, b) {
					$('#tbl_users_filter input[type="search"]').keyup(function(){
						var lnk = URL + '/user/exportDataUser/' + encodeURI($(this).val()); 

						$('#export_table').attr('href',lnk);
					});
            	}
			});
			
		});	

		function delARDialog(UserID)
		{
			$('#del_details').attr('href',"{{ URL::to('/user/delete_user') }}/" + UserID);

			$('#d_UserID').val(UserID);

			$('#modal-delete').modal('show');
		}

	</script>

    @endpush('scripts')
@endsection
