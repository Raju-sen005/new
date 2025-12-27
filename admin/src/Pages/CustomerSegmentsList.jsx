import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Components/Header'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import Slidebar1 from '../Components/Slidebar1';

function CustomerSegmentsList() {
    const baseURL = import.meta.env.VITE_BACKEND_URL


    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().when('$isEdit', {
            is: false,
            then: () => Yup.string().required('Password is required'),
            otherwise: () => Yup.string().notRequired(),
        }),
        confirmPassword: Yup.string().when('$isEdit', {
            is: false,
            then: () =>
                Yup.string()
                    .required('Confirm password is required')
                    .oneOf([Yup.ref('password')], 'Passwords must match'),
            otherwise: () => Yup.string().notRequired(),
        }),
        role: Yup.string().required('Role is required'),
    });


    const [Customers, setCustomers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        // title: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
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
            const res = await axios.get(`${baseURL}`, { headers });
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
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
            role: values.role,
        };

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };

        try {
            if (editingcustomer) {
                await axios.put(`${baseURL}/${editingcustomer.id}`, payload, { headers });
            } else {
                await axios.post(`${baseURL}`, payload, { headers });
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
            firstName: customer.firstName || '',
            lastName: customer.lastName || '',
            email: customer.email || '',
            password: '', // Keep password fields empty for security
            confirmPassword: '',
            role: customer.role || '',
        });
        setShowForm(true);
    };



    // Delete customer
    const handleDelete = async (customerId) => {
        const token = JSON.parse(localStorage.getItem('user'))["jwtToken"];

        try {
            await axios.delete(`${baseURL}/${customerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchCustomers();
        } catch (err) {
            console.error('Error deleting customer:', err);
        }
    };

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
                            <h1 className="text-2xl font-semibold">customer Management</h1>
                            <button
                                className="border rounded-md px-4 py-2 bg-blue-500 text-white"
                                onClick={() => setShowForm(true)}
                            >
                                Create customer
                            </button>
                        </div>

                        {/* Customers Table */}
                        <div className="overflow-x-auto p-4">
                            <table className="min-w-full bg-white dark:bg-gray-800 shadow rounded-md">
                                <thead>
                                    <tr className="text-left border-b">
                                        <th className="p-4">#</th>
                                        <th className="p-4">Name</th>
                                        <th className="p-4">Email</th>
                                        <th className="p-4">Role</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {Customers.length > 0 ? (
                                        Customers.map((customer, index) => (
                                            <tr key={customer.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <td className="p-4">{index + 1}</td>
                                                <td className="p-4">{customer.firstName} {customer.lastName}</td>
                                                <td className="p-4">{customer.email}</td>
                                                <td className="p-4">{customer.role}</td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded text-sm font-medium ${customer.isVerified ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                        {customer.isVerified ? 'Verified' : 'Unverified'}
                                                    </span>
                                                </td>
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
                                                No Customers available
                                            </td>
                                        </tr>
                                    )} */}
                                </tbody>
                            </table>

                        </div>

                        {/* Create/Edit Form */}

                        {showForm && (



                            <Formik
                                initialValues={{
                                    firstName: editingcustomer?.firstName || '',
                                    lastName: editingcustomer?.lastName || '',
                                    email: editingcustomer?.email || '',
                                    password: '',
                                    confirmPassword: '',
                                    role: editingcustomer?.role || '',
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit} // ✅ just pass it here
                                context={{ isEdit: !!editingcustomer }}
                            >


                                {() => (
                                    <Form className="p-4 mt-6 bg-white shadow rounded-md max-w-md mx-auto">
                                        <h2 className="text-xl font-semibold mb-4">
                                            {editingcustomer ? 'Edit Customer' : 'Create Customer'}
                                        </h2>

                                        {['firstName', 'lastName', 'email', 'password', 'confirmPassword'].map((field) => (
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
                                            <Field as="select" name="role" className="w-full border px-3 py-2 rounded">
                                                <option value="">Select Role</option>
                                                <option value="Admin">Admin</option>
                                                <option value="User">User</option>
                                            </Field>
                                            <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                type="submit"
                                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                            >
                                                {editingcustomer ? 'Update Customer' : 'Add Customer'}
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
                <div
                    id="loginDropdown"
                    className="hidden absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg dark:bg-gray-800 p-4"
                >
                    <div className="space-y-4">
                        <div className="flex space-x-4">
                            <button
                                onClick="switchLoginMethod('email')"
                                className="flex-1 py-2 px-4 rounded-lg bg-blue-500 text-white"
                            >
                                Email
                            </button>
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}

export default CustomerSegmentsList