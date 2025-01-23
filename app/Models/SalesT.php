<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesT extends Model
{
    use HasFactory;

    protected $table = 'SALES_T';

    protected $primaryKey = 'cInvNo';

    public $incrementing = false;
    protected $keyType = 'decimal';

    // Allow mass assignment for the following fields
    protected $fillable = [
        'cCompanyID', 'cDivision', 'nIdentity', 'cInvNo', 'cRefNo', 'nRefIdentity', 'cWH',
        'cItemNo', 'cDesc', 'cLongDesc', 'cUnit', 'nQty', 'nPrice', 'nAmount', 'cCosting',
        'nCost', 'cBatchID', 'cPricing', 'nUDPrice', 'cDiscount', 'nTPC', 'nSMCom', 'nFactor',
        'dDateFlight', 'cFlightType', 'cCallSign', 'cRegMark', 'cAcftType', 'cDeparture',
        'cDestination', 'nDistance', 'nWeight', 'created_at', 'updated_at'
    ];

    // Disable timestamps if not using created_at and updated_at
    public $timestamps = true;

    // Relationship with the Sales model
    public function sale()
    {
        return $this->belongsTo(Sales::class, 'cInvNo', 'cInvNo');
    }
}
