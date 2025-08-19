<?php

namespace Database\Seeders;

use App\Models\Buyer;
use App\Models\Number;
use App\Models\Seller;
use Illuminate\Database\Seeder;

class TelegramBotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create buyers
        $buyers = Buyer::factory(20)->create();
        
        // Create some banned buyers
        Buyer::factory(5)->banned()->create();
        
        // Create sellers
        $sellers = Seller::factory(15)->create();
        
        // Create some active sellers
        Seller::factory(10)->active()->create();
        
        // Create some pending sellers
        Seller::factory(8)->pending()->create();
        
        // Create numbers and associate them with buyers and sellers
        Number::factory(100)->create();
        
        // Create some numbers with specific statuses
        Number::factory(20)->inQueue()->create();
        Number::factory(15)->accepted()->create();
        Number::factory(30)->finalized()->create();
        
        $this->command->info('Telegram bot data seeded successfully!');
    }
}