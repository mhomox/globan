$("#it_form").validate({
    rules: {
        cTranNo: {
            required: true
        },
        dDate: {
            required: true
        },
        cRemarks: {
            required: true
        }
    },
    messages: {
        cTranNo: {
            required: 'Transaction no is required'
        },
        dDate: {
            required: 'Date is required'
        },
        cRemarks: {
            required: 'Remarks is required'
        }

    },
    ignore: "",
    showErrors: function (errorMap, errorList) {
        var msg = ""
        $.each(errorMap, function(key, value) {
            msg += value + "<br/>";
        });
        $("#error_messages").html(msg);
        
        this.defaultShowErrors();  // default labels from errorPlacement
        if (this.numberOfInvalids() > 0) {
            $("#error_messages").show();
            $('#error_messages').addClass('alert alert-danger');
        } else {
            $('#error_messages').removeClass('alert alert-danger');
            $("#error_messages").hide();
            
        }
    },
    submitHandler: function(form){
       
        if($('input[name="in_details[]"]').length == 0 && $('input[name="out_details[]]').length == 0)
        {
            $("#error_messages").show();
            $('#error_messages').addClass('alert alert-danger');
            $('#error_messages').append('Details are required');
        }else{
            $("#error_messages").html('');
            $('#error_messages').removeClass('alert alert-danger'); 
            $("#error_messages").hide();
            
            var light_4 = form.closest('.card');
            
            $(light_4).block({
                message: '<i class="icon-spinner4 spinner"></i>',
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.8,
                    cursor: 'wait'
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: 'none'
                }
            });

            form.submit();
        }
    }
});

var transfer_in = $('#tbl_transfer_in').DataTable({
    "autoWidth": !1,
    "responsive": !0,
    "stripeClasses": [ 'odd-row', 'even-row' ],
    "footerCallback": function ( row, data, start, end, display ) {
            var api = this.api(), data;
 
            // Remove the formatting to get integer data for summation
            var intVal = function ( i ) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '')*1 :
                    typeof i === 'number' ?
                        i : 0;
            };
 
            // Total over all pages
            t1 = api
                .column( 4 )
                .data()
                .reduce( function (a, b) {
                    
                    return intVal(a) + intVal(b);
                }, 0 );

            // Total over this page
            pt1 = api
                .column( 4, { page: 'current'} )
                .data()
                .reduce( function (a, b) {

                    return intVal(a) + intVal(b);
                }, 0 );

         
            // Update footer
            // $( api.column( 4 ).footer() ).html(
            //     '$'+pt1 +' ( $'+ t1 +' total)'
            // );
          
        }
});

var transfer_out = $('#tbl_transfer_out').DataTable({
    "autoWidth": !1,
    "responsive": !0,
    "stripeClasses": [ 'odd-row', 'even-row' ],
    "footerCallback": function ( row, data, start, end, display ) {
            var api = this.api(), data;
 
            // Remove the formatting to get integer data for summation
            var intVal = function ( i ) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '')*1 :
                    typeof i === 'number' ?
                        i : 0;
            };
 
            // Total over all pages
            t1 = api
                .column( 4 )
                .data()
                .reduce( function (a, b) {
                    
                    return intVal(a) + intVal(b);
                }, 0 );

            // Total over this page
            pt1 = api
                .column( 4, { page: 'current'} )
                .data()
                .reduce( function (a, b) {

                    return intVal(a) + intVal(b);
                }, 0 );

         
            // Update footer
            // $( api.column( 4 ).footer() ).html(
            //     '$'+pt1 +' ( $'+ t1 +' total)'
            // );
          
        }
});

$('#cName2').change(function(){

    if($(this).val() != ''){

        $('#m_cWH').val($(this).find('option:selected').attr('rel'));
    }

});

function setModal(transfer){

    $('#transfer_action').text(transfer);
    $('#modal_val').val(transfer);

}

$('#modal-transfer-details').on('shown.bs.modal', function () {

    $('#form_transfer').validate({
        rules: {
            prod_id: {
                required: true
            },
            m_cDesc: {
                required: true
            },
            m_cLongDesc: {
                required: true
            },
            cName2: {
                required: true
            },
            m_nQty: {
                required: true
            }
        },
        messages: {
            prod_id: {
                required: "Product ID is required"
            },
            m_cDesc: {
                required: "Product Description is required"
            },
            m_cLongDesc: {
                required: "Long Description is required"
            },
            cName2: {
                required: "Warehouse is required"
            },
            m_nQty: {
                required: "Quantity is required"
            }
        },
        ignore: "",
        showErrors: function (errorMap, errorList) {
            var msg = ""
            $.each(errorMap, function(key, value) {
                msg += value + "<br/>";
            });
           
            $("#error_modal_messages").html(msg);
            
            this.defaultShowErrors();  // default labels from errorPlacement
            if (this.numberOfInvalids() > 0) {
                $("#error_modal_messages").show();
                $('#error_modal_messages').addClass('alert alert-danger');
            } else {
                $('#error_modal_messages').removeClass('alert alert-danger');
                $("#error_modal_messages").hide();
                
            }
        }
   });

});


