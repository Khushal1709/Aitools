// import React, { useState } from "react";
// import { FiAlertCircle } from 'react-icons/fi'; // Add this at the top
// import { FiShare2 } from "react-icons/fi";
// import {
//     FaCheck,
//     FaRegCopy,
//     FaFacebookF,
//     FaTwitter,
//     FaLinkedinIn,
//     FaEnvelope,
//     FaCopy,
//     FaRegStar,
// } from "react-icons/fa6";
// import { MdOutlineContentPaste, MdShare } from "react-icons/md";
// import { FaReact } from "react-icons/fa6";
// import Comment from "../Text tools/Comment";

// export default function ShadowGenerator() {
//     const [shadowColor, setShadowColor] = useState("#ed0c0c");
//     const [shadowDepth, setShadowDepth] = useState(13);
//     const onFavoriteToggle = () => setIsFavorite((v) => !v);
//     const [isFavorite, setIsFavorite] = useState(false);
//     const [shareOpen, setShareOpen] = useState(false);
//     const [open, setOpen] = useState(false);
//     const [activeTab, setActiveTab] = useState("tool");
//     const [bugDescription, setBugDescription] = useState("");

//     // Example shadow style values for depth 13 (static for demo)
//     const shadowStyle = {
//         shadowColor: shadowColor,
//         shadowOffset: { width: 0, height: 9 },
//         shadowOpacity: 0.22,
//         shadowRadius: 10.24,
//         elevation: shadowDepth,
//     };

//     return (
//             <>
//             {/* Header */}
//             <div className="max-w-4xl mx-auto mt-8">
//             <div className="w-full max-w-4xl mx-auto flex justify-between items-center">
//                 <div className="flex items-center gap-3 mb-2 sm:mb-0">
//                          <span className="text-4xl text-indigo-400">
//                            <FaReact />
//                          </span>
//                          <span className="text-xl font-bold text-gray-900 md:text-sm lg:text-2xl sm:text-lg">
//                            React&nbsp;Native&nbsp;Shadow&nbsp;Generator
//                          </span>
//                        </div>
//                 </div>
//                 <div className="flex flex-col w-full sm:flex-row sm:justify-end gap-2">
//                     <button
//                         onClick={() => setShareOpen(true)}
//                         className="flex items-center justify-center md:w-auto px-3 py-2 text-sm rounded-xl border border-indigo-500 bg-indigo-50 text-indigo-600 md:mb-0 cursor-pointer"
//                     >
//                         <FiShare2 className="mr-2" size={18} />
//                         Share
//                     </button>
//                     <button
//                         className="flex items-center justify-center gap-2 w-full md:w-auto px-3 py-2 text-sm rounded-xl border border-indigo-500 bg-indigo-50 text-indigo-600 cursor-pointer hover:bg-indigo-100 transition"
//                         onClick={() => setOpen(true)}
//                     >
//                         <FiAlertCircle className="text-indigo-600 text-base" />
//                         Report Bug
//                     </button>
//                     <button
//                         onClick={onFavoriteToggle}
//                         className={`px-3 py-2 rounded-xl border text-sm cursor-pointer ${isFavorite
//                             ? "bg-indigo-100 border-indigo-600 text-indigo-700"
//                             : "bg-indigo-50 border-indigo-600 text-indigo-600"
//                             }`}
//                     >
//                         {isFavorite ? (
//                             <>
//                                 <FaCheck className="inline-block mr-1" size={12} /> Added
//                             </>
//                         ) : (
//                             <>
//                                 <FaRegStar className="inline-block mr-1" size={12} /> Add to Favorites
//                             </>
//                         )}
//                     </button>
//                     </div>



