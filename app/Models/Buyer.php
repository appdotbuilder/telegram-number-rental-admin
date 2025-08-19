<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Buyer
 *
 * @property int $id
 * @property string $name
 * @property bool $is_banned
 * @property string|null $ban_reason
 * @property string|null $mode
 * @property string|null $branches_chat_id
 * @property int $max_numbers_per_branch
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Number> $numbers
 * @property-read int|null $numbers_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Buyer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Buyer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Buyer query()
 * @method static \Illuminate\Database\Eloquent\Builder|Buyer whereBanReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Buyer whereBranchesChatId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Buyer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Buyer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Buyer whereIsBanned($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Buyer whereMaxNumbersPerBranch($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Buyer whereMode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Buyer whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Buyer whereUpdatedAt($value)
 * @method static \Database\Factories\BuyerFactory factory($count = null, $state = [])
 * @method static Buyer create(array $attributes = [])
 * @method static Buyer firstOrCreate(array $attributes = [], array $values = [])
 * 
 * @mixin \Eloquent
 */
class Buyer extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'is_banned',
        'ban_reason',
        'mode',
        'branches_chat_id',
        'max_numbers_per_branch',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_banned' => 'boolean',
        'max_numbers_per_branch' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the numbers associated with this buyer.
     */
    public function numbers(): HasMany
    {
        return $this->hasMany(Number::class);
    }
}