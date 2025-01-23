$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

var invoiceId = 123;  // Example invoice ID
var paymentData = {
    amount: 100,
    payment_method: 'credit_card'
};

$.ajax({
    url: '/invoices/' + invoiceId + '/payments',  // Ensure this is a POST request
    type: 'POST',
    data: paymentData,
    success: function(response) {
        alert('Payment recorded successfully!');
    },
    error: function(xhr) {
        alert('Error: ' + xhr.responseText);
    }
});
