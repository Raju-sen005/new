import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Components/Header";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Slidebar1 from "../Components/Slidebar1";

function ThemeSegmentsList() {
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  const validationSchema = Yup.object().shape({
    theme: Yup.string().required("Theme is required"),
    image: Yup.mixed(),
  });

  const [themes, setThemes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTheme, setEditingTheme] = useState(null);

  // Fetch themes
  const fetchThemes = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.jwtToken;
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.get(`${baseURL}/theme`, { headers });
      setThemes(res.data);
    } catch (err) {
      console.error("Error fetching themes:", err);
    }
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  // Create/Update theme
  const handleSubmit = async (values, { resetForm }) => {
    const token = JSON.parse(localStorage.getItem("user"))?.jwtToken;
    if (!token) return console.error("Token not found");

    const formData = new FormData();
    formData.append("theme", values.theme);
    if (values.image) formData.append("image", values.image);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    try {
      if (editingTheme) {
        await axios.put(`${baseURL}/theme/${editingTheme.id}`, formData, {
          headers,
        });
      } else {
        await axios.post(`${baseURL}/theme`, formData, { headers });
      }
      resetForm();
      setShowForm(false);
      setEditingTheme(null);
      fetchThemes();
    } catch (err) {
      console.error("Error saving theme:", err);
    }
  };

  // Edit theme
  const handleEdit = (theme) => {
    setEditingTheme(theme);
    setShowForm(true);
  };

  // Delete theme
  const handleDelete = async (id) => {
    const token = JSON.parse(localStorage.getItem("user"))?.jwtToken;
    try {
      await axios.delete(`${baseURL}/theme/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchThemes();
    } catch (err) {
      console.error("Error deleting theme:", err);
    }
  };

  return (
    <>
      <Slidebar1 />
      <div className="lg:ml-64 ml-0">
        <Header />
        <main className="p-4 lg:p-6">
          <div className="flex justify-between p-4">
            <h1 className="text-2xl font-semibold">Theme Management</h1>
            <button
              className="border rounded-md px-4 py-2 bg-blue-500 text-white"
              onClick={() => setShowForm(true)}
            >
              Create Theme
            </button>
          </div>

          {/* Themes Table */}
          <div className="overflow-x-auto p-4">
            <table className="min-w-full bg-white dark:bg-gray-800 shadow rounded-md">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-4">#</th>
                  <th className="p-4">Theme</th>
                  <th className="p-4">Image</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {themes.length > 0 ? (
                  themes.map((theme, index) => (
                    <tr
                      key={theme.id}
                      className="border-b hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">{theme.theme}</td>
                      <td className="p-4">
                        <img
                          src={`${baseURL.replace(/\/api$/, "")}/uploads/${

                            theme.image
                          }`}
                          alt="theme"
                          className="h-12 w-12 object-cover rounded"
                        />
                      </td>
                      <td className="p-4 flex gap-2">
                        <button
                          className="text-blue-500 border px-2 py-1 rounded hover:bg-blue-100"
                          onClick={() => handleEdit(theme)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 border px-2 py-1 rounded hover:bg-red-100"
                          onClick={() => handleDelete(theme.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      No themes available
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
                theme: editingTheme?.theme || "",
                image: null,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form className="p-4 mt-6 bg-white shadow rounded-md max-w-md mx-auto">
                  <h2 className="text-xl font-semibold mb-4">
                    {editingTheme ? "Edit Theme" : "Create Theme"}
                  </h2>

                  <div className="mb-3">
                    <Field
                      name="theme"
                      type="text"
                      placeholder="Theme"
                      className="w-full border px-3 py-2 rounded"
                    />
                    <ErrorMessage
                      name="theme"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setFieldValue("image", e.currentTarget.files[0])
                      }
                    />
                    <ErrorMessage
                      name="image"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      {editingTheme ? "Update Theme" : "Add Theme"}
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 border rounded hover:bg-gray-200"
                      onClick={() => {
                        setEditingTheme(null);
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
    </>
  );
}

export default ThemeSegmentsList;
