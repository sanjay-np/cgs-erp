<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('reference');
            $table->unsignedBigInteger('supplier_id')->nullable();
            $table->unsignedBigInteger('fiscal_year_id')->nullable();
            $table->integer('tax_percentage')->default(0);
            $table->float('tax_amount')->default(0);
            $table->float('discount_amount')->default(0);
            $table->float('shipping_amount')->default(0);
            $table->float('total_amount');
            $table->float('paid_amount');
            $table->float('due_amount');
            $table->string('status');
            $table->string('payment_status');
            $table->string('payment_method');
            $table->string('type')->default('unofficial');
            $table->text('note')->nullable();
            $table->foreign('supplier_id')->references('id')->on('suppliers')->nullOnDelete();
            $table->foreign('fiscal_year_id')->references('id')->on('fiscal_years')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchases');
    }
};