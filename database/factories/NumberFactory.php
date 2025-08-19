<?php

namespace Database\Factories;

use App\Models\Buyer;
use App\Models\Number;
use App\Models\Seller;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Number>
 */
class NumberFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Number>
     */
    protected $model = Number::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = fake()->randomElement(['in_queue', 'accepted', 'finalized', 'returned_to_queue']);
        $acceptedAt = in_array($status, ['accepted', 'finalized']) ? fake()->dateTimeBetween('-1 month') : null;
        $finalizedAt = $status === 'finalized' ? fake()->dateTimeBetween($acceptedAt ?? '-1 month') : null;
        
        return [
            'number' => fake()->unique()->phoneNumber(),
            'type' => fake()->randomElement(['mobile', 'landline', 'voip']),
            'country' => fake()->countryCode(),
            'status' => $status,
            'buyer_id' => fake()->optional(0.7)->randomElement(Buyer::pluck('id')->toArray()),
            'seller_id' => fake()->optional(0.8)->randomElement(Seller::pluck('id')->toArray()),
            'bypass_the_queue' => fake()->boolean(10), // 10% chance
            'prefer_fast_queue' => fake()->boolean(30), // 30% chance
            'accepted_at' => $acceptedAt,
            'finalized_at' => $finalizedAt,
        ];
    }

    /**
     * Indicate that the number is in queue.
     */
    public function inQueue(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'in_queue',
            'accepted_at' => null,
            'finalized_at' => null,
        ]);
    }

    /**
     * Indicate that the number is accepted.
     */
    public function accepted(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'accepted',
            'accepted_at' => fake()->dateTimeBetween('-1 week'),
            'finalized_at' => null,
        ]);
    }

    /**
     * Indicate that the number is finalized.
     */
    public function finalized(): static
    {
        $acceptedAt = fake()->dateTimeBetween('-1 month');
        
        return $this->state(fn (array $attributes) => [
            'status' => 'finalized',
            'accepted_at' => $acceptedAt,
            'finalized_at' => fake()->dateTimeBetween($acceptedAt),
        ]);
    }
}