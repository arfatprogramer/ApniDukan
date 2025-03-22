import React from 'react';


const About = () => {
  return (
    <div className="bg-gray-100 py-16">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Page Title */}
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">About Us</h1>

        {/* Company Overview Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Story</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Welcome to ApniDukan, a platform dedicated to bringing the latest and most innovative electronics to our customers. Since our founding in 2025, we have been committed to delivering quality products at affordable prices. Our vision is to revolutionize the online electronics market by focusing on customer satisfaction, exceptional service, and technological advancements.
          </p>
        </section>

        {/* Mission & Vision Section */}
        <section className="bg-white p-8 rounded-xl shadow-md mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission & Vision</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            Our mission is to provide an outstanding shopping experience by offering a wide range of high-quality electronics. We are passionate about giving customers access to the latest tech, and our goal is to be the go-to platform for all things electronics.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our vision is to expand our marketplace, bringing together customers and sellers from around the world. We aim to build a global community of tech enthusiasts and businesses while setting new standards for online electronics shopping.
          </p>
        </section>

        {/* Become a Seller Section */}
        <section className="bg-white p-8 rounded-xl shadow-md mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Become a Seller on Our Platform</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            **Are you an electronics retailer or manufacturer?** Join us today and start selling your products to millions of customers!
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            At [Your Website Name], we believe that everyone has the opportunity to share their innovative products with the world. That’s why we’ve created a seamless and easy-to-use platform for sellers to showcase their electronic products. Whether you're a small business owner or a large manufacturer, we welcome all sellers who meet our criteria.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Why Sell on Our Platform?</h3>
          <ul className="list-disc list-inside text-lg text-gray-600 mb-4">
            <li><strong>Reach a Massive Audience:</strong> Tap into a large and diverse customer base actively looking for quality electronics.</li>
            <li><strong>Hassle-Free Listing:</strong> Our easy-to-use dashboard allows you to list your products quickly and manage them effectively.</li>
            <li><strong>Security and Trust:</strong> We ensure safe and secure transactions with built-in fraud prevention and payment processing.</li>
            <li><strong>Dedicated Support:</strong> Our team is available to assist you throughout your selling journey.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">What You Can Sell</h3>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            We accept sellers who specialize in electronic products. Whether you have smartphones, laptops, home appliances, accessories, or other gadgets, we want to help you grow your business.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">How to Become a Seller</h3>
          <ol className="list-decimal list-inside text-lg text-gray-600 mb-6">
            <li><strong>Create Your Seller Account:</strong> Sign up on our platform to create your seller account and access the dashboard.</li>
            <li><strong>List Your Products:</strong> Upload your products with detailed descriptions, high-quality images, and competitive prices.</li>
            <li><strong>Start Selling:</strong> Once your listings are live, your products will be available for purchase by our customers.</li>
            <li><strong>Manage Your Orders:</strong> Track orders, manage shipping, and update your products from the dashboard.</li>
            <li><strong>Get Paid:</strong> Payments are securely processed, and payouts are made on time.</li>
          </ol>
        </section>

        {/* Contact Section */}
        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-lg text-gray-600 mb-6">
            If you have any questions or would like to learn more about becoming a seller on our platform, feel free to reach out to us.
          </p>
          <a 
            href="mailto:ArfatAnsari.code@gmail.com"
            className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg text-lg font-medium hover:bg-blue-500 transition"
          >
            Contact Us
          </a>
        </section>

      </div>
    </div>
  );
};

export default About;
