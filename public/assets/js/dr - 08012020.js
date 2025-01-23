$("#dr_form").validate({
    rules: {
        cDRNo: {
            required: true
        },
        dDate: {
            required: true
        },
        cName: {
            required: true
        },
        cCode: {
            required: true
        },
        // cPDDesc: {
        //     required: true
        // },
        // cPDCode: {
        //     required: true
        // },
        // cETRDNo: {
        //     required: true
        // },
        cRemarks: {
            required: true
        },
        cType: {
            required: true
        },
        cDocType: {
            required: true
        }
        // dReceived: {
        //     required: true
        // },
        // dReturned: {
        //     required: true
        // },
        // cInvNo: {
        //     required: true
        // },
        // cGatePassNo: {
        //     required: true
        // }
    },
    messages: {
        cDRNo: {
            required: 'Transaction no is required'
        },
        dDate: {
            required: 'Date is required'
        },
        cName: {
            required: 'Customer is required'
        },
        cCode: {
            required: 'Customer Code is required'
        },
        // cPDDesc: {
        //     required: 'Product Division is required'
        // },
        // cPDCode: {
        //     required: 'Product Division Code is required'
        // },
        // cETRDNo: {
        //     required: 'ETRD No is required'
        // },
        cRemarks: {
            required: 'Remarks is required'
        },
        cType: {
            required: 'DR Type is required'
        },
        cDocType: {
            required: 'Doc Type is required'
        }
        // dReceived: {
        //     required: 'Received Date is required'
        // },
        // dReturned: {
        //     required: 'Return Date is required'
        // },
        // cInvNo: {
        //     required: 'Invoice No is required'
        // },
        // cGatePassNo: {
        //     required: 'Gatepass No is required'
        // }

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
       
        if($('input[name="dr_details[]"]').length == 0)
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

var so_t = $('#tbl_sales_order_details').DataTable({
    "autoWidth": !1,
    "responsive": !0,
    "stripeClasses": [ 'odd-row', 'even-row' ],
    "columnDefs": [
        {
        "targets": [6,7],
        "render":function ( data, type, row, meta ) {
                data = parseFloat(data);
                return numberWithCommas(data.toFixed(2));
        }
        
    }],
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
            // t1 = api
            //     .column( 5 )
            //     .data()
            //     .reduce( function (a, b) {
                    
            //     if(!a) a = 0;
            //     if(!b) b = 0;

            //     a = a.toString().replace(/,/g, '');
            //     b = b.toString().replace(/,/g, '');

            //     return parseFloat(a) + parseFloat(b);
            //     }, 0 );

            t2 = api
                .column( 6 )
                .data()
                .reduce( function (a, b) {
                    
                if(!a) a = 0;
                if(!b) b = 0;

                a = a.toString().replace(/,/g, '');
                b = b.toString().replace(/,/g, '');

                return parseFloat(a) + parseFloat(b);
                }, 0 );

            t3 = api
                .column( 7 )
                .data()
                .reduce( function (a, b) {
                    
                if(!a) a = 0;
                if(!b) b = 0;

                a = a.toString().replace(/,/g, '');
                b = b.toString().replace(/,/g, '');

                return parseFloat(a) + parseFloat(b);
                }, 0 );

        
 
            // Total over this page
            // pt1 = api
            //     .column( 5, { page: 'current'} )
            //     .data()
            //     .reduce( function (a, b) {

            //     if(!a) a = 0;
            //     if(!b) b = 0;

            //     a = a.toString().replace(/,/g, '');
            //     b = b.toString().replace(/,/g, '');

            //     return parseFloat(a) + parseFloat(b);
            //     }, 0 );

            pt2 = api
                .column( 6, { page: 'current'} )
                .data()
                .reduce( function (a, b) {

                if(!a) a = 0;
                if(!b) b = 0;

                a = a.toString().replace(/,/g, '');
                b = b.toString().replace(/,/g, '');

                return parseFloat(a) + parseFloat(b);
                }, 0 );

            pt3 = api
                .column( 7, { page: 'current'} )
                .data()
                .reduce( function (a, b) {

                if(!a) a = 0;
                if(!b) b = 0;

                a = a.toString().replace(/,/g, '');
                b = b.toString().replace(/,/g, '');

                return parseFloat(a) + parseFloat(b);
                }, 0 );

         
 
            // // Update footer
            // $( api.column( 5 ).footer() ).html(
            //     '$'+pt1 +' ( $'+ t1 +' total)'
            // );

            // $( api.column( 6 ).footer() ).html(
            //     '$'+pt2 +' ( $'+ t2 +' total)'
            // );

            // $( api.column( 7 ).footer() ).html(
            //     '$'+pt3 +' ( $'+ t3 +' total)'
            // );

            // Update footer
            // $( api.column( 5 ).footer() ).html(
            //     '₱'+numberWithCommas(pt1.toFixed(2)) +' ( ₱'+ numberWithCommas(t1.toFixed(2)) +' total)'
            // );

            $( api.column( 6 ).footer() ).html(
                '₱'+numberWithCommas(pt2.toFixed(2)) +' ( ₱'+ numberWithCommas(t2.toFixed(2)) +' total)'
            );

            $( api.column( 7 ).footer() ).html(
                '₱'+numberWithCommas(pt3.toFixed(2)) +' ( ₱'+ numberWithCommas(t3.toFixed(2)) +' total)'
            );

          
        }
});

// $('#tbl_sales_order_details').on( 'click', 'tbody td:nth-child(5)', function (e) {
//         editor.inline( this );
//     } );

$('#cName').change(function(){

    if($(this).val() != ''){

        $('#cCode').val($(this).find('option:selected').attr('rel'));

        //$('#tbl_sales_order_details').find('tbody tr').remove();
        so_t.clear().draw();
    }

});

$('#cPDDesc').change(function(){

    if($(this).val() != ''){

        $('#cPDCode').val($(this).find('option:selected').attr('rel'));
    }

});

$('#modal-dr-details').on('shown.bs.modal', function () {

   if($('#cName').val() == ''){
        var html = '<div class="alert alert-danger">Please populate customer field first</div>';
        $('#no_customer_alert').html(html);

        $('#so_nos').prop('disabled', true);
   }else{
        $('#no_customer_alert').html('');
        $('#so_nos').prop('disabled', false);

        $.ajax({
            url: URL + '/delivery_receipt/get_so_nos',
            type: "POST",
            data:{cCode: $('#cCode').val()},
            dataType: 'json',
            success: function(data){

                var html = '';
                var options = '';
                if(data){

                    $.each(data, function(k,v){
                        options += '<option value="' + v.cSONo +'">' + v.cSONo + '</option>';
                    });

                }

                html += '<select class="form-control" id="so_nos" name="so_nos" onChange="populateSODetails()" required>'
                html += '<option value=""></option>';
                html += options + '</select>';
                //$('#so_nos').append(options);
                $('#so_nos_div').html(html);
                
            }
        });

        $('#dr_form_details').validate({
            rules: {
                so_nos: {
                    required: true
                }
            },
            messages: {
                so_nos: {
                    required: "Sales Order No is required"
                }
            },
            ignore: "",
            showErrors: function (errorMap, errorList) {
                var msg = ""
                $.each(errorMap, function(key, value) {
                    msg += value + "<br/>";
                });
                $("#error_modal_messages").html(msg);
                
                this.defaultShowErrors();
                if (this.numberOfInvalids() > 0) {
                    $("#error_modal_messages").show();
                    $('#error_modal_messages').addClass('alert alert-danger');
                } else {
                    $('#error_modal_messages').removeClass('alert alert-danger');
                    $("#error_modal_messages").hide();
                    
                }
            }
       });
   }

});



$('#submit_so_t').click(function(){

    if($('#dr_form_details').valid() == false) return;

    var prod_ids = '';
    $('.prod_ids:checkbox:checked').each(function () {
       var prod_id = (this.checked ? $(this).val() : "");
       prod_ids += prod_id + ',';
       
    });

    var pids = prod_ids.replace(/.$/,"");
    var cSONo = $('#so_nos').val();

    var ndx = $('#rndx').val();

    $('#pids').val(pids);


    $.ajax({
        url: URL + '/delivery_receipt/get_so_t_by_ids',
        type: "POST",
        data:{
            pids: pids,
            cSONo: cSONo
        },
        dataType: 'json',
        success: function(data){

            var html = '';
            var tds = '';
            var dr_details = $('#dr_details_div').html();
            var dr = '';
            var i = 0;

            var rows_l = 0;
            var c = 0;
            if($("input[name='dr_details[]']").length){
                
                rows_l = $("input[name='dr_details[]']").length;
                rows_l++;

            }else{
                rows_l = 1;
            }

            $.each(data, function(k,v){

                var cDesc = v.cDesc;
                    cDesc = cDesc.replace(/["']/g, "");

               so_t.row.add([
                    cSONo,
                    v.prod_id,
                    cDesc,
                    v.cWName,
                    v.cUnit,
                    '<input type="text" name="nQty['+v.cItemNo+']" value="' + v.nQty + '" style="max-width:65px" />',
                    v.nPrice,
                    v.nAmount,
                    '<a class="ml10" href="javascript:void(0)" id="delr'+rows_l+'" onClick="openDel('+rows_l+')"><i class="icon-cross2 text-danger"></i></a>'
                ]).draw();


                dr = cSONo + '|'
                     + v.cItemNo + '|'
                     + cDesc + '|'
                     + v.cWH + '|'
                     + v.cUnit + '|'
                     +  v.nQty + '|'
                     + v.nPrice + '|'
                     + v.nAmount + '|'
                     + v.nFactor + '|'
                     + v.nIdentity
                     //+ v.dExpDate + '|'
                     //+ v.cSOType + '|'
                     //+ v.nRefIdentity + '|'
                     ;
                
                dr_details += '<input type="hidden" id="dr_details_' + rows_l + '" name="dr_details[]" value="' + dr + '"/>';
            
                rows_l++;
            });

            $('#dr_details_div').html(dr_details);

            //$('#tbl_sales_order_details').append(tds);
            
            $('#modal-dr-details').modal('hide');
            $('#tbl_so').find('tbody tr').remove();

        }
    });
    

});


function populateSODetails(){
    var cSONo = $('#so_nos').val();
    
    $.ajax({
        url: URL + '/delivery_receipt/get_so_t',
        type: "POST",
        data:{cSONo: cSONo},
        dataType: 'json',
        success: function(data){

            var html = '';
            var tds = '';
            
            $.each(data, function(k,v){
                
                tds += ' <tr>\
                            <td><input type="checkbox" class="prod_ids" name="prod_ids[]" value="' + v.prod_id + '" /></td>\
                            <td>' + v.prod_id + '</td>\
                            <td>' + v.cDesc + '</td>\
                            <td>' + v.cWName + '</td>\
                            <td>' + v.cUnit + '</td>\
                            <td>' + v.nQty + '</td>\
                            <td>' + v.nPrice + '</td>\
                            <td>' + v.nAmount + '</td>\
                        </tr>';
            });

            html += '<table id="tbl_so" class="table table-bordered">\
                        <thead class="thead-default">\
                            <tr>\
                                <th><input type="checkbox" id="select_all" onClick="selectAll(this)"/></th>\
                                <th>Product ID</th>\
                                <th>Product Description</th>\
                                <th>Warehouse</th>\
                                <th>Unit</th>\
                                <th>Quantity</th>\
                                <th>Price</th>\
                                <th>Amount</th>\
                            </tr>\
                    </thead>\
                    <tbody>\
                    ' + tds + '\
                </tbody>\
            </table>';
         
            $('#so_t_table').html(html);
            

        }
    });
    
}

function selectAll(e){
    if($(e).is(':checked')){
        $('.prod_ids').prop('checked',true);
    }else{
        $('.prod_ids').prop('checked',false);
    }
}

function updateDRDetails(i){
    var dExpDate = $('#dExpDate_' + i).val();
    var dr_details = $('#dr_details_' + i).val();
    var n_dr = dr_details + dExpDate;

     $('#dr_details_' + i).val(n_dr);

}

function openDel(r){
    $('#del_details').attr('rel',r);
    $('#modal-delete').modal('show');
}

function delRow(e){

    var r = $(e).attr('rel');
    $('#dr_details_'+r).remove();

    so_t.row($('#delr'+r).parents('tr')).remove().draw();
    $('#modal-delete').modal('hide');
    
}