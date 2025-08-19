<?php

namespace Database\Factories;

use App\Models\Seller;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Seller>
 */
class SellerFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Seller>
     */
    protected $model = Seller::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $onboardingCompleted = fake()->boolean(70); // 70% chance of completed onboarding
        
        return [
            'name' => fake()->company(),
            'status' => fake()->randomElement(['active', 'inactive', 'pending', 'suspended']),
            'project_id' => fake()->optional()->uuid(),
            'referrer' => fake()->optional()->name(),
            'invite_code' => fake()->optional()->regexify('[A-Z0-9]{8}'),
            'onboarding_completed' => $onboardingCompleted,
            'onboarding_completed_at' => $onboardingCompleted ? fake()->dateTimeBetween('-1 year') : null,
            'onboarding_data' => $onboardingCompleted ? [
                'step_1' => 'completed',
                'step_2' => 'completed',
                'step_3' => 'completed',
                'completion_date' => fake()->dateTimeThisYear()->format('Y-m-d H:i:s'),
            ] : null,
        ];
    }

    /**
     * Indicate that the seller is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
            'onboarding_completed' => true,
            'onboarding_completed_at' => fake()->dateTimeBetween('-6 months'),
        ]);
    }

    /**
     * Indicate that the seller is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'onboarding_completed' => false,
            'onboarding_completed_at' => null,
            'onboarding_data' => null,
        ]);
    }
}