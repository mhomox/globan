if($('#success').val() == 1){
    new Noty({
        theme: ' alert alert-success alert-styled-left p-0 bg-white',
        text: $('#message').val(),
        type: 'success',
        progressBar: false,
        closeWith: ['button']
    }).show();
}

$("#profile_form").validate({
    rules: {
        FirstName: {
            required: true
        },
        LastName: {
            required: true
        },
        email: {
            required: true,
            email: true
        }
    },
    messages: {
        FirstName: {
            required: 'First Name is required'
        },
        LastName: {
            required: 'Last Name is required'
        },
        email: {
            required: 'Email is required',
            email: 'Incorrect Email'
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

$("#password_form").validate({
    rules: {
        password: {
            required: true
        },
        confirm_password: {
            required: true
        }
    },
    messages: {
        password: {
            required: 'Password is required'
        },
        confirm_password: {
            required: 'Repeat Password is required'
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


