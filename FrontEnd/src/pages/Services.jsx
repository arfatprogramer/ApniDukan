import React from 'react';
import { Link } from 'react-router-dom';
import { BsCartCheckFill } from "react-icons/bs";
import { MdSupportAgent } from "react-icons/md";
import { FaHandHoldingUsd } from "react-icons/fa";
const Services = () => {

  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Our Services</h1>

        {/* Services Overview */}
        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">What We Offer</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            At ApniDukan, we provide top-notch services in the electronics market to meet the needs of both consumers and businesses. Our goal is to offer innovative solutions to enhance your online shopping and selling experience.
          </p>
        </section>

        {/* Service Cards */}
        <section className="grid md:grid-cols-3 gap-16">
          
          {/* Service 1 */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex justify-center mb-6">
              {/* <img src="/icons/shopping-cart.svg" alt="Shopping Cart" className="w-16 h-16" /> */}
              <BsCartCheckFill className="w-16 h-16" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Electronics Shopping</h3>
            <p className="text-lg text-gray-600 mb-4">
              Discover a wide variety of high-quality electronics from leading brands. From smartphones to home appliances, we offer products that meet your needs and exceed expectations.
            </p>
            <Link 
              to="/"
              className="text-blue-600 hover:text-blue-500 font-semibold"
            >
              Shop Now
            </Link>
          </div>

          {/* Service 2 */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex justify-center mb-6">
            <FaHandHoldingUsd className="w-16 h-16" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Sell Your Electronics</h3>
            <p className="text-lg text-gray-600 mb-4">
              Become a seller on our platform and reach millions of customers. We provide an easy-to-use interface for listing your products and managing orders, helping you grow your business.
            </p>
            <Link 
              to="/SignupVender/vender"
              className="text-blue-600 hover:text-blue-500 font-semibold"
            >
              Become a Seller
            </Link>
          </div>

          {/* Service 3 */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex justify-center mb-6">
            <MdSupportAgent className="w-16 h-16" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">24/7 Customer Support</h3>
            <p className="text-lg text-gray-600 mb-4">
              Our dedicated support team is available around the clock to help with any questions or issues you may have. We're here to ensure you have a smooth and satisfying experience with our platform.
            </p>
            <Link
              href="/contact"
              className="text-blue-600 hover:text-blue-500 font-semibold"
            >
              Get Help
            </Link>
          </div>
          
        </section>

        {/* Service Details */}
        <section className="mt-16 bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Quality Electronics</h3>
              <p className="text-lg text-gray-600">
                We offer a curated selection of high-quality, branded electronics. Our products are tested for durability and performance to ensure you get the best value for your money.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Seamless Shopping Experience</h3>
              <p className="text-lg text-gray-600">
                Enjoy an easy, fast, and secure shopping experience. With an intuitive platform and smooth checkout process, your online shopping journey will be hassle-free.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Fast Delivery</h3>
              <p className="text-lg text-gray-600">
                We ensure prompt and reliable delivery services. Your products will be delivered to your doorstep in the shortest time possible, so you never have to wait long.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Secure Transactions</h3>
              <p className="text-lg text-gray-600">
                Our platform is designed to keep your payment details secure with the latest encryption technology. Shop and sell with confidence knowing your information is safe.
              </p>
            </div>
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default Services;
