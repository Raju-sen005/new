import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdContacts } from "react-icons/md";
import Slidebar1 from '../Components/Slidebar1';

function OrderList() {
    const baseURL = import.meta.env.VITE_BACKEND_URL
    const [orders, setOrders] = useState([]);
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);
    const [selectedOrderItems, setSelectedOrderItems] = useState(null);
    const [selectedOrderShipping, setSelectedOrderShipping] = useState(null);
    const [selectedOrderIds, setSelectedOrderIds] = useState([]);
    const [bulkStatus, setBulkStatus] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectAll, setSelectAll] = useState(false);

    const [orderForm, setOrderForm] = useState({
        customerName: '',
        date: '',
        status: '',
        total: 0,
        items: []
    });

    const fetchOrders = async () => {

        const token = JSON.parse(localStorage.getItem('user'))?.jwtToken;
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        fetch(`${baseURL}/orders`, { headers }) // Adjust this URL based on your actual backend route
            .then(res => res.json())
            .then(data => {
                setOrders(data);
            })
            .catch(error => {
                console.error("Failed to fetch orders:", error);
            });
    }
    useEffect(() => {
        fetchOrders();
    }, []);


    //
    const handleViewCustomer = async (customerId) => {
        console.log(customerId);

        const token = JSON.parse(localStorage.getItem('user'))?.jwtToken;
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(`${baseURL}/${customerId}`, { headers });
        const data = await res.data;
        setSelectedCustomer(data);
    };

    //
    //
    const handleBulkStatusUpdate = async () => {
        const token = JSON.parse(localStorage.getItem('user'))?.jwtToken;
        if (!token) {
            console.error('No token found');
            return;
        }

        if (!selectedOrderIds.length) {
            console.warn('No orders selected for bulk update');
            return;
        }

        if (!bulkStatus) {
            console.warn('No status selected for bulk update');
            return;
        }

        try {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            // Optimistic UI update
            const updatedOrders = orders.map((order) =>
                selectedOrderIds.includes(order.id)
                    ? { ...order, status: bulkStatus }
                    : order
            );
            setOrders(updatedOrders);

            // Process updates sequentially (better for debugging)
            const failedUpdates = [];

            for (const orderId of selectedOrderIds) {
                try {
                    const originalOrder = orders.find(order => order.id === orderId);
                    if (!originalOrder) {
                        console.warn(`Order ${orderId} not found`);
                        continue;
                    }

                    const payload = {
                        ...originalOrder,  // Include all original fields
                        status: bulkStatus, // Override the status
                    };

                    console.log(`Updating order ${orderId} with payload:`, payload);

                    const response = await axios.put(`${baseURL}/orders/${orderId}`, payload, { headers });
                    console.log(`Order ${orderId} update response:`, response.data);
                } catch (error) {
                    console.error(`Failed to update order ${orderId}:`, error.response?.data || error.message);
                    failedUpdates.push({ orderId, error });
                }
            }

            // Reset UI state
            setSelectedOrderIds([]);
            setSelectAll(false);
            setBulkStatus('');

            if (failedUpdates.length > 0) {
                console.error(`${failedUpdates.length} updates failed:`, failedUpdates);
                // Optionally revert the optimistic update for failed orders
                const revertedOrders = orders.map(order => {
                    const failed = failedUpdates.find(f => f.orderId === order.id);
                    return failed ? orders.find(o => o.id === order.id) : order;
                });
                setOrders(revertedOrders);
            }

            // Refresh data from server
            await fetchOrders();

        } catch (err) {
            console.error('Unexpected error during bulk update:', err);
            // Revert optimistic update in case of complete failure
            setOrders([...orders]);
        }
    };

    //
    // Create or Update Order
    const handleOrderSubmit = async (e) => {
        e.preventDefault();

        const token = JSON.parse(localStorage.getItem('user'))?.jwtToken;
        if (!token) return console.error('No token found');

        try {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const payload = {
                customerName: orderForm.customerName,
                date: orderForm.date,
                status: orderForm.status,
                total: orderForm.total,
                items: orderForm.items, // if you have items
            };

            if (editingOrder) {
                await axios.put(`${baseURL}/orders/${editingOrder.id}`, payload, { headers });
            } else {
                await axios.post(`${baseURL}/orders`, payload, { headers });
            }

            setOrderForm({
                customerName: '',
                date: '',
                status: '',
                total: 0,
                items: [],
            });
            setShowOrderForm(false);
            setEditingOrder(null);
            fetchOrders(); // Re-fetch updated list
        } catch (err) {
            console.error('Error saving order:', err);
        }
    };

    // Set edit mode
    const handleEditOrder = (order) => {
        setEditingOrder(order);
        setOrderForm({
            customerName: order.customerName,
            date: order.date,
            status: order.status,
            total: order.total,
            items: order.items || [],
        });
        setShowOrderForm(true);
    };

    // Delete order
    const handleDeleteOrder = async (orderId) => {
        const token = JSON.parse(localStorage.getItem('user'))?.jwtToken;

        try {
            await axios.delete(`${baseURL}/orders/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchOrders(); // Refresh after delete
        } catch (err) {
            console.error('Error deleting order:', err);
        }
    };

    //
    return (
        <>
            <>
                {/* Sidebar */}
                <Slidebar1 />
                {/* Main Content */}
                <div className="lg:ml-64  ml-0">
                    {/* Header */}
                    <header className="bg-white dark:bg-neutral-800 dark:border-gray-700 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="relative hs-dropdown [--placement:bottom-left] me-5 lg:me-0 flex items-center w-50 bg-black rounded-lg hidden md:block">
                                    <button
                                        id="flow-shop-dropdown-btn"
                                        type="button"
                                        className="inline-flex items-center gap-x-2 py-2.5 px-4 text-sm font-medium text-white rounded-lg shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:bg-white dark:text-gray-800 dark:hover:bg-gray-700 dark:focus:ring-blue-100"
                                    >
                                        <img src="icons/Storefront-white.png" alt="" />
                                        Flow Shop
                                        <svg
                                            className="w-4 h-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>
                                    <div
                                        id="flow-shop-dropdown-menu"
                                        className="absolute top-[20%] left-0 mt-12 w-48 bg-white shadow-md rounded-lg opacity-0 invisible transition-all duration-200"
                                    >
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                        >
                                            Dashboard
                                        </a>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                        >
                                            Orders
                                        </a>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                        >
                                            Products
                                        </a>
                                    </div>
                                </div>
                                {/* Mobile menu button */}
                                <button
                                    id="menuButton"
                                    className="lg:hidden p-2 rounded-md"
                                    title="Toggle Menu"
                                >
                                    <i className="bi bi-list text-2xl" />
                                </button>
                                <div className="relative hidden lg:block">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="pl-10 pr-4 py-2 border rounded-lg w-64"
                                    />
                                    <svg
                                        className="w-4 h-4 absolute left-3 top-3 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                {/* Mobile search button and container */}
                                <div className="lg:hidden relative">
                                    <button
                                        id="mobileSearchBtn"
                                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        title="Search"
                                    >
                                        <i className="bi bi-search" />
                                    </button>
                                    {/* Add this mobile search container */}
                                    <div
                                        id="mobileSearchContainer"
                                        className="hidden fixed inset-x-0 top-16 p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700 shadow-lg"
                                    >
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Search"
                                                className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                                id="searchInput"
                                            />
                                            <svg
                                                className="w-4 h-4 absolute left-3 top-3 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                />
                                            </svg>
                                            {/* Search Results Dropdown */}
                                            <div
                                                id="searchResults"
                                                className="hidden absolute left-0 right-0 mt-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50"
                                            >
                                                <div className="p-2">
                                                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                                                        Recent Searches
                                                    </h3>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                                                            <i className="bi bi-clock-history mr-2" />
                                                            <span>T-Shirts</span>
                                                        </div>
                                                        <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                                                            <i className="bi bi-clock-history mr-2" />
                                                            <span>Jackets</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="border-t dark:border-gray-700 p-2">
                                                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                                                        Suggestions
                                                    </h3>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                                                            <i className="bi bi-search mr-2" />
                                                            <span>Products</span>
                                                        </div>
                                                        <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                                                            <i className="bi bi-search mr-2" />
                                                            <span>Orders</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative inline-block w-11 h-5 hidden lg:block">
                                    <input
                                        defaultChecked=""
                                        id="switch-component"
                                        type="checkbox"
                                        className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300"
                                        onClick="toggleDarkMode()"
                                    />
                                    <label
                                        htmlFor="switch-component"
                                        className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
                                    ></label>
                                </div>
                                <div className="relative">
                                    <button
                                        id="notificationBtn"
                                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
                                        title="Notifications"
                                    >
                                        <i className="bi bi-bell" />
                                        {/* Optional: Add notification indicator */}
                                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                                    </button>
                                    {/* Mobile backdrop */}
                                    <div
                                        id="notificationBackdrop"
                                        className="fixed inset-0 bg-black bg-opacity-50 z-40 hidden lg:hidden"
                                    />
                                    {/* Notification dropdown */}
                                    <div
                                        className="fixed lg:absolute top-0 lg:top-auto right-0 mt-0 lg:mt-2 w-full lg:w-[400px] h-full lg:h-auto bg-white dark:bg-gray-800 rounded-none lg:rounded-lg shadow-lg border dark:border-gray-700 hidden z-50 overflow-hidden"
                                        id="notificationDropdown"
                                    >
                                        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                                            <h3 className="font-semibold">Alert</h3>
                                            <div className="flex gap-4">
                                                <i className="bi bi-list cursor-pointer" />
                                                <i
                                                    className="bi bi-check-circle cursor-pointer"
                                                    id="clearNotifications"
                                                />
                                            </div>
                                        </div>
                                        <div className="max-h-[60vh] lg:max-h-96 overflow-y-auto">
                                            <div className="p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                                                <div className="flex items-start">
                                                    <div className="w-full">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <i className="bi bi-dot text-blue-500" />
                                                            <p className="text-xs text-gray-500">
                                                                App - 2 minutes ago
                                                            </p>
                                                        </div>
                                                        <h2 className="text-lg font-semibold mb-2">
                                                            Theres an issue with shop
                                                        </h2>
                                                        <p className="text-xs text-gray-500">
                                                            Review an issue that may impact sales or how you promote
                                                            products. Go to the channel for more details.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                                                <div className="flex items-start">
                                                    <div className="w-full">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <i className="bi bi-dot text-blue-500" />
                                                            <p className="text-xs text-gray-500">
                                                                App - 2 minutes ago
                                                            </p>
                                                        </div>
                                                        <h2 className="text-lg font-semibold mb-2">
                                                            Theres an issue with shop
                                                        </h2>
                                                        <p className="text-xs text-gray-500">
                                                            Review an issue that may impact sales or how you promote
                                                            products. Go to the channel for more details.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 border-t dark:border-gray-700 text-center">
                                            <a
                                                href="#"
                                                className="text-sm text-blue-500 hover:text-blue-600"
                                            >
                                                See all
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <button className="flex items-center space-x-2">
                                    <img src="icons/profile.png" alt="" />
                                    <div className="ms-3 font-medium hidden lg:block">
                                        <h6>Robbi Darwis</h6>
                                        <p className="text-gray-400">Admin</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </header>
                    {/* Bulk Status Update Panel */}
                    <div className="flex items-center justify-between mb-4 bg-gray-50 p-4 rounded-md shadow">
                        <div className="flex items-center gap-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        setSelectAll(checked);
                                        setSelectedOrderIds(checked ? orders.map(o => o.id) : []);
                                    }}
                                    className="mr-2"
                                />
                                Select All
                            </label>

                            <select
                                className="border rounded px-3 py-1"
                                value={bulkStatus}
                                onChange={(e) => setBulkStatus(e.target.value)}
                            >
                                <option value="">Change Status To...</option>
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Fulfilled">Fulfilled</option>
                                <option value="Delivered">Delivered</option>
                            </select>

                            <button
                                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                                onClick={handleBulkStatusUpdate}
                                disabled={selectedOrderIds.length === 0 || !bulkStatus}
                            >
                                Update Selected
                            </button>
                        </div>
                        <span className="text-sm text-gray-500">{selectedOrderIds.length} selected</span>
                    </div>

                    {/* Main Content Area */}
                    <main className="p-4 lg:p-6">
                        <div className="flex justify-between p-4">
                            <h1 className="text-2xl font-semibold">Order Management</h1>
                            <button
                                className="border rounded-md px-4 py-2 bg-blue-500 text-white"
                                onClick={() => setShowOrderForm(true)}
                            >
                                Create Order
                            </button>
                        </div>

                        {/* Orders Table */}
                        <div className="overflow-x-auto p-4">
                            <table className="min-w-full bg-white dark:bg-gray-800 shadow rounded-md">
                                <thead>
                                    <tr className="text-left border-b">
                                        <th className="p-4">#</th>
                                        <th className="p-4">Customer</th>
                                        <th className="p-4">Date</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Shipping</th>
                                        <th className="p-4">Items</th>
                                        <th className="p-4">Total</th>
                                        <th className="p-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.length > 0 ? (
                                        orders.map((order, index) => (
                                            <tr key={order.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <td className="p-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedOrderIds.includes(order.id)}
                                                        onChange={(e) => {
                                                            const checked = e.target.checked;
                                                            setSelectedOrderIds((prev) =>
                                                                checked ? [...prev, order.id] : prev.filter((id) => id !== order.id)
                                                            );
                                                        }}
                                                    />
                                                </td>
                                                <td
                                                    className="p-4 text-blue-600 cursor-pointer hover:underline"
                                                    onClick={() => handleViewCustomer(order.customerId)}
                                                >
                                                    {order.customerName}
                                                </td>



                                                <td className="p-4">{new Date(order.date).toLocaleDateString()}</td>
                                                <td className="p-4">{order.status}</td>
                                                <td
                                                    className="p-4 text-blue-600 cursor-pointer hover:underline"
                                                    onClick={() => setSelectedOrderShipping(order.shippingAddress)}
                                                >
                                                    {order.shippingAddress.city}
                                                </td>
                                                <td
                                                    className="p-4 text-blue-600 cursor-pointer hover:underline"
                                                    onClick={() => setSelectedOrderItems(order.items)}
                                                >
                                                    {order.items.length}
                                                </td>
                                                <td className="p-4">${order.total.toFixed(2)}</td>
                                                <td className="p-4 flex gap-2">
                                                    <button
                                                        className="text-blue-500 border px-2 py-1 rounded hover:bg-blue-100"
                                                        onClick={() => handleEditOrder(order)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="text-red-500 border px-2 py-1 rounded hover:bg-red-100"
                                                        onClick={() => handleDeleteOrder(order.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>

                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="p-4 text-center text-gray-500">
                                                No orders found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* show customers */}
                        {selectedCustomer && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-white p-6 rounded-md max-w-md w-full shadow-lg relative">
                                    <h2 className="text-xl font-semibold mb-4">Customer Profile</h2>
                                    <div className="space-y-2">
                                        <p><strong>Name:</strong> {selectedCustomer.firstName} {selectedCustomer.lastName}</p>
                                        <p><strong>Email:</strong> {selectedCustomer.email}</p>
                                        <p><strong>Role:</strong> {selectedCustomer.role}</p>
                                        <p><strong>Verified:</strong> {selectedCustomer.isVerified ? 'Yes' : 'No'}</p>
                                        <p><strong>Created:</strong> {new Date(selectedCustomer.created).toLocaleDateString()}</p>
                                        <p><strong>Updated:</strong> {new Date(selectedCustomer.updated).toLocaleDateString()}</p>
                                    </div>
                                    <button
                                        className="absolute top-2 right-2 text-gray-600 hover:text-black"
                                        onClick={() => setSelectedCustomer(null)}
                                    >
                                        ✖
                                    </button>
                                </div>
                            </div>
                        )}
                        {/* show customers */}
                        {selectedOrderShipping && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-white p-6 rounded-md max-w-md w-full shadow-lg relative">
                                    <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                                    <div className="space-y-2">
                                        <p><strong>Name:</strong> {selectedOrderShipping.name}</p>
                                        <p><strong>Company:</strong> {selectedOrderShipping.company}</p>
                                        <p><strong>Address:</strong> {selectedOrderShipping.address}</p>
                                        <p><strong>City:</strong> {selectedOrderShipping.city}</p>
                                        <p><strong>State:</strong> {selectedOrderShipping.state}</p>
                                        <p><strong>Country:</strong> {selectedOrderShipping.country}</p>
                                        <p><strong>ZIP Code:</strong> {selectedOrderShipping.zip}</p>
                                        <p><strong>Phone:</strong> {selectedOrderShipping.phone}</p>
                                        <p><strong>Created At:</strong> {new Date(selectedOrderShipping.createdAt).toLocaleDateString()}</p>
                                        <p><strong>Updated At:</strong> {new Date(selectedOrderShipping.updatedAt).toLocaleDateString()}</p>
                                    </div>
                                    <button
                                        className="absolute top-2 right-2 text-gray-600 hover:text-black"
                                        onClick={() => setSelectedOrderShipping(null)} // make sure this is the correct state reset
                                    >
                                        ✖
                                    </button>
                                </div>
                            </div>
                        )}


                        {/* Show Order Item Details Modal */}
                        {selectedOrderItems && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-white p-6 rounded-md max-w-2xl w-full shadow-lg relative">
                                    <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                                    <table className="w-full text-left border rounded">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="p-2">#</th>
                                                <th className="p-2">ProductId</th>
                                                <th className="p-2">Quantity</th>
                                                <th className="p-2">Size</th>
                                                <th className="p-2">Metal</th>
                                                <th className="p-2">Price</th>
                                                <th className="p-2">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedOrderItems.map((item, idx) => (
                                                <tr key={idx} className="border-b">
                                                    <td className="p-2">{idx + 1}</td>
                                                    <td className="p-2">{item.productName}</td>
                                                    <td className="p-2">{item.quantity}</td>
                                                    <td className="p-2">{item.size}</td>
                                                    <td className="p-2">{item.metal}</td>
                                                    <td className="p-2">${item.price.toFixed(2)}</td>
                                                    <td className="p-2">${(item.price * item.quantity).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <button
                                        className="absolute top-2 right-2 text-gray-600 hover:text-black"
                                        onClick={() => setSelectedOrderItems(null)}
                                    >
                                        ✖
                                    </button>
                                </div>
                            </div>
                        )}
                        {/* Order Create/Edit Form */}
                        {showOrderForm && (
                            <div className="p-4 mt-6 bg-white shadow rounded-md max-w-md mx-auto">
                                <h2 className="text-xl font-semibold mb-4">
                                    {editingOrder ? 'Edit Order' : 'Create Order'}
                                </h2>
                                <form onSubmit={handleOrderSubmit}>
                                    <input
                                        type="text"
                                        placeholder="Customer Name"
                                        value={orderForm.customerName}
                                        onChange={(e) => setOrderForm({ ...orderForm, customerName: e.target.value })}
                                        className="w-full mb-3 border px-3 py-2 rounded"
                                        required
                                    />
                                    <input
                                        type="date"
                                        value={orderForm.date}
                                        onChange={(e) => setOrderForm({ ...orderForm, date: e.target.value })}
                                        className="w-full mb-3 border px-3 py-2 rounded"
                                        required
                                    />
                                    <div className="mb-3">
                                        <label className="block font-medium mb-1">Status</label>
                                        <div className="flex flex-wrap gap-4">
                                            {["Pending", "Processing", "Fulfilled", "Delivered"].map((statusOption) => (
                                                <label key={statusOption} className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="status"
                                                        value={statusOption}
                                                        checked={orderForm.status === statusOption}
                                                        onChange={(e) => setOrderForm({ ...orderForm, status: e.target.value })}
                                                        className="mr-2"
                                                        required
                                                    />
                                                    {statusOption}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <input
                                        type="number"
                                        placeholder="Total Amount"
                                        value={orderForm.total}
                                        onChange={(e) => setOrderForm({ ...orderForm, total: e.target.value })}
                                        className="w-full mb-3 border px-3 py-2 rounded"
                                        required
                                    />
                                    {/* You can add dynamic item selection here too */}
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        {editingOrder ? 'Update Order' : 'Add Order'}
                                    </button>
                                    <button
                                        type="button"
                                        className="ml-2 px-4 py-2 border rounded hover:bg-gray-200"
                                        onClick={() => {
                                            setEditingOrder(null);
                                            setShowOrderForm(false);
                                            setOrderForm({ customerName: '', date: '', status: '', total: 0 });
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        )}
                    </main>

                </div>
            </>

        </>
    )
}

export default OrderList
