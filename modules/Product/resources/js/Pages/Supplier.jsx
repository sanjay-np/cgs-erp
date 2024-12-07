import AddButton from '@/Components/Button/AddButton'
import SearchBar from '@/Components/Search/Index'
import TableComp from '@/Components/Table/TableComp'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, router } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { SUPPLIER_TABLE_HEADER } from '../Lib/Constants'
import SupplierForm from '../Components/SupplierForm'
import DeleteModal from '@/Components/Overlays/DeleteModal'
import { toast } from 'sonner'


export default function Supplier({ auth, brands, suppliers }) {

    const [selected, setSelected] = useState(null)
    const [type, setType] = useState("add")
    const drawerRef = useRef(false)
    const deleteModalRef = useRef(false)

    const editAction = (id) => {
        setType("edit")
        setSelected(id)
        drawerRef.current.open()
    }

    const deleteAction = (id) => {
        setSelected(id)
        deleteModalRef.current.open()
    }

    const handleDelete = () => {
        router.delete(route('suppliers.destroy', selected), {
            onSuccess: () => {
                setSelected(null)
                toast.success('Success', {
                    description: 'Supplier deleted successfully',
                })
                deleteModalRef.current.close()
            },
        })
    }

    return (
        <Authenticated user={auth?.user} activeKey={['products']}>
            <Head title="Suppliers" />
            <div className="page-content">
                <div className="top-section">
                    <div className='title-wrapper'>
                        <h1 className='title'>Suppliers</h1>
                        <ul className='breadcrumb'>
                            <li><LayoutGridIcon color='gray' size={20} /></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Dashboard</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Products</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Suppliers</span></li>
                        </ul>
                    </div>
                </div>
                <div className="content-wrapper bg-white rounded-md pb-8">
                    <div className="top-wrapper p-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className='w-full'>
                                <SearchBar title={'Suppliers'} />
                            </div>
                            <div className="add-category">
                                <AddButton
                                    handleOnClick={() => {
                                        setType("add")
                                        drawerRef.current.open()
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <TableComp
                        items={suppliers}
                        checkboxCell={true}
                        columns={SUPPLIER_TABLE_HEADER}
                        actions={{ editAction, deleteAction }}
                        pagination={true}
                    />
                </div>
            </div>
            <SupplierForm
                drawerRef={drawerRef}
                selected={selected}
                type={type}
                brands={brands}
            />
            <DeleteModal
                ref={deleteModalRef}
                deleteAction={handleDelete}
            />
        </Authenticated>
    )
}
