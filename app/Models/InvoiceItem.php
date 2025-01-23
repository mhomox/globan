<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Item;
class InvoiceItem extends Model
{
    use HasFactory;

    use HasFactory;

    protected $fillable = ['invoice_id', 'product_id', 'quantity', 'total'];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function product()
    {
        return $this->belongsTo(Item::class);
    }
}
