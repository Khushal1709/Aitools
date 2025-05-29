import { Link} from "react-router-dom";
import { Github } from "lucide-react";
import login from "../image/login.svg";
import logo from "../image/logo.svg";
import leaffooter from "../image/leaffooter.svg";
import leaf from "../image/leaf.svg";

export default function Signup() {
  return (
    <div className="min-h-screen w-full bg-purple-100 flex items-center justify-center relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-200 z-0" />

      {/* Decorative image at bottom left */}
      <div className="absolute bottom-0 left-0 w-64 opacity-10 pointer-events-none z-0">
        <img
          src={leaffooter}
          alt="decorative"
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 py-12 relative z-10">
        {/* Left side with illustration */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center mb-8 md:mb-0 px-4">
          <div className="hidden md:flex text-purple-300 font-bold text-6xl md:text-7xl opacity-40 mb-4 select-none">
            WELCOME
          </div>
          <img
            src={login}
            alt="Illustration"
            className="hidden md:flex w-full max-w-sm md:max-w-md"
          />
        </div>

        {/* Right side - Login Form */}
        <div className="w-full md:w-1/2 max-w-md bg-white rounded-3xl shadow-lg p-6 sm:p-8">
          {/* Decorative image (optional) */}
          <div className="hidden md:block absolute right-8 top-8 opacity-10 w-24 pointer-events-none">
            <img src={leaf} alt="leaf" />
          </div>

          {/* Logo */}
          <Link to="/">
            <div className="flex justify-center mb-6">
              <img src={logo} alt="Logo" className="h-10" />
            </div>
          </Link>

          {/* Title */}
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Create Account
          </h1>

          {/* Form */}
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email address.."
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-transparent focus:border-gray-500 focus:bg-white focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-transparent focus:border-gray-500 focus:bg-white focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#050A30] text-white rounded-full py-3 font-medium hover:bg-navy-800 transition duration-300"
            >
              CREATE ACCOUNT
            </button>
          </form>

          {/* Social login */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p className="mb-3">or Sign up with</p>
            <div className="flex justify-center space-x-4">
              {/* Google */}
              <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100">
                <Link to="https://accounts.google.com/v3/signin/identifier?ifkv=ASKV5Mh1dG0K9aBoiWjQmmVhtB02sSfbzM0NKCcI3xaC0IZxgtuhTY6f1O1GZznu0zPW9sXk_QJm9g&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-1406899026%3A1748241935854979">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#EA4335"
                      d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
                    />
                    <path
                      fill="#34A853"
                      d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
                    />
                    <path
                      fill="#4A90E2"
                      d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
                    />
                  </svg>
                </Link>
              </button>

              {/* GitHub */}
              <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100">
                <Link to="https://github.com/login">
                  <Github size={20} />
                </Link>
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>
              By creating an account you agree to{" "}
              <Link to="#" className="text-gray-900 font-medium">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="#" className="text-gray-900 font-medium">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          {/* Login link */}
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">Already Have an Account? </span>
            <Link to="/Login" className="text-gray-900 font-medium">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
