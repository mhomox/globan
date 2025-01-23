$("#ia_form").validate({
    rules: {
        cTranNo: {
            required: true
        },
        dDate: {
            required: true
        },
        cCategory: {
            required: true
        },
        cPDFrom: {
            required: true
        },
        cPDTo: {
            required: true
        },
        dCountDate: {
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
        cCategory: {
            required: 'Category is required'
        },
        cPDFrom: {
            required: 'Division From is required'
        },
        cPDTo: {
            required: 'Division To is required'
        },
        dCountDate: {
            required: 'Count Date is required'
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
       
        if($('.prod').length == 0)
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

$('#modal-ia-details').on('shown.bs.modal', function () {
      
   var t = $('#tbl_products').DataTable({
        "autoWidth": !1,
        "responsive": !0,
        "stripeClasses": [ 'odd-row', 'even-row' ],
        "processing": true,
        "serverSide": true,
        "paging": true,
        "searching": { "regex": true },
        "lengthMenu": [ [10, 25, 50, 100], [10, 25, 50, 100] ],
        "pageLength": 5,
        "ajax": {
            url : URL + '/inventory_adjustment/get_products_list',
            type : "POST"
        },
         "columns": [
            {
              "render": function ( data, type, full, meta ) {
                     
                    var actionStr = '';
                    var prod_desc = full.cDesc;

                    prod_desc = prod_desc.replace(/["']/g, "");
                    actionStr += '<input type="checkbox" class="prod_ids" name="prod_ids[]" value="' + full.cItemNo + '|' + prod_desc + '|' + full.nBalance + '|' + full.nStdCost + '" />';
                    
                    return actionStr;
                 },
            sortable: false,
            orderable: false 
            },
            { "data": "cItemNo" },
            { "data": "cDesc" },
            { "data": "nBalance" },
            { "data": "nAveCost" }
        ],
        "order": [[ 0, "desc" ]],
        "destroy": true,
        "dom": '<"dataTables__top"lf>rt<"dataTables__bottom"ip><"clear">'
    });

});

function selectAll(e){
    if($(e).is(':checked')){
        $('.prod_ids').prop('checked',true);
    }else{
        $('.prod_ids').prop('checked',false);
    }
}

var ia_t = $('#tbl_ia').DataTable({
    "autoWidth": !1,
    "responsive": !0
});

$('#submit_ia').click(function(){

    var rows_l = $('#tbl_ia tbody tr').length;
    rows_l--;

    $('.prod_ids:checkbox:checked').each(function () {

        //alert(rows_l);

        if(this.checked){

            var rw = $(this).val();
            var srw = rw.split("|");
            var cItemNo = srw[0];
            var cDesc = srw[1];
            cDesc = cDesc.replace(/["']/g, "");
            var nBalance = srw[2];
            var nStdCost = srw[3];
            
            ia_t.row.add([
                cItemNo + '<input type="hidden" class="prod" name="prod[' + rows_l + '][cItemNo]" value="' + cItemNo + '">',
                cDesc + '<input type="hidden" class="prod" name="prod[' + rows_l + '][cDesc]" value="' + cDesc + '">',
                nBalance + '<input type="hidden" class="prod" name="prod[' + rows_l + '][nBalance]" value="' + nBalance + '">',
                '<input type="text" style="background: transparent; max-width: 40px; border:none; " prod" name="prod[' + rows_l + '][nCount]" value="0" style="max-width:60px">',
                numberWithCommas(parseFloat(nStdCost).toFixed(2)) + '<input type="hidden" class="prod" name="prod[' + rows_l + '][nOldCost]" value="' + nStdCost + '">',
                '<input type="text" style="background: transparent; max-width: 60px; border:none; " name="prod[' + rows_l + '][nNewCost]" value="0" style="max-width:60px">',
                '<input type="text" style="background: transparent; max-width: 120px; border:none; "v" name="prod[' + rows_l + '][cRemarks]" value="">',
                '<a class="ml10" href="javascript:void(0)" id="delr'+rows_l+'" onClick="openDel('+rows_l+')"><i class="icon-cross2 text-danger"></i></a>'
            ]).draw();

            rows_l++;
        }
       
    });

    $('#modal-ia-details').modal('hide');

});

function openDel(r){
    $('#del_details').attr('rel',r);
    $('#modal-delete').modal('show');
}

function delRow(e){

    var r = $(e).attr('rel');
    $('#ia_details_'+r).remove();

    ia_t.row($('#delr'+r).parents('tr')).remove().draw();
    $('#modal-delete').modal('hide');
    
}