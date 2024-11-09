<?php

namespace Modules\Product\Repositories;

use Modules\Product\Interfaces\Supplier\SupplierRepositoryInterface;
use Modules\Product\Models\Supplier;

class SupplierRepository implements SupplierRepositoryInterface
{
    protected $model;

    public function __construct(Supplier $model)
    {
        $this->model = $model;
    }

    public function paginate(int $perPage)
    {
        return $this->model->paginate($perPage)->withQueryString();
    }

    public function all()
    {
        return $this->model->get();
    }
    public function store(array $data)
    {
        return $this->model->create($data);
    }

    public function show($id)
    {
        return $this->model->find($id);
    }

    public function update(array $data, $id)
    {
        return $this->model->find($id)->update($data);
    }

    public function destroy($id)
    {
        return $this->model->find($id)->delete();
    }

    public function take(int $count)
    {
        return $this->model->take($count)->get();
    }

    public function search(string $search_qry)
    {
        return $this->model->search($search_qry);
    }
}
