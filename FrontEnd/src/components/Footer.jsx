import React from 'react';
import { FaInstagram, FaWhatsapp} from "react-icons/fa";
import { FaSquareFacebook,FaMapLocation } from "react-icons/fa6"; 
import { Link } from 'react-router-dom';
import scrollTop from '../helper/scrollerTop';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 relative pt-20">
      <div className="container mx-auto px-4">
        {/* Back to top button */}
        <div className="text-center mb-6 absolute w-full top-0 right-0 left-0">
          <button onClick={scrollTop} className="w-full bg-blue-600 hover:bg-blue-500 text-white h-12">
            Back to Top
          </button>
        </div>
        
        {/* Footer content */}
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Us Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p>Copyright 2025 by Mo Arfat Ansari. All rights reserved.</p>
          </div>

          {/* Customer Support Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Customer Support</h3>
            <ul>
              
              <li><Link onClick={()=>scrollTop()} to="/contact" className="hover:text-blue-400">Contact Us</Link></li>
             
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/" target="_blank" className="text-2xl hover:text-blue-500">
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com/" target="_blank" className="text-2xl hover:text-blue-500">
                <FaSquareFacebook />
              </a>
              <a href="https://wa.me/9104045985" target="_blank" className="text-2xl hover:text-green-500">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li><Link onClick={()=>scrollTop()} to="/" className="hover:text-blue-400">Home</Link></li>
              <li><Link onClick={()=>scrollTop()} to="/Services" className="hover:text-blue-400">Services</Link></li>
              <li><Link onClick={()=>scrollTop()} to="/about" className="hover:text-blue-400">About</Link></li>
              <li><Link onClick={()=>scrollTop()} to="/contact" className="hover:text-blue-400">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-8 text-center">
          <p>&copy; 2025 Mo Arfat Ansari. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
