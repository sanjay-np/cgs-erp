<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreRequest;
use App\Http\Requests\Category\UpdateRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function __construct(
        private Category $model
    ) {}


    public function index(Request $request)
    {
        $categories = $this->model->query()
            ->with(['parent:id,name'])
            ->applyFilter($request->all())
            ->orderBy('id', 'desc')
            ->paginate($request->per_page ?? config('pos.per_page'))
            ->withQueryString();


        $parentCategories = $this->model->query()
            ->withTrashed()
            ->select(["id", "name"])->get()?->map(fn($item) => [
                'label' => $item->name,
                'value' => $item->id
            ]);

        return Inertia::render('category/index', [
            'categories' => Inertia::merge($categories->items()),
            'pagination' => Arr::except($categories->toArray(), ['data', 'links']),
            'parentCategories' => $parentCategories
        ]);
    }


    public function store(StoreRequest $request)
    {
        $item = $this->model->create($request->getRequested());
        if ($item) {
            return to_route('categories.index');
        }
    }


    public function show($id)
    {
        return $this->model->findOrFail($id);
    }


    public function update(UpdateRequest $request, $id)
    {
        $item = $this->model->findOrFail($id)->update($request->getRequested());
        if ($item) {
            return to_route('categories.index');
        }
    }


    public function destroy($id)
    {
        $item = $this->model->findOrFail($id)->delete();
        if ($item) {
            return to_route('categories.index');
        }
    }
}
