import React, { useState } from 'react'
import FormDrawer from '@/Components/Overlays/FormDrawer'
import { useForm } from '@inertiajs/react'
import { HStack, Input, InputGroup, Loader, SelectPicker, Uploader } from 'rsuite'
import InputError from '@/Components/InputError'
import { loadingText, productStatus, productType } from '@/Lib/Constants'

export default function ProductForm(props) {

    const { drawerRef, selected, type } = props
    const [loading, setLoading] = useState(false)
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        sku: '',
        bar_code: '',
        description: '',
        main_image: null,
        gallery_images: [],
        price: '',
        purchase_price: '',
        stock_qty: '',
        category_ids: [],
        brand_id: '',
        supplier_id: '',
        tags: '',
        product_type: '',
        status: '',

    })

    const onSubmit = () => {

    }

    const formClear = () => {
        reset();
    }

    return (
        <FormDrawer
            ref={drawerRef}
            processing={processing}
            onSubmit={onSubmit}
            drawerTitle={selected ? 'Edit Product' : 'Add New Product'}
            reset={formClear}
            size='sm'
        >
            {loading ? <Loader backdrop content={loadingText} vertical /> :
                <>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Product Title</label>
                        <InputGroup>
                            <Input
                                placeholder='Product Title...'
                                value={data.title}
                                onChange={(value) => setData('title', value)}
                            />
                        </InputGroup>
                        <InputError message={errors.title} className='mt-2' />
                    </div>
                    <HStack spacing={12} className='mb-4'>
                        <div className="form-item w-1/3">
                            <label className='text-gray-600 font-semibold mb-1 block'>SKU</label>
                            <InputGroup>
                                <Input
                                    placeholder='SKU...'
                                    value={data.sku}
                                    onChange={(value) => setData('sku', value)}
                                />
                            </InputGroup>
                            <InputError message={errors.sku} className='mt-2' />
                        </div>
                        <div className="form-item w-1/3">
                            <label className='text-gray-600 font-semibold mb-1 block'>Bar Code</label>
                            <InputGroup>
                                <Input
                                    placeholder='Code...'
                                    value={data.bar_code}
                                    onChange={(value) => setData('bar_code', value)}
                                />
                            </InputGroup>
                            <InputError message={errors.name} className='mt-2' />
                        </div>
                        <div className="form-item w-1/3">
                            <label className='text-gray-600 font-semibold mb-1 block'>Price</label>
                            <InputGroup>
                                <Input
                                    placeholder='Price...'
                                    value={data.price}
                                    onChange={(value) => setData('price', value)}
                                />
                            </InputGroup>
                        </div>
                    </HStack>
                    <div className="form-item mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Description</label>
                        <Input
                            as={"textarea"}
                            rows={8}
                            placeholder="Description..."
                            value={data.description}
                            onChange={(value) => setData('description', value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Featured Image</label>
                        <Uploader
                            listType="picture-text"
                            action="/"
                            autoUpload={false}
                            draggable
                            onChange={(file) => {
                                setData("main_image", file[0]);
                            }}
                        >
                            <div style={{
                                height: 200,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <span>
                                    Click or Drag files to this area to upload
                                </span>
                            </div>
                        </Uploader>
                    </div>

                    <div className="form-item mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Gallery Images</label>
                        <Uploader
                            listType='picture-text'
                            action='/'
                            autoUpload={false}
                            draggable
                            onChange={(file) => {
                                setData("gallery_images", file);
                            }}
                        >
                            <div style={{
                                height: 200,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <span>
                                    Click or Drag files to this area to upload
                                </span>
                            </div>
                        </Uploader>
                    </div>
                    <div className="form-item mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Product Type</label>
                        <SelectPicker
                            className='w-full'
                            data={productType}
                            placement='auto'
                            value={data.product_type}
                            onChange={(value) => setData('product_type', value)}
                        />
                    </div>
                    {/* 
                        Todo: Add Product attributes & product vairations
                    */}
                    <div className="form-item mb-4">
                        <HStack>
                            <div className="form-item w-1/2">
                                <label className='text-gray-600 font-semibold mb-1 block'>Supplier</label>
                                <SelectPicker
                                    className='w-full'
                                    data={[]}
                                    value={data.supplier_id}
                                    onChange={(value) => setData('supplier_id', value)}
                                />
                            </div>
                            <div className="form-item w-1/2">
                                <label className='text-gray-600 font-semibold mb-1 block'>Brand</label>
                                <SelectPicker
                                    className='w-full'
                                    data={[]}
                                    value={data.brand_id}
                                    onChange={(value) => setData('brand_id', value)}
                                />
                            </div>
                        </HStack>
                    </div>
                    <div className="form-item mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Status</label>
                        <SelectPicker
                            className='w-full'
                            data={productStatus}
                            value={data.status}
                            onChange={(value) => setData('status', value)}
                        />
                    </div>
                </>
            }
        </FormDrawer>
    )
}
