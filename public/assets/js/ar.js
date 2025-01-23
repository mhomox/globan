$("#ar_form").validate({
    rules: {
        cTranNo: {
            required: true
        },
        dDate: {
            required: true
        },
        cType: {
            required: true
        },
    
        cCode: {
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
        cType: {
            required: 'Type is required'
        },
       
        cCode: {
            required: 'Supplier Code is required'
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
            //return false;
        }else{
            var tdebit = parseFloat($('#tdebit').text());
            var tcredit = parseFloat($('#tcredit').text());
            var s = tdebit - tcredit;
            //alert(s);
            if(s != 0){

                $("#error_messages").show();
                $('#error_messages').addClass('alert alert-danger');
                $('#error_messages').append('Debit and Credit are not balanced!');
                //return false;

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

function setProdID(e){
    $('#prod_id').val($(e).data('item-no'));
    $('#m_cAcctNo').val($(e).data('item-no'));
    $('#m_cTitle').val($(e).data('prod-desc'));


    $('#modal-account-list').modal('hide');
}


$('#modal-account-list').on('shown.bs.modal', function () {
  
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
            url : URL + '/ar_adjustments/get_accounts_list',
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


$('#m_cTitle').change(function(){

    if($(this).val() != ''){

        $('#m_cAcctNo').val($(this).find('option:selected').attr('rel'));
        // $('#others_cTitle').val($(this).find('option:selected').attr('rel'));
    }

});

$('#cName').change(function(){
      
    if($(this).val() != ''){

        var r = $(this).find('option:selected').attr('rel');
        var rs = r.split('|');

        $('#cCode').val(rs[0]);
        $('#cTerm').val(rs[1]);
        $('#cIntTerm').val(rs[2]);
        

        $.ajax({
            url: URL + '/ar_adjustments/get_inv_nos',
            type: "POST",
            data:{cCode: $('#cCode').val()},
            dataType: 'json',
            success: function(data){

                var options = '<option value=""></option>';

                $.each(data,function(k,v){

                    options += '<option value="' + v.cInvNo + '">' + v.cInvNo + '</option>';


                });

                $('#m_cInvNo').find('option').remove().end().append(options);

            }
        });

    }

});

$('#cPDDesc').change(function(){

    if($(this).val() != ''){

        $('#cPDCode').val($(this).find('option:selected').attr('rel'));
    }

});

$('#m_cAcctNo').change(function(){
f
    if($(this).val() != ''){

        $('#m_cTitle').val($(this).find('option:selected').attr('rel'));
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

        $('#form_invoice').validate({
            rules: {
                m_cInvNo: {
                    required: true
                },
                m_cAcctNo: {
                    required: true
                },
                m_cTitle: {
                    required: true
                },
                m_cDesc: {
                    required: true
                },
                m_nDebit: {
                    required: true
                },
                m_nCredit: {
                    required: true
                },
                m_cPCCode: {
                    required: true
                }
            },
            messages: {
                m_cInvNo: {
                    required: "Invoice No is required"
                },
                m_cAcctNo: {
                    required: "Account No is required"
                },
                m_cTitle: {
                    required: "Account Title is required"
                },
                m_cDesc: {
                    required: "Description is required"
                },
                m_nDebit: {
                    required: "Debit is required"
                },
                m_nCredit: {
                    required: "Credit is required"
                },
                m_cPCCode: {
                    required: "Profit Center is required"
                }
                
            },
            ignore: "",
            // errorPlacement: function (error, element) {
            //     error.insertAfter(element);
            // },
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
        
         $.ajax({
            url: URL + '/ar_adjustments/get_wrr_nos',
            type: "POST",
            data:{cCode: $('#cCode').val()},
            dataType: 'json',
            success: function(data){

                var options = '';

                $.each(data,function(k,v){

                    options += '<option value="' + v.cWRRNo + '">' + v.cWRRNo + '</option>';


                });

                $('#cWRRNo').find('option').remove().end().append(options);

            }
        });

      
   }

});

//$('#m_cAcctNo').change();

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
            .column( 4 )
            .data()
            .reduce( function (a, b) {
                
                if(!a) a = 0;
                     if(!b) b = 0;

                 a = a.toString().replace(/,/g, '');
                 b = b.toString().replace(/,/g, '');

                return parseFloat(a) + parseFloat(b);
            }, 0 );

        t2 = api
            .column( 5 )
            .data()
            .reduce( function (a, b) {
                
                if(!a) a = 0;
                     if(!b) b = 0;

                 a = a.toString().replace(/,/g, '');
                 b = b.toString().replace(/,/g, '');

                return parseFloat(a) + parseFloat(b);
            }, 0 );


        // Total over this page
        pt1 = api
            .column( 4, { page: 'current'} )
            .data()
            .reduce( function (a, b) {

                if(!a) a = 0;
                     if(!b) b = 0;

                 a = a.toString().replace(/,/g, '');
                 b = b.toString().replace(/,/g, '');

                return parseFloat(a) + parseFloat(b);
            }, 0 );

        pt2 = api
            .column( 5, { page: 'current'} )
            .data()
            .reduce( function (a, b) {

                if(!a) a = 0;
                 if(!b) b = 0;

                 a = a.toString().replace(/,/g, '');
                 b = b.toString().replace(/,/g, '');

                return parseFloat(a) + parseFloat(b);
            }, 0 );

        // Update footer
        $( api.column( 4 ).footer() ).html(
           
            '₱<span id="tdebit">'+ numberWithCommas(t1.toFixed(2)) +'</span> total'
        );

        $( api.column( 5 ).footer() ).html(
           
            '₱<span id="tcredit">'+ numberWithCommas(t2.toFixed(2)) +'</span> total'
        );
    }
});

$('#submit_invoice').click(function(){
    
    if($('#form_invoice').valid() == false) return;

    var cInvNo = $('#m_cInvNo').val();
    var cAcctNo = $('#m_cAcctNo').val();
    var cTitle = $('#m_cTitle').val();
    var cDesc = $('#m_cDesc').val();
    var nDebit = $('#m_nDebit').val();
    var nCredit = $('#m_nCredit').val();
    var cPCCode = $('#m_cPCCode').val();
    
    var rows_l = 0;
    var c = 0;
    if($("input[name='invoice_details[]']").length){

        rows_l = $("input[name='invoice_details[]']").length;
        rows_l++;

    }else{
        rows_l = 1;
    }

    var inv_details = cInvNo + '|' +
                    cAcctNo + '|' +
                    cTitle + '|' +
                    cDesc + '|' +
                    nDebit + '|' +
                    nCredit + '|' +
                    cPCCode;

    $('#inv_details_div').append('<input type="hidden" name="invoice_details[]" id="inv_details_'+rows_l+'" value="' + inv_details + '" />');

    invoice_t.row.add([
        cInvNo,
        cAcctNo,
        cTitle,
        cDesc,
        nDebit,
        nCredit,
        cPCCode,
        '<a class="ml10" href="javascript:void(0)" id="delr'+rows_l+'" onClick="openDel(\''+rows_l+'\')"><i class="icon-cross2 text-danger"></i></a>'
    ]).draw();

    $('#modal-inv-details').modal('hide');

    $('#form_invoice').get(0).reset();
});

function openDel(r){
    $('#del_details').attr('rel',r);
    $('#modal-delete').modal('show');
}

function delRow(e){

    var r = $(e).attr('rel');
    $('#inv_details_'+r).remove();

    invoice_t.row($('#delr'+r).parents('tr')).remove().draw();
    $('#modal-delete').modal('hide');
    
}