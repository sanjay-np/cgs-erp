<?php

namespace Modules\Expenses\Repositories;

use App\Interfaces\CrudRepositoryInterface;
use Modules\Expenses\Models\Expense;

class ExpensesRepository implements CrudRepositoryInterface
{
    protected $model;

    public function __construct(Expense $model)
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

    public function findorFail($id)
    {
        return $this->model->findOrFail($id);
    }

    public function update(array $data, int  $id)
    {
        return $this->model->find($id)->update($data);
    }

    public function delete(int $id)
    {
        return $this->model->find($id)->delete();
    }
}
