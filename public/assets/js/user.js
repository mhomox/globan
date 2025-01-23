if($('#success').val() == 1){
    new Noty({
        theme: ' alert alert-success alert-styled-left p-0 bg-white',
        text: $('#message').val(),
        type: 'success',
        progressBar: false,
        closeWith: ['button']
    }).show();
}
            
$("#user_form").validate({
    rules: {
        FirstName: {
            required: true
        },
        LastName: {
            required: true
        },
        UserID: {
            required: true
        },
        Password2: {
            required: true
        },
        cCompanyID: {
            required: true
        },
        DeptID: {
            required: true
        },
        RoleID: {
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
        UserID: {
            required: 'User ID is required'
        },
        Password2: {
            required: 'Password is required'
        },
        cCompanyID: {
            required: 'Company is required'
        },
        DeptID: {
            required: 'Department is required'
        },
        RoleID: {
            required: 'Role is required'
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

function delResetDialog(UserID)
{
    $('#del_details').attr('href',URL + '/user/reset_password/' + UserID);

    $('#d_UserID').val(UserID);

    $('#modal-reset').modal('show');
}

