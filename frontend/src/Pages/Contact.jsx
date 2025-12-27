import React from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

const Contact = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/cart");
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3, "Must be at least 3 characters").required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      subject: Yup.string().min(5, "Must be at least 5 characters").required("Subject is required"),
      message: Yup.string().min(10, "Must be at least 10 characters").required("Message is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json"
          },
          body: JSON.stringify(values)
        });

        const data = await response.json();
        if (response.ok && data.success) {
          alert("Your message has been sent!");
          resetForm();
        } else {
          alert(data.message || "Failed to send your message.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Something went wrong. Please try again.");
      }
    }

  });
  //contact
  const contactDetails = [
    { id: 1, icon: "icons/Frame 283.png", text: "+91-8824284631" },
    { id: 2, icon: "icons/Frame 284.png", text: "support@vinstonedesigns.com" },
    { id: 3, icon: "icons/Frame 285.png", text: "Vinston Designs LLC 30 N Gould St #42530 Sheridan, WY 82801 United States" },
  ];
  //
  return (
    <>
      <div className='pt-[150px]'>


        <>
          <Header />


          {/* section-1 */}
          <section className="mt-10">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-serif sm:text-[86px] text-[48px] text-black">
                We’re <span className="italic text-[#AA8265]">Here</span> to Help
              </h1>
              <p className="sm:text-[16px] text-[12px] mt-2 lg:w-138 mx-auto">
                Have questions or need assistance? Our team is ready to provide you with
                the best support. Reach out to us anytime!
              </p>
            </div>
          </section>
          <div className="container lg:w-6xl mx-auto lg:my-10 mt-4">
            <div className="bg-white lg:grid-cols-2 md:grid-cols-1   overflow-hidden max-w-6xl w-full flex flex-wrap">
              <div className="lg:w-1/3 contact-section text-white p-8 flex flex-col justify-center">
                <h2 className="text-[34px] font-normal mb-4">Contact Information</h2>
                <p className="text-[14px] mb-6 text-[#B0B0B0]">
                  For any general questions or assistance-related issues, feel free to
                  contact us using the details provided below.
                </p>
                <div className="space-y-4">
                  {contactDetails.map((contact) => (
                    <div key={contact.id} className="flex items-center space-x-3">
                      <span className="bg-brown-500 p-2 rounded-full">
                        <img src={contact.icon} alt="icon" />
                      </span>
                      <p
                        className="text-[#B0B0B0] absolute left-[25%] md:left-[25%] w-[55%] md:w-[13%]"
                      >
                        {contact.text}
                      </p>

                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-2/3 p-8 border border-[#E9E2D8]">
                <form id="contactForm" className="space-y-4" onSubmit={formik.handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Name Field */}
                    <div>
                      <label className="block text-[#121212] mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        className="w-full border border-[#B0B0B0] p-2 rounded"
                        placeholder="Enter Name"
                        {...formik.getFieldProps("name")}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <p className="text-red-500 text-sm">{formik.errors.name}</p>
                      ) : null}
                    </div>
                    {/* Email Field */}
                    <div>
                      <label className="block text-[#121212] mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="w-full border border-[#B0B0B0] p-2 rounded"
                        placeholder="Enter Email"
                        {...formik.getFieldProps("email")}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <p className="text-red-500 text-sm">{formik.errors.email}</p>
                      ) : null}
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label className="block text-[#121212] mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      className="w-full border border-[#B0B0B0] p-2 rounded"
                      placeholder="Enter Subject"
                      {...formik.getFieldProps("subject")}
                    />
                    {formik.touched.subject && formik.errors.subject ? (
                      <p className="text-red-500 text-sm">{formik.errors.subject}</p>
                    ) : null}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-[#121212] mb-2">Message</label>
                    <textarea
                      name="message"
                      className="w-full border border-[#B0B0B0] p-2 rounded"
                      rows={4}
                      placeholder="Write your message"
                      {...formik.getFieldProps("message")}
                    />
                    {formik.touched.message && formik.errors.message ? (
                      <p className="text-red-500 text-sm">{formik.errors.message}</p>
                    ) : null}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#AA8265] hover:bg-cyan-500 text-white p-3 rounded"
                  >
                    SEND MESSAGE
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* footer section */}
          <Footer />
        </>
      </div>
    </>
  );
};

export default Contact;
