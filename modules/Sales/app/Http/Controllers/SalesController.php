<?php

namespace Modules\Sales\Http\Controllers;

use App\Http\Controllers\Controller;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Sales\Events\SaleCreated;
use Modules\Sales\Http\Requests\StoreRequest;
use Modules\Sales\Http\Requests\UpdateRequest;
use Modules\Sales\Repositories\SaleRepository;
use Modules\Sales\Services\SaleService;

class SalesController extends Controller
{
    protected $saleRepository, $saleService;

    public function __construct(
        SaleRepository $saleRepository,
        SaleService $saleService
    ) {
        $this->saleRepository = $saleRepository;
        $this->saleService = $saleService;
    }

    public function index(Request $request)
    {
        return Inertia::render('Sales::Index');
    }

    public function store(StoreRequest $request)
    {
        $item = $this->saleRepository->store($request->getValidated());
        event(new SaleCreated($item));
        if ($item) {
            $this->saleService->createSaleDetail($request->getValidatedProducts(), $item->id);
            $this->saleService->createSalePayment($request->getValidatedPayment(), $item->id);
            return to_route('sales.index');
        }
    }

    public function show(int $id)
    {
        return $this->saleRepository->findOrFail($id);
    }

    public function update(UpdateRequest $request, int $id)
    {
        $item = $this->saleRepository->update($request->getValidated(), $id);
        if ($item) {
            return to_route('sales.index');
        }
    }

    public function destroy(int $id)
    {
        $item = $this->saleRepository->delete($id);
        if ($item) {
            return to_route('sales.index');
        }
    }

    public function test()
    {
        $pdf = Pdf::loadView('sales::invoices.sales');
        return $pdf->stream('invoice.pdf');
        // return view('');
    }
}
