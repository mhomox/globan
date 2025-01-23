<!DOCTYPE html>
<html lang="en">
<head>
    <title>Billing Statement Preview</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
        }
        .header, .footer {
            text-align: center;
            margin: 10px 0;
        }
        .table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        .table th, .table td {
            border: 1px solid #ddd;
            padding: 8px;
        }
        .table th {
            text-align: left;
            background-color: #f2f2f2;
        }
        .text-right {
            text-align: right;
        }
    </style>
</head>

<body>
    <div class="header">
        <img src="{{ public_path('assets/img/logo.png') }}" style="height: 60px;" alt="Logo">
        <h2>Billing Statement</h2>
    </div>

    <div>
        <h4>Bill Details</h4>
        <p><b>Bill Number:</b> {{ $sale->cRefNo }}</p>
        <p><b>Customer Name:</b> {{ $sale->cName }}</p>
        <p><b>Address:</b> {{ $sale->cAddress }}</p>
        <p><b>Contact:</b> {{ $sale->customer->cContact ?? 'N/A' }}</p>
        <p><b>Date:</b> {{ formatDate($sale->dDate) }}</p>
    </div>

    <div>
        <h4>Flight Details</h4>
        <table class="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>DATE</th>
                    <th>CALLSIGN</th>
                    <th>REGMARK</th>
                    <th>ACFT TYPE</th>
                    <th>DEP</th>
                    <th>DES</th>
                    <th>DISTANCE (KM)</th>
                    <th>FAC</th>
                    <th>AMOUNT</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($sale->salesDetails as $detail)
                    <tr>
                        <td>{{ $loop->iteration }}</td>
                        <td>{{ $detail->dDateFlight }}</td>
                        <td>{{ $detail->cCallSign }}</td>
                        <td>{{ $detail->cRegMark }}</td>
                        <td>{{ $detail->cAcftType }}</td>
                        <td>{{ $detail->cDeparture }}</td>
                        <td>{{ $detail->cDestination }}</td>
                        <td>{{ number_format($detail->nDistance, 2) }}</td>
                        <td>{{ number_format($detail->nFactor, 0) }}</td>
                        <td>${{ number_format($detail->nAmount, 2) }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div class="text-right">
        <h3>Total Amount: ${{ number_format($sale->salesDetails->sum('nAmount'), 2) }}</h3>
    </div>

    <div class="footer">
        <p>Thank you for using ComUnionERP</p>
    </div>
</body>
</html>
