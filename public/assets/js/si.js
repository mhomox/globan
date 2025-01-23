$("#si_form").validate({
    rules: {
        cInvNo: {
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
        cPCCode: {
            required: true
        },
        cRemarks: {
            required: true
        },
        cType: {
            required: true
        },
        cDocType: {
            required: true
        },
        cIntTerm: {
            required: true
        },
        cTerm: {
            required: true
        },
        cPayType: {
            required: true
        }
    },
    messages: {
        cInvNo: {
            required: 'Transaction no is required'
        },
        dDate: {
            required: 'Date is required'
        },
        cName: {
            required: 'Customer Name is required'
        },
        cCode: {
            required: 'Customer Code is required'
        },
        cPCCode: {
            required: 'Unit Division is required'
        },
        cRemarks: {
            required: 'Remarks is required'
        },
        cType: {
            required: 'SI Type is required'
        },
        cDocType: {
            required: 'Doc Type is required'
        },
        cIntTerm: {
            required: 'Internal Terms is required'
        },
        cPayType: {
            required: 'Payment Type is required'
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

        if($('input[name="si_details[]"]').length == 0)
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

var p_t = $('#tbl_delivery_receipt_details').DataTable({
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
        // t1 = api
        //     .column( 5 )
        //     .data()
        //     .reduce( function (a, b) {

        //         if(!a) a = 0;
        //              if(!b) b = 0;

        //              a = a.toString().replace(/,/g, '');
        //              b = b.toString().replace(/,/g, '');

        //             return parseFloat(a) + parseFloat(b);
        //     }, 0 );

        t2 = api
            .column( 7 )
            .data()
            .reduce( function (a, b) {

                if(!a) a = 0;
                     if(!b) b = 0;

                     a = a.toString().replace(/,/g, '');
                     b = b.toString().replace(/,/g, '');

                    return parseFloat(a) + parseFloat(b);
            }, 0 );

        t3 = api
            .column( 10 )
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

        //         if(!a) a = 0;
        //              if(!b) b = 0;

        //              a = a.toString().replace(/,/g, '');
        //              b = b.toString().replace(/,/g, '');

        //             return parseFloat(a) + parseFloat(b);
        //     }, 0 );

        // pt2 = api
        //     .column( 6, { page: 'current'} )
        //     .data()
        //     .reduce( function (a, b) {

        //         if(!a) a = 0;
        //              if(!b) b = 0;

        //              a = a.toString().replace(/,/g, '');
        //              b = b.toString().replace(/,/g, '');

        //             return parseFloat(a) + parseFloat(b);
        //     }, 0 );

        // pt3 = api
        //     .column( 7, { page: 'current'} )
        //     .data()
        //     .reduce( function (a, b) {

        //         if(!a) a = 0;
        //              if(!b) b = 0;

        //              a = a.toString().replace(/,/g, '');
        //              b = b.toString().replace(/,/g, '');

        //             return parseFloat(a) + parseFloat(b);
        //     }, 0 );

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
            //     '₱'+ numberWithCommas(t1.toFixed(2)) +' total'
            // );

            // $( api.column( 7 ).footer() ).html(
            //     '₱'+ numberWithCommas(t2.toFixed(2)) +' total'
            // );

            $( api.column( 10 ).footer() ).html(
                '₱'+ numberWithCommas(t3.toFixed(2)) +''
            );
    }
});

$('#cName').change(function(){

    p_t.clear().draw();

    if($(this).val() != ''){

        var r = $(this).find('option:selected').attr('rel');
        var rs = r.split('|');

        $('#cCode').val(rs[0]);
        $('#cTerm').val(rs[1]);
        $('#cIntTerm').val(rs[2]);
        $('#cEmpName').val(rs[3]);
        $('#cSMan').val(rs[4]);
        $('#cVATType').val(rs[5]);
        $('#nTaxRate').val(rs[6]);
        $('#cAddress').val(rs[7]);

    }

});


$('#cVATType').change(function(){

      if($(this).val() != ''){

          var r = $(this).find('option:selected').attr('rel');
          var rs = r.split('|');

              $('#nTaxRate').val(rs[0]);

      }

});

$('#cPDDesc').change(function(){

    if($(this).val() != ''){

        $('#cPDCode').val($(this).find('option:selected').attr('rel'));
    }

});

$('#modal-si-details').on('shown.bs.modal', function () {

   if($('#cName').val() == ''){
        var html = '<div class="alert alert-info">Please Select Customer</div>';
        $('#no_customer_alert').html(html);

        $('#dr_nos').prop('disabled', true);
   }else{
        $('#no_customer_alert').html('');
        $('#dr_nos').prop('disabled', false);

        var si_type = $('#cType').val();

        if(si_type == 'invoicew/dr'){

            $('#prod_div').hide();
            $('#refIDs').show();
            $('#dr_t_table').show();

            $.ajax({
                url: URL + '/sales_invoice/get_dr_nos',
                type: "POST",
                data:{cCode: $('#cCode').val()},
                dataType: 'json',
                success: function(data){

                    var html = '';
                    var options = '';
                    if(data){

                        $.each(data, function(k,v){
                            options += '<option value="' + v.cDRNo +'">' + v.cDRNo + '</option>';
                        })

                    }

                    html += '<select class="form-control" id="dr_nos" name="dr_nos" onChange="populateSIDetails()">'
                    html += '<option value=""></option>';
                    html += options + '</select>';
                    $('#dr_nos_div').html(html);

                }
            });

        }

        if(si_type == 'invoice'){

            $('#prod_div').hide();
            $('#refIDs').show();
            $('#dr_t_table').show();

            $.ajax({
                url: URL + '/sales_invoice/get_so_nos',
                type: "POST",
                data:{cCode: $('#cCode').val()},
                dataType: 'json',
                success: function(data){

                    var html = '';
                    var options = '';
                    if(data){

                        $.each(data, function(k,v){
                            options += '<option value="' + v.cSONo +'">' + v.cSONo + '</option>';
                        })

                    }

                    html += '<select class="form-control" id="dr_nos" name="dr_nos" onChange="populateSIDetails()">'
                    html += '<option value=""></option>';
                    html += options + '</select>';
                    $('#dr_nos_div').html(html);

                }
            });

        }

        if(si_type == 'autoinvoice'){

            $('#refIDs').hide();
            $('#dr_t_table').hide();

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
                    url : URL + '/sales_invoice/get_products_list',
                    type : "POST"
                },
                 "columns": [
                    {
                      "render": function ( data, type, full, meta ) {

                             var actionStr = '';

                            actionStr += '<input type="checkbox" class="prod_ids border-green border-5" name="prod_ids[]" value="' + full.check + '" />';

                             return actionStr;
                         },
                    sortable: false,
                    orderable: false
                    },
                    { "data": "cItemNo" },
                    { "data": "cDesc" }
                ],
                "order": [[ 0, "desc" ]],
                "destroy": true,
                "dom": '<"dataTables__top"lf>rt<"dataTables__bottom"ip><"clear">'
            });

            $('#prod_div').show();
        }
   }

});



$('#submit_dr_t').click(function(){

    var prod_ids = '';
    $('.prod_ids:checkbox:checked').each(function () {
       var prod_id = (this.checked ? $(this).val() : "");
       prod_ids += prod_id + ',';

    });

    var pids = prod_ids.replace(/.$/,"");
    var RefNo = $('#dr_nos').val();
    var cType = $('#cType').val();

    if(cType == 'autoinvoice'){
        RefNo = "";
    }

    $.ajax({
        url: URL + '/sales_invoice/get_sodr_t_by_ids',
        type: "POST",
        data:{
            pids: pids,
            RefNo: RefNo,
            cType: cType
        },
        dataType: 'json',
        success: function(data){

            var html = '';
            var tds = '';
            var si_details = $('#si_details_div').html();
            var dr = '';
            var i = 0;

            var rows_l = 0;
            var c = 0;
            if($("input[name='si_details[]']").length){

                rows_l = $("input[name='si_details[]']").length;
                rows_l++;

            }else{
                rows_l = 1;
            }

            $.each(data, function(k,v){

                var cDesc = v.cDesc;
                    cDesc = cDesc.replace(/["']/g, "");

                if(v.nPrice)
                    nPrice = v.nPrice;

                 if(v.cDiscount)
                    cDiscount = v.cDiscount;

                 if(v.nNetPrice)
                    nNetPrice = v.nNetPrice;

                if(v.nAmount)
                    nAmount = v.nAmount;

                if(v.nFactor)
                    nFactor = v.nFactor;

                if(v.nIdentity)
                    nIdentity = v.nIdentity;

                if(v.nQty)
                    nQty = v.nQty;

                if(cType == 'autoinvoice'){
                    nPrice = v.nSRPrice;
                    nQty = 1;
                    nAmount = nPrice*nQty;
                    nFactor = 1;
                    nRefIdentity = 1;
                }

                p_t.row.add([
                    nIdentity,
                    v.cDRNo,
                    v.cItemNo,
                    cDesc,
                    v.cWH,
                    v.cUnit,
                    nQty,
                    numberWithCommas(parseFloat(nPrice).toFixed(2)),
                    cDiscount,
                    numberWithCommas(parseFloat(nNetPrice).toFixed(2)),
                    numberWithCommas(parseFloat(nAmount).toFixed(2)),

                    '<a class="ml10" href="javascript:void(0)" id="delr'+rows_l+'" onClick="openDel('+rows_l+')"><i class="icon-cross2 text-danger"></i></a>'
                ]).draw();

                si =  nIdentity+ '|'
                     + v.cDRNo + '|'
                     + v.cItemNo + '|'
                     + cDesc + '|'
                     + v.cWH + '|'
                     + v.cUnit + '|'
                     + nQty + '|'
                     + nPrice + '|'
                     + cDiscount + '|'
                     + nNetPrice + '|'
                     + nAmount + '|'
                     + v.cCosting + '|'
                     + nFactor + '|';




                si_details += '<input type="hidden" id="si_details_' + rows_l + '" name="si_details[]" value="' + si + '"/>';

                rows_l++;
            });

            $('#si_details_div').html(si_details);

            $('#modal-si-details').modal('hide');

            $('#tbl_si').find('tbody tr').remove();

        }
    });


});


function populateSIDetails(){
    var RefNo = $('#dr_nos').val();
    var si_type = $('#cType').val();

    if(si_type == 'invoicew/dr'){
        $.ajax({
            url: URL + '/sales_invoice/get_dr_t',
            type: "POST",
            data:{cDRNo: RefNo},
            dataType: 'json',
            success: function(data){

                var html = '';
                var tds = '';

                $.each(data, function(k,v){

                    tds += ' <tr>\
                                <td><input type="checkbox" class="prod_ids" name="prod_ids[]" value="' + v.cItemNo + '" /></td>\
                                <td>' + v.nIdentity + '</td>\
                                <td>' + v.cDRNo + '</td>\
                                <td>' + v.cItemNo + '</td>\
                                <td>' + v.cDesc + '</td>\
                                <td>' + v.cWH + '</td>\
                                <td>' + v.cUnit + '</td>\
                                <td>' + v.nQty + '</td>\
                                <td>' + numberWithCommas(parseFloat(v.nSRPrice).toFixed(2)) + '</td>\
                                <td>' + numberWithCommas(parseFloat(v.nAmount).toFixed(2)) + '</td>\
                            </tr>';
                });

                html += '<table id="tbl_si" class="table table-bordered">\
                            <thead class="thead-default">\
                                <tr>\
                                    <th><input type="checkbox" id="select_all" onClick="selectAll(this)"/></th>\
                                    <th>#</th>\
                                    <th>Ref No#</th>\
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

                $('#dr_t_table').html(html);

            }
        });

    }

    if(si_type == 'invoice'){
        $.ajax({
            url: URL + '/sales_invoice/get_so_t',
            type: "POST",
            data:{cSONo: RefNo},
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

                html += '<table id="tbl_si" class="table table-bordered">\
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

                $('#dr_t_table').html(html);

            }
        });
    }

}

function selectAll(e){
    if($(e).is(':checked')){
        $('.prod_ids').prop('checked',true);
    }else{
        $('.prod_ids').prop('checked',false);
    }
}

function openDel(r){
    $('#del_details').attr('rel',r);
    $('#modal-delete').modal('show');
}

function delRow(e){

    var r = $(e).attr('rel');
    $('#si_details_'+r).remove();

    p_t.row($('#delr'+r).parents('tr')).remove().draw();
    $('#modal-delete').modal('hide');

}


