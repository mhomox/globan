$("#cr_form").validate({
    rules: {
        cTranNo: {
            required: true
        },
        cName: {
            required: true
        },
        cCode: {
            required: true
        },
        cPaidByName: {
            required: true
        },
        cPaidBy: {
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
            required: 'Transaction is required'
        },
        cName: {
            required: 'Customer is required'
        },
        cCode: {
            required: 'Customer Code is required'
        },
        cPaidByName: {
            required: 'Paid By is required'
        },
        cPaidBy: {
            required: 'Paid By Code is required'
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
       
        if($('input[name="invoice_details[]"]').length == 0)
        {
            $("#error_messages").show();
            $('#error_messages').addClass('alert alert-danger');
            $('#error_messages').append('Details are required');
        }else{

            var nApplied = parseFloat($('#nApplied').text());
            var payment = parseFloat($('#payment_value').text());
            var balance = payment - nApplied;

            if(balance = 0){
                $("#error_messages").html('Payment and Applied not balance!');
                $("#error_messages").show();
                $('#error_messages').addClass('alert alert-danger');
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
    }
});

$('#cName').change(function(){
      
    if($(this).val() != ''){

        $('#cCode').val($(this).find('option:selected').attr('rel'));

        //alert($(this).val());
        $('#cPaidByName').val($(this).val());
        $('#cPaidBy').val($(this).find('option:selected').attr('rel'));

    }

});

$('#cPaidByName').change(function(){

    if($(this).val() != ''){

        $('#cPaidBy').val($(this).find('option:selected').attr('rel'));
    }

});

$('#others_cAcctNo').change(function(){

    if($(this).val() != ''){

        $('#others_cTitle').val($(this).find('option:selected').attr('rel'));
    }

});

$('#others_cPCCode').change(function(){

    if($(this).val() != ''){

        $('#others_cPCDesc').val($(this).find('option:selected').attr('rel'));
    }

});

$('#modal-inv-details').on('shown.bs.modal', function () {

   if($('#cName').val() == ''){
        var html = '<div class="alert alert-danger">Please populate customer field first</div>';
        $('.no_customer_alert').html(html);

        $('#invoice_details').hide();
   }else{
        $('.no_customer_alert').html('');
        $('#invoice_details').show();

        $.ajax({
            url: URL + '/collection_receipt/get_inv_nos',
            type: "POST",
            data:{cCode: $('#cCode').val()},
            dataType: 'json',
            success: function(data){

                if(data){
                    
                    var html = '';
                    var tds = '';

                    $.each(data, function(k,v){

                         if(v.cSMan)
                                cSMan = v.cSMan;

                            tds += ' <tr>\
                                        <td><input type="checkbox" class="inv_ids" name="inv_ids[]" value="' + v.cInvNo + '" /></td>\
                                        <td>' + v.cInvNo + '</td>\
                                        <td>' + cSMan + '</td>\
                                        <td>' + v.dDateD + '</td>\
                                        <td>' + numberWithCommas(parseFloat(v.nBalance).toFixed(2)) + '</td>\
                                    </tr>';

                    });

                    html += '<table id="tbl_so" class="table table-bordered">\
                                    <thead class="thead-default">\
                                        <tr>\
                                            <th><input type="checkbox" id="select_all" onClick="selectAll(this)"/></th>\
                                            <th>Invoice No</th>\
                                            <th>Salesman</th>\
                                            <th>Reference Date</th>\
                                            <th>Total</th>\
                                        </tr>\
                                </thead>\
                                <tbody>\
                                ' + tds + '\
                            </tbody>\
                        </table>';
                     
                        $('#tbl_si').html(html);
         
                }
            }
        });

    }

});
    


$('#modal-payment').on('shown.bs.modal', function () {

    $('#form_payment').validate({
            rules: {
                payment_type_id: {
                    required: true
                },
                payment_cBankID: {
                    required: true
                },
                payment_cCheckNo: {
                    required: true
                },
                payment_dCheckDate: {
                    required: true
                },
                payment_nAmount: {
                    required: true
                }
            },
            messages: {
                payment_type_id: {
                    required: "Type is required"
                },
                payment_cBankID: {
                    required: "Bank is required"
                },
                payment_cCheckNo: {
                    required: "Check No is required"
                },
                payment_dCheckDate: {
                    required: "Date is required"
                },
                payment_nAmount: {
                    required: "Amount is required"
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

$('#modal-others').on('shown.bs.modal', function () {

    $('#others_cPCCode').change(function(){
      
        if($(this).val() != ''){

            $('#others_cPCDesc').val($(this).find('option:selected').attr('rel'));
        }

    });

    $('#form_others').validate({
            rules: {
                others_cType: {
                    required: true
                },
                others_cAcctNo: {
                    required: true
                },
                others_cTitle: {
                    required: true
                },
                others_cDesc: {
                    required: true
                },
                others_nAmount: {
                    required: true
                },
                others_cPCCode: {
                    required: true
                },
                others_cPCDesc: {
                    required: true
                }
            },
            messages: {
                others_cType: {
                    required: "Type is required"
                },
                others_cAcctNo: {
                    required: "Account No is required"
                },
                others_cTitle: {
                    required: "Account Title is required"
                },
                others_cDesc: {
                    required: "Description is required"
                },
                others_nAmount: {
                    required: "Amount is required"
                },
                others_cPCCode: {
                    required: "Profit Center is required"
                },
                others_cPCDesc: {
                    required: "Profit Center Description is required"
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

$('#modal-payment-application').on('shown.bs.modal', function () {

    $('#form_payment_application').validate({
            rules: {
                payment_app_cBankID: {
                    required: true
                },
                payment_app_cCheckNo: {
                    required: true
                },
                payment_app_cInvNo: {
                    required: true
                },
                payment_app_nAmount: {
                    required: true
                }
            },
            messages: {
                payment_app_cBankID: {
                    required: "Bank is required"
                },
                payment_app_cCheckNo: {
                    required: "Check No is required"
                },
                payment_app_cInvNo: {
                    required: "Invoice No is required"
                },
                payment_app_nAmount: {
                    required: "Amount is required"
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

var invoice_t = $('#tbl_invoice').DataTable({
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
                .column( 2 )
                .data()
                .reduce( function (a, b) {
                    
                     if(!a) a = 0;
                     if(!b) b = 0;

                     a = a.toString().replace(/,/g, '');
                     b = b.toString().replace(/,/g, '');

                    return parseFloat(a) + parseFloat(b);
                }, 0 );

            t2 = api
                .column( 3 )
                .data()
                .reduce( function (a, b) {
                    
                     if(!a) a = 0;
                     if(!b) b = 0;

                     a = a.toString().replace(/,/g, '');
                     b = b.toString().replace(/,/g, '');

                    return parseFloat(a) + parseFloat(b);
                }, 0 );

            // t3 = api
            //     .column( 4 )
            //     .data()
            //     .reduce( function (a, b) {
                    
            //             if(!a) a = 0;
            //          if(!b) b = 0;

            //          a = a.toString().replace(/,/g, '');
            //          b = b.toString().replace(/,/g, '');

            //         return parseFloat(a) + parseFloat(b);
            //     }, 0 );

            // t4 = api
            //     .column( 5 )
            //     .data()
            //     .reduce( function (a, b) {
                    
            //          if(!a) a = 0;
            //          if(!b) b = 0;

            //          a = a.toString().replace(/,/g, '');
            //          b = b.toString().replace(/,/g, '');

            //         return parseFloat(a) + parseFloat(b);
            //     }, 0 );
 
           
            // Update footer
            $( api.column( 2 ).footer() ).html(
                '₱ '+ numberWithCommas(t1.toFixed(2)) +' total'
            );

            $( api.column( 3 ).footer() ).html(
                // '₱ <span id="nApplied"></span> total'
                '₱ '+ numberWithCommas(t2.toFixed(2)) +' total'
            );

            // $( api.column( 4 ).footer() ).html(
            //     '₱ '+ numberWithCommas(t3.toFixed(2)) +' total'
            // );

            // $( api.column( 5 ).footer() ).html(
            //     '₱ '+ numberWithCommas(t4.toFixed(2)) +' total'
            // );
        }
});

var payment_t = $('#tbl_payment').DataTable({
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
            // pt1 = api
            //     .column( 4, { page: 'current'} )
            //     .data()
            //     .reduce( function (a, b) {

            //         return intVal(a) + intVal(b);
            //     }, 0 );

           
 
            // Update footer
            $( api.column( 4 ).footer() ).html(
                '₱ <span id="payment_value">'+ numberWithCommas(t1.toFixed(2)) +'</span> total'
            );
           
        }
});

var others_t = $('#tbl_others').DataTable({
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
            // pt1 = api
            //     .column( 4, { page: 'current'} )
            //     .data()
            //     .reduce( function (a, b) {

            //         return intVal(a) + intVal(b);
            //     }, 0 );

           
 
           $( api.column( 4 ).footer() ).html(
                '₱ '+ numberWithCommas(t1.toFixed(2)) +' total'
            );
           
        }
});

var payment_application_t = $('#tbl_payment_application').DataTable({
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
                .column( 3 )
                .data()
                .reduce( function (a, b) {
                    
                    return intVal(a) + intVal(b);
                }, 0 );

 
            // Total over this page
            // pt1 = api
            //     .column( 3, { page: 'current'} )
            //     .data()
            //     .reduce( function (a, b) {

            //         return intVal(a) + intVal(b);
            //     }, 0 );

           
 
            $( api.column( 3 ).footer() ).html(
                '₱ '+ numberWithCommas(t1.toFixed(2)) +' total'
            );

           
        }
});

$('#submit_invoice').click(function(){

    //if($('#form_invoice').valid() == false) return;

    var inv_ids = '';
    $('.inv_ids:checkbox:checked').each(function () {
       var inv_id = (this.checked ? $(this).val() : "");
       inv_ids += inv_id + ',';
       
    });

    var inv_ids = inv_ids.replace(/.$/,"");
    var inv_details = '';

    var ndx = $('#rndx').val();

    $.ajax({
        url: URL + '/collection_receipt/get_si_t_by_ids',
        type: "POST",
        data:{
            inv_ids: inv_ids
        },
        dataType: 'json',
        success: function(data){

            var html = '';
            var tds = '';
            var invoice_details = $('#invoice_details_div').html();
            var dr = '';
            var i = 0;

            var rows_l = 0;
            var c = 0;
            if($("input[name='invoice_details[]']").length){
                
                rows_l = $("input[name='invoice_details[]']").length;
                rows_l++;

            }else{
                rows_l = 1;
            }

            $.each(data, function(k,v){

                // var nApplied =(parseFloat(v.nBalance).toFixed(2));
                // var nEWT = numberWithCommas(parseFloat(0.01*v.nBalance).toFixed(2));
                // var nEVAT = 0;

                var nApplied =(parseFloat(v.nBalance-0.01*v.nBalance).toFixed(2));
                var nEWT =(parseFloat(0.01*v.nBalance).toFixed(2));
                var nEVAT = 0;

               invoice_t.row.add([
                    v.cInvNo,
                    v.dDateD,
                    numberWithCommas(parseFloat(v.nBalance).toFixed(2)),
                    '<input type="text" onChange="computeNApplied()"  class="nApplied bg-green-600 border-slate-600 border-5" style="max-width:120px" name="nApplied['+c.cInvNo+']" value="'+nApplied+'" />',
                    nEWT,
                    '<a class="ml10" href="javascript:void(0)" id="delr'+rows_l+'" onClick="openDel(\'inv_details-'+rows_l+'\')"><i class="icon-cross2 text-danger"></i></a>'
                ]).draw();


               var inv_d = v.cInvNo + '|' +
                    v.cName + '|' +
                    v.cSMan + '|' +
                    v.dDateD + '|' +
                    v.nBalance + '|' +
                    nApplied + '|' +
                    nEWT;
                
                inv_details += '<input type="hidden" name="invoice_details[]" id="inv_details_'+rows_l+'" value="' + inv_d + '" />';
            
                rows_l++;
            });

            $('#inv_details_div').html(inv_details);
            
            $('#modal-inv-details').modal('hide');

            $('#tbl_si').find('tbody tr').remove();

        }
    });
    
});

$('#payment_type_id').change(function(){
    
    var payment_type =  $(this).val();

    if(payment_type == 'CHK'){
        $('#cBankID_div').show();
        $('#cCheckNo_div').show();
        $('#nAmount_div').show();
    }else if(payment_type == 'CC'){
        $('#cBankID_div').show();
        $('#cCheckNo_div').hide();
        $('#nAmount_div').hide();
    }else{
        $('#cBankID_div').hide();
        $('#cCheckNo_div').hide();
        $('#nAmount_div').hide();
    }

});

$('#submit_payment').click(function(){

    if($('#form_payment').valid() == false) return;

    var payment_type_id = $('#payment_type_id').val();
    var payment_cBankID = $('#payment_cBankID').val();
    var payment_cCheckNo = $('#payment_cCheckNo').val();
    var payment_dCheckDate = $('#payment_dCheckDate').val();
    var payment_nAmount = $('#payment_nAmount').val();

    var rows_l = 0;
    var c = 0;
    if($("input[name='payment_details[]']").length){
        
        rows_l = $("input[name='payment_details[]']").length;
        rows_l++;

    }else{
        rows_l = 1;
    }

    var payment_details = payment_type_id + '|' +
                    payment_cBankID + '|' +
                    payment_cCheckNo + '|' +
                    payment_dCheckDate + '|' +
                    payment_nAmount;

    $('#payment_details_div').append('<input type="hidden" name="payment_details[]" id="payment_details_'+rows_l+'" value="' + payment_details + '" />');

    payment_t.row.add([
        payment_type_id,
        payment_cBankID,
        payment_cCheckNo,
        payment_dCheckDate,
        payment_nAmount,
        '<a class="ml10" href="javascript:void(0)" id="delr'+rows_l+'" onClick="openDel(\'payment_details-'+rows_l+'\')"><i class="icon-cross2 text-danger"></i></a>'
    ]).draw();

    $('#modal-payment').modal('hide');

     $('#form_payment').get(0).reset();

});

$('#submit_others').click(function(){

    if($('#form_others').valid() == false) return;

    var others_cType = $('#others_cType').val();
    var others_cAcctNo = $('#others_cAcctNo').val();
    var others_cTitle = $('#others_cTitle').val();
    var others_cDesc = $('#others_cDesc').val();
    var others_nAmount = $('#others_nAmount').val();
    var others_cPCCode = $('#others_cPCCode').val();
    var others_cPCDesc = $('#others_cPCDesc').val();

    var rows_l = 0;
    var c = 0;
    if($("input[name='others_details[]']").length){

        rows_l = $("input[name='invoice_details[]']").length;
        rows_l++;

    }else{
        rows_l = 1;
    }

    var others_details = others_cType + '|' +
                    others_cAcctNo + '|' +
                    others_cTitle + '|' +
                    others_cDesc + '|' +
                    others_nAmount + '|' +
                    others_cPCCode + '|' +
                    others_cPCDesc;

    $('#others_details_div').append('<input type="hidden" name="others_details[]" id="others_details_'+rows_l+'" value="' + others_details + '" />');

    others_t.row.add([
        others_cType,
        others_cAcctNo,
        others_cTitle,
        others_cDesc,
        others_nAmount,
        others_cPCCode,
        others_cPCDesc,
        '<a class="ml10" href="javascript:void(0)" id="delr'+rows_l+'" onClick="openDel(\'others_details-'+rows_l+'\')"><i class="icon-cross2 text-danger"></i></a>'
    ]).draw();

    $('#modal-others').modal('hide');

     $('#form_others').get(0).reset();

});

$('#submit_payment_application').click(function(){

    if($('#form_payment_application').valid() == false) return;

    var payment_app_cBankID = $('#payment_app_cBankID').val();
    var payment_app_cCheckNo = $('#payment_app_cCheckNo').val();
    var payment_app_cInvNo = $('#payment_app_cInvNo').val();
    var payment_app_nAmount = $('#payment_app_nAmount').val();

    var rows_l = 0;
    var c = 0;
    if($("input[name='payment_application_details[]']").length){

        rows_l = $("input[name='invoice_details[]']").length;
        rows_l++;

    }else{
        rows_l = 1;
    }

    var others_details = payment_app_cBankID + '|' +
                    payment_app_cCheckNo + '|' +
                    payment_app_cInvNo + '|' +
                    payment_app_nAmount;

    $('#payment_application_details_div').append('<input type="hidden" name="payment_application_details[]" id="payment_application_details_'+rows_l+'" value="' + others_details + '" />');

    payment_application_t.row.add([
        payment_app_cBankID,
        payment_app_cCheckNo,
        payment_app_cInvNo,
        payment_app_nAmount,
        '<a class="ml10" href="javascript:void(0)" id="delr'+rows_l+'" onClick="openDel(\'payment_application_details-'+rows_l+'\')"><i class="icon-cross2 text-danger"></i></a>'
    ]).draw();

    $('#modal-payment-application').modal('hide');

     $('#form_payment_application').get(0).reset();

});

function openDel(r){
    //alert(r);
    $('#del_details').attr('rel',r);
    $('#modal-delete').modal('show');
}

function delRow(e){

    var r = $(e).attr('rel');
    var rs = r.split('-');
    $('#' + rs[0] + '_' + rs[1]).remove();

    if(rs[0] == 'inv_details')
        invoice_t.row($('#delr'+rs[1]).parents('tr')).remove().draw();
    
    if(rs[0] == 'payment_details')
        payment_t.row($('#delr'+rs[1]).parents('tr')).remove().draw();
    
    if(rs[0] == 'others_details')
        others_t.row($('#delr'+rs[1]).parents('tr')).remove().draw();
    
    if(rs[0] == 'payment_application_details')
        payment_application_t.row($('#delr'+rs[1]).parents('tr')).remove().draw();
    
    $('#modal-delete').modal('hide');
    
}

function setModal(mod){
    $('#add_details').attr("data-target","#" + mod);
}

function selectAll(e){
    if($(e).is(':checked')){
        $('.inv_ids').prop('checked',true);
    }else{
        $('.inv_ids').prop('checked',false);
    }
}

computeNApplied();
function computeNApplied(){
    
    var sum = 0;
    $(".nApplied").each(function(){
        var a = $(this).val();
        if(!a) a = 0;
         
         a = a.toString().replace(/,/g, '');
        sum += +a;
    });
    $("#nApplied").text(numberWithCommas(sum.toFixed(2)));

}