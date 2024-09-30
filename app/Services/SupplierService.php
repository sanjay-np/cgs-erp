<?php

namespace App\Services;

use App\Contracts\Supplier\SupplierRepositoryInterface;
use App\Contracts\Supplier\SupplierServiceInterface;

class SupplierService implements SupplierServiceInterface
{
    protected $supplierRepository;
    
    public function __construct(SupplierRepositoryInterface $supplierRepository)
    {
        $this->supplierRepository = $supplierRepository;
    }

    public function paginate(int $perPage)
    {
        return $this->supplierRepository->paginate(perPage: $perPage);
    }

    public function store(array $data)
    {
        return $this->supplierRepository->store(data: $data);
    }

    public function find(int $id)
    {
        return $this->supplierRepository->find(id: $id);
    }

    public function findAll()
    {
        return $this->supplierRepository->findAll();
    }

    public function update(array $data, int $id)
    {
        return $this->supplierRepository->update(data: $data, id: $id);
    }

    public function delete(int $id)
    {
        return $this->supplierRepository->delete(id: $id);
    }
}