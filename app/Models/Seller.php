<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Seller
 *
 * @property int $id
 * @property string $name
 * @property string $status
 * @property string|null $project_id
 * @property string|null $referrer
 * @property string|null $invite_code
 * @property bool $onboarding_completed
 * @property \Illuminate\Support\Carbon|null $onboarding_completed_at
 * @property array|null $onboarding_data
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Number> $numbers
 * @property-read int|null $numbers_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Seller newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Seller newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Seller query()
 * @method static \Illuminate\Database\Eloquent\Builder|Seller whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Seller whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Seller whereInviteCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Seller whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Seller whereOnboardingCompleted($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Seller whereOnboardingCompletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Seller whereOnboardingData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Seller whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Seller whereReferrer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Seller whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Seller whereUpdatedAt($value)
 * @method static \Database\Factories\SellerFactory factory($count = null, $state = [])
 * @method static Seller create(array $attributes = [])
 * @method static Seller firstOrCreate(array $attributes = [], array $values = [])
 * 
 * @mixin \Eloquent
 */
class Seller extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'status',
        'project_id',
        'referrer',
        'invite_code',
        'onboarding_completed',
        'onboarding_completed_at',
        'onboarding_data',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'onboarding_completed' => 'boolean',
        'onboarding_completed_at' => 'datetime',
        'onboarding_data' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the numbers associated with this seller.
     */
    public function numbers(): HasMany
    {
        return $this->hasMany(Number::class);
    }
}