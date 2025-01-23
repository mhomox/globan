// Fetch customers to populate the dropdown
function fetchCustomers() {
    $.ajax({
        url: "/customers/",
        method: "GET",
        success: function (response) {
            const select = $("#cName");
            select.empty();
            select.append(new Option("Select a Customer", "")); // Default option

            response.forEach((customer) => {
                select.append(new Option(customer.cName, JSON.stringify({ id: customer.id, cName: customer.cName })));
            });
        },
        error: function (error) {
            console.error("Error fetching customers:", error);
        },
    });
}

$("#cName").change(function () {
    const selectedValue = $(this).val();
    if (selectedValue) {
        const { id, cName } = JSON.parse(selectedValue);

        // Set hidden input fields to store cName for the form
        $("#hiddenCName").val(cName); // Add this hidden input for saving cName
        fetchCustomerDetails(id); // Fetch details using the ID
    } else {
        resetCustomerDetails();
    }
});
// Fetch customer details
function fetchCustomerDetails(customerId) {
    $.ajax({
        url: `/customers/${customerId}/details`,
        method: "GET",
        success: function (response) {
            if (response) {
                $("#cCode").val(response.cCode || "");
                $("#cAddress").val(response.cAddress || "");
            } else {
                resetCustomerDetails();
            }
        },
        error: function (error) {
            console.error("Error fetching customer details:", error);
        },
    });
}

// Helper function to reset customer details
function resetCustomerDetails() {
    $("#cCode").val("");
    $("#cAddress").val("");
}

// Fetch customers on page load
$(document).ready(fetchCustomers);

function previewBilling(event) {
    event.preventDefault();
    const formData = new FormData(document.querySelector("form"));
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    fetch("{{ route('preview.billing') }}", {
        method: "POST",
        headers: {
            "X-CSRF-TOKEN": csrfToken,
        },
        body: formData,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.blob();
        })
        .then((blob) => {
            const objectUrl = URL.createObjectURL(blob);
            window.open(objectUrl, "_blank");
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
