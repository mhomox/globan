
$("#wrr_form").validate({
    rules: {
        cWRRNo: {
            required: true
        },
        cName: {
            required: true
        },
        cCode: {
            required: true
        },
        cAddress: {
            required: true
        },
        cContact: {
            required: true
        },
        cRemarks: {
            required: true
        },
        dDate: {
            required: true
        },
        cSuppInvNo: {
            required: true
        },
        dInvDate: {
            required: true
        },
        cTerms: {
            required: true
        },
        cReceivedBy: {
            required: true
        }        
    },
    messages: {
        cWRRNo: {
            required: 'Transaction no is required'
        },
        cName: {
            required: 'Supplier is required'
        },
        cCode: {
            required: 'Supplier Code is required'
        },
        cAddress: {
            required: 'Address is required'
        },
        cContact: {
            required: 'Contact is required'
        },
        cRemarks: {
            required: 'Remarks is required'
        },
        dDate: {
            required: 'Date is required'
        },
        cSuppInvNo: {
            required: 'Invoice/DR# is required'
        },
        dInvDate: {
            required: 'Invoice Date is required'
        },
        cTerms: {
            required: 'Terms is required'
        },
        cReceivedBy: {
            required: 'Received By is required'
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
       
        if($('.wnt_details').length == 0)
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

$('#cName').change(function(){
      
  if($(this).val() != ''){

      var r = $(this).find('option:selected').attr('rel');
      var rs = r.split('|');
          $('#cCode').val(rs[0]);
          $('#cTerm').val(rs[1]);
          $('#cAddress').val(rs[2]);
          $('#cContact').val(rs[3]);
  }

});

$('#modal-inv-details').on('shown.bs.modal', function () {

   if($('#cName').val() == ''){
        var html = '<div class="alert alert-danger">Please populate customer field first</div>';
        $('.no_customer_alert').html(html);

        $('#cInvNos').prop('disabled', true);
   }else{
        $('.no_customer_alert').html('');
        $('#cInvNos').prop('disabled', false);

        $.ajax({
            url: URL + '/wrr_non_trade/get_si_list',
            type: "POST",
            data:{cCode: $('#cCode').val()},
            dataType: 'json',
            success: function(data){

                var html = '';
                var options = '';
                if(data){

                    $.each(data, function(k,v){
                        options += '<option value="' + v.cInvNo +'">' + v.cInvNo + '</option>';
                    });

                }

                html += '<select class="form-control" id="cInvNos" name="cInvNos" onChange="populateInvDetails()">'
                html += '<option value=""></option>';
                html += options + '</select>';
                $('#inv_div').html(html);
                
            }
        });
   }

   $('#form_invoice').validate({
        rules: {
            cInvNos: {
                required: true
            }
        },
        messages: {
            cInvNos: {
                required: "Invoice No required"
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

var rgs_t = $('#tbl_wnt_details').DataTable({
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
                .column( 5 )
                .data()
                .reduce( function (a, b) {
                    
                    return intVal(a) + intVal(b);
                }, 0 );

            t2 = api
                .column( 6 )
                .data()
                .reduce( function (a, b) {
                    
                    return intVal(a) + intVal(b);
                }, 0 );

            t3 = api
                .column( 7 )
                .data()
                .reduce( function (a, b) {
                    
                    return intVal(a) + intVal(b);
                }, 0 );

        
 
            // Total over this page
            pt1 = api
                .column( 5, { page: 'current'} )
                .data()
                .reduce( function (a, b) {

                    return intVal(a) + intVal(b);
                }, 0 );

            pt2 = api
                .column( 6, { page: 'current'} )
                .data()
                .reduce( function (a, b) {

                    return intVal(a) + intVal(b);
                }, 0 );

            pt3 = api
                .column( 7, { page: 'current'} )
                .data()
                .reduce( function (a, b) {

                    return intVal(a) + intVal(b);
                }, 0 );

         
 
            // Update footer
            // $( api.column( 5 ).footer() ).html(
            //     '$'+pt1 +' ( $'+ t1 +' total)'
            // );

            $( api.column( 6 ).footer() ).html(
                '$'+pt2 +' total'
            );

            $( api.column( 7 ).footer() ).html(
                '$<span id="total_amount">'+pt3 +'</span> total'
            );

          
        }
});

$('#submit_invoice').click(function(){

    var cInvNo = $('#cInvNos').val();

    var prod_ids = '';
    $('.prod_ids:checkbox:checked').each(function () {
       var prod_id = (this.checked ? $(this).val() : "");
       prod_ids += prod_id + ',';       
    });

    var pids = prod_ids.replace(/.$/,"");
    
    $('#pids').val(pids);

    $.ajax({
        url: URL + '/wrr_non_trade/get_inv_t_by_ids',
        type: "POST",
        data:{
            cItemNos: pids,
            cInvNo: cInvNo
        },
        dataType: 'json',
        success: function(data){

            var html = '';
            var tds = '';
            var rgs_details = $('#wnt_details_div').html();
            var dr = '';
            var i = 0;

            //var rows_l = 0;
            var c = 0;
            var rows_l = rgs_t.rows().count();

            $.each(data, function(k,v){

                var cDesc = v.cDesc;
                    cDesc = cDesc.replace(/["']/g, "");

               rgs_t.row.add([
                    cInvNo + '<input type="hidden" class="wnt_details" name="wnt_details[' + rows_l + '][cRefNo]" value="'+cInvNo+'" />',
                    v.cItemNo + '<input type="hidden" class="wnt_details" name="wnt_details[' + rows_l + '][cItemNo]" value="'+v.cItemNo+'" />',
                    cDesc + '<input type="hidden" class="wnt_details" name="wnt_details[' + rows_l + '][cDesc]"  value="'+cDesc+'" />',
                    v.cWName + '<input type="hidden" class="wnt_details" name="wnt_details[' + rows_l + '][cWH]"  value="'+v.cWH+'" />',
                    v.cUnit + '<input type="hidden" class="wnt_details" name="wnt_details[' + rows_l + '][cUnit]"  value="'+v.cUnit+'" />',
                    '<input class="border-5 wnt_details nQty'+rows_l+'" type="text" name="wnt_details[' + rows_l + '][nQty]"  value="'+v.nQty+'" onChange="updateAmount('+rows_l+')" />',
                    v.nPrice,
                    v.nAmount,
                    '<input type="text" class="wnt_details border-5" name="wnt_details[' + rows_l + '][cBatchID]" value="" />',
                    '<input type="text" class="wnt_details border-5" name="wnt_details[' + rows_l + '][cRemarks]" value="" />',
                    '<input type="hidden" class="wnt_details" name="wnt_details[' + rows_l + '][nAmount]"  value="'+v.nAmount+'" /><input type="hidden" class="wnt_details" name="wnt_details[' + rows_l + '][nPrice]"  value="'+v.nPrice+'" /><a class="ml10" href="javascript:void(0)" id="delr'+rows_l+'" onClick="openDel('+rows_l+')"><i class="icon-cross2 text-danger"></i></a>'
                ]).draw();
            
                rows_l++;
            });
            
            $('#modal-inv-details').modal('hide');

        }
    });
    

    });

function populateInvDetails(){
    var cInvNo = $('#cInvNos').val();
    
    $.ajax({
        url: URL + '/wrr_non_trade/get_si_details',
        type: "POST",
        data:{cInvNo: cInvNo},
        dataType: 'json',
        success: function(data){

            var html = '';
            var tds = '';
            
            $.each(data, function(k,v){
                
                tds += ' <tr>\
                            <td><input type="checkbox" class="prod_ids" name="prod_ids[]" value="' + v.cItemNo + '" /></td>\
                            <td>' + v.cItemNo + '</td>\
                            <td>' + v.cDesc + '</td>\
                            <td>' + v.cWName + '</td>\
                            <td>' + v.cUnit + '</td>\
                            <td>' + v.nQty + '</td>\
                            <td>' + v.nPrice + '</td>\
                            <td>' + v.nAmount + '</td>\
                        </tr>';
            });

            html += '<table id="tbl_inv" class="table table-bordered">\
                        <thead class="thead-default">\
                            <tr>\
                                <th>Select</th>\
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
         
            $('#inv_table').html(html);
            
        }
    });
    
}

function openDel(r){
    $('#del_details').attr('rel',r);
    $('#modal-delete').modal('show');
}

function delRow(e){

    var r = $(e).attr('rel');
    
    rgs_t.row($('#delr'+r).parents('tr')).remove().draw();
    $('#modal-delete').modal('hide');
    
}

function updateAmount(row_id){
    var rqty = $('.nQty'+row_id).val();
        $('.nQty'+row_id).attr('value', $('.nQty'+row_id).val());
        rprice = $('.nQty'+row_id).closest('td').next('td').text();
        qty = parseInt(rqty.replace(/,/g, ""));
        price = parseFloat(rprice.replace(/,/g, ""));
        
        var net_price = price;
        var np = parseFloat(net_price);
        var amt = numberWithCommas(parseFloat(np*qty).toFixed(2))


        $('.nQty'+row_id).closest('td').parent().find('td:eq(7)').text(amt);
        $('li[data-dtr-index="7"]').find('span.dtr-data').text(amt.toLocaleString(undefined, { maximumFractionDigits: 2 }));

        var totalAmount = 0;

        $('#tbl_wnt_details tr').each(function () {
            var raw = $('td', this).eq(7).text();
            var value = parseFloat(raw.replace(/,/g, ""));

            if (!isNaN(value)) {
                totalAmount += value;
            }
        });

        $('#total_amount').text(numberWithCommas(totalAmount.toFixed(2)));

}