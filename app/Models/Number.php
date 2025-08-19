<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Number
 *
 * @property int $id
 * @property string $number
 * @property string $type
 * @property string $country
 * @property string $status
 * @property int|null $buyer_id
 * @property int|null $seller_id
 * @property bool $bypass_the_queue
 * @property bool $prefer_fast_queue
 * @property \Illuminate\Support\Carbon|null $accepted_at
 * @property \Illuminate\Support\Carbon|null $finalized_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Buyer|null $buyer
 * @property-read \App\Models\Seller|null $seller
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Number newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Number newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Number query()
 * @method static \Illuminate\Database\Eloquent\Builder|Number whereAcceptedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Number whereBuyerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Number whereBypassTheQueue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Number whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Number whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Number whereFinalizedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Number whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Number whereNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Number wherePreferFastQueue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Number whereSellerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Number whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Number whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Number whereUpdatedAt($value)
 * @method static \Database\Factories\NumberFactory factory($count = null, $state = [])
 * @method static Number create(array $attributes = [])
 * @method static Number firstOrCreate(array $attributes = [], array $values = [])
 * 
 * @mixin \Eloquent
 */
class Number extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'number',
        'type',
        'country',
        'status',
        'buyer_id',
        'seller_id',
        'bypass_the_queue',
        'prefer_fast_queue',
        'accepted_at',
        'finalized_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'bypass_the_queue' => 'boolean',
        'prefer_fast_queue' => 'boolean',
        'accepted_at' => 'datetime',
        'finalized_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the buyer that owns this number.
     */
    public function buyer(): BelongsTo
    {
        return $this->belongsTo(Buyer::class);
    }

    /**
     * Get the seller that owns this number.
     */
    public function seller(): BelongsTo
    {
        return $this->belongsTo(Seller::class);
    }
}