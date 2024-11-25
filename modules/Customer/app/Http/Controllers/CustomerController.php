<?php

namespace Modules\Customer\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Customer\Http\Requests\StoreRequest;
use Modules\Customer\Http\Requests\UpdateRequest;
use Modules\Customer\Models\Customer;

class CustomerController extends Controller
{
    protected $customerRepository;

    public function __construct(private Customer $model) {}

    public function index()
    {
        $customers = $this->model->orderBy('id', 'desc')->paginate(perPage: 10);
        return Inertia::render('Customer::Index', [
            'customers' => $customers
        ]);
    }

    public function store(StoreRequest $request)
    {
        $item = $this->model->create($request->getRequested());
        if ($item) {
            return to_route('customers.index');
        }
    }

    public function show($id)
    {
        return $this->model->findOrFail($id);
    }

    public function update(UpdateRequest $request, $id)
    {
        // Todo: file validation
        $item = $this->model->findOrFail($id)->update($request->getRequested());
        if ($item) {
            return to_route('customers.index');
        }
    }

    public function destroy($id)
    {
        $item = $this->model->findOrFail($id)->delete();
        if ($item) {
            return to_route('customers.index');
        }
    }

    public function search(Request $request)
    {
        return $this->model->where('name', 'like', '%' . $request->search_qry . '%')
            ->orWhere('code', 'like', '%' . $request->search_qry . '%')
            ->orWhere('phone', 'like', '%' . $request->search_qry . '%')
            ->take(10)
            ->get();
    }
}
