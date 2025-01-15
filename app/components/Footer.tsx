import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-4 bg-gray-800 text-white text-center">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} AutoAppraise. All rights reserved.
        </p>
        <p className="text-sm mt-2 md:mt-0">
          <a href="/privacy-policy" className="text-gray-400 hover:text-white">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a
            href="/terms-of-service"
            className="text-gray-400 hover:text-white"
          >
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
