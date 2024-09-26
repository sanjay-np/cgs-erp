<?php

namespace App\Contracts\Product;

interface AttributeRepositoryInterface
{
    public function paginate(int $perPage);

    public function findAll();

    public function store(array $data);

    public function update(array $data, int $id);

    public function destroy(int $id);
}
