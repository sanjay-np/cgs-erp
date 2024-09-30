import { useForm } from '@inertiajs/react';
import { useState } from 'react'
import { Input, InputGroup, Loader, TagInput } from 'rsuite';
import InputError from '../InputError';
import FormDrawer from '../Overlays/FormDrawer';

export default function AttributeForm(props) {

    const { drawerRef, selected, type } = props;
    
    const [loading, setLoading] = useState(false)
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        values: []
    })

    const formClear = () => {
        reset();
    };

    const onSubmit = () => {

    }


    return (
        <FormDrawer
            ref={drawerRef}
            processing={processing}
            onSubmit={onSubmit}
            drawerTitle={selected ? "Edit Attribute" : "Create New Attribute"}
            reset={formClear}
        >
            {loading ? <Loader backdrop content='fetching...' vertical /> :
                <>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Brand Name</label>
                        <InputGroup>
                            <Input
                                placeholder="Attribute Name..."
                                value={data.name}
                                onChange={e => setData('name', e)}
                            />
                        </InputGroup>
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Description</label>
                        <InputGroup>
                            <Input
                                placeholder="Attribute Description..."
                                as="textarea"
                                rows={3}
                                value={data.description}
                                onChange={e => setData('description', e)}
                            />
                        </InputGroup>
                    </div>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Attribute Values</label>
                        <TagInput
                            trigger={['Enter', 'Space', 'Comma']}
                            placeholder="Attributes Values..."
                            onCreate={(value) => {
                                setData('values', [...data.values, value])
                            }}
                            style={{ width: '100%', height: 100 }}
                            value={data.values}
                            onClean={() => setData('values', [])}
                        />
                    </div>
                </>
            }
        </FormDrawer>
    )
}