import { Link } from "react-router-dom";

function Information({
  title,
  description,
  buttonText,
  buttonText1,
  buttonText2,
  srcImg,
  srcImg1,
  exploreLinkState,
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between py-10 ">
        {/* Left: Text Content */}
        <div className="relative flex-1 w-full text-center lg:text-left space-y-6 max-w-xl mx-auto lg:mx-0">
          <h1
            style={{ fontFamily: "" }}
            // David Libre font family if needed
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
          >
            {title}
          </h1>
          <p className="text-gray-600 text-base sm:text-lg text-justify">
            {description}
          </p>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-4">
            <Link
      to="/"
      state={exploreLinkState} 
    >

              <div className="relative inline-flex items-center cursor-pointer">
                <button className="bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] font-bold px-6 sm:px-8 py-2 rounded-full shadow-md whitespace-nowrap">
                  {buttonText}
                </button>
                <img
                  src={srcImg}
                  alt="Arrow Icon"
                  className="absolute right-[-10px] w-5 h-5 sm:w-6 sm:h-6"
                />
              </div>
            </Link>
            <Link to="/Signup">
              <button className="relative bg-gray-100 px-8 py-2 rounded-full text-gray-600 font-semibold shadow-md whitespace-nowrap cursor-pointer">
                {buttonText1}
              </button>
            </Link>
          </div>
          {/* Login Button */}
          <div className="flex justify-center lg:justify-center">
            <Link to="/Login">
              <button className="relative text-red-600 font-semibold mt-2 cursor-pointer hover:underline select-none ">
                {buttonText2}
              </button>
            </Link>
          </div>
        </div>
        {/* Right: Illustration */}
        <div className="flex-1 flex justify-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <img
            src={srcImg1}
            alt="Product Finder Illustration"
            className="w-48 sm:w-64 md:w-80 lg:w-96 hidden lg:block"
          />
        </div>
      </div>
    </div>
  );
}

export default Information;