//             {/* Controls */}
//             <div className="w-full max-w-4xl flex gap-6 items-center mb-8">
//                 {/* Shadow Color */}
//                 <div className="flex flex-col">
//                     <label className="text-xs text-gray-500 mb-1 mt-2">Shadow Color</label>
//                     <div className="flex items-center gap-2">
//                         <input
//                             type="color"
//                             value={shadowColor}
//                             onChange={(e) => setShadowColor(e.target.value)}
//                             className="w-8 h-8 rounded border border-gray-200 outline-none"
//                         />
//                         <input
//                             type="text"
//                             value={shadowColor}
//                             onChange={(e) => setShadowColor(e.target.value)}
//                             className="px-2 py-1 rounded-lg border border-gray-200 text-sm bg-white text-gray-700 w-28 outline-none"
//                         />
//                     </div>
//                 </div>
//                 {/* Shadow Depth */}
//                 <div className="flex-1 flex flex-col">
//                     <label className="text-xs text-gray-500 mb-1">Shadow Depth: {shadowDepth}</label>
//                     <input
//                         type="range"
//                         min={1}
//                         max={24}
//                         value={shadowDepth}
//                         onChange={(e) => setShadowDepth(Number(e.target.value))}
//                         className="w-full accent-[#bfc1d2]"
//                     />
//                 </div>
//             </div>


//             {/* Main Content */}
//             <div className="w-full max-w-5xl flex flex-wrap md:flex-nowrap gap-8 items-start mb-8">
//                 {/* iOS Mockup */}
//                 <div className="flex-1 flex flex-col items-center">
//                     <span className="mb-2 flex items-center gap-1 text-gray-500 text-sm">
//                         <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
//                             <rect width="24" height="24" rx="6" fill="#e5e7eb" />
//                             <circle cx="12" cy="12" r="7" stroke="#6b7280" strokeWidth="2" />
//                         </svg>
//                         iOS
//                     </span>
//                     <div className="relative w-40 h-72 bg-white rounded-3xl border-4 border-gray-200 flex items-center justify-center">
//                         {/* Notch */}
//                         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-3 bg-gray-300 rounded-b-xl"></div>
//                         {/* Shadowed Card */}
//                         <div
//                             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-xl bg-white"
//                             style={{
//                                 boxShadow: `0px 9px 10.24px 0px ${shadowColor}44`,
//                             }}
//                         />
//                     </div>
//                 </div>
//                 {/* Android Mockup */}
//                 <div className="flex-1 flex flex-col items-center">
//                     <span className="mb-2 flex items-center gap-1 text-gray-500 text-sm">
//                         <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
//                             <rect width="24" height="24" rx="6" fill="#e5e7eb" />
//                             <rect x="7" y="6" width="10" height="12" stroke="#6b7280" strokeWidth="2" />
//                         </svg>
//                         Android
//                     </span>
//                     <div className="relative w-40 h-72 bg-white rounded-2xl border-4 border-gray-200 flex items-center justify-center">
//                         {/* Speaker */}
//                         <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-300 rounded"></div>
//                         {/* Shadowed Card */}
//                         <div
//                             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-xl bg-white"
//                             style={{
//                                 boxShadow: `0px 9px 10.24px 0px ${shadowColor}44`,
//                             }}
//                         />
//                     </div>
//                 </div>
//                 {/* Code Box */}
//                 <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4 min-w-[260px] max-w-xs">
//                     <div className="text-xs text-gray-500 mb-2 font-semibold">React Native Shadow Style</div>
//                     <pre className="bg-[#f8f9fb] rounded-lg p-3 text-xs text-gray-700 overflow-x-auto">
//                         {`shadowColor: "${shadowStyle.shadowColor}",
// shadowOffset: {
//   width: ${shadowStyle.shadowOffset.width},
//   height: ${shadowStyle.shadowOffset.height},
// },
// shadowOpacity: ${shadowStyle.shadowOpacity},
// shadowRadius: ${shadowStyle.shadowRadius},
// elevation: ${shadowStyle.elevation},`}
//                     </pre>
//                     <button className="mt-4 w-full py-2 bg-[#6366f1] text-white rounded-lg font-semibold hover:bg-[#4f46e5] transition">
//                         Copy Code
//                     </button>
//                 </div>
//             </div>
//             <Comment/>
//             </div>
//        </> 
//     );
// }



