import { useForm } from '@inertiajs/react'
import React from 'react'
import { Button, Modal } from 'rsuite'

export default function CategoryAlert(props) {

    const { open, setOpen, selected, setSelected } = props
    const { delete: destroy } = useForm({})

    const handleClose = () => {
        setSelected(null)
        setOpen(false)
    }

    const handleDelete = () => {
        destroy(route('categories.destroy', selected), {
            onSuccess: () => {
                setOpen(false)
                setSelected(null)
                toast.success('Success', {
                    description: 'Brand deleted successfully',
                })
            },
        })
    }

    return (
        <React.Fragment>
            <Modal backdrop="static" role="alertdialog" open={open} onClose={handleClose} size="xs" keyboard={false}>
                <Modal.Header>
                    <div className='font-semibold text-xl'>Are you sure?</div>
                </Modal.Header>
                <Modal.Body>
                    Do you really want to delete this brand? This operation cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} appearance="subtle">
                        <span className='font-semibold'>Cancel</span>
                    </Button>
                    <Button onClick={handleDelete} appearance="primary" color='red'>
                        <span className='font-semibold'>Confirm</span>
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}