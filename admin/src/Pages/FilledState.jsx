import React from 'react'

function FilledState() {
    return (
        <>
            <>
                {/* Sidebar */}
                <div
                    id="sidebar"
                    className="fixed left-0 top-0 lg:w-64 w-64 h-full bg-white dark:bg-gray-800 dark:border-gray-700 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out"
                >
                    <div className="p-6">
                        <div className="flex items-center mb-6">
                            <img src="icons/Logo Block.png" alt="" />
                        </div>
                        {/* Sidebar Navigation */}
                        <nav className="space-y-2 mt-10">
                            <a
                                href="#"
                                className="flex items-center space-x-3 px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
                            >
                                <img src="icons/SquaresFour.png" alt="" />
                                <span>Home</span>
                            </a>
                            {/* Orders Dropdown */}
                            <div className="group">
                                <a
                                    href="#"
                                    className="flex items-center justify-between px-4 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                                ></a>
                                <div className="flex items-center space-x-3">
                                    <a
                                        href="#"
                                        className="flex items-center justify-between px-4 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                                    >
                                        <img src="icons/Receipt.png" alt="" />
                                        <span />
                                    </a>
                                    <a href="detail-orderlist.html" /> Orders
                                </div>
                                <span className="group-hover:rotate-180 transition-transform">
                                    <i className="bi bi-chevron-down" />
                                </span>
                                {/* <div className="hidden group-hover:block pl-8 space-y-1">
                                    <a
                                        href="filled-state.html"
                                        className="block px-4 rounded-lg py-2 text-sm hover:text-blue-500  hover:bg-gray-100"
                                    >
                                        Order List
                                    </a>
                                    <a
                                        href="create-order.html"
                                        className="block px-4 rounded-lg py-2 text-sm hover:text-blue-500  hover:bg-gray-100"
                                    >
                                        Draft
                                    </a>
                                    <a
                                        href="shipping-filled-state.html"
                                        className="block px-4 rounded-lg py-2 text-sm hover:text-blue-500  hover:bg-gray-100"
                                    >
                                        Shipping Labels
                                    </a>
                                </div> */}
                            </div>
                            {/* Products Dropdown */}
                            <div className="group">
                                <a
                                    href="#"
                                    className="flex items-center justify-between px-4 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                                >
                                    <div className="flex items-center space-x-3">
                                        <img src="icons/Tag.png" alt="" />
                                        <span>Products</span>
                                    </div>
                                    <span className="group-hover:rotate-180 transition-transform">
                                        <i className="bi bi-chevron-down" />
                                    </span>
                                </a>
                                {/* <div className="hidden group-hover:block pl-8 space-y-1">
                                    <a
                                        href="#"
                                        className="block px-4 rounded-lg py-2 text-sm hover:text-blue-500  hover:bg-gray-100"
                                    >
                                        Product List{" "}
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 rounded-lg py-2 text-sm hover:text-blue-500  hover:bg-gray-100"
                                    >
                                        Inventory
                                    </a>
                                    <a
                                        href="Purchase-Order.html"
                                        className="block px-4 rounded-lg py-2 text-sm hover:text-blue-500  hover:bg-gray-100"
                                    >
                                        Purchase Order
                                    </a>
                                </div> */}
                            </div>
                            <div className="group">
                                <a
                                    href="#"
                                    className="flex items-center justify-between px-4 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                                >
                                    <div className="flex items-center space-x-3">
                                        <img src="icons/Users.png" alt="" />
                                        <span>Customers</span>
                                    </div>
                                    <span className="group-hover:rotate-180 transition-transform">
                                        <i className="bi bi-chevron-down" />
                                    </span>
                                </a>
                                {/* <div className="hidden group-hover:block pl-8 space-y-1">
                                    <a
                                        href="#"
                                        className="block px-4 rounded-lg py-2 text-sm hover:text-blue-500  hover:bg-gray-100"
                                    >
                                        Customer List
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 rounded-lg py-2 text-sm hover:text-blue-500  hover:bg-gray-100"
                                    >
                                        Segments
                                    </a>
                                </div> */}
                            </div>
                            {/* <a
                                href="#"
                                className="flex items-center space-x-3 px-4 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                            >
                                <img src="icons/Storefront.png" alt="" />
                                <span>Online Store</span>
                            </a> */}
                        </nav>
                        
                    </div>
                </div>
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
                    {/* Main Content Area */}
                    <main className="p-4 lg:p-6">
                        <div className="flex justify-between p-4">
                            <div>
                                <h1 className="text-2xl font-semibold">Order List</h1>
                            </div>
                            <div className="flex gap-4">
                                <button className="border-2 rounded-md px-4 py-2 border-blue-500 text-blue-500">
                                    Export
                                </button>
                                <button className="border rounded-md px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 animate-bounce">
                                    Create Order
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6  p-4">
                            {/* Today Card */}
                            <div className="bg-white dark:bg-gray-800 p-4 shadow">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <i className="bi bi-calendar-minus" />
                                        <p className="text-lg font-semibold">Today</p>
                                    </div>
                                </div>
                            </div>
                            {/* Total Orders Card */}
                            <div className="bg-white dark:bg-gray-800 p-4 shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Total orders
                                        </p>
                                        <h3 className="text-2xl font-semibold mt-1">24</h3>
                                    </div>
                                </div>
                            </div>
                            {/* Ordered Items Card */}
                            <div className="bg-white dark:bg-gray-800 p-4 shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Ordered items
                                        </p>
                                        <h3 className="text-2xl font-semibold mt-1">40</h3>
                                    </div>
                                </div>
                            </div>
                            {/* Returns Card */}
                            <div className="bg-white dark:bg-gray-800 p-4 shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Returns
                                        </p>
                                        <h3 className="text-2xl font-semibold mt-1">26</h3>
                                    </div>
                                </div>
                            </div>
                            {/* Fulfilled Orders Card */}
                            <div className="bg-white dark:bg-gray-800 p-4 shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Fulfilled orders
                                        </p>
                                        <h3 className="text-2xl font-semibold mt-1">12</h3>
                                    </div>
                                </div>
                            </div>
                            {/* Delivered Orders Card */}
                            <div className="bg-white dark:bg-gray-800 p-4 shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Delivered orders
                                        </p>
                                        <h3 className="text-2xl font-semibold mt-1">16</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <main className="p-6">
                            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                                <div className="w-full lg:w-auto flex flex-wrap gap-2">
                                    <a href="" className="text-l p-2 font-semibold">
                                        <i className="bi bi-sliders" />
                                    </a>
                                    <a href="#" className="text-l p-2 font-semibold">
                                        Filter by
                                    </a>
                                    <div className="flex flex-wrap gap-2">
                                        <a
                                            href="#"
                                            className="text-l text-gray-500 bg-white dark:bg-gray-800 border rounded p-2 font-semibold"
                                        >
                                            Payment Status <i className="bi bi-chevron-down" />
                                        </a>
                                        <a
                                            href="#"
                                            className="text-l text-gray-500 bg-white dark:bg-gray-800 border rounded p-2 font-semibold"
                                        >
                                            Fulfillment Status <i className="bi bi-chevron-down" />
                                        </a>
                                        <a
                                            href="#"
                                            className="text-l text-gray-500 bg-white dark:bg-gray-800 border rounded p-2 font-semibold"
                                        >
                                            Delivery Status <i className="bi bi-chevron-down" />
                                        </a>
                                        <a
                                            href="#"
                                            className="text-l text-gray-500 bg-white dark:bg-gray-800 border rounded p-2 font-semibold"
                                        >
                                            Delivery Method <i className="bi bi-chevron-down" />
                                        </a>
                                    </div>
                                </div>
                                <div className="relative w-full lg:w-64">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg"
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
                            <div className="overflow-x-auto mt-6">
                                <table className="min-w-full bg-white dark:bg-gray-800 rounded">
                                    <thead className="text-left">
                                        <tr className="text-[14px]">
                                            <th className="px-4 py-2 font-semibold text-gray-500">
                                                <input type="checkbox" defaultChecked="" className="mr-2" />
                                                Order
                                            </th>
                                            <th className="px-4 py-2 text-gray-500">Date</th>
                                            <th className="px-4 py-2 text-gray-500">Customer</th>
                                            <th className="px-4 py-2 text-gray-500">Total</th>
                                            <th className="px-4 py-2 text-gray-500  ">Payment Status</th>
                                            <th className="px-4 py-2 text-gray-500">Fulfillment Status</th>
                                            <th className="px-4 py-2 text-gray-500">Items</th>
                                            <th className="px-4 py-2 text-gray-500">Delivery Method</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Row 1 */}
                                        <tr className="hover:bg-[#F2F3FE] dark:hover:bg-gray-700 cursor-pointer">
                                            <td className="px-4 py-2 font-semibold">
                                                <input type="checkbox" className="mr-2" />
                                                #1001
                                            </td>
                                            <td className="px-4 py-2">Today at 10:00 PM</td>
                                            <td className="px-4 py-2">Robbie Darwis</td>
                                            <td className="px-4 py-2 text-red-500">$48.00</td>
                                            <td className="px-4 py-2">
                                                <span className="px-3 py-1 border border-green-500 text-green-500 rounded-lg">
                                                    Success
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="px-3 py-1 border border-green-500 text-green-500 bg-green-50 rounded-md">
                                                    <button>Fulfilled</button>
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                {" "}
                                                <button className="">2 Items</button>
                                            </td>
                                            <td className="px-4 py-2">Free Shipping</td>
                                        </tr>
                                        {/* Row 2 */}
                                        <tr className="hover:bg-[#F2F3FE] dark:hover:bg-gray-700 cursor-pointer">
                                            <td className="px-4 py-2 font-semibold">
                                                <input type="checkbox" defaultChecked="" className="mr-2" />
                                                #1002
                                            </td>
                                            <td className="px-4 py-2">Today at 8:00 PM</td>
                                            <td className="px-4 py-2">Robbie Darwis</td>
                                            <td className="px-4 py-2 text-green-500">$48.00</td>
                                            <td className="px-4 py-2">
                                                <span className="px-3 py-1 border border-green-500 text-green-500 rounded-lg  ">
                                                    Success
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="px-3 py-1 border border-green-500 text-green-500 bg-green-50 rounded-md">
                                                    <button>Fulfilled</button>
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                {" "}
                                                <button className="">4 Items</button>
                                            </td>
                                            <td className="px-4 py-2">Cash On Delivery</td>
                                        </tr>
                                        {/* Row 3 */}
                                        <tr className="hover:bg-[#F2F3FE] dark:hover:bg-gray-700 cursor-pointer">
                                            <td className="px-4 py-2 font-semibold">
                                                <input type="checkbox" className="mr-2" />
                                                #1003
                                            </td>
                                            <td className="px-4 py-2">Today at 6:00 PM</td>
                                            <td className="px-4 py-2">Samuel</td>
                                            <td className="px-4 py-2 text-red-500">$56.00</td>
                                            <td className="px-4 py-2">
                                                <span className="px-3 py-1 border border-yellow-500 text-yellow-500 bg-yellow-50 rounded-lg">
                                                    Payment Pending
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="px-3 py-1 border border-yellow-500 text-yellow-500 bg-yellow-50 rounded-md">
                                                    <button>Unfulfilled</button>
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                {" "}
                                                <button className="">2 Items</button>
                                            </td>
                                            <td className="px-4 py-2">Free Shipping</td>
                                        </tr>
                                        {/* Row 4 */}
                                        <tr className="hover:bg-[#F2F3FE] dark:hover:bg-gray-700 cursor-pointer">
                                            <td className="px-4 py-2 font-semibold">
                                                <input type="checkbox" className="mr-2" />
                                                #1004
                                            </td>
                                            <td className="px-4 py-2">Today at 4:00 PM</td>
                                            <td className="px-4 py-2">Judha Maygustya</td>
                                            <td className="px-4 py-2 text-green-500">$32.00</td>
                                            <td className="px-4 py-2">
                                                <span className="px-3 py-1 border border-red-500 text-red-500 bg-red-50 rounded-lg">
                                                    Cancel
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="px-3 py-1 border border-yellow-500 text-yellow-500 bg-yellow-50 rounded-md">
                                                    <button>Unfulfilled</button>
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                {" "}
                                                <button className="">1 Items</button>
                                            </td>
                                            <td className="px-4 py-2">Cash On Delivery</td>
                                        </tr>
                                        {/* Row 5 */}
                                        <tr className="hover:bg-[#F2F3FE] dark:hover:bg-gray-700 cursor-pointer">
                                            <td className="px-4 py-2 font-semibold">
                                                <input type="checkbox" className="mr-2" />
                                                #1005
                                            </td>
                                            <td className="px-4 py-2">02/03/2024 at 13:00 PM</td>
                                            <td className="px-4 py-2">Royhan Darmawan</td>
                                            <td className="px-4 py-2 text-red-500">$56.00</td>
                                            <td className="px-4 py-2">
                                                <span className="px-3 py-1 border border-green-500 text-green-500 rounded-lg">
                                                    Success
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="px-3 py-1 border border-green-500 text-green-500 bg-green-50 rounded-md">
                                                    <button>Fulfilled</button>
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                {" "}
                                                <button className="">5 Items</button>
                                            </td>
                                            <td className="px-4 py-2">Cash On Delivery</td>
                                        </tr>
                                        {/* Row 6 */}
                                        <tr className="hover:bg-[#F2F3FE] dark:hover:bg-gray-700 cursor-pointer">
                                            <td className="px-4 py-2 font-semibold">
                                                <input type="checkbox" className="mr-2" />
                                                #1006
                                            </td>
                                            <td className="px-4 py-2">02/03/2024 at 11:00 PM</td>
                                            <td className="px-4 py-2">Royhan Darmawan</td>
                                            <td className="px-4 py-2 text-gray-500">$56.00</td>
                                            <td className="px-4 py-2">
                                                <span className="px-3 py-1 border border-green-500 text-green-500 rounded-lg">
                                                    Success
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="px-3 py-1 border border-green-500 text-green-500 bg-green-50 rounded-md">
                                                    <button>Fulfilled</button>
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                {" "}
                                                <button className="">2 Items</button>
                                            </td>
                                            <td className="px-4 py-2">Free Shipping</td>
                                        </tr>
                                        {/* Row 7 */}
                                        <tr className="hover:bg-[#F2F3FE] dark:hover:bg-gray-700 cursor-pointer">
                                            <td className="px-4 py-2 font-semibold">
                                                <input type="checkbox" className="mr-2" />
                                                #1007
                                            </td>
                                            <td className="px-4 py-2">02/03/2024 at 7:00 PM</td>
                                            <td className="px-4 py-2">Samuel</td>
                                            <td className="px-4 py-2 text-gray-500">$32.00</td>
                                            <td className="px-4 py-2">
                                                <span className="px-3 py-1 border border-yellow-500 text-yellow-500 bg-yellow-50 rounded-lg">
                                                    Payment Pending
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="px-3 py-1 border border-yellow-500 text-yellow-500 bg-yellow-50 rounded-md">
                                                    <button>Unfulfilled</button>
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                {" "}
                                                <button className="">6 Items</button>
                                            </td>
                                            <td className="px-4 py-2">Cash On Delivery</td>
                                        </tr>
                                        {/* Row 8 */}
                                        <tr className="hover:bg-[#F2F3FE] dark:hover:bg-gray-700 cursor-pointer">
                                            <td className="px-4 py-2 font-semibold">
                                                <input type="checkbox" className="mr-2" />
                                                #1008
                                            </td>
                                            <td className="px-4 py-2">01/03/2024 at 16:15 PM</td>
                                            <td className="px-4 py-2">Robbie Darwis</td>
                                            <td className="px-4 py-2 text-red-500">$32.00</td>
                                            <td className="px-4 py-2">
                                                <span className="px-3 py-1 border border-yellow-500 text-yellow-500 bg-yellow-50 rounded-lg">
                                                    Payment Pending
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="px-3 py-1 border border-yellow-500 text-yellow-500 bg-yellow-50 rounded-md">
                                                    <button>Unfulfilled</button>
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                {" "}
                                                <button className="">6 Items</button>
                                            </td>
                                            <td className="px-4 py-2">Free Shipping</td>
                                        </tr>
                                        {/* Row 9 */}
                                        <tr className="hover:bg-[#F2F3FE] dark:hover:bg-gray-700    cursor-pointer">
                                            <td className="px-4 py-2 font-semibold">
                                                <input type="checkbox" className="mr-2" />
                                                #1009
                                            </td>
                                            <td className="px-4 py-2">01/03/2024 at 12:00 PM</td>
                                            <td className="px-4 py-2">Nabila Rose</td>
                                            <td className="px-4 py-2 text-red-500">$32.00</td>
                                            <td className="px-4 py-2">
                                                <span className="px-3 py-1 border border-red-500 text-red-500 bg-red-50 rounded-lg">
                                                    Cancel
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="px-3 py-1 border border-yellow-500 text-yellow-500 bg-yellow-50 rounded-md">
                                                    <button>Unfulfilled</button>
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                {" "}
                                                <button className="">4 Items</button>
                                            </td>
                                            <td className="px-4 py-2">Cash On Delivery</td>
                                        </tr>
                                        {/* Row 10 */}
                                        <tr className="hover:bg-[#F2F3FE] dark:hover:bg-gray-700 cursor-pointer">
                                            <td className="px-4 py-2 font-semibold">
                                                <input type="checkbox" className="mr-2" />
                                                #1010
                                            </td>
                                            <td className="px-4 py-2">01/03/2024 at 1:00 PM</td>
                                            <td className="px-4 py-2">Nabila Rose</td>
                                            <td className="px-4 py-2 text-red-500">$48.00</td>
                                            <td className="px-4 py-2">
                                                <span className="px-3 py-1 border border-green-500 text-green-500 bg-green-50 rounded-lg">
                                                    Success
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="px-3 py-1 border border-green-500 text-green-500 bg-green-50 rounded-md">
                                                    <button>Fulfilled</button>
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                {" "}
                                                <button className="">1 Items</button>
                                            </td>
                                            <td className="px-4 py-2">Free Shipping</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Showing 1 to 10 of 135 entries
                                </p>
                                <div className="flex flex-wrap items-center justify-center gap-2">
                                    <button className="px-3 py-1 text-blue-600 border-2 border-blue-600 rounded-md hover:bg-blue-50">
                                        Previous
                                    </button>
                                    <button className="px-3 py-1 text-white bg-blue-600 rounded-md">
                                        1
                                    </button>
                                    <button className="px-1 py-1 text-black rounded-md ">2</button>
                                    <button className="px-1 py-1 text-black rounded-md ">3</button>
                                    <button className="px-1 py-1 text-black rounded-md ">4</button>
                                    <span className="px-3 py-1 ">...</span>
                                    <button className="px-1 py-1 text-black rounded-md ">10</button>
                                    <button className="px-1 py-1 text-black rounded-md ">11</button>
                                    <button className="px-1 py-1 text-black rounded-md ">12</button>
                                    <button className="px-1 py-1 text-black rounded-md ">13</button>
                                    <button className="px-3 py-1 text-blue-600 border-2 border-blue-600 rounded-md hover:bg-blue-50">
                                        Next
                                    </button>
                                </div>
                            </div>
                            <div className="text-center mt-5 mb-10">
                                <p className="dark:text-gray-400">
                                    Learn more about{" "}
                                    <a href="" className="text-blue-600 font-semibold hover:underline">
                                        Products
                                    </a>
                                </p>
                            </div>
                        </main>
                    </main>
                </div>
            </>

        </>
    )
}

export default FilledState
