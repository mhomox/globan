<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sales extends Model
{
    use HasFactory;

    protected $table = 'SALES';

    protected $primaryKey = 'cInvNo';

    public $incrementing = false;
    protected $keyType = 'string';

    // Allow mass assignment for the following fields
    protected $fillable = [
        'cCompanyID',
        'cDivision',
        'cInvNo',
        'dDate',
        'cType',
        'cCode',
        'cMSCode',
        'cSMan',
        'cTerm',
        'cIntTerm',
        'cPayType',
        'nGross',
        'nReturn',
        'nPaid',
        'nCredit',
        'nDebit',
        'nBalance',
        'nCOG',
        'nTPCGross',
        'nTPCPaid',
        'cTPCName',
        'cStatus',
        'lPosted',
        'lClosed',
        'lCancelled',
        'lApproved',
        'cApprovedBy',
        'lBad',
        'lAllow',
        'dAllowDate',
        'dBadDate',
        'cRemarks',
        'cPDCode',
        'cDocType',
        'cPCCode',
        'lPrintPosted',
        'cProjInvType',
        'nFreightCharges',
        'nFreightAllow',
        'nVAT',
        'cTaxType',
        'cCurrency',
        'nCurrencyRate',
        'nPrint',
        'cDSRNo',
        'dBillFrom',
        'dBillTo',
        'dDueDate',
        'cVATType',
        'cPONumber',
        'cEWTType',
        'nEWT',
        'cType2',
        'cCancellationRemarks',
        'cCRemarks',
        'cRefNo',
        'cACCPacNo',
        'cName',
        'cWH',
        'lSApproved',
        'dDateExpiry',
        'cArea',
        'cSMName',
        'cAddress',
        'nTaxRate',
        'cAttachment1',
        'cAttachment2',
        'created_at',
        'updated_at'
    ];

    public $timestamps = true;

    public function salesDetails()
    {
        return $this->hasMany(SalesT::class, 'cInvNo', 'cInvNo');
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'cName', 'cName');
    }
}
