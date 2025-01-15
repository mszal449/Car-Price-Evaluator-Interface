import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full shadow-sm shadow-gray-700 navbar-color">
      <div className="flex justify-center items-center p-4">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={40}
          height={40}
          className="mr-2"
        />
        <h1 className="m-0 text-3xl text-[#28ff81] font-bold">AutoAppraise</h1>
      </div>
    </div>
  );
};

export default Navbar;
