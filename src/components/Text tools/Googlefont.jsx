import React, { useEffect,useContext,useState } from "react";
import { MdOutlineContentPaste, MdShare } from "react-icons/md";
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
import Comment from "../Text tools/Comment";
import { MdGroups } from "react-icons/md";
import { FiAlertCircle } from 'react-icons/fi';
import { FiShare2 } from "react-icons/fi";
import { FavoritesContext } from "../../Context/FavoriteContext";

// Sample font data
const fontOptions = [
  {
    name: "Roboto",
    weights: [100, 300, 400, 500, 700, 900],
    sizes: [12, 14, 16, 18, 20, 24, 27, 32]
  },
  {
    name: "Montserrat",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    sizes: [12, 14, 16, 18, 20, 24, 27, 32]
  },
  {
    name: "Lato",
    weights: [100, 300, 400, 700, 900],
    sizes: [12, 14, 16, 18, 20, 24, 27, 32]
  },
  {
    name: "Open Sans",
    weights: [300, 400, 600, 700, 800],
    sizes: [12, 14, 16, 18, 20, 24, 27, 32]
  },
  {
    name: "Arial",
    weights: [400, 700],
    sizes: [12, 14, 16, 18, 20, 24, 27, 32]
  },
  {
    name: "Times New Roman",
    weights: [400, 700],
    sizes: [12, 14, 16, 18, 20, 24, 27, 32]
  },
  {
    name: "Georgia",
    weights: [400, 700],
    sizes: [12, 14, 16, 18, 20, 24, 27, 32]
  },
  {
    name: "Verdana",
    weights: [400, 700],
    sizes: [12, 14, 16, 18, 20, 24, 27, 32]
  }
];

