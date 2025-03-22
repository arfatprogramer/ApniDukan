import React, { useState } from 'react';
import { submitContoctForm} from "../common/apiData";
import { toast } from 'react-toastify';

const Contact = () => {
  // State to handle form submission
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const server=await fetch(submitContoctForm.url,{
      method:submitContoctForm.method,
      headers:{"content-type":"application/json"},
      body:JSON.stringify(formData)
    })
    const response=await server.json()
    if (response.success) {
      toast.success(response.message)
    }
    setIsSubmitted(true);
  };

  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Send Us a Message</h2>
            <p className="text-lg text-gray-600 mb-8">
              Have questions or need assistance? Reach out to us, and we will get back to you as soon as possible.
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">Full Name</label>
                <input 
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email Address</label>
                <input 
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                  placeholder="Your Email"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message</label>
                <textarea 
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                  rows="5"
                  placeholder="Your Message"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md text-lg font-medium hover:bg-blue-500 transition"
              >
                Send Message
              </button>
            </form>

            {isSubmitted && (
              <p className="mt-4 text-green-500 text-lg font-medium">Thank you for reaching out! We’ll get back to you soon.</p>
            )}
          </div>

          {/* Contact Information Section */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Contact Information</h2>
            <p className="text-lg text-gray-600 mb-4">
              You can reach us through any of the following methods:
            </p>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Phone</h3>
              <p className="text-lg text-gray-600">+91 18000 09400</p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Email</h3>
              <p className="text-lg text-gray-600">ArfatAnsari.code@gmail.com</p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Address</h3>
              <p className="text-lg text-gray-600">
                Bhilad, valsad, gujrat 396105
              </p>
            </div>

            {/* Map Section */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Location</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.601400168553!2d-122.08244948468155!3d37.42199977982542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fbf2b90d79b1f%3A0x9b8f5cd7b3d7035f!2sGoogleplex!5e0!3m2!1sen!2sus!4v1597557803747!5m2!1sen!2sus"
                width="100%"
                height="250"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
