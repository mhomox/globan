$("#cv_form").validate({
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
        cAddress: {
            required: true
        },
        cSpec: {
            required: true
        },
        cRemarks: {
            required: true
        },
        dDate: {
            required: true
        },
        cType: {
            required: true
        }
        
    },
    messages: {
        cTranNo: {
            required: 'Transaction is required'
        },
        cName: {
            required: 'Supplier Name is required'
        },
        cCode: {
            required: 'Supplier Code is required'
        },
        cAddress: {
            required: 'Address is required'
        },
        cSpec: {
            required: 'Specs is required'
        },
        cRemarks: {
            required: 'Remarks is required'
        },
        dDate: {
            required: 'Date is required'
        },
        cType: {
            required: 'Type is required'
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
            $('#error_messages').addClass('alert alert-info');
        } else {
            $('#error_messages').removeClass('alert alert-info');
            $("#error_messages").hide();
            
        }
    },
    submitHandler: function(form){
       
        if($('input[name="invoice_details[]"]').length == 0 && $('input[name="payables_details[]"]').length == 0)
        {
            $("#error_messages").show();
            $('#error_messages').addClass('alert alert-info');
            $('#error_messages').append('Details are required');
        }else{

            var nApplied = parseFloat($('#nApplied').text());
            // var nAmount = parseFloat($('#payment_value').text());
            // var balance = nAmount - nApplied;

            if(balance != 0){
                $("#error_messages").html('Payment and Applied not balance!');
                $("#error_messages").show();
                $('#error_messages').addClass('alert alert-info');
            }else{

                $("#error_messages").html('');
                $('#error_messages').removeClass('alert alert-info'); 
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

          var r = $(this).find('option:selected').attr('rel');
          var rs = r.split('|');
              $('#cCode').val(rs[0]);
              $('#cTerm').val(rs[1]);
              $('#cAddress').val(rs[2]);
             
      }

  });

$('#cName1').change(function(){
      
      if($(this).val() != ''){

          var r = $(this).find('option:selected').attr('rel');
          var rs = r.split('|');
              $('#cCode1').val(rs[0]);
              $('#cTerm').val(rs[1]);
              $('#cAddress').val(rs[2]);
             
      }

  });



$('#cPaidByName').change(function(){

    if($(this).val() != ''){

        $('#cPaidBy').val($(this).find('option:selected').attr('rel'));
    }

});

$('#others_cTitle').change(function(){

    if($(this).val() != ''){

        $('#others_cAcctNo').val($(this).find('option:selected').attr('rel'));
        // $('#others_cTitle').val($(this).find('option:selected').attr('rel'));
    }

});

$('#others_cPCCode').change(function(){

    if($(this).val() != ''){

        $('#others_cPCDesc').val($(this).find('option:selected').attr('rel'));
    }

});


$('#cType').change(function(){
    
    var voucher_type =  $(this).val();

    if(voucher_type == 'Trade'){


        $('#supplier_trade_id').show();
        $('#supplier_nontrade_id').hide();
        $('#paytrade').show();
        $('#paynontrade').hide();
        $('#payothers').hide();
        $('#invoice').show();
        $('#payment').hide();
        $('#others').hide();
        $('#inv_details').show();
        $('#payables_details').hide();
        $('#others_details').hide();

        
    }else if(voucher_type == 'Others'){
        // $('#supplier_trade_id').show();
        // $('#supplier_nontrade_id').show();
        $('#paytrade').hide();
        $('#paynontrade').hide();
        $('#payothers').show();
        $('#invoice').hide();
        $('#payment').hide();
        $('#others').show();
        $('#inv_details').hide();
        $('#payables_details').hide();
        $('#others_details').show();
        
        
    
    }else{
        $('#supplier_trade_id').hide();
        $('#supplier_nontrade_id').show();
        $('#paytrade').hide();
        $('#paynontrade').show();
        $('#payothers').hide();
        $('#invoice').hide();
        $('#payment').show();
        $('#others').hide();
        $('#inv_details').hide();
        $('#payables_details').show();
        $('#others_details').hide();
    }

});





$('#modal-inv-details').on('shown.bs.modal', function () {

   if($('#cName').val() == ''){
        var html = '<div class="alert alert-danger">Please populate supplier field first</div>';
        $('.no_customer_alert').html(html);

        $('#invoice_details').hide();
   }else{
        $('.no_customer_alert').html('');
        $('#invoice_details').show();

        $.ajax({
            url: URL + '/check_voucher/get_wrr_nos',
            type: "POST",
            data:{cCode: $('#cCode').val()},
            dataType: 'json',
            success: function(data){

                if(data){
                    
                    var html = '';
                    var tds = '';

                    $.each(data, function(k,v){

                         // if(v.cSMan)
                         //        cSMan = v.cSMan;

                            tds += ' <tr>\
                                        <td><input type="checkbox" class="inv_ids" name="inv_ids[]" value="' + v.cWRRNo + '" /></td>\
                                        <td>' + v.cWRRNo + '</td>\
                                        <td>' + v.cRemarks + '</td>\
                                        <td>' + v.dDateD + '</td>\
                                        <td>' + numberWithCommas(parseFloat(v.nBalance).toFixed(2)) + '</td>\
                                    </tr>';

                    });

                    html += '<table id="tbl_so" class="table table-bordered">\
                                    <thead class="thead-default">\
                                        <tr>\
                                            <th><input type="checkbox" id="select_all" onClick="selectAll(this)"/></th>\
                                            <th>WRR No</th>\
                                            <th>Remarks</th>\
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

   if($('#cName').val() == ''){
        var html = '<div class="alert alert-danger">Please populate supplier field first</div>';
        $('.no_customer_alert').html(html);

        $('#payables_details').hide();
   }else{
        $('.no_customer_alert').html('');
        $('#payables_details').show();

        $.ajax({
            url: URL + '/check_voucher/get_payables_nos',
            type: "POST",
            data:{cCode: $('#cCode').val()},
            dataType: 'json',
            success: function(data){

                if(data){
                    
                    var html = '';
                    var tds = '';

                    $.each(data, function(k,v){

                         // if(v.cSMan)
                         //        cSMan = v.cSMan;

                            tds += ' <tr>\
                                        <td><input type="checkbox" class="inv_ids" name="inv_ids[]" value="' + v.cTranNo + '" /></td>\
                                        <td><a href="javascript:void(0)" onClick="showDetails(this)" data-cTranNo = "'+v.cTranNo+'" data-cDesc = "'+v.cDesc+'" ><i class="icon-info22 ml-2"></i></a>&nbsp; ' + v.cTranNo + '</td>\
                                        <td>' + v.cDesc + '</td>\
                                        <td>' + v.dDateD + '</td>\
                                        <td>' + numberWithCommas(parseFloat(v.nAmount).toFixed(2)) + '</td>\
                                    </tr>';

                    });

                    html += '<table id="tbl_so" class="table table-bordered">\
                                    <thead class="thead-default">\
                                        <tr>\
                                            <th><input type="checkbox" id="select_all" onClick="selectAll(this)"/></th>\
                                            <th>Payables No</th>\
                                            <th>Description</th>\
                                            <th>Reference Date</th>\
                                            <th>Total Amount</th>\
                                        </tr>\
                                </thead>\
                                <tbody>\
                                ' + tds + '\
                            </tbody>\
                        </table>';
                     
                        $('#tbl_payables').html(html);
         
                }
            }
        });

    }

});




    

function showDetails(e)
    {
        cTranNo = $(e).data('ctranno');
        cDesc = $(e).data('cdesc');
        // var cCategory = $(e).data('ccategory');
        // var cGeneral = $(e).data('cgeneral');
        // var cClass = $(e).data('cclass');
        // var cLevel = $(e).data('clevel');
        // var cType = $(e).data('ctype');
        // var cDepartment = $(e).data('cdepartment');

        


        $('#p_cTranNo').text(cTranNo);
        $('#p_cDesc').text(cDesc);
        // $('#p_cCategory').text(cCategory);
        // $('#p_cGeneral').text(cGeneral);
        // $('#p_cClass').text(cClass);
        // $('#p_cLevel').text(cLevel);
        // $('#p_cType').text(cType);
        // $('#p_cDepartment').text(cDepartment);
        
        // if(cLongDesc != 'undefined'){
        //  $('#p_cLongDesc').text(cLongDesc);
        // }

        // $('#p_cPhoto').attr('src',URL + '/products/' + cPhoto);
        // $('#p_nSRPrice').text('₱ ' + nSRPrice);

        // $('#add_to_cart')
        // $('#add_to_cart').data('citemno',cItemNo);
        // $('#add_to_cart').data('cdesc',cDesc);
        // $('#add_to_cart').data('clongdesc',cLongDesc);
        // $('#add_to_cart').data('cunit',cUnit);
        // $('#add_to_cart').data('cphoto',cPhoto);
        // $('#add_to_cart').data('nsrprice',nSRPrice);

        $('#p_cTranNo').val(cTranNo);

        $('#modal-details').modal('show');
    }

// $('#modal-payment').on('shown.bs.modal', function () {

//     $('#form_payment').validate({
//             rules: {
//                 payment_type_id: {
//                     required: true
//                 },
//                 payment_cBankID: {
//                     required: true
//                 },
//                 payment_cCheckNo: {
//                     required: true
//                 },
//                 payment_dCheckDate: {
//                     required: true
//                 },
//                 payment_nAmount: {
//                     required: true
//                 }
//             },
//             messages: {
//                 payment_type_id: {
//                     required: "Type is required"
//                 },
//                 payment_cBankID: {
//                     required: "Bank is required"
//                 },
//                 payment_cCheckNo: {
//                     required: "Check No is required"
//                 },
//                 payment_dCheckDate: {
//                     required: "Date is required"
//                 },
//                 payment_nAmount: {
//                     required: "Amount is required"
//                 }
//             },
//             ignore: "",
//             showErrors: function (errorMap, errorList) {
//                 var msg = ""
//                 $.each(errorMap, function(key, value) {
//                     msg += value + "<br/>";
//                 });
//                 $("#error_modal_messages").html(msg);
                
//                 this.defaultShowErrors();  // default labels from errorPlacement
//                 if (this.numberOfInvalids() > 0) {
//                     $("#error_modal_messages").show();
//                     $('#error_modal_messages').addClass('alert alert-danger');
//                 } else {
//                     $('#error_modal_messages').removeClass('alert alert-danger');
//                     $("#error_modal_messages").hide();
                    
//                 }
//             }
//        });

// });

$('#modal-others').on('shown.bs.modal', function () {

    $('#others_cPCCode').change(function(){
      
        if($(this).val() != ''){

            $('#others_cPCDesc').val($(this).find('option:selected').attr('rel'));
        }

    });

    $('#others_form').validate({
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

$('#modal-pay-details').on('shown.bs.modal', function () {


    $('#pay_form').validate({
            rules: {
                pay_cType: {
                    required: true
                },
                cBankID: {
                    required: true
                },
                cCheckCurrent: {
                    required: true
                },
                cCheckBookNo: {
                    required: true
                },
                pay_nAmount: {
                    required: true
                },
                pay_dCheckDate: {
                    required: true
                }
               
            },
            messages: {
                pay_cType: {
                    required: "Type is required"
                },
                cBankID: {
                    required: "Bank No is required"
                },
                cCheckCurrent: {
                    required: "Check No is required"
                },
                cCheckBookNo: {
                    required: "CheckBook No is required"
                },
                pay_nAmount: {
                    required: "Amount is required"
                },
                pay_dCheckDate: {
                    required: "Date is required"
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
        "stripeClasses": [ 'odd-row', 'even-row' ],
        "processing": true,
        "serverSide": true,
        "paging": true,
        "searching": { "regex": true },
        "lengthMenu": [ [10, 25, 50, 100], [10, 25, 50, 100] ],
        "pageLength": 5,
        "ajax": {
            url : URL + '/check_voucher/get_products_list',
            type : "POST"
        },
         "columns": [
            {
              "render": function ( data, type, full, meta ) {
                     
                     var actionStr = '';
                    
                    actionStr += '<a title="view" href="javascript:void(0)" onclick="setProdID(this)" data-item-no = "' + full.cAcctNo  + '" data-prod-desc = "' + full.cTitle + '" >' + full.cAcctNo + '</a>';
                    
                     return actionStr;
                 },
            sortable: false,
            orderable: false 
            },
            { "data": "cTitle" }
        ],
        "order": [[ 0, "ASC" ]],
        "destroy": true,
        "dom": '<"dataTables__top"lf>rt<"dataTables__bottom"ip><"clear">'
    });

});

$('#modal-bank-list').on('shown.bs.modal', function () {
  
    var t = $('#tbl_banks').DataTable({
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
            url : URL + '/check_voucher/get_banks_list',
            type : "POST"
        },
         "columns": [
            {
              "render": function ( data, type, full, meta ) {
                     
                     var actionStr = '';
                    
                    actionStr += '<a title="view" href="javascript:void(0)" onclick="setBANKID(this)" data-bank-no = "' + full.cBankID + '"  data-bank-book = "' + full.cCheckCurrent + '"  data-bank-desc = "' + full.cCheckBookNo + '" >' + full.cBankID + '</a>';
                    
                     return actionStr;
                 },
            sortable: false,
            orderable: false 
            },
            { "data": "cCheckBookNo" },
            { "data": "cCheckCurrent" }
        ],
        "order": [[ 0, "asc" ]],
        "destroy": true,
        "dom": '<"dataTables__top"lf>rt<"dataTables__bottom"ip><"clear">'
    });

});

function setProdID(e)
{
    $('#prod_id').val($(e).data('item-no'));
    $('#others_cAcctNo').val($(e).data('item-no'));
    $('#others_cTitle').val($(e).data('prod-desc'));
    

    $('#modal-item-list').modal('hide');
}

function setBANKID(e)
{
    $('#bank_id').val($(e).data('bank-no'));
    $('#cBankID').val($(e).data('bank-no'));
    $('#cCheckCurrent').val($(e).data('bank-desc'));
    $('#cCheckBookNo').val($(e).data('bank-book'));
    

    $('#modal-bank-list').modal('hide');
}




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

            // $( api.column( 3 ).footer() ).html(
            //     '₱ <span id="nApplied"></span> total'
            // );

            // $( api.column( 4 ).footer() ).html(
            //     '₱ '+ numberWithCommas(t3.toFixed(2)) +' total'
            // );

            // $( api.column( 5 ).footer() ).html(
            //     '₱ '+ numberWithCommas(t4.toFixed(2)) +' total'
            // );
        }
});

var payables_t = $('#tbl_payment').DataTable({
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
            //     .column( 4, { page: 'current'} )
            //     .data()
            //     .reduce( function (a, b) {

            //         return intVal(a) + intVal(b);
            //     }, 0 );

           
 
            // Update footer
            $( api.column( 3 ).footer() ).html(
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
var pay_t = $('#tbl_pay').DataTable({
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
        url: URL + '/check_voucher/get_wrr_t_by_ids',
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

                // var nApplied = 0.01*v.nBalance;
               

                // var nApplied = (v.nBalance-v.nBalance/1.12*0.01);
                // var nApplied =Math.round(v.nBalance-v.nBalance/1.12*0.01); 
                // var nEWT =(v.nBalance/1.12*0.01); 
                var nEWT = (parseFloat(v.nBalance/1.12*0.01).toFixed(2));
                var nEVAT = (parseFloat(v.nBalance/1.12).toFixed(2));
                var nApplied = (parseFloat(v.nBalance-v.nBalance/1.12*0.01).toFixed(2));
                // var nApplied = numberWithCommas(parseFloat(v.nBalance-v.nBalance/1.12*0.01).toFixed(2))
                // var nEWT = numberWithCommas(parseFloat(v.nBalance/1.12*0.01).toFixed(3));
                
                // var nEVAT = numberWithCommas(parseFloat(v.nBalance/1.12).toFixed(2))

                // var nEWT = numberWithCommas(parseFloat(v.nBalance/1.12*0.01).toFixed(2));
                // var nEVAT = numberWithCommas(parseFloat(v.nBalance/1.12).toFixed(2));
                // var nEVAT =Math.round(v.nBalance/1.12); 
                
                
                
               
                
                // var nEVAT = 0;

               invoice_t.row.add([
                    v.cWRRNo,
                    v.dDateD,
                    numberWithCommas(parseFloat(v.nBalance).toFixed(2)),
                    '<input type="text" style="background: transparent; max-width: 80px; border:none; " class="nApplied'+rows_l+'"  name="nApplied[\''+v.cWRRNo+'\']" rel="'+rows_l+'" value="' + nApplied + '" />',
                    numberWithCommas(parseFloat(nEWT).toFixed(2)),
                    numberWithCommas(parseFloat(nEVAT).toFixed(2)),
                    '<a class="ml10" href="javascript:void(0)" id="delr'+rows_l+'" onClick="openDel(\'inv_details-'+rows_l+'\')"><i class="icon-subtract text-danger"></i></a>'
                ]).draw();


               var inv_d = v.cWRRNo + '|' +
                    v.cWRRNo + '|' +
                    v.dDateD + '|' +
                    v.nBalance + '|' +
                    v.nApplied + '|' +
                    nEWT + '|' +
                    nEVAT;
                
                inv_details += '<input type="hidden" name="invoice_details[]" id="inv_details_'+rows_l+'" value="' + inv_d + '" />';
            
                rows_l++;
            });

            $('#inv_details_div').html(inv_details);
            
            $('#modal-inv-details').modal('hide');

            $('#tbl_si').find('tbody tr').remove();

        }
    });
    
});

$('#submit_payables').click(function(){

    //if($('#form_invoice').valid() == false) return;

    var inv_ids = '';
    $('.inv_ids:checkbox:checked').each(function () {
       var inv_id = (this.checked ? $(this).val() : "");
       inv_ids += inv_id + ',';
       
    });

    var inv_ids = inv_ids.replace(/.$/,"");
    var pys_details = '';

    var ndx = $('#rndx').val();

    $.ajax({
        url: URL + '/check_voucher/get_payables_t_by_ids',
        type: "POST",
        data:{
            inv_ids: inv_ids
        },
        dataType: 'json',
        success: function(data){

            var html = '';
            var tds = '';
            var payables_details = $('#payables_details_div').html();
            var dr = '';
            var i = 0;

            var rows_l = 0;
            var c = 0;
            if($("input[name='payables_details[]']").length){
                
                rows_l = $("input[name='payables_details[]']").length;
                rows_l++;

            }else{
                rows_l = 1;
            }

            $.each(data, function(k,v){

                // var nApplied = 0.01*v.nBalance;
               

                // var nApplied = (v.nBalance-v.nBalance/1.12*0.01);
                // var nApplied =Math.round(v.nBalance-v.nBalance/1.12*0.01); 
                // var nEWT =(v.nBalance/1.12*0.01); 
                var nEWT = (parseFloat(v.nAmount/1.12*0.01).toFixed(2));
                var nApplied = (parseFloat(v.nAmount-v.nAmount/1.12*0.01).toFixed(2));
               
                // var nEWT = numberWithCommas(parseFloat(v.nBalance/1.12*0.01).toFixed(3));
                var nEVAT = (parseFloat(v.nAmount/1.12).toFixed(2));

                // var nEWT = numberWithCommas(parseFloat(v.nBalance/1.12*0.01).toFixed(2));
                // var nEVAT = numberWithCommas(parseFloat(v.nBalance/1.12).toFixed(2));
                // var nEVAT =Math.round(v.nBalance/1.12); 
                
                
                
               
                
                // var nEVAT = 0;

               payables_t.row.add([
                    v.cTranNo,
                    v.dDateD,
                    v.cDesc,
                    numberWithCommas(parseFloat(v.nAmount).toFixed(2)),
                    '<input type="text" class="bg-green-600 border-slate-600 border-5 nApplied'+rows_l+'"  name="nApplied[\''+v.cTranNo+'\']" rel="'+rows_l+'" value="' + nApplied + '" style="max-width:100" />',
                    numberWithCommas(parseFloat(nEWT).toFixed(2)),
                    numberWithCommas(parseFloat(nEVAT).toFixed(2)),
                    '<a class="ml10" href="javascript:void(0)" id="delr'+rows_l+'" onClick="openDel(\'pys_details-'+rows_l+'\')"><i class="icon-subtract text-danger"></i></a>'
                ]).draw();


               var inv_d = v.cTranNo + '|' +
                    v.cTranNo + '|' +
                    v.dDateD + '|' +
                     v.cDesc + '|' +
                    v.nAmount + '|' +
                    v.nApplied + '|' +
                    nEWT + '|' +
                    nEVAT;
                
                pys_details += '<input type="hidden" name="payables_details[]" id="pys_details_'+rows_l+'" value="' + inv_d + '" />';
            
                rows_l++;
            });

            $('#payables_details_div').html(pys_details);
            
            $('#modal-payment').modal('hide');

            $('#tbl_payables').find('tbody tr').remove();

        }
    });
    
});


// $('#submit_payment').click(function(){

//     if($('#form_payment').valid() == false) return;

//     var payment_type_id = $('#payment_type_id').val();
//     var payment_cBankID = $('#payment_cBankID').val();
//     var payment_cCheckNo = $('#payment_cCheckNo').val();
//     var payment_dCheckDate = $('#payment_dCheckDate').val();
//     var payment_nAmount = $('#payment_nAmount').val();

//     var rows_l = 0;
//     var c = 0;
//     if($("input[name='payment_details[]']").length){
        
//         rows_l = $("input[name='payment_details[]']").length;
//         rows_l++;

//     }else{
//         rows_l = 1;
//     }



//     var payment_details = payment_type_id + '|' +
//                     payment_cBankID + '|' +
//                     payment_cCheckNo + '|' +
//                     payment_dCheckDate + '|' +
//                     payment_nAmount;

//     $('#payment_details_div').append('<input type="hidden" name="payment_details[]" id="payment_details_'+rows_l+'" value="' + payment_details + '" />');

//     payment_t.row.add([
//         payment_type_id,
//         payment_cBankID,
//         payment_cCheckNo,
//         payment_dCheckDate,
//         payment_nAmount,
//         '<a class="ml10" href="javascript:void(0)" id="delr'+rows_l+'" onClick="openDel(\'payment_details-'+rows_l+'\')"><i class="icon-subtract text-danger"></i></a>'
//     ]).draw();

//     $('#modal-payment').modal('hide');

//      $('#form_payment').get(0).reset();

// });

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

        rows_l = $("input[name='others_details[]']").length;
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

$('#submit_pay').click(function(){

    if($('#form_pay').valid() == false) return;

    var pay_cType = $('#pay_cType').val();
    var cBankID = $('#cBankID').val();
    var cCheckCurrent = $('#cCheckCurrent').val();
    var cCheckBookNo = $('#cCheckBookNo').val();
    var pay_nAmount = $('#pay_nAmount').val();
    var pay_dCheckDate = $('#pay_dCheckDate').val();

    var rows_l = 0;
    var c = 0;
    if($("input[name='pay_details[]']").length){

        rows_l = $("input[name='pay_details[]']").length;
        rows_l++;

    }else{
        rows_l = 1;
    }

    // var pay_nAmount = (parseFloat(v.nBalance-v.nBalance/1.12*0.01).toFixed(2));

    var pay_details = pay_cType + '|' +
                    cBankID + '|' +
                    cCheckCurrent + '|' +
                    cCheckBookNo + '|' +
                    pay_nAmount + '|' +
                    pay_dCheckDate;

    $('#pay_details_div').append('<input type="hidden" name="pay_details[]" id="pay_details_'+rows_l+'" value="' + pay_details + '" />');

    pay_t.row.add([
        pay_cType,
        cBankID,
        cCheckCurrent,
        cCheckBookNo,
        pay_nAmount,
        pay_dCheckDate,
        '<a class="ml10" href="javascript:void(0)" id="delr'+rows_l+'" onClick="openDel(\'pay_details-'+rows_l+'\')"><i class="icon-cross2 text-danger"></i></a>'
    ]).draw();

    $('#modal-pay-details').modal('hide');

     $('#form_pay').get(0).reset();

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
    
    if(rs[0] == 'pay_details')
        pay_t.row($('#delr'+rs[1]).parents('tr')).remove().draw();
    
    $('#modal-delete').modal('hide');
    
}

function setModal(mod)
{
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