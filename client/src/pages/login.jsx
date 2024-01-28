import React from 'react';
import Form from '../components/Form';
const LoginPage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#e8f1fe]">
      {/* Left Box with Logo */}
      <div className="flex-1  p-4 md:p-6 text-center flex flex-col items-center justify-center bg-[#e8f1fe]">
        <img
          src="https://woorise.com/wp-content/uploads/2020/06/customer-retention.png"
          alt="Logo"
          className="mb-2 h-1/2 object-cover"
        />
      </div>

      {/* Right Box with Form */}
      <div className="flex-1 p-8 md:p-10 my-4 md:my-8 mx-auto rounded-lg bg-[#e8f1fe]">
        <p className="font-bold text-lg md:text-xl lg:text-2xl text-black pb-2">SocioSphere</p>
        <p className="font-semibold mb-6 text-xl text-blue-400">
          Connect, Share, and Explore: Your Social Universe Awaits.
          <br />
          Login to Embrace the Social Experience!
        </p>
        <Form />
      </div>
    </div>
  );
};

export default LoginPage;
