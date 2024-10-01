import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, router } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import SearchComp from '@/Components/Search/Index'
import AddButton from '@/Components/Button/AddButton'
import TableComp from '@/Components/Table/TableComp'
import { categoryTableHeader } from '@/Lib/Constants'
import DeleteModal from '@/Components/Overlays/DeleteModal'


export default function Index({ auth, categories }) {

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
        router.delete(route('categories.destroy', selected), {
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
        <Authenticated user={auth.user} activeKey={['products']}>
            <Head title="Categories" />
            <div className="page-content categories-page">
                <div className="top-section">
                    <div className='title-wrapper'>
                        <h1 className='title'>Categories</h1>
                        <ul className='breadcrumb'>
                            <li><LayoutGridIcon color='gray' size={20} /></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Dashboard</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Products</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Categories</span></li>
                        </ul>
                    </div>
                </div>
                <div className="content-wrapper bg-white rounded-md pb-8">
                    <div className="top-wrapper p-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className='w-full'>
                                <SearchComp />
                            </div>
                            <div className="add-category">
                                <AddButton handleOnClick={() => {
                                    setType("add")
                                    drawerRef.current.open()
                                }} />
                            </div>
                        </div>
                    </div>
                    <TableComp
                        data={categories?.data}
                        checkboxCell={true}
                        columns={categoryTableHeader}
                        acttions={{ editAction, deleteAction }}
                    />
                </div>
            </div>            
            <DeleteModal
                title="Category"
                ref={deleteModalRef}
                deleteAction={handleDelete}
            />
        </Authenticated>
    )
}
