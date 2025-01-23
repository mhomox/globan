let itemCounter = 0;
let usdToPhpRate = 1;
let phpToUsdRate = 1;

// Fetch exchange rates on page load
$(document).ready(function () {
    fetchExchangeRates();
    addInvoiceItem(); // Add the initial row

});

// Restrict input to numbers only, prevent 'e'
$(document).on('input', '.nDistance, .nWeight', function() {
    this.value = this.value.replace(/[^0-9.]/g, '');
});

// Add event listener for the currency toggle dropdown
$(document).on('change', '#currencyToggle', function () {
    const selectedCurrency = $(this).val();
    updateDisplayedTotal(selectedCurrency);
});

function fetchExchangeRates() {
    const url = `/exchange-rates`;

    $.ajax({
        url: url,
        type: "GET",
        success: function (response) {
            // Check the structure of response data
            if (response.data) {
                usdToPhpRate = response.data.PHP || 1;
                phpToUsdRate = 1 / usdToPhpRate;
            } else {
                console.error("Failed to fetch exchange rates:", response.error);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error fetching exchange rates:", error);
        }
    });
}

// Function to add an invoice item row
function addInvoiceItem() {
    itemCounter++;

    const newItemRow = `
    <tr id="itemRow${itemCounter}">
        <td><input type="date" class="form-control" placeholder="Enter DATE" required></td>
        <td>
            <select class="form-control flightType" onchange="calculateRow(${itemCounter})">
                <option value="international">International</option>
                <option value="domestic">Domestic</option>
            </select>
        </td>
        <td><input type="text" class="form-control" placeholder="Enter CALLSIGN" required></td>
        <td><input type="text" class="form-control" placeholder="Enter REG MARK" required></td>
        <td><input type="text" class="form-control" placeholder="Enter ACFT TYPE" required></td>
        <td><input type="text" class="form-control" placeholder="Enter DEP" required></td>
        <td><input type="text" class="form-control" placeholder="Enter DES" required></td>
        <td><input type="number" class="form-control nDistance" placeholder="Enter DIST" oninput="calculateRow(${itemCounter})" required></td>
        <td><input type="number" class="form-control nWeight" placeholder="Enter WEIGHT" oninput="updateWeightFactor(${itemCounter})" required></td>
        <td><input type="number" class="form-control nFactor" oninput="calculateRow(${itemCounter})" readonly></td>
        <td><input class="form-control amountField" id="amountField${itemCounter}" disabled readonly></td>
        <!-- Hidden fields to store USD and PHP values -->
        <input type="hidden" class="hiddenAmountPHP" id="hiddenAmountPHP${itemCounter}" />
        <input type="hidden" class="hiddenAmountUSD" id="hiddenAmountUSD${itemCounter}" />
        <td><button type="button" class="btn btn-danger" onclick="removeInvoiceItem(${itemCounter})">Remove</button></td>
    </tr>`;

    $("#invoiceItems").append(newItemRow);
    updateTotalAmount(); // Update grand total after adding a row
}

// Function to remove an invoice item
function removeInvoiceItem(itemId) {
    $(`#itemRow${itemId}`).remove();
    updateTotalAmount(); // Update grand total after removal
}

// Function to calculate the total for a specific row
function calculateRow(rowId) {
    const distance = parseFloat($(`#itemRow${rowId} .nDistance`).val()) || 0; // KM
    const factor = parseFloat($(`#itemRow${rowId} .nFactor`).val()) || 0;    // FAC
    const flightType = $(`#itemRow${rowId} .flightType`).val();              // Flight type

    // Calculate the intermediate amount (KM / 100 * FAC)
    let amount = (distance / 100) * factor;
    let total = 0;
    let currency = "";

    // Apply flight type multiplier
    if (flightType === "international") {
        total = amount * 1.30; // Multiply by $1.30 for international
        currency = "USD";
    } else if (flightType === "domestic") {
        total = amount * 0.65; // Multiply by ₱0.65 for domestic
        currency = "USD";
    }

    // If the currency is PHP and the flight type is domestic, convert from USD to PHP
    if (currency === "USD" && flightType === "domestic") {
        total = total * usdToPhpRate; // Convert the total from USD to PHP
        currency = "PHP"; // Set the currency to PHP
    }

    // Store the values in hidden fields for later use
    if (currency === "USD") {
        $(`#hiddenAmountUSD${rowId}`).val(total);  // Store total in USD
        $(`#hiddenAmountPHP${rowId}`).val((total * usdToPhpRate).toFixed(2)); // Convert to PHP and store
    } else if (currency === "PHP") {
        $(`#hiddenAmountPHP${rowId}`).val(total);  // Store total in PHP
        $(`#hiddenAmountUSD${rowId}`).val((total * phpToUsdRate).toFixed(2)); // Convert to USD and store
    }

    // Format the total with commas and two decimal places
    const formattedTotal = total.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    // Update the row's fields
    $(`#amountField${rowId}`).val(`${formattedTotal} ${currency}`); // Final amount with currency
    $(`#totalAmount${rowId}`).val(amount.toFixed(2)); // Intermediate calculation (D / 100 * W)

    updateTotalAmount(); // Update grand total after the calculation
}

// Function to update the weight factor based on weight input
function updateWeightFactor(rowId) {
    const weight = parseFloat($(`#itemRow${rowId} .nWeight`).val()) || 0; // Weight in tons
    let weightFactor = 0;

    // Check if the weight is provided (not zero or empty)
    if (weight === 0) {
        // If no weight is provided, clear the nFactor field and return
        $(`#itemRow${rowId} .nFactor`).val('');
        return;
    }

    // Assign weight factor based on weight ranges
    if (weight <= 15) {
        weightFactor = 7;
    } else if (weight >= 16 && weight <= 30) {
        weightFactor = 14;
    } else if (weight >= 31 && weight <= 60) {
        weightFactor = 21;
    } else if (weight >= 61 && weight <= 100) {
        weightFactor = 28;
    } else if (weight >= 101 && weight <= 200) {
        weightFactor = 35;
    } else if (weight >= 201 && weight <= 300) {
        weightFactor = 42;
    } else if (weight >= 301 && weight <= 400) {
        weightFactor = 49;
    } else if (weight > 400) {
        weightFactor = 56;
    }

    // Set the weight factor value in the respective field
    $(`#itemRow${rowId} .nFactor`).val(weightFactor);

    // Call calculateRow to update the amounts based on the new weight factor
    calculateRow(rowId);
}

// Function to update the overall total amount
// Update the displayed total based on selected currency
function updateDisplayedTotal(currency) {
    let totalUSD = 0, totalPHP = 0;

    // Sum up all USD and PHP hidden amounts
    $(".hiddenAmountUSD").each(function () {
        totalUSD += parseFloat($(this).val()) || 0;
    });

    $(".hiddenAmountPHP").each(function () {
        totalPHP += parseFloat($(this).val()) || 0;
    });

    // Format and display the total based on the selected currency
    if (currency === "USD") {
        const formattedUSD = totalUSD.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        $("#totalAmount").val(formattedUSD);
    } else if (currency === "PHP") {
        const formattedPHP = totalPHP.toLocaleString('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        $("#totalAmount").val(formattedPHP);
    }
}

// Call this function after row calculations to update the dropdown display
function updateTotalAmount() {
    let totalUSD = 0, totalPHP = 0;

    // Calculate totals
    $(".hiddenAmountUSD").each(function () {
        totalUSD += parseFloat($(this).val()) || 0;
    });

    $(".hiddenAmountPHP").each(function () {
        totalPHP += parseFloat($(this).val()) || 0;
    });

    // Update the dropdown with the initially selected currency
    const selectedCurrency = $("#currencyToggle").val();
    updateDisplayedTotal(selectedCurrency);
}


// Function to generate the cInvNo with incrementing number
function generateTransactionNo() {
    console.log("generateTransactionNo is running...");

    // Fetch the last transaction number from the server
    fetch('/get-last-transaction-no')
        .then((response) => response.json())
        .then((data) => {
            console.log("Server response:", data); // Check what the server is returning

            let lastNumber = data.lastTransactionNo ? parseInt(data.lastTransactionNo) + 1 : 1;

            const transactionNumber = ('000000' + lastNumber).slice(-8);
            const cInvNo = `BS-${transactionNumber}`;

            console.log("Generated Transaction No:", cInvNo);

            document.querySelector('input[name="cInvNo"]').value = cInvNo;
        })
        .catch((error) => {
            console.error('Error fetching the last transaction number:', error);
        });
}

// Save transaction and increment only after a successful save
function saveTransaction() {
    const cInvNo = document.querySelector('input[name="cInvNo"]').value;

    // Prepare data to send to the server
    const transactionData = {
        cInvNo: cInvNo,
        // Include other fields as needed
    };

    // Send the transaction data to the server
    fetch('/save-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert('Transaction saved successfully!');
            } else {
                alert('Failed to save transaction.');
            }
        })
        .catch((error) => {
            console.error('Error saving transaction:', error);
        });
}

// Call the function to generate the cInvNo when the page loads
window.onload = generateTransactionNo;
