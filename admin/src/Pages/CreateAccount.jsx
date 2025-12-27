import React from 'react'

function CreateAccount() {
  return (
    <>
      <section className="flex items-center justify-center min-h-screen">
  <div className="flex grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
    {/* Left Section */}
    <div className="p-10 px-">
      <div className="flex items-center space-x-2 mb-8">
        <img src="icons/man-logo.png" alt="" />
      </div>
      <h2 className="lg:text-[40px] text-[30px] font-bold mb-4">
        Create a ShopSwift Account
      </h2>
      <p className="text-[#878787] mb-6 lg:text-[16] text-[14px]">
        Try ShopSwift for free. No credit card required.
      </p>
      <button className="w-full border py-2 rounded flex font-semibold items-center justify-center mb-3">
        <span>
          <img src="icons/Email.png" alt="" />
        </span>{" "}
        <span className="ml-2">Sign Up with Email</span>
      </button>
      <button className="w-full bg-white font-semibold text-black py-2 rounded border border-gray-400 flex items-center justify-center mb-3">
        <img src="icons/Google.png" className="w-5 h-5" />
        <span className="ml-2">Sign in with Google</span>
      </button>
      <button className="w-full bg-blue-600 font-semibold py-2 rounded text-white flex items-center justify-center mb-3">
        <span>
          <img src="icons/Facebook.png" alt="" />
        </span>{" "}
        <span className="ml-2">Sign in with Facebook</span>
      </button>
      <button className="w-full border py-2 font-semibold rounded flex bg-black text-white items-center justify-center mb-3">
        <span>
          <img src="icons/Apple.png" alt="" />
        </span>{" "}
        <span className="ml-2">Sign in with Apple</span>
      </button>
      <div className="text-center font-medium my-4">Or</div>
      <p className=" text-sm">
        Already have a ShopSwift account?{" "}
        <a href="#" className="text-blue-500 font-semibold">
          Log In
        </a>
      </p>
      <p className="text-sm mt-6 lg:mt-50 md:mt-50">
        By proceeding, you agree to our{" "}
        <a href="#" className="text-blue-500 font-semibold">
          Terms of Service
        </a>
        .
      </p>
    </div>
    {/* Right Section */}
    <div className="right">
      <img
        src="img/acount.png"
        alt="ShopSwift Store"
        className="w-full lg:h-200 md:h-200 rounded-3xl lg:p-2 py-2 px-10 object-cover"
      />
    </div>
  </div>
</section>

    </>
  )
}

export default CreateAccount
