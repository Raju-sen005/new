import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Components/Header";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Slidebar1 from "../Components/Slidebar1";

function CategorySegmentsList() {
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  const validationSchema = Yup.object().shape({
    category: Yup.string().required("Category is required"),
    // subject: Yup.string().required('Subject is required'),
    // message: Yup.string().required('Message is required'),
    // lastName: Yup.string().required('Last name is required'),
    // email: Yup.string().email('Invalid email').required('Email is required'),
    // password: Yup.string().when('$isEdit', {
    //     is: false,
    //     then: () => Yup.string().required('Password is required'),
    //     otherwise: () => Yup.string().notRequired(),
    // }),
    // confirmPassword: Yup.string().when('$isEdit', {
    //     is: false,
    //     then: () =>
    //         Yup.string()
    //             .required('Confirm password is required')
    //             .oneOf([Yup.ref('password')], 'Passwords must match'),
    //     otherwise: () => Yup.string().notRequired(),
    // }),
    // role: Yup.string().required('Role is required'),
  });

  const [Customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    // title: '',
    // name: '',
    category: "",
    // email: '',
    // message: '',
    // confirmPassword: '',
    // role: ''
  });

  const [editingcustomer, setEditingcustomer] = useState(null);

  // Fetch all Customers
  const fetchCustomers = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.jwtToken;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.get(`${baseURL}/category`, { headers });
      //console.log(res.data);

      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching Customers:", err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Create or Update customer
  // Create or Update customer
  const handleSubmit = async (values, { resetForm }) => {
    const token = JSON.parse(localStorage.getItem("user"))?.jwtToken;
    if (!token) return console.error("Token not found");

    const formData = new FormData();
    formData.append("category", values.category);
    if (values.image) {
      formData.append("image", values.image); // 👈 file append
    }

    const headers = { Authorization: `Bearer ${token}` };

    try {
      if (editingcustomer) {
        await axios.put(`${baseURL}/category/${editingcustomer.id}`, formData, {
          headers,
        });
      } else {
        await axios.post(`${baseURL}/category`, formData, { headers });
      }

      resetForm();
      setShowForm(false);
      setEditingcustomer(null);
      fetchCustomers();
    } catch (err) {
      console.error("Error saving category:", err);
    }
  };

  // Set edit mode
  const handleEdit = (customer) => {
    setEditingcustomer(customer);
    setFormData({
      // title: customer.title || '',
      category: customer.category || "",
      // subject: customer.subject || '',
      // email: customer.email || '',
      // message: customer.message || '',
      // password: '', // Keep password fields empty for security
      // confirmPassword: '',
      // role: customer.role || '',
    });
    setShowForm(true);
  };

  // Delete customer
  const handleDelete = async (customerId) => {
    const token = JSON.parse(localStorage.getItem("user"))["jwtToken"];

    try {
      await axios.delete(`${baseURL}/category/${customerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCustomers();
    } catch (err) {
      console.error("Error deleting customer:", err);
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
              <h1 className="text-2xl font-semibold">Category Management</h1>
              <button
                className="border rounded-md px-4 py-2 bg-blue-500 text-white"
                onClick={() => setShowForm(true)}
              >
                Create Category
              </button>
            </div>

            {/* Customers Table */}
            <div className="overflow-x-auto p-4">
              <table className="min-w-full bg-white dark:bg-gray-800 shadow rounded-md">
                <thead>
                  <tr className="text-left border-b">
                    <th className="p-4">#</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Image</th> {/* 👈 new column */}
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Customers.length > 0 ? (
                    Customers.map((customer, index) => (
                      <tr
                        key={customer.id}
                        className="border-b hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <td className="p-4">{index + 1}</td>
                        <td className="p-4">{customer.category}</td>
                        <td className="p-4">
                          {customer.image ? (
                            <img
                              src={
                                customer.image.startsWith("http")
                                  ? customer.image
                                  : `${import.meta.env.VITE_BACKEND_URL}${
                                      customer.image
                                    }`
                              }
                              alt="category"
                              className="h-12 w-12 object-cover rounded"
                            />
                          ) : (
                            "No Image"
                          )}
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
                        No Category available
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
                  category: editingcustomer?.category || "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                context={{ isEdit: !!editingcustomer }}
              >
                {(
                  { setFieldValue } // ✅ destructure setFieldValue here
                ) => (
                  <Form className="p-4 mt-6 bg-white shadow rounded-md max-w-md mx-auto">
                    <h2 className="text-xl font-semibold mb-4">
                      {editingcustomer ? "Edit Category" : "Create Category"}
                    </h2>

                    {/* Category field */}
                    <div className="mb-3">
                      <Field
                        name="category"
                        type="text"
                        placeholder="Category"
                        className="w-full border px-3 py-2 rounded"
                      />
                      <ErrorMessage
                        name="category"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* File input */}
                    <div className="mb-3">
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={(event) => {
                          setFieldValue("image", event.currentTarget.files[0]);
                        }}
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        {editingcustomer ? "Update Category" : "Add Category"}
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
  );
}

export default CategorySegmentsList;
