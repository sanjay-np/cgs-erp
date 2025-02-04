import AddButton from '@/Components/Button/AddButton'
import SearchBar from '@/Components/Search/Index'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, router } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import React, { useRef, useState } from 'react'
import ExpensesForm from '../Components/ExpensesForm'
import DeleteModal from '@/Components/Overlays/DeleteModal'
import { toast } from 'sonner'
import { Table } from 'rsuite'
import { DeleteActionButton, EditActionButton } from "@/Components/Table/TableActions"
import { currency } from '@/Lib/Utils'

export default function Index({ auth, expenses }) {

    const { Column, HeaderCell, Cell } = Table;
    const [selected, setSelected] = useState(null);
    const [type, setType] = useState('add')
    const drawerRef = useRef(false)
    const deleteRef = useRef(false)

    const editAction = (id) => {
        setSelected(id)
        setType('edit')
        drawerRef.current.open()
    }

    const deleteAction = (id) => {
        setSelected(id)
        deleteRef.current.open()
    }

    const handleDelete = () => {
        router.delete(route('expenses.destroy', selected), {
            onSuccess: () => {
                deleteRef.current.close()
                toast.success('Success', {
                    description: 'Expense deleted successfully',
                });
            }
        })
    }

    return (
        <Authenticated user={auth.user}>
            <Head title="Expenses" />
            <div className="page-content">
                <div className="top-section">
                    <div className='title-wrapper'>
                        <h1 className='title'>Expenses</h1>
                        <ul className='breadcrumb'>
                            <li><LayoutGridIcon color='gray' size={20} /></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Dashboard</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Expenses</span></li>
                        </ul>
                    </div>
                </div>
                <div className="content-wrapper bg-white rounded-md pb-8">
                    <div className="top-wrapper p-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className='w-full'>
                                <SearchBar title={'Expenses'} />
                            </div>
                            <div className="add-category">
                                <AddButton
                                    handleOnClick={() => {
                                        setType('add')
                                        drawerRef.current.open()
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="tableWrapper">
                        <div className="tableContainer">
                            <Table data={expenses?.data} hover bordered headerHeight={45} cellBordered autoHeight={true} rowHeight={50}>
                                <Column width={50}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">SN</span></HeaderCell>
                                    <Cell>{(_, rowIndex) => rowIndex + 1}</Cell>
                                </Column>
                                <Column width={110}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Date</span></HeaderCell>
                                    <Cell dataKey="date" />
                                </Column>

                                <Column flexGrow={1}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Title</span></HeaderCell>
                                    <Cell dataKey="title" />
                                </Column>

                                <Column>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Amount</span></HeaderCell>
                                    <Cell>{(rowData) => (<span>{currency}{rowData.amount}</span>)}</Cell>
                                </Column>

                                <Column width={100}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Actions</span></HeaderCell>
                                    <Cell className="link-group">
                                        {(rowData) => (
                                            <>
                                                <EditActionButton action={() => editAction(rowData.id)} />
                                                <DeleteActionButton action={() => deleteAction(rowData.id)} />
                                            </>
                                        )}
                                    </Cell>
                                </Column>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
            <ExpensesForm type={type} drawerRef={drawerRef} selected={selected} />
            <DeleteModal title={'Expense'} ref={deleteRef} deleteAction={handleDelete} />
        </Authenticated>
    )
}