const previewTypes = ["Profile", "Article", "Card"];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function FontPairingTool({ id = "Google Fonts Pair Finder" }) {
  const { updateFavorites } = useContext(FavoritesContext);
  const [headingFont, setHeadingFont] = useState(fontOptions[0]);
  const [headingSize, setHeadingSize] = useState(27);
  const [headingWeight, setHeadingWeight] = useState(700);
  const [bodyFont, setBodyFont] = useState(fontOptions[0]);
  const [bodySize, setBodySize] = useState(16);
  const [bodyWeight, setBodyWeight] = useState(400);
  const [open, setOpen] = useState(false);
  const [bugDescription, setBugDescription] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tool");
  const [isFavorite, setIsFavorite] = useState(false);
  const [previewType, setPreviewType] = useState("Profile");
  const [isFav, setIsFav] = useState(false);

  function handleShuffle(target) {
    if (target === "heading" || target === "both") {
      const font = getRandomItem(fontOptions);
      setHeadingFont(font);
      setHeadingWeight(getRandomItem(font.weights));
      setHeadingSize(getRandomItem(font.sizes));
    }
    if (target === "body" || target === "both") {
      const font = getRandomItem(fontOptions);
      setBodyFont(font);
      setBodyWeight(getRandomItem(font.weights));
      setBodySize(getRandomItem(font.sizes));
    }
  }

   const onFavoriteToggle = () => {
      const favorites = JSON.parse(localStorage.getItem("FavoriteTools") || "[]");
      let newFavorites;
  
      if (favorites.includes(id)) {
        newFavorites = favorites.filter((favId) => favId !== id);
        setIsFavorite(false);
      } else {
        newFavorites = [...favorites, id];
        setIsFavorite(true);
      }
  
      localStorage.setItem("FavoriteTools", JSON.stringify(newFavorites));
      updateFavorites();
    };
  
    useEffect(() => {
      const favorites = JSON.parse(localStorage.getItem("FavoriteTools") || "[]");
      setIsFavorite(favorites.includes(id));
    }, [id]);
  

  return (
    <div className="max-w-4xl mx-auto mt-7">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <span className="text-4xl text-indigo-400">
            <MdGroups />
          </span>
          <span className="text-2xl font-bold text-gray-900 md:text-lg lg:text-2xl sm:text-lg">
            Google&nbsp;Fonts&nbsp;Pair&nbsp;Finder
          </span>
        </div>
        <div className="flex flex-col w-full md:flex-row md:justify-center md:items-center md:gap-4 mt-2 lg:justify-end lg:gap-2">
          <button
            onClick={() => setShareOpen(true)}
            className="flex items-center justify-center md:w-auto px-3 py-2 text-sm rounded-xl border  border-indigo-500 bg-indigo-50 text-indigo-600 mb-2 md:mb-0 cursor-pointer"
          >
            <FiShare2 className="mr-2" size={18} />
            Share
          </button>
          <button
            className="flex items-center justify-center gap-2 w-full md:w-auto px-3 py-2 text-sm rounded-xl border  border-indigo-500 bg-indigo-50 text-indigo-600 cursor-pointer hover:bg-indigo-100 transition"
            onClick={() => setOpen(true)}
          >
            <FiAlertCircle className="text-indigo-600 text-base" />
            Report Bug
          </button>
          <button
            onClick={onFavoriteToggle}
            className={`px-3 py-2 rounded-xl border text-sm mt-2 md:mt-0 ml-0 cursor-pointer ${isFavorite
              ? "bg-indigo-100 border-indigo-600 text-indigo-700"
              : "bg-indigo-50 border-indigo-500 text-indigo-600"
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
                  ? "Google Fonts Pair Finder"
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
              <strong>Tool:</strong> Lorem Ipsum Generator
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


      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <h2 className="font-semibold mb-2">Heading Font</h2>
          <select value={headingFont.name} onChange={e => setHeadingFont(fontOptions.find(f => f.name === e.target.value))} className="border border-gray-300 outline-none rounded px-2 py-1 w-full">
            {fontOptions.map(font => <option key={font.name} value={font.name}>{font.name}</option>)}
          </select>
          <div className="flex gap-2 mt-2">
            <select value={headingSize} onChange={e => setHeadingSize(Number(e.target.value))} className="border border-gray-300 outline-none px-2 py-1">
              {headingFont.sizes.map(size => <option key={size}>{size}</option>)}
            </select>
            <select value={headingWeight} onChange={e => setHeadingWeight(Number(e.target.value))} className="border border-gray-300 outline-none px-2 py-1">
              {headingFont.weights.map(weight => <option key={weight}>{weight}</option>)}
            </select>
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Body Font</h2>
          <select value={bodyFont.name} onChange={e => setBodyFont(fontOptions.find(f => f.name === e.target.value))} className="border border-gray-300 outline-none rounded px-2 py-1 w-full">
            {fontOptions.map(font => <option key={font.name} value={font.name}>{font.name}</option>)}
          </select>
          <div className="flex gap-2 mt-2">
            <select value={bodySize} onChange={e => setBodySize(Number(e.target.value))} className="border border-gray-300 outline-none px-2 py-1">
              {bodyFont.sizes.map(size => <option key={size}>{size}</option>)}
            </select>
            <select value={bodyWeight} onChange={e => setBodyWeight(Number(e.target.value))} className="border border-gray-300 outline-none px-2 py-1">
              {bodyFont.weights.map(weight => <option key={weight}>{weight}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {previewTypes.map(type => (
          <button
            key={type}
            className={`px-4 py-2 rounded ${previewType === type ? 'border-indigo-300 bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-black cursor-pointer' : 'border-indigo-300 bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-black cursor-pointer'}`}
            onClick={() => setPreviewType(type)}
          >
            {type}
          </button>
        ))}
        <button onClick={() => handleShuffle("both")} className="px-4 py-2 border-indigo-300 bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF]  text-black rounded cursor-pointer">Shuffle</button>
      </div>

      <div className="border border-gray-300 p-4 rounded shadow text-center">
        {previewType === "Profile" && (
          <div>
            <img
              className="w-24 h-24 rounded-full mx-auto mb-4"
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Jane Doe"
            />
            <h2 style={{ fontFamily: headingFont.name, fontSize: headingSize, fontWeight: headingWeight }}>Jane Doe</h2>
            <p style={{ fontFamily: bodyFont.name, fontSize: bodySize, fontWeight: bodyWeight }}>UI/UX Lead at Cool Company</p>
          </div>
        )}

        {previewType === "Article" && (
          <div>
            <h2 style={{ fontFamily: headingFont.name, fontSize: headingSize, fontWeight: headingWeight }}>The Future of Design Systems</h2>
            <p style={{ fontFamily: bodyFont.name, fontSize: bodySize, fontWeight: bodyWeight }}>
              Design systems streamline the product creation process by aligning developers, designers, and stakeholders with a shared visual language.
            </p>
          </div>
        )}

        {previewType === "Card" && (
          <div>
            <h2 style={{ fontFamily: headingFont.name, fontSize: headingSize, fontWeight: headingWeight }}>Promo Title</h2>
            <p style={{ fontFamily: bodyFont.name, fontSize: bodySize, fontWeight: bodyWeight }}>
              Save 50% on all items this weekend only. Limited time offer!
            </p>
          </div>
        )}
      </div>
      <Comment />
    </div>
  );
}