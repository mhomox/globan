$("#account_form").validate({
    rules: {
        cAcctNo: {
            required: true
        },
        cTitle: {
            required: true
        },
        cType: {
            required: true
        },
        cCategory: {
            required: true
        },
        cLevel: {
            required: true
        },
        cGeneral: {
            required: true
        },
        cClass: {
            required: true
        }
    },
    messages: {
        cAcctNo: {
            required: 'Account ID is required'
        },
        cTitle: {
            required: 'Account Title is required'
        },
        cType: {
            required: 'Type is required'
        },
        cCategory: {
            required: 'Category is required'
        },
        cLevel: {
            required: 'Level is required'
        },
        cGeneral: {
            required: 'General is required'
        },
        cClass: {
            required: 'Class is required'
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
       
        // if($('input[name="si_details[]"]').length == 0)
        // {
        //     $("#error_messages").show();
        //     $('#error_messages').addClass('alert alert-danger');
        //     $('#error_messages').append('Details are required');
        // }else{
        //     $("#error_messages").html('');
        //     $('#error_messages').removeClass('alert alert-danger'); 
        //     $("#error_messages").hide();
            
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

// $('#cName').change(function(){
      
//     if($(this).val() != ''){

//         var r = $(this).find('option:selected').attr('rel');
//         var rs = r.split('|');

//         $('#cCode').val(rs[0]);
//         $('#cTerm').val(rs[1]);
//         $('#cIntTerm').val(rs[2]);
   
//     }

// });

// $('#cPDDesc').change(function(){

//     if($(this).val() != ''){

//         $('#cPDCode').val($(this).find('option:selected').attr('rel'));
//     }

// });

// $('#modal-si-details').on('shown.bs.modal', function () {

//    if($('#cName').val() == ''){
//         var html = '<div class="alert alert-danger">Please populate customer field first</div>';
//         $('#no_customer_alert').html(html);

//         $('#dr_nos').prop('disabled', true);
//    }else{
//         $('#no_customer_alert').html('');
//         $('#dr_nos').prop('disabled', false);

//         $.ajax({
//             url: URL + '/sales_invoice/get_dr_nos',
//             type: "POST",
//             data:{cCode: $('#cCode').val()},
//             dataType: 'json',
//             success: function(data){

//                 var html = '';
//                 var options = '';
//                 if(data){

//                     $.each(data, function(k,v){
//                         options += '<option value="' + v.cDRNo +'">' + v.cDRNo + '</option>';
//                     })

//                 }

//                 html += '<select class="form-control" id="dr_nos" name="dr_nos" onChange="populateSIDetails()">'
//                 html += '<option value=""></option>';
//                 html += options + '</select>';
//                 $('#dr_nos_div').html(html);
                
//             }
//         });
//    }

// });

// var p_t = $('#tbl_delivery_receipt_details').DataTable({
//     "autoWidth": !1,
//     "responsive": !0
// });

// $('#submit_dr_t').click(function(){

//     var prod_ids = '';
//     $('.prod_ids:checkbox:checked').each(function () {
//        var prod_id = (this.checked ? $(this).val() : "");
//        prod_ids += prod_id + ',';
       
//     });

//     var pids = prod_ids.replace(/.$/,"");
//     var cDRNo = $('#dr_nos').val();

    
//     $.ajax({
//         url: URL + '/sales_invoice/get_dr_t_by_ids',
//         type: "POST",
//         data:{
//             pids: pids,
//             cDRNo: cDRNo
//         },
//         dataType: 'json',
//         success: function(data){

//             var html = '';
//             var tds = '';
//             var si_details = $('#si_details_div').html();
//             var dr = '';
//             var i = 0;

//             var rows_l = 0;
//             var c = 0;
//             if($("input[name='si_details[]']").length){
                
//                 rows_l = $("input[name='si_details[]']").length;
//                 rows_l++;

//             }else{
//                 rows_l = 1;
//             }

//             $.each(data, function(k,v){

//                 var cDesc = v.cDesc;
//                     cDesc = cDesc.replace(/["']/g, "");
                
//                 p_t.row.add([
//                     cDRNo,
//                     v.cItemNo,
//                     v.cWName,
//                     cDesc,
//                     v.cUnit,
//                     v.nQty,
//                     v.nPrice,
//                     v.nAmount,
//                     '&nbsp;',
//                     '<a class="ml10" href="javascript:void(0)" id="delr'+rows_l+'" onClick="openDel('+rows_l+')"><i class="icon-cross2 text-danger"></i></a>'
//                 ]).draw();

//                 si = cDRNo + '|'
//                      + v.cItemNo + '|'
//                      + v.cWH + '|'
//                      + cDesc + '|'                             
//                      + v.cUnit + '|'
//                      + v.nQty + '|'
//                      + v.nPrice + '|'
//                      + v.nAmount + '|'
//                      + v.cCosting + '|'
//                      + v.nFactor + '|'
//                      + v.nRefIdentity;
                
//                 si_details += '<input type="hidden" id="si_details_' + rows_l + '" name="si_details[]" value="' + si + '"/>';
            
//                 rows_l++;
//             });

//             $('#si_details_div').html(si_details);
            
//             $('#modal-si-details').modal('hide');

//         }
//     });
    

// });


// function populateSIDetails(){
//     var cDRNo = $('#dr_nos').val();
    
//     $.ajax({
//         url: URL + '/sales_invoice/get_dr_t',
//         type: "POST",
//         data:{cDRNo: cDRNo},
//         dataType: 'json',
//         success: function(data){

//             var html = '';
//             var tds = '';
            
//             $.each(data, function(k,v){
                
//                 tds += ' <tr>\
//                             <td><input type="checkbox" class="prod_ids" name="prod_ids[]" value="' + v.cItemNo + '" /></td>\
//                             <td>' + v.cItemNo + '</td>\
//                             <td>' + v.cDesc + '</td>\
//                             <td>' + v.cWName + '</td>\
//                             <td>' + v.cUnit + '</td>\
//                             <td>' + v.nQty + '</td>\
//                             <td>' + v.nPrice + '</td>\
//                             <td>' + v.nAmount + '</td>\
//                         </tr>';
//             });

//             html += '<table id="tbl_si" class="table table-bordered">\
//                         <thead class="thead-default">\
//                             <tr>\
//                                 <th>Select</th>\
//                                 <th>Product ID</th>\
//                                 <th>Product Description</th>\
//                                 <th>Warehouse</th>\
//                                 <th>Unit</th>\
//                                 <th>Quantity</th>\
//                                 <th>Price</th>\
//                                 <th>Amount</th>\
//                             </tr>\
//                     </thead>\
//                     <tbody>\
//                     ' + tds + '\
//                 </tbody>\
//             </table>';
         
//             $('#dr_t_table').html(html);
            

//         }
//     });
    
// }

// function openDel(r){
//     $('#del_details').attr('rel',r);
//     $('#modal-delete').modal('show');
// }

// function delRow(e){

//     var r = $(e).attr('rel');
//     $('#si_details_'+r).remove();

//     p_t.row($('#delr'+r).parents('tr')).remove().draw();
//     $('#modal-delete').modal('hide');
    
// }