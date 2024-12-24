import React, { useEffect } from 'react'
import FormModal from '@/Components/Overlays/FormModal'
import { Input, InputGroup, Toggle } from 'rsuite'
import { toast } from 'sonner'
import { useForm } from '@inertiajs/react'
import InputError from '@/Components/InputError'

export default function CurrencyForm(props) {

    const { drawerRef, selected, type } = props
    const { data, setData, post, processing, errors, reset, put } = useForm({
        name: '',
        label: '',
        is_current: false,
    })

    useEffect(() => {
        if (!selected && type !== 'edit') return
        const fetchData = async () => {
            try {
                const res = await axios.get(route('currency.show', selected));
                setData(res?.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [selected])

    const onSubmit = () => {
        if (!selected && type === 'add') {
            post(route('currency.store'), {
                onSuccess: () => {
                    drawerRef.current.close()
                    toast.success('Success', {
                        description: 'Currency added successfully',
                    })
                }
            })
        }
        if (selected && type === 'edit') {
            put(route('currency.update', selected), {
                onSuccess: () => {
                    drawerRef.current.close()
                    toast.success('Success', {
                        description: 'Currency updated successfully',
                    })
                },
            })
        }
    }

    return (
        <FormModal
            size='sm'
            ref={drawerRef}
            processing={processing}
            onSubmit={onSubmit}
            title={type === 'add' ? 'Add Fiscal Year' : 'Edit Fiscal Year'}
            reset={reset}
        >
            <div className="form-wrapper">
                <div className="form-item mb-4">
                    <label className='text-gray-600 font-semibold mb-1'>Name</label>
                    <InputGroup inside>
                        <Input
                            placeholder="Currency Name..."
                            className="text-base"
                            type="text"
                            value={data.name}
                            onChange={(value) => setData('name', value)}
                        />
                    </InputGroup>
                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="form-item mb-4">
                    <label className='text-gray-600 font-semibold mb-1'>Label</label>
                    <InputGroup inside>
                        <Input
                            placeholder="Currency Label..."
                            className="text-base"
                            type="text"
                            value={data.label}
                            onChange={(value) => setData('label', value)}
                        />
                    </InputGroup>
                    <InputError message={errors.label} className="mt-2" />
                </div>
                <div className="form-item mb-4">
                    <label className='text-gray-600 font-semibold mb-1 pe-3'>Is Current</label>
                    <Toggle
                        checked={data.is_current}
                        onChange={(value) => setData('is_current', value)}
                        size={'lg'} color='green'
                    />
                    <InputError message={errors.is_current} className="mt-2" />
                </div>
            </div>
        </FormModal>
    )
}