import React from "react";

const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-purple-400 via-pink-400 to-red-400
                       text-white py-8 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
        
        {/* Logo / Brand */}
        <div className="text-2xl font-bold">ShopNest</div>

        {/* Navigation links */}
        <div className="flex gap-6 flex-wrap justify-center">
          <a href="/" className="hover:underline">Home</a>
          <a href="/About" className="hover:underline">About</a>
          <a href="/feedback" className="hover:underline">Feedback</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-white/80">
          © {new Date().getFullYear()} ShopNest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
