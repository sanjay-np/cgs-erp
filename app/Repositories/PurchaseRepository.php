<?php

namespace App\Repositories;

use App\Contracts\Purchase\PurchaseRepositoryInterface;
use App\Models\Purchase;

class PurchaseRepository implements PurchaseRepositoryInterface
{
    protected $model;

    public function __construct(Purchase $model)
    {
        $this->model = $model;
    }

    public function paginate(int $perPage)
    {
        return $this->model->paginate($perPage);
    }

    public function findAll()
    {
        return $this->model->all();
    }

    public function store(array $data)
    {
        return $this->model->create($data);
    }

    public function find(int $id)
    {
        return $this->model->find($id);
    }

    public function update(array $data, int $id)
    {
        return $this->model->find($id)->update($data);
    }

    public function destroy(int $id)
    {
        return $this->model->find($id)->delete();
    }
}
