<?php

namespace App\Contracts\Product;

interface ProductRepositoryInterface
{
    public function paginate(int $perPage);

    public function findAll();

    public function store(array $data);
}
