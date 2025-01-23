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
            $('#error_messages').addClass('alert alert-info');
        } else {
            $('#error_messages').removeClass('alert alert-info');
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
    
});


