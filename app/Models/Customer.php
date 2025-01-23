<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    // Link to existing table
    protected $table = 'customers';

    // Primary key (optional, defaults to 'id')
    protected $primaryKey = 'id';

    // Disable auto-increment if the primary key is non-numeric
    public $incrementing = true;

    // For varchar IDs, set the key type (optional)
    protected $keyType = 'int';

    // Disable timestamps if not using 'created_at' and 'updated_at'
    public $timestamps = true;

    // Fillable fields
    protected $fillable = [
        'id', 'name', 'email', 'phone', 'address',
        'cCompanyID', 'cCode', 'cName', 'lCompany',
        'lIndividual', 'cCustomerType', 'cLastName',
        'cFirstName', 'cMI', 'cAddress', 'cCity',
        'cState', 'cCountry', 'cZip', 'cTel1', 'cTel2',
        'cFax', 'cEMail1', 'cEMail2', 'cContact',
        'cTradeName', 'cName2', 'cContact', 'created_at', 'updated_at',

    ];
}
