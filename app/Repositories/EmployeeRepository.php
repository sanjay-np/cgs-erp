<?php

namespace App\Repositories;

use App\Contracts\Employee\EmployeeRepositoryInterface;
use App\Models\Employee;

class EmployeeRepository implements EmployeeRepositoryInterface
{
    protected $model;

    public function __construct(Employee $employee)
    {
        $this->model = $employee;
    }

    public function paginate(int $perPage)
    {
        return $this->model->paginate($perPage);
    }

    public function store(array $data)
    {
        return $this->model->create($data);
    }

    public function find(int $id)
    {
        return $this->model->find($id);
    }

    public function findAll()
    {
        return $this->model->all();
    }

    public function update(array $data, int $id)
    {
        return $this->model->find($id)->update($data);
    }

    public function delete(int $id)
    {
        return $this->model->find($id)->delete();
    }
}
