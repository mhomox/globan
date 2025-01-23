var prodIds = [];

$("#so_form").validate({
  rules: {
    cSONo: {
      required: true,
    },
    // cName: {
    //     required: true
    // },
    cCode: {
      required: true,
    },
  },
  messages: {
    cSONo: {
      required: "Sales Order No is required",
    },
    // cName: {
    //     required: 'Customer Name is required'
    // },
    cCode: {
      required: "Customer Code is required",
    },
  },
  ignore: "",
  showErrors: function (errorMap, errorList) {
    var msg = "";
    $.each(errorMap, function (key, value) {
      msg += value + "<br/>";
    });
    $("#error_messages").html(msg);

    this.defaultShowErrors(); // default labels from errorPlacement
    if (this.numberOfInvalids() > 0) {
      $("#error_messages").show();
      $("#error_messages").addClass("alert alert-danger");
    } else {
      $("#error_messages").removeClass("alert alert-danger");
      $("#error_messages").hide();
    }
  },
  submitHandler: function (form) {
    if ($('input[name="so_details[]"]').length == 0) {
      $("#error_messages").show();
      $("#error_messages").addClass("alert alert-danger");
      $("#error_messages").append("Details are required");
    } else {
      $("#error_messages").html("");
      $("#error_messages").removeClass("alert alert-danger");
      $("#error_messages").hide();

      var light_4 = form.closest(".card");

      $(light_4).block({
        message: '<i class="icon-spinner4 spinner"></i>',
        overlayCSS: {
          backgroundColor: "#fff",
          opacity: 0.8,
          cursor: "wait",
        },
        css: {
          border: 0,
          padding: 0,
          backgroundColor: "none",
        },
      });

      form.submit();
    }
  },
});