import React, { useState } from "react";
import { FiAlertCircle } from 'react-icons/fi'; // Add this at the top
import { FiShare2 } from "react-icons/fi";
import {
  FaCheck,
  FaRegCopy,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaCopy,
  FaRegStar,
} from "react-icons/fa6";
import { MdOutlineContentPaste, MdShare } from "react-icons/md";
import { FaReact } from "react-icons/fa6";
import Comment from "../Text tools/Comment";

export default function ShadowGenerator() {
  const [shadowColor, setShadowColor] = useState("#ed0c0c");
  const [shadowDepth, setShadowDepth] = useState(13);
  const onFavoriteToggle = () => setIsFavorite((v) => !v);
  const [isFavorite, setIsFavorite] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tool");
  const [bugDescription, setBugDescription] = useState("");

  // Example shadow style values for depth 13 (static for demo)
  const shadowStyle = {
    shadowColor: shadowColor,
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.22,
    shadowRadius: 10.24,
    elevation: shadowDepth,
  };

  return (
    <>
      {/* Header */}
      <div className="max-w-4xl mx-auto p-2">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
          <div className="flex items-center gap-3 mb-2 sm:mb-0">
            <span className="text-4xl text-indigo-400 mt-6">
              <FaReact />
            </span>
            <span className="text-2xl font-bold text-gray-900 md:text-lg lg:text-2xl sm:text-lg mt-6 ">
              React&nbsp;Native&nbsp;Shadow&nbsp;Generator
            </span>
          </div>
          <div className="flex flex-col w-full md:flex-row md:justify-center md:items-center md:gap-4 mt-6 lg:justify-end lg:gap-2">
            <button
              onClick={() => setShareOpen(true)}
              className="flex items-center justify-center md:w-auto px-3 py-2 text-sm rounded-xl border border-indigo-600 bg-indigo-50 text-indigo-600 mb-2 md:mb-0 cursor-pointer"
            >
              <FiShare2 className="mr-2" size={18} />
              Share
            </button>
            <button
              className="flex items-center justify-center gap-2 w-full md:w-auto px-3 py-2 text-sm rounded-xl border border-indigo-600 bg-indigo-50 text-indigo-600 cursor-pointer hover:bg-indigo-100 transition"
              onClick={() => setOpen(true)}
            >
              <FiAlertCircle className="text-indigo-600 text-base" />
              Report Bug
            </button>
            <button
              onClick={onFavoriteToggle}
              className={`px-3 py-2 rounded-xl border text-sm mt-2 md:mt-0 ml-0 cursor-pointer  ${isFavorite
                ? "bg-indigo-100 border-indigo-600 text-indigo-700"
                : "bg-indigo-50  text-indigo-600"
                }`}
            >
              {isFavorite ? (
                <>
                  <FaCheck className="inline-block mr-1" size={12} /> Added
                </>
              ) : (
                <>
                  <FaRegStar className="inline-block mr-1" size={12} /> Add to
                  Favorites
                </>
              )}
            </button>
          </div>
        </div>
        {/* Share Popup */}
        {shareOpen && (
          <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full relative">
              <div className="flex justify-between mb-4 bg-indigo-50 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab("tool")}
                  className={`w-1/2 px-4 py-2 rounded-xl font-semibold text-sm ${activeTab === "tool"
                    ? "bg-indigo-600 text-white"
                    : "text-indigo-600 hover:bg-indigo-600 hover:text-white"
                    }`}
                >
                  ⚙️ Share Tool
                </button>
                <button
                  onClick={() => setActiveTab("home")}
                  className={`w-1/2 px-4 py-2 rounded-xl font-semibold text-sm ${activeTab === "home"
                    ? "bg-indigo-600 text-white"
                    : "text-indigo-600 hover:bg-indigo-600 hover:text-white"
                    }`}
                >
                  🏠 Share 10015
                </button>
              </div>
              <div className="text-center border border-gray-300 rounded-xl p-6">
                <p className="text-sm mb-1 text-gray-500">
                  You are currently sharing:
                </p>
                <h2 className="text-xl font-semibold mb-5 text-gray-600">
                  {activeTab === "tool"
                    ? "SVG Blob Generator"
                    : "10015 Tools"}
                </h2>
                <div className="flex justify-center mb-6">
                  <MdShare className="text-indigo-500 text-7xl" />
                </div>
                <div className="flex justify-center gap-4">
                  {[FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope, FaCopy].map(
                    (Icon, i) => (
                      <button
                        key={i}
                        className="text-white bg-indigo-500 rounded-full w-10 h-10 flex items-center justify-center"
                      >
                        <Icon />
                      </button>
                    )
                  )}
                </div>
              </div>
              <button
                className="absolute top-0 h-2 w-2 right-4 text-gray-600 text-lg cursor-pointer"
                onClick={() => setShareOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>
        )}
        {/* Bug Report Popup */}
        {open && (
          <div className="fixed inset-0 bg-black/30 z-40 flex justify-center items-center">
            <div className="bg-white max-w-md w-full p-6 rounded-2xl shadow-lg relative">
              <h2 className="text-xl font-bold mb-2">Bug Report</h2>
              <p className="text-sm mb-4">
                <strong>Tool:</strong> SVG Blob Generator
              </p>
              <label className="text-sm mb-1 block" htmlFor="bugDescription">
                Please describe the issue.
              </label>
              <textarea
                id="bugDescription"
                className="w-full p-3 border border-gray-300 rounded-xl text-base h-32 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Description*"
                value={bugDescription}
                onChange={(e) => setBugDescription(e.target.value)}
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-black rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!bugDescription.trim()) {
                      alert("Please enter a description.");
                      return;
                    }
                    console.log("Bug description submitted:", bugDescription);
                    setOpen(false);
                    setBugDescription("");
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-black rounded-lg"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="w-full max-w-4xl flex gap-6 items-center mb-8">
          {/* Shadow Color */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1 mt-2">Shadow Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={shadowColor}
                onChange={(e) => setShadowColor(e.target.value)}
                className="w-8 h-8 rounded border border-gray-200"
              />
              <input
                type="text"
                value={shadowColor}
                onChange={(e) => setShadowColor(e.target.value)}
                className="px-2 py-1 rounded-lg border border-gray-200 text-sm bg-white text-gray-700 w-28"
              />
            </div>
          </div>
          {/* Shadow Depth */}
          <div className="flex-1 flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Shadow Depth: {shadowDepth}</label>
            <input
              type="range"
              min={1}
              max={24}
              value={shadowDepth}
              onChange={(e) => setShadowDepth(Number(e.target.value))}
              className="w-full accent-[#bfc1d2]"
            />
          </div>
        </div>
        {/* Share Popup */}
        {shareOpen && (
          <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center p-3">
            <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full relative ">
              <div className="flex justify-between mb-4 bg-indigo-50 p-1 rounded-xl">
                <button onClick={() => setActiveTab("tool")} className={`w-1/2 px-4 py-2 rounded-xl font-semibold text-sm ${activeTab === "tool" ? "bg-indigo-600 text-white" : "text-indigo-600 hover:bg-indigo-600 hover:text-white"}`}>⚙️ Share Tool</button>
                <button onClick={() => setActiveTab("home")} className={`w-1/2 px-4 py-2 rounded-xl font-semibold text-sm ${activeTab === "home" ? "bg-indigo-600 text-white" : "text-indigo-600 hover:bg-indigo-600 hover:text-white"}`}>🏠 Share 10015</button>
              </div>
              <div className="text-center border border-gray-300 rounded-xl p-6">
                <p className="text-sm mb-1 text-gray-500">You are currently sharing:</p>
                <h2 className="text-xl font-semibold mb-5 text-gray-600">{activeTab === "tool" ? "Google Fonts Pair Finder" : "10015 Tools"}</h2>
                <div className="flex justify-center mb-6">
                  <MdShare className="text-indigo-500 text-7xl" />
                </div>
                <div className="flex justify-center gap-4">
                  {[FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope, FaCopy].map((Icon, i) => (
                    <button key={i} className="text-white bg-indigo-500 rounded-full w-10 h-10 flex items-center justify-center">
                      <Icon />
                    </button>
                  ))}
                </div>
              </div>
              <button className="absolute top-0 h-2 w-2 right-4 text-gray-600 text-lg cursor-pointer" onClick={() => setShareOpen(false)}>✕</button>
            </div>
          </div>
        )}

        {/* Bug Report Popup */}
        {open && (
          <div className="fixed inset-0 bg-black/30 z-40 flex justify-center items-center">
            <div className="bg-white max-w-md w-full p-6 rounded-2xl shadow-lg relative">
              <h2 className="text-xl font-bold mb-2">Bug Report</h2>
              <p className="text-sm mb-4"><strong>Tool:</strong> Lorem Ipsum Generator</p>
              <label className="text-sm mb-1 block" htmlFor="bugDescription">Please describe the issue.</label>
              <textarea
                id="bugDescription"
                className="w-full p-3 border border-gray-300 rounded-xl text-base h-32 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Description*"
                value={bugDescription}
                onChange={(e) => setBugDescription(e.target.value)}
              />
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setOpen(false)} className="px-4 py-2 bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-black rounded-lg">Cancel</button>
                <button
                  onClick={() => {
                    if (!bugDescription.trim()) {
                      alert("Please enter a description.");
                      return;
                    }
                    console.log("Bug description submitted:", bugDescription);
                    setOpen(false);
                    setBugDescription("");
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-black rounded-lg"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="w-full max-w-5xl flex flex-wrap md:flex-nowrap gap-8 items-start mb-8">
          {/* iOS Mockup */}
          <div className="flex-1 flex flex-col items-center">
            <span className="mb-2 flex items-center gap-1 text-gray-500 text-sm">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <rect width="24" height="24" rx="6" fill="#e5e7eb" />
                <circle cx="12" cy="12" r="7" stroke="#6b7280" strokeWidth="2" />
              </svg>
              iOS
            </span>
            <div className="relative w-40 h-72 bg-white rounded-3xl border-4 border-gray-200 flex items-center justify-center">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-3 bg-gray-300 rounded-b-xl"></div>
              {/* Shadowed Card */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-xl bg-white"
                style={{
                  boxShadow: `0px 9px 10.24px 0px ${shadowColor}44`,
                }}
              />
            </div>
          </div>
          {/* Android Mockup */}
          <div className="flex-1 flex flex-col items-center">
            <span className="mb-2 flex items-center gap-1 text-gray-500 text-sm">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <rect width="24" height="24" rx="6" fill="#e5e7eb" />
                <rect x="7" y="6" width="10" height="12" stroke="#6b7280" strokeWidth="2" />
              </svg>
              Android
            </span>
            <div className="relative w-40 h-72 bg-white rounded-2xl border-4 border-gray-200 flex items-center justify-center">
              {/* Speaker */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-300 rounded"></div>
              {/* Shadowed Card */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-xl bg-white"
                style={{
                  boxShadow: `0px 9px 10.24px 0px ${shadowColor}44`,
                }}
              />
            </div>
          </div>
          {/* Code Box */}
          <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4 min-w-[260px] max-w-xs">
            <div className="text-xs text-gray-500 mb-2 font-semibold">React Native Shadow Style</div>
            <pre className="bg-[#f8f9fb] rounded-lg p-3 text-xs text-gray-700 overflow-x-auto">
              {`shadowColor: "${shadowStyle.shadowColor}",
shadowOffset: {
  width: ${shadowStyle.shadowOffset.width},
  height: ${shadowStyle.shadowOffset.height},
},
shadowOpacity: ${shadowStyle.shadowOpacity},
shadowRadius: ${shadowStyle.shadowRadius},
elevation: ${shadowStyle.elevation},`}
            </pre>
            <button className="mt-4 w-full py-2 bg-[#6366f1] text-white rounded-lg font-semibold hover:bg-[#4f46e5] transition">
              Copy Code
            </button>
          </div>
        </div>
      </div>
        <Comment />
        </>
  );
}
