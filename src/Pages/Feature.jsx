import React, { useState } from 'react';
import { Star } from 'lucide-react';

const products = ["100% Tools", "Awards", "All Colors", "All Directories", "Best Startups"];

const FeatureProductSection = () => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const isAuthenticated = false; // Change this based on actual auth logic

  const handleProductClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    }
  };

  const handleSubmit = (pkg) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    alert(`Submitting for ${selectedProduct || 'Unknown Product'} with ${pkg}`);
  };

  return (
    <section className="w-full bg-gray-50 py-12 px-4 rounded-xl relative z-0">
      <div className={`max-w-5xl mx-auto text-center space-y-10 ${showAuthModal ? 'blur-sm pointer-events-none' : ''}`}>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Feature your product</h2>

        {/* Product Selector */}
        <div className="space-y-4">
          <label className="block text-left font-medium text-gray-600">Please choose your product*</label>
          <select
            onClick={handleProductClick}
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="w-full max-w-md mx-auto px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Product</option>
          
          </select>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
      {[1, 2, 3].map((num) => (
        <div
          key={num}
          className={`relative bg-white p-6 rounded-2xl shadow-lg   ${
            selectedPackage === num ? '' : ''
          }`}
          onClick={() => setSelectedPackage(num)}
        >
          {/* Star badge */}
          <div className="absolute top-4 right-4 text-yellow-400 text-2xl">
            <Star fill="currentColor" className="w-6 h-6" />
          </div>

          {/* Title */}
          <h3 className="text-center text-sm font-bold tracking-wider text-blue-900 uppercase">
            Basic <br /> Category Star
          </h3>

          {/* Price */}
          <p className="text-center text-3xl font-bold text-blue-900 mt-3">
            $29.99 <span className="text-base font-medium text-gray-500">/ month</span>
          </p>

          {/* Star Rating */}
          <div className="flex justify-center mt-2 text-yellow-500">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star key={i} fill="currentColor" className="w-4 h-4 mx-0.5" />
              ))}
          </div>

          {/* Features */}
          <ul className="mt-4 text-sm text-gray-600 space-y-2 text-left">
            <li>Featured on your product's categories</li>
            <li>Featured on your product's tags</li>
            <li>Indexed on Google and gets a dofollow high DA backlink</li>
          </ul>

          {/* Submit Button */}
          <button
            onClick={() => alert(`Selected Package ${num}`)}
            className="mt-6 w-full bg-blue-900 text-white font-semibold py-2 rounded-full hover:bg-blue-800 transition"
          >
            Submit
          </button>
        </div>
      ))}
    </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-40">
          <div className="bg-white rounded-2xl px-6 py-8 text-center max-w-md mx-auto shadow-xl">
            <h2 className="text-2xl font-bold text-[#060B57]">Sign in / Register</h2>
            <p className="text-gray-600 mt-2 mb-6">You need to sign in or register to use this feature</p>
            <div className="flex justify-center gap-4">
              <button
                className="px-6 py-2 bg-blue-100 text-blue-700 rounded-full font-medium hover:bg-blue-200"
                onClick={() => {
                  setShowAuthModal(false);
                  // add navigation to register
                }}
              >
                Register
              </button>
              <button
                className="px-6 py-2 bg-gradient-to-r from-[#cdddfd] to-[#e5c9fd] text-[#060B57] font-medium rounded-full hover:opacity-90"
                onClick={() => {
                  setShowAuthModal(false);
                  // add navigation to login
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeatureProductSection;