$('#modal-item-list').on('shown.bs.modal', function () {

    var t = $('#tbl_products').DataTable({
        "autoWidth": !1,
        "responsive": !0,
        //"responsive": true,
        "processing": true,
        "serverSide": true,
        "paging": true,
        "searching": { "regex": true },
        "lengthMenu": [ [10, 25, 50, 100], [10, 25, 50, 100] ],
        "pageLength": 5,
        "ajax": {
            url : URL + '/inventory_transfer/get_products_list/',
            type : "POST"
        },
         "columns": [
            {
              "render": function ( data, type, full, meta ) {
                     
                     var actionStr = '';
                    
                    actionStr += '<a title="view" href="javascript:void(0)" onclick="setProdID(this)" data-item-no = "' + full.cItemNo + '" data-prod-unit = "' + full.cUnit     + '" data-prod-unit = "' + full.cUnit + '" data-prod-cost = "' + full.nStdCost + '" data-prod-desc = "' + full.cDesc + '" >' + full.cItemNo + '</a>';
                    
                     return actionStr;
                 },
            sortable: false,
            orderable: false 
            },
            { "data": "cDesc" }
        ],
        "order": [[ 0, "desc" ]],
        "destroy": true,
        "dom": '<"dataTables__top"lf>rt<"dataTables__bottom"ip><"clear">'
    });

    

});

$('#submit_product').click(function(){

    if($('#form_transfer').valid() == false) return;

    var cItemNo = $('#m_cItemNo').val();
    var rw_cDesc = $('#m_cDesc').val();
    var rw_cLongDesc = $('#m_cLongDesc').val();
    var cWH = $('#m_cWH').val();
    var cWHName = $('#cName2').val();
    var nQty = $('#m_nQty').val();
    var cUnit = $('#m_cUnit').val();
    var nCost = $('#m_nCost').val();
    var transfer = $('#modal_val').val();

    cDesc = rw_cDesc.replace(/["']/g, "");
    cLongDesc = rw_cLongDesc.replace(/["']/g, "");
    
    var inc = 0;
    if($("input[name='in_details[]']").length){

        inc = $("input[name='in_details[]']").length;
        inc++;

    }else{
        inc = 1;
    }

    var outc = 0;
    if($("input[name='out_details[]']").length){

        outc = $("input[name='out_details[]']").length;
        outc++;

    }else{
        outc = 1;
    }

    var it_details = cWH + '|' +
                    cItemNo + '|' +
                    cDesc + '|' +
                    cUnit + '|' +
                    nQty + '|' +
                    nCost;

    if(transfer == 'In'){
        $('#in_details_div').append('<input type="hidden" name="in_details[]" id="in_details_'+inc+'" value="' + it_details + '" />');

        transfer_in.row.add([
            cItemNo,
            cDesc,
            cLongDesc,
            cWHName,
            '<input type="text" class="bg-green-600 border-slate-600 border-5 nBalance'+inc+'" onKeyup="updateAmount('+inc+')" name="nQty['+cItemNo+'][in]" rel="'+inc+'" value="' + nQty + '" style="max-width:60px" />',
            '<a class="ml10" href="javascript:void(0)" id="delr'+inc+'" onClick="openDel(\''+inc+'\',\'In\')"><i class="icon-cross2 text-danger"></i></a>'
        ]).draw();
    }

    if(transfer == 'Out'){
        $('#out_details_div').append('<input type="hidden" name="out_details[]" id="out_details_'+outc+'" value="' + it_details + '" />');

        transfer_out.row.add([
            cItemNo,
            cDesc,
            cLongDesc,
            cWHName,
            '<input type="text" class="bg-green-600 border-slate-600 border-5 nBalance'+inc+'" onKeyup="updateAmount('+inc+')" name="nQty['+cItemNo+'][out]" rel="'+inc+'" value="' + nQty + '" style="max-width:60px" />',
            '<a class="ml10" href="javascript:void(0)" id="delro'+outc+'" onClick="openDel(\''+outc+'\',\'Out\')"><i class="icon-cross2 text-danger"></i></a>'
        ]).draw();
    }
    
    $('#modal-transfer-details').modal('hide');

    $('#form_transfer').get(0).reset();
});

function setProdID(e){
    $('#prod_id').val($(e).data('item-no'));
    $('#m_cItemNo').val($(e).data('item-no'));
    $('#m_cDesc').val($(e).data('prod-desc'));
    $('#m_cUnit').val($(e).data('prod-unit'));
    $('#m_nCost').val($(e).data('prod-cost'));

    $('#modal-item-list').modal('hide');
}

function openDel(r,n){
    var h = r + '|' + n;
    $('#del_details').attr('rel',h);
    $('#modal-delete').modal('show');
}

function delRow(e){

    var r = $(e).attr('rel');
    var raw = r.split('|');
    $('#inv_details_'+raw[0]).remove();

    if(raw[1] == 'In'){
        transfer_in.row($('#delr'+raw[0]).parents('tr')).remove().draw();
    }

    if(raw[1] == 'Out'){
        transfer_out.row($('#delro'+raw[0]).parents('tr')).remove().draw();
    }

    $('#modal-delete').modal('hide');
    
}