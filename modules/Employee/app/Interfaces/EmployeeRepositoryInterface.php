<?php

namespace Modules\Employee\Interfaces;

interface EmployeeRepositoryInterface
{
    public function paginate(int $perPage);

    public function store(array $data);

    public function show(int $id);

    public function update(array $data, int $id);

    public function destroy(int $id);

    public function take(int $count);

    public function search(string $search_qry);
}