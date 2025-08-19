<?php

namespace Database\Factories;

use App\Models\Buyer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Buyer>
 */
class BuyerFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Buyer>
     */
    protected $model = Buyer::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company(),
            'is_banned' => fake()->boolean(20), // 20% chance of being banned
            'ban_reason' => fake()->optional(0.2)->sentence(),
            'mode' => fake()->randomElement(['standard', 'premium', 'enterprise']),
            'branches_chat_id' => fake()->optional()->numerify('chat_###########'),
            'max_numbers_per_branch' => fake()->numberBetween(5, 50),
        ];
    }

    /**
     * Indicate that the buyer is banned.
     */
    public function banned(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_banned' => true,
            'ban_reason' => fake()->sentence(),
        ]);
    }

    /**
     * Indicate that the buyer is not banned.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_banned' => false,
            'ban_reason' => null,
        ]);
    }
}