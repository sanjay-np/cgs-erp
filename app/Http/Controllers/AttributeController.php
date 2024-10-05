<?php

namespace App\Http\Controllers;

use App\Contracts\Attribute\AttributeServiceInterface;
use App\Contracts\AttributeValue\AttributeValueServiceInterface;
use App\Http\Requests\AttributeRequest;
use Inertia\Inertia;

class AttributeController extends Controller
{
    protected $attributeService, $attributeValueService;

    public function __construct(AttributeServiceInterface $attributeService, AttributeValueServiceInterface $attributeValueService)
    {
        $this->attributeService = $attributeService;
        $this->attributeValueService = $attributeValueService;
    }

    public function index()
    {
        $attributes = $this->attributeService->paginate(perPage: 10);
        return Inertia::render('Attributes/Index', [
            'attributes' => $attributes
        ]);
    }


    public function store(AttributeRequest $request)
    {
        $attribute = $this->attributeService->store(data: $request->validated());
        return redirect(to: route(name: 'attributes.index'));
    }

    public function find($id){
        return $this->attributeService->find(id: $id);
    }


    public function update(AttributeRequest $request, $id)
    {
        $attribute = $this->attributeService->update(data: $request->validated(), id: $id);
        return redirect(to: route(name: 'attributes.index'));
    }


    public function destroy($id)
    {
        $this->attributeService->destroy(id: $id);
        return redirect(to: route(name: 'attributes.index'));
    }
}
