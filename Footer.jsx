import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Brand Info */}
        <div>
          <h3 className="text-xl font-bold text-blue-400 border-b-2 border-white pb-1 w-fit">Mind Spark Quiz App</h3>
          <p className="mt-2 text-sm">WHERE PASSION MEETS PERFECTION!</p>
        </div>

        {/* Quiz Section */}
        <div>
          <h3 className="text-xl font-bold text-blue-400 border-b-2 border-white pb-1 w-fit">Quiz</h3>
          <Link to="/" className="block mt-2 text-sm hover:text-blue-300">All Quiz</Link>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-xl font-bold text-blue-400 border-b-2 border-white pb-1 w-fit">Follow</h3>
          <div className="mt-2 space-y-2">
            <a href="#" className="flex items-center text-sm hover:text-pink-400">
              <i className="fa fa-instagram mr-2"></i> Instagram
            </a>
            <a href="#" className="flex items-center text-sm hover:text-blue-500">
              <i className="fa fa-linkedin mr-2"></i> LinkedIn
            </a>
            <a href="#" className="flex items-center text-sm hover:text-blue-400">
              <i className="fa fa-facebook mr-2"></i> Facebook
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold text-blue-400 border-b-2 border-white pb-1 w-fit">Contact</h3>
          <p className="flex items-center mt-2 text-sm">
            <i className="fa fa-home mr-2"></i> Bengaluru
          </p>
          <p className="flex items-center text-sm">
            <i className="fa fa-envelope mr-2"></i> mindspark@email.com
          </p>
          <p className="flex items-center text-sm">
            <i className="fa fa-phone mr-2"></i> +91 9480729542
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <p className="text-center text-sm mt-6 border-t border-gray-600 pt-4">
        &copy; {new Date().getFullYear()} Mind Spark Quiz App. All rights reserved.
      </p>
    </footer>
  );
};
