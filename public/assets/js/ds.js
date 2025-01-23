$("#ds_form").validate({
    rules: {
        cTranNo: {
            required: true
        },
        dDate: {
            required: true
        },
        cBankName: {
            required: true
        },
        cBankID: {
            required: true
        },
        cBankAcctNo: {
            required: true
        },
        cAcctNo: {
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
        cBankName: {
            required: 'Bank Info is required'
        },
        cBankID: {
            required: 'Bank ID is required'
        },
        cBankAcctNo: {
            required: 'Bank Acct No is required'
        },
        cAcctNo: {
            required: 'Account No is required'
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
       
        if($('input[name="ds_details[]"]').length == 0)
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

$('#modal-ds-details').on('shown.bs.modal', function (){
    $('#form_ds').validate({
            rules: {
                m_cType: {
                    required: true
                },
                // m_cCheckNo: {
                //     required: true
                // },
                // m_dCheckDate: {
                //     required: true
                // },
                m_cBankID: {
                    required: true
                },
                m_nAmount: {
                    required: true
                }
            },
            messages: {
                m_cType: {
                    required: "Type is required"
                },
                // m_cCheckNo: {
                //     required: "Check No is required"
                // },
                // m_dCheckDate: {
                //     required: "Check Date is required"
                // },
                m_cBankID: {
                    required: "Bank ID is required"
                },
                m_nAmount: {
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
});

$('#m_cType').change(function(){
       
    if($(this).val() != ''){

        $('#m_cType_id').val($(this).find('option:selected').attr('rel'));

        if($(this).val() == 'CHK'){

            $('#m_cCheckNo_div').show();
            $('#m_dCheckDate_div').show();

            // $.ajax({
            //     url: URL + '/deposit_slip/get_checks',
            //     type: "GET",
            //     dataType: 'json',
            //     success: function(data){

            //         var html = '<option value=""></option>';

            //         $.each(data,function(k,v){
            //             html += '<option value="'+v.cCheckNo+'">'+v.cCheckNo+'</option>';
            //         });

            //         $('#m_cCheckNo').find('option').remove().end().append(html);
            //     }
            // });

            

        }else{

            $('#m_cCheckNo_div').hide();
            $('#m_dCheckDate_div').hide();   
        }

    }

});

$('#modal-check-list').on('shown.bs.modal', function () {

    var t = $('#tbl_checks').DataTable({
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
                    url : URL + '/deposit_slip/get_checks',
                    type : "POST"
                },
                 "columns": [
                    {
                      "render": function ( data, type, full, meta ) {
                             
                             var actionStr = '';
                            
                            actionStr += '<a title="view" href="javascript:void(0)" onclick="getBank(this)" data-cCheckNo = "' + full.cCheckNo + '" >' + full.cCheckNo + '</a>';
                            
                             return actionStr;
                         },
                    sortable: false,
                    orderable: false 
                    },
                    { "data": "cBankID" },
                    { "data": "nBalance" }
                ],
                "order": [[ 0, "desc" ]],
                "destroy": true,
                "dom": '<"dataTables__top"lf>rt<"dataTables__bottom"ip><"clear">'
            });

});

$('#cBankName').change(function(){

    if($(this).val() != ''){


        var r = $(this).find('option:selected').attr('rel');
        var rs = r.split('|');

        $('#cBankID').val(rs[0]);
        $('#cBankAcctNo').val(rs[1]);
        $('#cAcctNo').val(rs[2]);
        $('#cTitle').val(rs[3]);
        

    }

});

$('#cAcctNo').change(function(){
   
        if($(this).val() != ''){

            $('#cTitle').val($(this).find('option:selected').attr('rel'));
        }
});
var ds_t = $('#tbl_ds').DataTable({
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
            $( api.column( 4 ).footer() ).html(
                // '( ₱ '+ t1 +' Total)'
                '₱ '+ numberWithCommas(t1.toFixed(2)) +' Total'
            );

        }
});

$('#submit_ds').click(function(){

    if($('#form_ds').valid() == false) return;

    var cType = $('#m_cType').val();
    var cTypeID = $('#m_cType_id').val();
    var cCheckNo = $('#cCheckNo').val();

    var dCheckDate = $('#m_dCheckDate').val();
    var cBankID = $('#m_cBankID').val();
    var nAmount = $('#m_nAmount').val();
    
    var rows_l = 0;
    var c = 0;
    if($("input[name='ds_details[]']").length){

        rows_l = $("input[name='ds_details[]']").length;
        rows_l++;

    }else{
        rows_l = 1;
    }

    var ds_details = cType + '|' +
                    cCheckNo + '|' +
                    //cAcctNo + '|' +
                    dCheckDate + '|' +
                    cBankID + '|' +
                    nAmount;

    $('#ds_details_div').append('<input type="hidden" name="ds_details[]" id="ds_details_'+rows_l+'" value="' + ds_details + '" />');

    ds_t.row.add([
        cType,
        cCheckNo,
        dCheckDate,
        cBankID,
       numberWithCommas(parseFloat(nAmount).toFixed(2)),
        '<a class="ml10" href="javascript:void(0)" id="delr'+rows_l+'" onClick="openDel(\''+rows_l+'\')"><i class="icon-cross2 text-danger"></i></a>'
    ]).draw();

    $('#modal-ds-details').modal('hide');

    $('#form_ds').get(0).reset();
});

function openDel(r){
    $('#del_details').attr('rel',r);
    $('#modal-delete').modal('show');
}

function delRow(e){

    var r = $(e).attr('rel');
    $('#ds_details_'+r).remove();

    ds_t.row($('#delr'+r).parents('tr')).remove().draw();
    $('#modal-delete').modal('hide');
    
}



function getBank(e){
    var m_cCheckNo = $(e).data('ccheckno');

    //alert(m_cCheckNo);

    $('#cCheckNo').val(m_cCheckNo);

    $.ajax({
        url: URL + '/deposit_slip/get_bank',
        data:{
            cCheckNo: m_cCheckNo
        },
        type: "POST",
        dataType: 'json',
        success: function(data){

            $('#m_cBankID').val(data.cBankID);
            $('#m_dCheckDate').val(data.dCheckDateD);
            // $('#m_nAmount').val(data.nAmount);
            $('#m_nAmount').val(data.nAmount.toLocaleString(undefined, { maximumFractionDigits: 2 }));
        }
    });
    $('#modal-check-list').modal('hide');
}