import Clock from '@/Components/Clock/Clock';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formattedAmount, getCurrentMonthName, getCurrentYear } from '@/Lib/Utils';
import { Head, usePage } from '@inertiajs/react';
import { BadgeDollarSignIcon, ReceiptIcon, ReceiptTextIcon, TrophyIcon } from 'lucide-react';
import { Panel } from 'rsuite';
import {
    BarChart,
    Bar,
    Cell,
    PieChart,
    Pie,
    Rectangle,
    XAxis, YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

export default function Dashboard({ auth }) {
    const { salesTotal, purchasesTotal, expensesTotal, barChart, pieChart } = usePage().props;

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (

        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="page-content dashboard-page">
                <div className="greetings-section">
                    <h1 className='title'>Hello {auth?.user?.name},</h1>
                    <Clock />
                </div>
                <div className="stats-container mt-6">
                    <div className="grid grid-cols-4 gap-6">
                        <div className="stats-card bg-white rounded">
                            <Panel shaded>
                                <div className="flex items-center gap-4">
                                    <div className="icon">
                                        <ReceiptIcon size={48} color='gray' strokeWidth={1.2} />
                                    </div>
                                    <div className="content">
                                        <h2 className="font-medium text-gray-400 text-3xl">${formattedAmount(purchasesTotal)}</h2>
                                        <p className='text-gray-600 font-semibold'>Total Purchases</p>
                                    </div>
                                </div>
                            </Panel>
                        </div>
                        <div className="stats-card bg-white rounded">
                            <Panel shaded>
                                <div className="flex items-center gap-4">
                                    <div className="icon">
                                        <BadgeDollarSignIcon size={48} color='gray' strokeWidth={1.2} />
                                    </div>
                                    <div className="content">
                                        <h2 className="font-medium text-gray-400 text-3xl">${formattedAmount(salesTotal)}</h2>
                                        <p className='text-gray-600 font-semibold'>Total Sales</p>
                                    </div>
                                </div>
                            </Panel>
                        </div>
                        <div className="stats-card bg-white rounded">
                            <Panel shaded>
                                <div className="flex items-center gap-4">
                                    <div className="icon">
                                        <ReceiptTextIcon size={48} color='gray' strokeWidth={1.2} />
                                    </div>
                                    <div className="content">
                                        <h2 className="font-medium text-gray-400 text-3xl">${formattedAmount(expensesTotal)}</h2>
                                        <p className='text-gray-600 font-semibold'>Total Expenses</p>
                                    </div>
                                </div>
                            </Panel>
                        </div>
                        <div className="stats-card bg-white rounded">
                            <Panel shaded>
                                <div className="flex items-center gap-4">
                                    <div className="icon">
                                        <TrophyIcon size={48} color='gray' strokeWidth={1.2} />
                                    </div>
                                    <div className="content">
                                        <h2 className="font-medium text-gray-400 text-3xl">${formattedAmount(salesTotal - expensesTotal - purchasesTotal)}</h2>
                                        <p className='text-gray-600 font-semibold'>Total Profit</p>
                                    </div>
                                </div>
                            </Panel>
                        </div>
                    </div>
                </div>
                <div className="monthly-overview mt-6">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="item col-span-2 bg-white">
                            <Panel header="Sales & Purchases of Last 7 Days" shaded>
                                <div className="h-[500px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            width={500}
                                            height={300}
                                            data={barChart}
                                            margin={{
                                                top: 5,
                                                right: 0,
                                                left: 0,
                                                bottom: 5,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="sales" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                                            <Bar dataKey="purchases" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                                            <Bar dataKey="expenses" fill="#0088FE" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Panel>
                        </div>
                        <div className="item bg-white">
                            <Panel header={`Overview of ${getCurrentMonthName()}, ${getCurrentYear()}`} shaded>
                                <div className="h-[500px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart width={500} height={500}>
                                            <Pie
                                                data={pieChart}
                                                cx={'50%'}
                                                cy={'50%'}
                                                innerRadius={80}
                                                outerRadius={'100%'}
                                                fill="#8884d8"
                                                paddingAngle={4}
                                                dataKey="value"
                                            >
                                                {pieChart.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </Panel>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
