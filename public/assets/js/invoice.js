let itemCounter = 0;

// Initialize on page load
$(document).ready(function () {
    addInvoiceItem(); // Add the initial row
});

// Restrict input to numbers, decimal points, and commas, then format as the user types
$(document).on('input', '.nDistance, .nWeight', function () {
    // Remove invalid characters (anything except digits, decimal points, and commas)
    this.value = this.value.replace(/[^0-9.,]/g, '');

    // Ensure proper formatting with commas and only one decimal point
    formatWithCommasAndDecimal(this);
});

$(document).on('input', '.amountField', function () {
    // Remove invalid characters and format dynamically with commas and decimal points
    this.value = this.value.replace(/[^0-9.,]/g, '');
    formatWithCommasAndDecimal(this);
});

// Function to format input with commas and decimal points
function formatWithCommasAndDecimal(inputElement) {
    let value = inputElement.value;

    // Remove all commas for processing
    value = value.replace(/,/g, '');

    // Ensure only one decimal point is allowed
    const parts = value.split('.');
    if (parts.length > 2) {
        value = parts[0] + '.' + parts[1]; // Keep only the first decimal point
    }

    // Split the value into integer and decimal parts
    let [integerPart, decimalPart] = value.split('.');

    // Format the integer part with commas
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Reassemble the number with the decimal part, if it exists
    inputElement.value = decimalPart !== undefined ? `${integerPart}.${decimalPart}` : integerPart;
}

function addInvoiceItem() {
    itemCounter++; // Keep track of the row number

    const table = document.getElementById('invoiceItems');
    const rowIndex = table.rows.length;

    const newItemRow = `
    <tr id="itemRow${itemCounter}">
        <td><input type="date" name="item[${rowIndex}][dDateFlight]" class="form-control" required></td>
        <td>
            <select name="item[${rowIndex}][cFlightType]" class="form-control flightType" onchange="calculateRow(${itemCounter})">
                <option value="international">International</option>
                <option value="domestic">Domestic</option>
            </select>
        </td>
        <td><input type="text" name="item[${rowIndex}][cCallSign]" class="form-control" required></td>
        <td><input type="text" name="item[${rowIndex}][cRegMark]" class="form-control" required></td>
        <td><input type="text" name="item[${rowIndex}][cAcftType]" class="form-control" required></td>
        <td><input type="text" name="item[${rowIndex}][cDeparture]" class="form-control" required></td>
        <td><input type="text" name="item[${rowIndex}][cDestination]" class="form-control" required></td>
        <td><input type="text" name="item[${rowIndex}][nDistance]" class="form-control nDistance" oninput="calculateRow(${itemCounter})" required></td>
        <td><input type="text" name="item[${rowIndex}][nWeight]" class="form-control nWeight" oninput="updateWeightFactor(${itemCounter})" required></td>
        <td><input type="number" name="item[${rowIndex}][nFactor]" class="form-control nFactor" oninput="calculateRow(${itemCounter})" readonly></td>
        <td><input name="item[${rowIndex}][nAmount]" class="form-control amountField" id="amountField${itemCounter}" readonly></td>
        <input type="hidden" class="hiddenAmountPHP" id="hiddenAmountPHP${itemCounter}" />
        <td><button type="button" class="btn btn-danger btn-sm" onclick="removeInvoiceItem(${itemCounter})">Remove</button></td>
    </tr>`;

    // Append the new row to the table
    $("#invoiceItems").append(newItemRow);

    // Update the total amount
    updateTotalAmount();
}

// Function to remove an invoice item
function removeInvoiceItem(itemId) {
    $(`#itemRow${itemId}`).remove();
    updateTotalAmount();
}

// Function to calculate the total for a specific row
function calculateRow(rowId) {
    // Parse nDistance and remove commas before converting to a number
    const distance = parseFloat($(`#itemRow${rowId} .nDistance`).val().replace(/,/g, '')) || 0; // KM
    const factor = parseFloat($(`#itemRow${rowId} .nFactor`).val()) || 0; // Factor
    const flightType = $(`#itemRow${rowId} .flightType`).val(); // Flight type

    // Calculate the total amount for the row
    let amount = (distance / 100) * factor;

    if (flightType === "international") {
        amount *= 1.30; // Multiply by 1.30 for international flights
    } else if (flightType === "domestic") {
        amount *= 0.65; // Multiply by 0.65 for domestic flights
    }

    // Store the amount in a hidden field
    $(`#hiddenAmountPHP${rowId}`).val(amount);

    // Format the amount for display
    const formattedAmount = amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Update the displayed amount in the row
    $(`#amountField${rowId}`).val(formattedAmount);

    // Update the grand total
    updateTotalAmount();
}
// Function to update the weight factor based on weight input
function updateWeightFactor(rowId) {
    // Parse nWeight and remove commas before converting to a number
    const weight = parseFloat($(`#itemRow${rowId} .nWeight`).val().replace(/,/g, '')) || 0;
    let weightFactor = 0;

    if (weight <= 15) {
        weightFactor = 7;
    } else if (weight <= 30) {
        weightFactor = 14;
    } else if (weight <= 60) {
        weightFactor = 21;
    } else if (weight <= 100) {
        weightFactor = 28;
    } else if (weight <= 200) {
        weightFactor = 35;
    } else if (weight <= 300) {
        weightFactor = 42;
    } else if (weight <= 400) {
        weightFactor = 49;
    } else {
        weightFactor = 56;
    }

    $(`#itemRow${rowId} .nFactor`).val(weightFactor);
    calculateRow(rowId);
}
// Function to update the grand total amount
function updateTotalAmount() {
    let totalAmount = 0;

    // Sum up all hidden PHP amounts
    $(".hiddenAmountPHP").each(function () {
        totalAmount += parseFloat($(this).val()) || 0;
    });

    // Format the total amount with commas and two decimal places
    const formattedTotal = totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Update the total amount field
    $("#totalAmount").val(formattedTotal);
}

let currentInvoiceNumber = null;
document.addEventListener("DOMContentLoaded", async function () {
    const generateTransactionNo = async () => {
        const prefix = "BN-";
        const currentYear = new Date().getFullYear().toString().slice(-2);
        let nextNumber = "0001";

        try {
            const response = await fetch('/get-last-transaction-no');
            if (response.ok) {
                const data = await response.json();
                if (data.lastTransactionNo) {
                    const lastNumber = parseInt(data.lastTransactionNo.slice(-4));
                    nextNumber = String(lastNumber + 1).padStart(4, "0");
                }
            }
        } catch (error) {
            console.error("Error fetching last transaction number:", error);
            alert("Could not fetch the last transaction number. Please try again.");
        }

        return `${prefix}${currentYear}${nextNumber}`;
    };

    // Generate and store the current invoice number
    currentInvoiceNumber = await generateTransactionNo();

    // Set the value in a hidden input field
    const transactionInput = document.querySelector('input[name="cInvNo"]');
    if (transactionInput) {
        transactionInput.value = currentInvoiceNumber;
    }
});
