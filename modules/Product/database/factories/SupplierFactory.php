<?php

namespace Modules\Product\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Product\Models\Brand;
use Modules\Product\Models\Supplier;

class SupplierFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = Supplier::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $suppliers = [
            'Sysco',
            'Cargill',
            'Unilever',
            'Procter & Gamble',
            'Johnson & Johnson',
            'PepsiCo',
            'Nestle',
            'Coca-Cola',
            '3M',
            'Kellogg',
            'General Mills',
            'IBM',
            'Intel',
            'Oracle',
            'Cisco',
            'Schneider Electric',
            'Siemens',
            'Volkswagen Group',
            'ExxonMobil',
            'Chevron',
            'Pfizer',
            'Merck',
            'GlaxoSmithKline',
            'AstraZeneca',
            'Novartis'
        ];

        $brandIds = Brand::all()->pluck('id')->toArray();
        $selectedBrandIds = $this->faker->randomElements($brandIds, 3);

        return [
            'name' => $this->faker->unique()->randomElement($suppliers),
            'phone' => $this->faker->unique()->phoneNumber(),
            'address' => $this->faker->address(),
            'pan' => $this->faker->unique()->randomNumber(8),
            'contact_person' => $this->faker->unique()->name(),
            'brands' => $selectedBrandIds,
        ];
    }
}
