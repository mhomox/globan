$("#report_form").validate({
    rules: {
        dDateFrom: {
            required: true
        },
        dDateTo: {
            required: true
        }
    },
    messages: {
        dDateFrom: {
            required: 'From Date is required'
        },
        dDateTo: {
            required: 'To Date required'
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
       
       
    $("#error_messages").html('');
    $('#error_messages').removeClass('alert alert-danger'); 
    $("#error_messages").hide();
    
    // var light_4 = form.closest('#modal-report-filters');
    
    // $(light_4).block({
    //     message: '<i class="icon-spinner4 spinner"></i>',
    //     overlayCSS: {
    //         backgroundColor: '#fff',
    //         opacity: 0.8,
    //         cursor: 'wait'
    //     },
    //     css: {
    //         border: 0,
    //         padding: 0,
    //         backgroundColor: 'none'
    //     }
    // });

    form.submit();
        
    }
});

if($('#error').val() == 1){
        new Noty({
        theme: ' alert alert-danger alert-styled-left p-0 bg-white',
        text: $('#message').val(),
        type: 'error',
        progressBar: false,
        closeWith: ['button']
        }).show();
}

function openReportFilter(cReportID,mval2){

        $('#cReportName').val(mval2);
        $('#cReportID').val(cReportID);
        $('#modal-report-filters').modal('show');
        }

        $('#modal-report-filters').on('shown.bs.modal', function () {

        var cReportID = $('#cReportID').val();

        $.ajax({
        url: URL + '/report_center/get_variables',
        data: {
        	cReportID: cReportID
        },
        type: 'POST',
        dataType:'json',
        success: function(data){
        	var dt = '<option value=""></option>';
        	if(data.cData){
        		
        		$.each(data.cData, function(v,d){
        			dt += '<option value="' + d.data_value + '">' + d.data_display + '</option>';
        		});

        		$('#cDataFrom').empty().append(dt);
        		$('#cDataTo').empty().append(dt);
        	}



        }
        });


});