@extends('layouts.app')

@section('content')
<div class="container mt-5">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <h2>Create Invoice</h2>
    <form id="invoiceForm">
        <div class="form-group">
            <label for="customer">Customer</label>
            <select class="form-control" id="customer" name="customer_id" required>
                <!-- Customer options will be populated here -->
                @foreach($customers as $customer)
                    <option value="{{ $customer->id }}">{{ $customer->name }}</option>
                @endforeach
            </select>
        </div>

        <div class="form-group">
            <label for="items">Items</label>
            <div id="items">
                <!-- Products will be dynamically added here -->
            </div>
            <button type="button" id="addItem" class="btn btn-primary">Add Item</button>
        </div>

        <div class="form-group">
            <label for="discounts">Discount</label>
            <select class="form-control" id="discounts" name="discount_id">
                <!-- Discount options -->
                @foreach($discounts as $discount)
                    <option value="{{ $discount->id }}">{{ $discount->name }}</option>
                @endforeach
            </select>
        </div>

        <div class="form-group">
            <label for="taxes">Tax</label>
            <select class="form-control" id="taxes" name="tax_id">
                <!-- Tax options -->
                @foreach($taxes as $tax)
                    <option value="{{ $tax->id }}">{{ $tax->name }}</option>
                @endforeach
            </select>
        </div>

        <button type="submit" class="btn btn-success">Create Invoice</button>
    </form>
</div>
@push('scripts')


<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    // JavaScript to handle adding items dynamically and submitting the form
    $('#addItem').click(function() {
        var itemIndex = $('#items .form-group').length;  // To ensure each item has a unique name
        $('#items').append(`
            <div class="form-group">
                <input type="text" class="form-control" name="items[${itemIndex}][product_name]" placeholder="Product Name">
                <input type="number" class="form-control" name="items[${itemIndex}][quantity]" placeholder="Quantity">
                <button type="button" class="btn btn-danger removeItem">Remove</button>
            </div>
        `);
    });

    $(document).on('click', '.removeItem', function() {
        $(this).closest('.form-group').remove();
    });

    $.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$('#invoiceForm').submit(function(e) {
    e.preventDefault();
    var data = $(this).serialize();

    $.post({
        url: '/api/invoices',
        data: data,
        success: function(response) {
            alert(response.message);  // Success message
        },
        error: function(xhr) {
            var errorMessage = xhr.responseJSON?.message || 'Error while creating invoice.';
            alert(errorMessage);
        }
    });
});

</script>
<script src="{{ asset('assets/js/customize.js') }}"></script>
@endpush
@endsection
