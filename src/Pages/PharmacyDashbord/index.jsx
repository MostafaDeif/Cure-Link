import React, { useState } from 'react';
import logo from '../../assets/JustLogo.jpg';

const dummyOrders = [
    { id: '001', customerName: 'John Doe', status: 'Pending', totalAmount: '$100' },
    { id: '002', customerName: 'Jane Smith', status: 'Completed', totalAmount: '$150' },
    { id: '003', customerName: 'Alice Johnson', status: 'Shipped', totalAmount: '$200' },
    { id: '004', customerName: 'Bob Brown', status: 'Cancelled', totalAmount: '$50' },
];

export default function PharmacyDashboard() {
    const [view, setView] = useState('orders'); // 'orders' | 'dashboard'
    const [search, setSearch] = useState('');
    const [medicines, setMedicines] = useState([]);
    const [form, setForm] = useState({
        name: '',
        manufacturer: '',
        price: '',
        quantity: '',
        description: '',
    });

    const handleAddMedicine = (e) => {
        e.preventDefault();
        if (!form.name.trim()) return;
        const newMed = {
            id: `med-${Date.now()}`,
            ...form,
        };
        setMedicines((m) => [newMed, ...m]);
        setForm({ name: '', manufacturer: '', price: '', quantity: '', description: '' });
        setView('orders'); // optionally switch to orders after add
    };

    const filteredOrders = dummyOrders.filter(
        (o) =>
            o.id.includes(search) ||
            o.customerName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-[#2A3342] text-white">
                <div className="p-4">
                    <div className="flex items-center mb-8">
                        <img src={logo} alt="Logo" className="h-8 w-8 mr-3" />
                        <h2 className="text-lg font-semibold">Pharmacy Name</h2>
                    </div>
                    <nav>
                        <button
                            onClick={() => setView('orders')}
                            className={`flex items-center w-full p-3 rounded ${
                                view === 'orders' ? 'bg-blue-500' : 'text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                            <span className="mr-3">
                                <i className="fas fa-clipboard-list"></i>
                            </span>
                            Orders
                        </button>
                        <button
                            onClick={() => setView('dashboard')}
                            className={`flex items-center w-full p-3 mb-2 rounded ${
                                view === 'dashboard' ? 'bg-blue-500' : 'text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                            <span className="mr-3">
                                <i className="fas fa-clinic-medical"></i>
                            </span>
                            Add Medicine
                        </button>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">
                            {view === 'dashboard' ? 'Dashboard - Add Medicine' : 'Orders'}
                        </h1>

                        {view === 'orders' && (
                            <div className="flex items-center space-x-4">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search by Order ID, Customer Name..."
                                    className="px-4 py-2 border rounded-lg w-80"
                                />
                                <button
                                    onClick={() => setView('dashboard')}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
                                >
                                    + Create New Medicine
                                </button>
                            </div>
                        )}

                        {view === 'dashboard' && (
                            <div>
                                <button
                                    onClick={() => {
                                        setView('orders');
                                    }}
                                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
                                >
                                    Back to Orders
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Dashboard (Add Medicine) */}
                    {view === 'dashboard' && (
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <form onSubmit={handleAddMedicine} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder="Medicine Name"
                                        className="px-4 py-2 border rounded"
                                    />
                                    <input
                                        value={form.manufacturer}
                                        onChange={(e) => setForm({ ...form, manufacturer: e.target.value })}
                                        placeholder="Manufacturer"
                                        className="px-4 py-2 border rounded"
                                    />
                                    <input
                                        value={form.price}
                                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                                        placeholder="Price (e.g. 12.99)"
                                        className="px-4 py-2 border rounded"
                                    />
                                    <input
                                        value={form.quantity}
                                        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                                        placeholder="Quantity"
                                        className="px-4 py-2 border rounded"
                                    />
                                </div>

                                <textarea
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    placeholder="Description (optional)"
                                    className="w-full px-4 py-2 border rounded"
                                />

                                <div className="flex space-x-3">
                                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                        Add Medicine
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setForm({ name: '', manufacturer: '', price: '', quantity: '', description: '' })
                                        }
                                        className="bg-gray-200 px-4 py-2 rounded"
                                    >
                                        Reset
                                    </button>
                                </div>

                                {/* Current medicines list */}
                                {medicines.length > 0 && (
                                    <div className="mt-6">
                                        <h3 className="font-semibold mb-2">Added Medicines</h3>
                                        <ul className="space-y-2">
                                            {medicines.map((m) => (
                                                <li key={m.id} className="border p-3 rounded bg-gray-50">
                                                    <div className="flex justify-between">
                                                        <div>
                                                            <div className="font-medium">{m.name}</div>
                                                            <div className="text-sm text-gray-600">{m.manufacturer}</div>
                                                            <div className="text-sm text-gray-600">
                                                                {m.quantity} units • ${m.price}
                                                            </div>
                                                        </div>
                                                        <div className="text-sm text-gray-500">{m.description}</div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </form>
                        </div>
                    )}

                    {/* Orders View */}
                    {view === 'orders' && (
                        <div>
                            {/* Filter Section */}
                            <div className="bg-white p-4 rounded-lg mb-6">
                                <div className="flex gap-4">
                                    <div className="flex items-center space-x-2">
                                        <input type="radio" id="all-orders" name="status" defaultChecked />
                                        <label htmlFor="all-orders">All Orders</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input type="radio" id="date-range" name="status" />
                                        <label htmlFor="date-range">Date Range</label>
                                    </div>
                                </div>
                            </div>

                            {/* Orders Table */}
                            <table className="w-full bg-white rounded-lg">
                                <thead className="border-b">
                                    <tr className="text-left">
                                        <th className="p-4">Order ID</th>
                                        <th className="p-4">Medicine Name</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Total Amount</th>
                                        <th className="p-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map((order) => (
                                        <tr key={order.id} className="border-b">
                                            <td className="p-4">{order.id}</td>
                                            <td className="p-4">{order.customerName}</td>
                                            <td className="p-4">{order.status}</td>
                                            <td className="p-4">{order.totalAmount}</td>
                                            <td className="p-4">
                                                <button className="text-blue-500">View</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
