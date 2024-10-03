<?php

namespace App\Repositories;

use App\Contracts\Attribute\AttributeRepositoryInterface;
use App\Models\Attribute;

class AttributeRepository implements AttributeRepositoryInterface
{

    protected $model;

    public function __construct(Attribute $model)
    {
        $this->model = $model;
    }

    public function paginate(int $perPage)
    {
        return $this->model->paginate(perPage: $perPage);
    }

    public function findAll()
    {
        return $this->model->all();
    }

    public function store(array $data)
    {
        return $this->model->create($data);
    }

    public function find($id)
    {
        return $this->model->findOrFail($id);
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