$("#modal-item-list").on("shown.bs.modal", function () {
  var prodIds = [];

  // var t = $('#tbl_products').DataTable({
  //     "autoWidth": !1,
  //     "responsive": !0,
  //     "stripeClasses": [ 'odd-row', 'even-row' ],
  //     "processing": true,
  //     "serverSide": true,
  //     "paging": true,
  //     "searching": { "regex": true },
  //     "lengthMenu": [ [10, 25, 50, 100], [10, 25, 50, 100] ],
  //     "pageLength": 5,
  //     "ajax": {
  //         url : URL + '/sales_order/get_products_list',
  //         type : "POST"
  //     },
  //      "columns": [
  //         {
  //           "render": function ( data, type, full, meta ) {

  //                  var actionStr = '';

  //                 actionStr += '<a title="view" href="javascript:void(0)" onclick="setProdID(this)" data-item-no = "' + full.cItemNo + '" data-prod-long-desc = "' + full.cLongDesc + '" data-prod-price = "' + full.nStdCost+ ' " data-prod-desc = "' + full.cDesc + '" >' + full.cItemNo + '</a>';

  //                  return actionStr;
  //              },
  //         sortable: false,
  //         orderable: false
  //         },
  //         { "data": "cDesc" }
  //     ],
  //     "order": [[ 0, "desc" ]],
  //     "destroy": true,
  //     "dom": '<"dataTables__top"lf>rt<"dataTables__bottom"ip><"clear">'
  // });

  var t = $("#tbl_products").DataTable({
    autoWidth: !1,
    responsive: !0,
    stripeClasses: ["odd-row", "even-row"],
    processing: true,
    serverSide: true,
    paging: true,
    searching: { regex: true },
    lengthMenu: [
      [10, 25, 50, 100],
      [10, 25, 50, 100],
    ],
    pageLength: 10,
    ajax: {
      url: URL + "/sales_order/get_products_list",
      data: {
        cpccode: $("#cPCCode").val(),
      },
      type: "POST",
    },
    columns: [
      {
        render: function (data, type, full, meta) {
          var actionStr = "";

          var cDesc = full.cDesc;

          cDesc = cDesc.replace(/["']/g, "");

          var pr_existing = [];
          $("#tbl_sales_order_details tbody tr").each(function (ndx) {
            var r = $(this).find('td').first().text();
            if(r != 'No data available in table') {
              pr_existing.push(r)
            }
          });

          var is_checked = pr_existing.includes(full.cItemNo) ? 'checked' : '';

          actionStr +=
            '<input type="checkbox" name="prod_ids[]" onClick="getProdId(this)" class="prod_ids" id="prod' +
            full.cItemNo +
            '" data-cItemNo = "' +
            full.cItemNo +
            '" data-nSRPrice = "' +
            full.nSRPrice +
            '" data-nBalance = "' +
            full.nBalance +
            '" data-cCosting = "' +
            full.cCosting +
            '" data-cDesc = "' +
            cDesc +
            '" data-cUnit = "' +
            full.cUnit +
            '" data-nQty="' +
            full.nBalance +
            '"  ' +  is_checked +' value=""/>';

          return actionStr;
        },
        sortable: false,
        orderable: false,
      },
      { data: "cItemNo" },
      { data: "cDesc" },
      { data: "cUnit" },
      { data: "cPCCode" },
    ],
    order: [[0, "desc"]],
    destroy: true,
    dom: '<"dataTables__top"lf>rt<"dataTables__bottom"ip><"clear">',
  });
});

$("#modal-so-details").on("shown.bs.modal", function () {
  $(".select2Mod").select2();

  $("#so_add").validate({
    rules: {
      prod_id: {
        required: true,
      },
      prod_desc: {
        required: true,
      },
      long_desc: {
        required: true,
      },
      cName2: {
        required: true,
      },
      // pricing_id: {
      //     required: true
      // },
      prod_unit: {
        required: true,
      },
      whse_qty: {
        required: true,
      },
      prod_qty: {
        required: true,
      },
      prod_status: {
        required: true,
      },
      prod_price: {
        required: true,
      },
      prod_dsc: {
        required: true,
      },
      prod_np: {
        required: true,
      },
      prod_amt: {
        required: true,
      },
    },
    messages: {
      prod_id: {
        required: "Product ID is required",
      },
      prod_desc: {
        required: "Product Description is required",
      },
      long_desc: {
        required: "Long Description is required",
      },
      cName2: {
        required: "Warehouse is required",
      },
      // pricing_id: {
      //     required: "Pricing is required"
      // },
      prod_unit: {
        required: "Unit is required",
      },
      whse_qty: {
        required: "Warehouse Quantity is required",
      },
      prod_qty: {
        required: "Quantity is required",
      },
      prod_status: {
        required: "Product Availability is required",
      },
      prod_price: {
        required: "Price is required",
      },
      prod_dsc: {
        required: "Discount is required",
      },
      prod_np: {
        required: "Net Price is required",
      },
      prod_amt: {
        required: "Amount is required",
      },
    },
    ignore: "",
    // errorPlacement: function (error, element) {
    //     error.insertAfter(element);
    // },
    showErrors: function (errorMap, errorList) {
      var msg = "";
      $.each(errorMap, function (key, value) {
        msg += value + "<br/>";
      });
      $("#error_modal_messages").html(msg);

      this.defaultShowErrors(); // default labels from errorPlacement
      if (this.numberOfInvalids() > 0) {
        $("#error_modal_messages").show();
        $("#error_modal_messages").addClass("alert alert-danger");
      } else {
        $("#error_modal_messages").removeClass("alert alert-danger");
        $("#error_modal_messages").hide();
      }
    },
  });
});

var tso = $("#tbl_sales_order_details").DataTable({
  autoWidth: !1,
  responsive: !0,
  pageLength: 100,
  bLengthChange : false,
  bInfo:false,  
  // columnDefs: [
  //   {
  //     targets: 5,
  //     render: function (data, type, row, meta) {
  //       data = parseFloat(data);
  //       return numberWithCommas(data.toFixed(2));
  //     },
  //   },
  // ],
  footerCallback: function (row, data, start, end, display) {
    var api = this.api(),
      data;

    // Remove the formatting to get integer data for summation
    var intVal = function (i) {
      return typeof i === "string"
        ? i.replace(/[\$,]/g, "") * 1
        : typeof i === "number"
        ? i
        : 0;
    };

    // Total over all pages
    // t1 = api
    //   .column(5)
    //   .data()
    //   .reduce(function (a, b) {
    //     if (!a) a = 0;
    //     if (!b) b = 0;

    //     a = a.toString().replace(/,/g, "");
    //     b = b.toString().replace(/,/g, "");

    //     return parseFloat(a) + parseFloat(b);
    //   }, 0);

    // // Update footer
    // $( api.column( 6 ).footer() ).html(
    //     '₱'+ numberWithCommas(t1.toFixed(2)) +''
    // );

    // $(api.column(5).footer()).html("₱" + numberWithCommas(t1.toFixed(2)) + "");
  },
});

$("#add_so_details").click(function () {
  $("#raction").val("S");
});

$("#cName").change(function () {
  if ($(this).val() != "") {
    tso.clear().draw();

    var r = $(this).find("option:selected").attr("rel");
    var rs = r.split("|");
    $("#cCode").val(rs[0]);
    $("#cAddress").val(rs[1]);
    $("#cTerm").val(rs[2]);
    $("#cIntTerm").val(rs[3]);
    $("#cContact").val(rs[4]);
    $("#cMSCodeVal").val(rs[5]);
    $("#cType").val($("#cMSCodeVal option:selected").text());

    if ($("#cDelName").val() == "") {
      $("#cDelName").val($(this).val());

      var r = $("#cDelName").find("option:selected").attr("rel");
      var rs = r.split("|");

      $("#cDelCode").val(rs[0]);
      $("#cDelAddress").val(rs[3]);
      $("#cDelContact").val(rs[6]);
      $("#delcTel1").val(rs[7]);
      $("#delcMobile").val(rs[8]);
      $("#delcFax").val(rs[9]);
      $("#delcEmail1").val(rs[10]);
    }
  }
});

$("#cDelName").change(function () {
  if ($(this).val() != "") {
    var r = $(this).find("option:selected").attr("rel");
    var rs = r.split("|");

    $("#cDelCode").val(rs[0]);
    $("#cDelAddress").val(rs[3]);
    $("#cDelContact").val(rs[6]);
    $("#delcTel1").val(rs[7]);
    $("#delcMobile").val(rs[8]);
    $("#delcFax").val(rs[9]);
    $("#delcEmail1").val(rs[10]);
  }
});

$("#cMSDesc").change(function () {
  if ($(this).val() != "") {
    $("#cMSCode").val($(this).find("option:selected").attr("rel"));
  }
});

$("#cEmpName").change(function () {
  if ($(this).val() != "") {
    $("#cSMan").val($(this).find("option:selected").attr("rel"));
  }
});

$("#cName2").change(function () {
  if ($(this).val() != "") {
    $("#cWH").val($(this).find("option:selected").attr("rel"));
  }
});

$("#cName2").change(function () {
  $.ajax({
    url: URL + "/sales_order/get_warehouse_quantity",
    type: "POST",
    data: { cItemNo: $("#item_id").val() },
    dataType: "text",
    success: function (response) {
      if (parseInt(response) > 0) $("#whse_qty").val(parseInt(response));
      else $("#whse_qty").val(0);
    },
  });
});

function price() {
  var price = parseFloat($("#prod_price").val());
  var newPrice = price.toLocaleString(undefined, { maximumFractionDigits: 2 });
  $("#prod_price").val(newPrice);
}

$("#prod_price").change(function () {
  price();

  compute_net();
});

$("#prod_dsc").change(function () {
  compute_net();
});

$("#prod_qty").change(function () {
  var whse_qty = parseInt($("#whse_qty").val());
  var prod_qty = parseInt($("#prod_qty").val());

  $("#prod_status").val("Available");
  if (whse_qty < prod_qty) {
    $("#prod_status").val("No Stock");
  }

  compute_net();
});

$("#save_so_details").click(function () {
  if ($("#so_add").valid() == false) return;

  compute_net();

  var prod_id = $("#prod_id").val();
  var item_id = $("#item_id").val();
  var prod_desc = $("#prod_desc").val();
  var cName2 = $("#cName2").val();
  var prod_unit = $("#prod_unit").val();
  var nprod_pricing = $("#prod_pricing").val();
  var nprod_qty = $("#prod_qty").val();
  var nprod_price = $("#prod_price").val();
  var nprod_dsc = $("#prod_dsc").val();
  var nprod_np = $("#prod_np").val();
  var nprod_amt = $("#prod_amt").val();
  var prod_status = $("#prod_status").val();
  var whse_qty = $("#whse_qty").val();
  var prod_factor = $("#prod_factor").val();
  var cWH = $("#cWH").val();
  var data_id = 1;

  var prod_pricing = nprod_pricing.replace(/,/g, "");
  var prod_qty = nprod_qty.replace(/,/g, "");
  var prod_price = nprod_price.replace(/,/g, "");
  var prod_dsc = nprod_dsc.replace(/,/g, "");
  var prod_np = nprod_np.replace(/,/g, "");
  var prod_amt = nprod_amt.replace(/,/g, "");

  // var prod_np = $('#prod_np').val();
  // var prod_amt = $('#prod_amt').val();

  var action = $("#raction").val();
  var ndx = $("#rndx").val();

  prod_desc = prod_desc.replace(/["']/g, "");

  if (action == "S") {
    var rows_l = 0;
    if ($("#tbl_sales_order_details tbody tr").length) {
      var c = 0;
      $("#tbl_sales_order_details tbody tr").each(function (ndx) {
        var r = $(this).attr("rel");
        if (r > c) c = r;
      });
      rows_l = c;
      rows_l++;
    } else {
      rows_l = 1;
    }

    tso.row
      .add([
        prod_id,
        prod_desc,
        cName2,
        prod_pricing,
        prod_unit,
        prod_qty,
        prod_price,
        // prod_dsc,
        numberWithCommas(parseFloat(prod_np).toFixed(2)),
        numberWithCommas(parseFloat(prod_amt).toFixed(2)),
        '<a class="ml10" href="javascript:void(0)" id="delr' +
          rows_l +
          '" onClick="openDel(' +
          rows_l +
          "," +
          prod_id +
          ')"><i class="icon-subtract  text-danger"></i></a>',
      ])
      .draw();

    var so_html = item_id + "|" + prod_desc + "|";
    so_html += cName2 + "|" + prod_pricing + "|";
    so_html += prod_unit + "|" + prod_qty + "|";
    so_html += prod_price + "|" + prod_dsc + "|";
    so_html += prod_np + "|" + prod_amt + "|";
    so_html += prod_status + "|" + whse_qty + "|";
    so_html += prod_factor + "|" + cWH + "|";
    so_html += data_id;

    var in_html =
      '<input type="hidden" id="r' +
      rows_l +
      '" rel="' +
      rows_l +
      '" name="so_details[]" value="' +
      so_html +
      '" />';

    $("#so_details_rows").append(in_html);
  }

  $("#so_add").get(0).reset();
  $("#modal-so-details").modal("hide");
});

function getProdId(e) {
  var cItemNo = $(e).data("citemno");
  if ($(e).is(":checked")) {
    prodIds.push(cItemNo);
  } else {
    if (prodIds.includes(cItemNo)) {
      prodIds.splice($.inArray(cItemNo, prodIds), 1);
    }
  }
}

$("#btn-checkout").click(function () {
  $.each(prodIds, function (k, v) {
    $.ajax({
      url: URL + "/sales_order/get_product_details",
      type: "POST",
      data: { cItemNo: v },
      dataType: "json",
      success: function (data) {
        var prod_id = data.cItemNo;
        var item_id = data.cItemNo;
        var prod_desc = data.cDesc;
        var cDescVal = prod_desc.replace(/["']/g, "");

        
        var cName2 = data.cWH;
        var prod_unit = data.cUnit;
        var nprod_pricing = data.cCosting;
        //var nprod_qty = data.nBalance;
        var nprod_qty = 1;
        var nprod_price = data.nSRPrice;
        var nprod_dsc = 0;

        var prod_np = parseFloat(nprod_price) - parseFloat(nprod_dsc);
        var prod_amt = parseFloat(prod_np * nprod_qty);
        var prod_status = "Paid";
        var whse_qty = $(this).data("nbalance");
        var prod_factor = 1;
        var cWH = "TEMP";
        var data_id = 1;

        var prod_pricing = nprod_pricing.replace(/,/g, "");
        //var prod_qty = nprod_qty.replace(/,/g, "");
        var prod_qty = 1;
        var prod_price = nprod_price.replace(/,/g, "");

        var rows_l = 0;
        if ($("input[name='so_details[]']").length) {
          var c = 0;
          $("input[name='so_details[]']").each(function (ndx) {
            var r = $(this).attr("rel");
            if (r > c) c = r;
          });
          rows_l = c;
          rows_l++;
        } else {
          rows_l = 1;
        }

        tso.row
          .add([
            prod_id,
            prod_desc.replace(/["']/g, ""),
            prod_unit,
            '<input type="text" style="background: transparent; max-width: 40px; border:none; " class="prod" name="pr_details[' +
              prod_id +
              '][nQty]" onKeyup="updateAmount(this)" value="' +
              prod_qty +
              '">',
            // prod_price,
            // numberWithCommas(parseFloat(prod_amt).toFixed(2)),
            '<a class="ml10" href="javascript:void(0)" id="delr' +
              rows_l +
              '" onClick="openDel(' +
              rows_l +
              ')"><i class="icon-subtract  text-danger" data-keyboard="false"></i></a>',
          ])
          .draw();

        var so_html = item_id + "|" + prod_desc + "|";
        so_html += cName2 + "|" + prod_pricing + "|";
        so_html += prod_unit + "|" + prod_qty + "|";
        so_html += prod_price + "|" + nprod_dsc + "|";
        so_html += prod_np + "|" + prod_amt + "|";
        so_html += prod_status + "|" + whse_qty + "|";
        so_html += prod_factor + "|" + cWH + "|";
        so_html += data_id;

        var in_html =
          '<input type="hidden" id="r' +
          rows_l +
          '" rel="' +
          rows_l +
          '" name="so_details[]" value="' +
          so_html +
          '" />';

        $("#so_details_rows").append(in_html);

        prodIds = [];
      },
    });
  });
  $("#modal-item-list").modal("hide");
});

// $('#btn-checkout').click(function(){

//    //$.each(prodIds,function(k,v){
//    $('.prod_ids:checkbox:checked').each(function () {

//    if($(this).is(':checked')){
//    var prod_id = $(this).data('citemno');
//     var item_id = $(this).data('citemno');
//     var prod_desc = $(this).data('cdesc');
//      var cDescVal = prod_desc.replace(/["']/g, "");
//     var cName2 = "";
//     var prod_unit = $(this).data('cunit');
//     var nprod_pricing = $(this).data('ccosting');
//     var nprod_qty = $(this).data('nbalance');
//     var nprod_price = $(this).data('nsrprice');
//     var nprod_dsc = 0;

//     // if(nprod_qty == 0){
//     //     nprod_qty = 1;
//     // }
//     // alert(nprod_qty);
//     // alert(nprod_qty);
//     // alert(nprod_dsc);

//     var prod_np = parseFloat(nprod_price) - parseFloat(nprod_dsc);
//     var prod_amt = parseFloat(prod_np*nprod_qty);
//     var prod_status = "Paid";
//     var whse_qty = $(this).data('nbalance');
//     var prod_factor = 1;
//     var cWH = 'TEMP';
//     var data_id = 1;

//     var prod_pricing = nprod_pricing.replace(/,/g, "");
//     var prod_qty = nprod_qty.replace(/,/g, "");
//     var prod_price = nprod_price.replace(/,/g, "");
//     // var prod_dsc = nprod_dsc.replace(/,/g, "");
//     //var prod_np = nprod_np.replace(/,/g, "");
//     // var prod_amt = nprod_amt.replace(/,/g, "");

//     var rows_l = 0;
//     if($("input[name='so_details[]']").length){

//         var c = 0;
//         $("input[name='so_details[]']").each(function(ndx){
//             var r = $(this).attr('rel');
//             if(r > c)
//                 c = r;
//         });
//         rows_l = c;
//         rows_l++;

//     }else{
//         rows_l = 1;
//     }

//     tso.row.add([
//         prod_id,
//         prod_desc,
//         prod_unit,
//         '<input type="text" style="width:40px;" class="prod" name="pr_details[' + prod_id + '][nQty]" onKeyup="updateAmount(this)" value="' + prod_qty + '">',
//         prod_price,
//         numberWithCommas(parseFloat(prod_amt).toFixed(2)),
//         '<a class="ml10" href="javascript:void(0)" id="delr'+rows_l+'" onClick="openDel('+rows_l+')"><i class="icon-subtract  text-danger"></i></a>'
//         ]).draw();

//     var so_html = item_id + '|' + prod_desc + '|';
//         so_html += cName2 + '|' + prod_pricing + '|';
//         so_html += prod_unit + '|' + prod_qty + '|';
//         so_html += prod_price + '|' + nprod_dsc + '|';
//         so_html += prod_np + '|' + prod_amt + '|';
//         so_html += prod_status + '|' + whse_qty + '|';
//         so_html += prod_factor + '|' + cWH + '|';
//         so_html += data_id;

//     var in_html = '<input type="hidden" id="r' + rows_l + '" rel="' + rows_l + '" name="so_details[]" value="' + so_html + '" />';

//     $('#so_details_rows').append(in_html);

//     }
//     });
//     $('#modal-item-list').modal('hide');

// });

function openDel(r) {
  $("#del_so_details").attr("rel", r);
  $("#modal-so-delete").modal("show");
}

function delRow(e) {
  var r = $(e).attr("rel");
  $("#r" + r).remove();

  tso
    .row($("#delr" + r).parents("tr"))
    .remove()
    .draw();
  $("#modal-so-delete").modal("hide");
}

// function editR(r,ndx){
//     var r = $('#r'+r).val();
//     r_rw = r.split('|');

//     $('#prod_id').val(r_rw[0]);
//     $('#item_id').val(r_rw[0]);
//     $('#prod_desc').val(r_rw[1]);
//     $('#cName2').val(r_rw[2]);
//     $('#prod_pricing').val(r_rw[3]);
//     $('#prod_unit').val(r_rw[4]);
//     $('#prod_qty').val(r_rw[5]);
//     $('#prod_price').val(r_rw[6]);
//     $('#prod_dsc').val(r_rw[7]);
//     $('#prod_np').val(r_rw[8]);
//     $('#prod_amt').val(r_rw[9]);
//     $('#prod_status').val(r_rw[10]);
//     $('#whse_qty').val(r_rw[11]);
//     $('#prod_factor').val(r_rw[12]);
//     $('#cWH').val(r_rw[13]);
//     $('#pricing_id').val(r_rw[14]);
//     $('#raction').val('E');
//     $('#rndx').val(ndx);
//     $('#erowval').val(ndx);

//     $('#modal-so-details').modal('show');

// }

function setProdID(e) {
  var price = parseFloat($(e).data("prod-price"));

  var newPrice = price.toLocaleString(undefined, { maximumFractionDigits: 2 });
  $("#prod_price").val(newPrice);

  $("#prod_id").val($(e).data("item-no"));
  //$('#prod_price').val(parseFloat(price).toFixed(2));
  $("#item_id").val($(e).data("item-no"));
  $("#prod_desc").val($(e).data("prod-desc"));
  $("#long_desc").val($(e).data("prod-long-desc"));

  $.ajax({
    url: URL + "/sales_order/get_product_units",
    type: "POST",
    data: { cItemNo: $(e).data("item-no") },
    dataType: "json",
    success: function (data) {
      var opts = "";
      $.each(data, function (k, v) {
        opts += '<option value="' + v.cUnit + '">' + v.cUnit + "</option>";
      });

      $("#prod_unit").find("option").remove().end().append(opts);
    },
  });

  $.ajax({
    url: URL + "/sales_order/get_product_warehouse",
    type: "POST",
    data: { cItemNo: $(e).data("item-no") },
    dataType: "json",
    success: function (data) {
      var opts = "";
      $.each(data, function (k, v) {
        opts += '<option value="' + v.cWH + '">' + v.cWH + "</option>";
      });

      $("#cName2").find("option").remove().end().append(opts);
    },
  });

  $("#modal-item-list").modal("hide");
}

function compute_net() {
  var rprod_price = $("#prod_price").val();
  nprod_price = rprod_price.replace(/,/g, "");
  prod_price = parseFloat(nprod_price);
  prod_qty = parseInt($("#prod_qty").val());
  var disc = $("#prod_dsc").val();

  // if(disc.indexOf('%') != -1){

  //     prod_dsc = (parseFloat(disc)/100)*prod_price;
  // }else{
  //     prod_dsc = parseFloat(disc);
  // }

  var net_price = prod_price;
  var np = parseFloat(net_price);
  // if(prod_price && prod_dsc){
  //     net_price = prod_price - prod_dsc;
  //     np = parseFloat(net_price);
  // }

  var amt = parseFloat(np * prod_qty);

  $("#prod_np").val(np.toLocaleString(undefined, { maximumFractionDigits: 2 }));
  $("#prod_amt").val(
    amt.toLocaleString(undefined, { maximumFractionDigits: 2 })
  );
}

function updateAmount(e) {
  var qtyRaw = $(e).val();
  var qty = qtyRaw.replace(/,/g, "");
  var priceRaw = $(e).closest("tr").find("td:eq(4)").text();
  var price = parseFloat(priceRaw.replace(/,/g, ""));
  var amount = qty * price;

  $(e).closest("tr").find("td:eq(5)").text(amount.toFixed(2));

  var total = 0;
  $("#tbl_sales_order_details tr").each(function () {
    var value = parseInt($("td", this).eq(5).text());
    if (!isNaN(value)) {
      total += value;
    }
  });
  $("#tbl_sales_order_details tfoot tr th:eq(5)").text("P " + total.toFixed(2));
}
