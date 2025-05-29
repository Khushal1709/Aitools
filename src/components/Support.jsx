import phone from "../image/phone.svg";
import leaf from "../image/leaf.svg";
import { Link } from "react-router-dom";

export default function Support() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="relative p-2  max-w-7xl mx-auto mt-10 mx-auto bg-[#BAD9FF] py-12 px-7 lg:px-20 rounded-3xl overflow-hidden">
      {/* Leaf Background Image */}
      <img
        src={leaf}
        alt="Decorative Leaf"
        className="absolute bottom-1 right-0 w-30 opacity-90 pointer-events-none select-none"
      />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
        {/* Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-[#14143B]">Want to support?</h2>
          <p className="text-sm text-gray-600">
            Let's look at some ways to narrow down your search for your dream
            home.
          </p>
          <div className="relative inline-block">
            <Link to="/Contact">
              <button
                className="mt-2 bg-[#070742] text-white font-semibold px-8 py-3 rounded-full text-sm uppercase shadow-md cursor-pointer"
                onClick={scrollToTop}
              >
                Contact Us
              </button>
            </Link>
            <div className="absolute -top-1 -right-2 p-2">
              <img src={phone} alt="Phone" className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Email Input */}
        <div className="bg-white shadow-lg rounded-full px-4 py-2 flex items-center w-full max-w-md">
          <input
            type="email"
            placeholder="Enter your email address.."
            className="flex-grow outline-none bg-transparent px-2 text-sm text-gray-700"
          />
          <Link to="/Signup">
            <button
              className="bg-[#14143B] text-white px-5 py-2 rounded-full font-semibold text-sm cursor-pointer"
              onClick={scrollToTop}
            >
              Sign up
            </button>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}