if($('#success').val() == 1){
    new Noty({
        theme: ' alert alert-success alert-styled-left p-0 bg-white',
        text: $('#message').val(),
        type: 'success',
        progressBar: false,
        closeWith: ['button']
    }).show();
}
            
$("#sp_form").validate({
    rules: {
        cReportConsoleDir: {
            required: true
        }
    },
    messages: {
        cReportConsoleDir: {
            required: 'Report Console Dir is required'
        }
    },
    ignore: "",
    showErrors: function (errorMap, errorList) {
        var msg = ""
        $.each(errorMap, function(key, value) {
            msg += value + "<br/>";
        });
        $("#error_messages").html(msg);
        
        this.defaultShowErrors();
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

});

