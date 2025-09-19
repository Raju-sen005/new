import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Components/Header'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import Slidebar1 from '../Components/Slidebar1';

function SubCategorySegmentsList() {
    const baseURL = import.meta.env.VITE_BACKEND_URL


    const validationSchema = Yup.object().shape({
        subcategory: Yup.string().required('Sub-Category is required'),
        category: Yup.string().required('Category is required'),
    });


    const [Customers, setCustomers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({

        subcategory: '',
        category: '',

    });

    const [editingcustomer, setEditingcustomer] = useState(null);

    // Fetch all Customers
    const fetchCustomers = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('user'))?.jwtToken;
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };
            const res = await axios.get(`${baseURL}/subcategory`, { headers });
            //console.log(res.data);

            setCustomers(res.data);
        } catch (err) {
            console.error('Error fetching Customers:', err);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    // Create or Update customer
    const handleSubmit = async (values, { resetForm }) => {
        const token = JSON.parse(localStorage.getItem('user'))?.jwtToken;
        if (!token) return console.error("Token not found");

        const payload = {
            subcategory: values.subcategory,
            category: values.category,

        };

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };

        try {
            if (editingcustomer) {
                await axios.put(`${baseURL}/subcategory/${editingcustomer.id}`, payload, { headers });
            } else {
                await axios.post(`${baseURL}/subcategory`, payload, { headers });
            }

            resetForm();
            setShowForm(false);
            setEditingcustomer(null);
            fetchCustomers();
        } catch (err) {
            console.error('Error saving customer:', err);
        }
    };





    // Set edit mode
    const handleEdit = (customer) => {
        setEditingcustomer(customer);
        setFormData({
            // title: customer.title || '',
            subcategory: customer.subcategory || '',
            category: customer.category || '',

        });
        setShowForm(true);
    };



    // Delete customer
    const handleDelete = async (customerId) => {
        const token = JSON.parse(localStorage.getItem('user'))["jwtToken"];

        try {
            await axios.delete(`${baseURL}/subcategory/${customerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchCustomers();
        } catch (err) {
            console.error('Error deleting customer:', err);
        }
    };
    //
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('user'))?.jwtToken;
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };
            const res = await axios.get(`${baseURL}/category`, { headers });
            setCategories(res.data);
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    useEffect(() => {
        fetchCategories(); // Fetch categories on mount
    }, []);


    return (
        <>
            <>
                {/* Sidebar */}
                <Slidebar1 />
                {/* Main Content */}
                <div className="lg:ml-64 ml-0">
                    {/* Header */}
                    <Header />
                    {/* Main Content Area */}
                    <main className="p-4 lg:p-6">
                        <div className="flex justify-between p-4">
                            <h1 className="text-2xl font-semibold">Sub-Category Management</h1>
                            <button
                                className="border rounded-md px-4 py-2 bg-blue-500 text-white"
                                onClick={() => setShowForm(true)}
                            >
                                Create Sub-Category
                            </button>
                        </div>

                        {/* Customers Table */}
                        <div className="overflow-x-auto p-4">
                            <table className="min-w-full bg-white dark:bg-gray-800 shadow rounded-md">
                                <thead>
                                    <tr className="text-left border-b">
                                        <th className="p-4">#</th>
                                        <th className="p-4">Sub-Category</th>
                                        <th className="p-4">Category</th>

                                        <th className="p-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Customers.length > 0 ? (
                                        Customers.map((customer, index) => (
                                            <tr key={customer.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <td className="p-4">{index + 1}</td>
                                                <td className="p-4">{customer.subcategory}</td>
                                                <td className="p-4">{customer.category}</td>

                                                <td className="p-4 flex gap-2">
                                                    <button
                                                        className="text-blue-500 border px-2 py-1 rounded hover:bg-blue-100"
                                                        onClick={() => handleEdit(customer)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="text-red-500 border px-2 py-1 rounded hover:bg-red-100"
                                                        onClick={() => handleDelete(customer.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="p-4 text-center text-gray-500">
                                                No Sub-Category available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>

                        {/* Create/Edit Form */}

                        {showForm && (



                            <Formik
                                initialValues={{
                                    subcategory: editingcustomer?.subcategory || '',
                                    category: editingcustomer?.category || '',

                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit} // ✅ just pass it here
                                context={{ isEdit: !!editingcustomer }}
                            >


                                {() => (
                                    <Form className="p-4 mt-6 bg-white shadow rounded-md max-w-md mx-auto">
                                        <h2 className="text-xl font-semibold mb-4">
                                            {editingcustomer ? 'Edit Sub-Category' : 'Create Sub-Category'}
                                        </h2>

                                        {['subcategory'].map((field) => (
                                            <div key={field} className="mb-3">
                                                <Field
                                                    name={field}
                                                    type={field.includes('password') ? 'password' : 'text'}
                                                    placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                                                    className="w-full border px-3 py-2 rounded"
                                                />
                                                <ErrorMessage name={field} component="div" className="text-red-500 text-sm mt-1" />
                                            </div>
                                        ))}
                                        <div className="mb-3">
                                            <label htmlFor="category" className="block font-medium mb-1">Category</label>
                                            <Field as="select" name="category" className="w-full border px-3 py-2 rounded">
                                                <option value="">Select Category</option>
                                                {categories.map(cat => (
                                                    <option key={cat.id} value={cat.category}>
                                                        {cat.category}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                type="submit"
                                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                            >
                                                {editingcustomer ? 'Update Sub-Category' : 'Add Sub-Category'}
                                            </button>
                                            <button
                                                type="button"
                                                className="px-4 py-2 border rounded hover:bg-gray-200"
                                                onClick={() => {
                                                    setEditingcustomer(null);
                                                    setShowForm(false);
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>

                        )}


                    </main>
                </div>
                {/* Add login dropdown */}

            </>
        </>
    )
}

export default SubCategorySegmentsList