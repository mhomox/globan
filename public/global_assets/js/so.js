 $("#so_form").validate({
    rules: {
        cSONo: {
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
        cEmpName: {
            required: true
        },
        cSMan: {
            required: true
        },
        dDate: {
            required: true
        },
        cType: {
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
        },
        cMSCode: {
            required: true
        },
        cCurrency: {
            required: true
        },
        nCurrencyRate: {
            required: true
        },
        dExpiration: {
            required: true
        },
        cCPONo: {
            required: true
        },
        cRemarks: {
            required: true
        },
        cDelName: {
            required: true
        },
        cDelCode: {
            required: true
        },
        cRemarks: {
            required: true
        },
        cDelAddress: {
            required: true
        },
        cDelContact: {
            required: true
        },
        dDelDate: {
            required: true
        },
        delcTel1: {
            required: true
        },
        delcMobile: {
            required: true
        }

    },
    messages: {
        cSONo: {
            required: 'Sales Order No is required'
        },
        cName: {
            required: 'Customer Name is required'
        },
        cCode: {
            required: 'Customer Code is required'
        },
        cAddress: {
            required: 'Customer Address is required'
        },
        cContact: {
            required: 'Customer Contact is required'
        },
        cEmpName: {
            required: 'Salesman Name is required'
        },
        cSMan: {
            required: 'Salesman Code is required'
        },
        dDate: {
            required: 'Order Date is required'
        },
        cType: {
            required: 'Order Type is required'
        },
        cIntTerm: {
            required: 'Internal Terms is required'
        },
        cTerm: {
            required: 'Customer Terms is required'
        },
        cPayType: {
            required: 'Payment Type is required'
        },
        cMSCode: {
            required: 'Market Segment is required'
        },
        cCurrency: {
            required: 'Currency  is required'
        },
        nCurrencyRate: {
            required: 'Currency Rate is required'
        },
        dExpiration: {
            required: 'Expiration Date is required'
        },
        cCPONo: {
            required: 'Custom PO is required'
        },
        cRemarks: {
            required: 'Remarks is required'
        },
        cDelName: {
            required: 'Delivery Customer Name is required'
        },
        cDelCode: {
            required: 'Delivery Customer Code is required'
        },
        cRemarks: {
            required: 'Remarks is required'
        },
        cDelAddress: {
            required: 'Delivery Address is required'
        },
        cDelContact: {
            required: 'Delivery Contact is required'
        },
        dDelDate: {
            required: 'Delivery Date is required'
        },
        delcTel1: {
            required: 'Delivery Phone is required'
        },
        delcMobile: {
            required: 'Delivery Mobile is required'
        },
        delcFax: {
            required: 'Delivery Mobile is required'
        },
        delcEmail1: {
            required: 'Delivery Mobile is required'
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
       
        if($('input[name="so_details[]"]').length == 0)
        {
            $("#error_messages").show();
            $('#error_messages').addClass('alert alert-danger');
            $('#error_messages').append('Details are required');
        }else{
            $("#error_messages").html('');
            $('#error_messages').removeClass('alert alert-danger'); 
            $("#error_messages").hide();
              

            form.submit();
        }
    }
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
            url : URL + '/sales_order/get_products_list',
            type : "POST"
        },
         "columns": [
            {
              "render": function ( data, type, full, meta ) {
                     
                     var actionStr = '';
                    
                    actionStr += '<a title="view" href="javascript:void(0)" onclick="setProdID(this)" data-item-no = "' + full.cItemNo + '" data-prod-long-desc = "' + full.cLongDesc + '" data-prod-desc = "' + full.cDesc + '" >' + full.cItemNo + '</a>';
                    
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

$('#modal-so-details').on('shown.bs.modal', function () {
  
   $('.select2Mod').select2();

});

$('#add_so_details').click(function(){
    $('#raction').val('S');
});

$('#cName').change(function(){
  
    if($(this).val() != ''){

        var r = $(this).find('option:selected').attr('rel');
        var rs = r.split('|');
            $('#cCode').val(rs[0]);
            $('#cTerm').val(rs[1]);
            $('#cIntTerm').val(rs[2]);
            $('#cAddress').val(rs[3]);
            $('#cEmpName').val(rs[4]);
            $('#cSMan').val(rs[5]);
            $('#cContact').val(rs[6]);
    }

});

$('#cDelName').change(function(){
  
    if($(this).val() != ''){

        var r = $(this).find('option:selected').attr('rel');
        var rs = r.split('|');

            $('#cDelCode').val(rs[0]);
            $('#cDelAddress').val(rs[3]);
            $('#cDelContact').val(rs[6]);
            $('#delcTel1').val(rs[7]);
            $('#delcMobile').val(rs[8]);
            $('#delcFax').val(rs[9]);
            $('#delcEmail1').val(rs[10]);
    }

});

$('#cMSDesc').change(function(){
   
    if($(this).val() != ''){

        $('#cMSCode').val($(this).find('option:selected').attr('rel'));
    }

});

$('#cEmpName').change(function(){
   
    if($(this).val() != ''){

        $('#cSMan').val($(this).find('option:selected').attr('rel'));
    }

});

$('#cName2').change(function(){
   
    if($(this).val() != ''){

        $('#cWH').val($(this).find('option:selected').attr('rel'));
    }

});

$('#cName2').change(function(){

    $.ajax({
        url: URL + '/sales_order/get_warehouse_quantity',
        type: "POST",
        data:{cItemNo: $('#item_id').val()},
        dataType: 'text',
        success: function(response){

            if(parseInt(response) > 0)
                $('#whse_qty').val(parseInt(response));
            else             
                $('#whse_qty').val(0);
        }
    });

});

$('#prod_price').change(function(){
     compute_net();
 });

$('#prod_dsc').change(function(){
     compute_net();
 });

var tso = $('#tbl_sales_order_details').DataTable({
    "autoWidth": !1,
    "responsive": !0,
});

$('#save_so_details').click(function(){

    var prod_id = $('#prod_id').val();
    var item_id = $('#item_id').val();
    var prod_desc = $('#prod_desc').val();
    var cName2 = $('#cName2').val();
    var prod_pricing = $('#prod_pricing').val();
    var prod_unit = $('#prod_unit').val();
    var prod_qty = $('#prod_qty').val();
    var prod_price = $('#prod_price').val();
    var prod_dsc = $('#prod_dsc').val();
    var prod_np = $('#prod_np').val();
    var prod_amt = $('#prod_amt').val();
    var prod_status = $('#prod_status').val();
    var whse_qty = $('#whse_qty').val();
    var prod_factor = $('#prod_factor').val();
    var cWH = $('#cWH').val();
    var data_id = $('#pricing_id').val();

    compute_net();

    var prod_np = $('#prod_np').val();
    var prod_amt = $('#prod_amt').val();

    var action = $('#raction').val();
    var ndx = $('#rndx').val();

    prod_desc = prod_desc.replace(/["']/g, "");

    if(action == 'S'){
        var rows_l = 0;
        if($("input[name='so_details[]']").length){
            
            var c = 0;
            $("input[name='so_details[]']").each(function(ndx){
                var r = $(this).attr('rel');
                if(r > c)
                    c = r;
            });
            rows_l = c;
            rows_l++;

        }else{
            rows_l = 1;
        }

        tso.row.add([
            prod_id,
            prod_desc,
            cName2,
            prod_pricing,
            prod_unit,
            prod_qty,
            prod_price,
            prod_dsc,
            prod_np,
            prod_amt,
            '<a class="ml10" href="javascript:void(0)" id="delr'+rows_l+'" onClick="openDel('+rows_l+')"><i class="icon-cross2 text-danger"></i></a>'
            ]).draw();

        var so_html = item_id + '|' + prod_desc + '|';
            so_html += cName2 + '|' + prod_pricing + '|';
            so_html += prod_unit + '|' + prod_qty + '|';
            so_html += prod_price + '|' + prod_dsc + '|';
            so_html += prod_np + '|' + prod_amt + '|';
            so_html += prod_status + '|' + whse_qty + '|';
            so_html += prod_factor + '|' + cWH + '|';
            so_html += data_id;

        var in_html = '<input type="hidden" id="r' + rows_l + '" rel="' + rows_l + '" name="so_details[]" value="' + so_html + '" />';

        $('#so_details_rows').append(in_html);
    }

    $('#so_add').get(0).reset();
    $('#modal-so-details').modal('hide');
});


function openDel(r){
    $('#del_so_details').attr('rel',r);
    $('#modal-so-delete').modal('show');
}

function delRow(e){

    var r = $(e).attr('rel');
    $('#r'+r).remove();

    tso.row($('#delr'+r).parents('tr')).remove().draw();
    $('#modal-so-delete').modal('hide');
    
}

function editR(r,ndx){
    var r = $('#r'+r).val();
    r_rw = r.split('|');

    $('#prod_id').val(r_rw[0]);
    $('#item_id').val(r_rw[0]);
    $('#prod_desc').val(r_rw[1]);
    $('#cName2').val(r_rw[2]);
    $('#prod_pricing').val(r_rw[3]);
    $('#prod_unit').val(r_rw[4]);
    $('#prod_qty').val(r_rw[5]);
    $('#prod_price').val(r_rw[6]);
    $('#prod_dsc').val(r_rw[7]);
    $('#prod_np').val(r_rw[8]);
    $('#prod_amt').val(r_rw[9]);
    $('#prod_status').val(r_rw[10]);
    $('#whse_qty').val(r_rw[11]);
    $('#prod_factor').val(r_rw[12]);
    $('#cWH').val(r_rw[13]);
    $('#pricing_id').val(r_rw[14]);
    $('#raction').val('E');
    $('#rndx').val(ndx);
    $('#erowval').val(ndx);

    $('#modal-so-details').modal('show');

}

function setProdID(e){
    $('#prod_id').val($(e).data('item-no'));
    $('#item_id').val($(e).data('item-no'));
    $('#prod_desc').val($(e).data('prod-desc'));
    $('#long_desc').val($(e).data('prod-long-desc'));

    $.ajax({
        url: URL + '/sales_order/get_product_units',
        type: "POST",
        data:{cItemNo: $(e).data('item-no')},
        dataType: 'json',
        success: function(data){

            var opts = '';
            $.each(data, function(k,v){

                opts += '<option value="' + v.cUnit + '">' + v.cUnit + '</option>';
            });

            $('#prod_unit').append(opts);                

        }
    });

    $('#modal-item-list').modal('hide');
}

function compute_net(){
    
    var prod_price = parseFloat($('#prod_price').val());
        prod_dsc = parseFloat($('#prod_dsc').val());
        prod_qty = parseInt($('#prod_qty').val());

    var net_price = 0;
    var np = 0;
    if(prod_price && prod_dsc){
        net_price = prod_price - prod_dsc;
        np = parseFloat(net_price);
    }else{
        np = 0;
    }

    var amt = np*prod_qty;
    
    $('#prod_np').val(np);
    $('#prod_amt').val(amt);

}
