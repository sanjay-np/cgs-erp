<?php

namespace App\Providers;

use App\Contracts\Attribute\AttributeRepositoryInterface;
use App\Contracts\Attribute\AttributeServiceInterface;
use App\Contracts\AttributeValue\AttributeValueRepositoryInterface;
use App\Contracts\AttributeValue\AttributeValueServiceInterface;
use App\Contracts\Brand\BrandRepositoryInterface;
use App\Contracts\Brand\BrandServiceInterface;
use App\Contracts\Category\CategoryRepositoryInterface;
use App\Contracts\Category\CategoryServiceInterface;
use App\Contracts\Customer\CustomerRepositoryInterface;
use App\Contracts\Customer\CustomerServiceInterface;
use App\Contracts\Employee\EmployeeRepositoryInterface;
use App\Contracts\Employee\EmployeeServiceInterface;
use App\Contracts\Product\ProductRepositoryInterface;
use App\Contracts\Product\ProductServiceInterface;
use App\Contracts\Supplier\SupplierRepositoryInterface;
use App\Contracts\Supplier\SupplierServiceInterface;
use App\Repositories\AttributeRepository;
use App\Repositories\AttributeValueRepository;
use App\Repositories\BrandRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\CustomerRepository;
use App\Repositories\EmployeeRepository;
use App\Repositories\ProductRepository;
use App\Repositories\SupplierRepository;
use App\Services\AttributeService;
use App\Services\AttributeValueService;
use App\Services\BrandService;
use App\Services\CategoryService;
use App\Services\CustomerService;
use App\Services\EmployeeService;
use App\Services\ProductService;
use App\Services\SupplierService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {

        $this->app->bind(abstract: AttributeRepositoryInterface::class, concrete: AttributeRepository::class);
        $this->app->bind(abstract: AttributeServiceInterface::class, concrete: AttributeService::class);

        $this->app->bind(abstract: AttributeValueRepositoryInterface::class, concrete: AttributeValueRepository::class);
        $this->app->bind(abstract: AttributeValueServiceInterface::class, concrete: AttributeValueService::class);

        $this->app->bind(abstract: BrandRepositoryInterface::class, concrete: BrandRepository::class);
        $this->app->bind(abstract: BrandServiceInterface::class, concrete: BrandService::class);

        $this->app->bind(abstract: SupplierRepositoryInterface::class, concrete: SupplierRepository::class);
        $this->app->bind(abstract: SupplierServiceInterface::class, concrete: SupplierService::class);

        $this->app->bind(abstract: CategoryRepositoryInterface::class, concrete: CategoryRepository::class);
        $this->app->bind(abstract: CategoryServiceInterface::class, concrete: CategoryService::class);

        $this->app->bind(abstract: EmployeeRepositoryInterface::class, concrete: EmployeeRepository::class);
        $this->app->bind(abstract: EmployeeServiceInterface::class, concrete: EmployeeService::class);

        $this->app->bind(abstract: ProductRepositoryInterface::class, concrete: ProductRepository::class);
        $this->app->bind(abstract: ProductServiceInterface::class, concrete: ProductService::class);

        $this->app->bind(abstract: CustomerRepositoryInterface::class, concrete: CustomerRepository::class);
        $this->app->bind(abstract: CustomerServiceInterface::class, concrete: CustomerService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
