import { useState,useContext,useEffect } from "react";
import { SlEnvolopeLetter } from "react-icons/sl";
import { MdOutlineContentPaste, MdShare } from "react-icons/md";
import Comment from "../Text tools/Comment";
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
import { FiAlertCircle } from 'react-icons/fi';
import { FiShare2 } from "react-icons/fi";
import { FavoritesContext } from "../../Context/FavoriteContext";

// --- Letter Counter Limits ---
const LIMITS = [
  { name: "Meta Title", minmax: "Max", limit: 55, type: "Letter" },
  { name: "Meta Description", minmax: "Max", limit: 160, type: "Letter" },
  { name: "Google Ideal Post Content", minmax: "Min", limit: 300, type: "Word" },
  { name: "Instagram Captions/Comments", minmax: "Max", limit: 2200, type: "Letter" },
  { name: "Twitter Post", minmax: "Max", limit: 280, type: "Letter" },
  { name: "Twitter Username", minmax: "Max", limit: 20, type: "Letter" },
  { name: "Facebook Wall Post (Transaction)", minmax: "Max", limit: 477, type: "Letter" },
];

// --- Count Helpers ---
const countSentences = (text) => {
  const matches = text.match(/[\w\)][.?!](\s|$)/g);
  return matches ? matches.length : 0;
};

const countWords = (text) => {
  const matches = text.trim().match(/\b\w+\b/g);
  return matches ? matches.length : 0;
};

const countLetters = (text) => {
  const matches = text.match(/[a-zA-Z0-9]/g);
  return matches ? matches.length : 0;
};

// --- LetterCounter Component ---
function LetterCounter({ id = "Letter Counter" }) {
    const { updateFavorites } = useContext(FavoritesContext);
  const [text, setText] = useState("");

  const sentenceCount = countSentences(text);
  const wordCount = countWords(text);
  const letterCount = countLetters(text);

  const getStatus = (limit) => {
    if (!text.trim()) return <span className="text-gray-400">● Empty</span>;

    const count = limit.type === "Letter" ? letterCount : wordCount;

    if (limit.minmax === "Max") {
      return (
        <span className={count > limit.limit ? "text-red-500" : "text-green-600"}>
          ● {count}/{limit.limit}
        </span>
      );
    } else {
      return (
        <span className={count >= limit.limit ? "text-green-600" : "text-orange-400"}>
          ● {count}/{limit.limit}
        </span>
      );
    }
  };
  
  const [bugDescription, setBugDescription] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tool");
  const [isFavorite, setIsFavorite] = useState(false);
  const [open, setOpen] = useState(false);

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
    <>
    <div className="max-w-4xl mx-auto mt-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <span className="text-4xl text-indigo-400">
            <SlEnvolopeLetter />
          </span>
          <h1 className="text-2xl font-bold text-gray-900 md:text-lg lg:text-2xl sm:text-lg">Letter&nbsp;Counter</h1>
        </div>
        <div className="flex flex-col w-full md:flex-row md:justify-center md:items-center md:gap-4 lg:justify-end lg:gap-6">
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
            className={`px-3 py-2 rounded-xl border text-sm mt-2 md:mt-0 ${isFavorite ? "bg-indigo-100 border-indigo-600 text-indigo-700" : "bg-indigo-50 border-indigo-600 text-indigo-600"
              }`}
          >
            {isFavorite ? (
              <>
                <FaCheck className="inline-block mr-1" size={12} /> Added
              </>
            ) : (
              <>
                <FaRegStar className="inline-block mr-1" size={12} /> Add to Favorites
              </>
            )}
          </button>
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
        <div className="fixed inset-0 bg-black/30 flex z-40 justify-center items-center">
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

      <textarea
        className="w-full h-40 p-4 border border-gray-300 rounded-2xl resize-none text-base focus:outline-none focus:ring-1 focus:ring-indigo-300 bg-white mb-4"
        placeholder="Enter your text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 bg-white rounded-lg border border-gray-300 py-4 flex flex-col items-center">
          <span className="text-2xl font-bold text-gray-900">{sentenceCount}</span>
          <span className="text-xs text-gray-500 mt-1">sentence</span>
        </div>
        <div className="flex-1 bg-white rounded-lg border border-gray-300 py-4 flex flex-col items-center">
          <span className="text-2xl font-bold text-gray-900">{wordCount}</span>
          <span className="text-xs text-gray-500 mt-1">word</span>
        </div>
        <div className="flex-1 bg-white rounded-lg border border-gray-300 py-4 flex flex-col items-center">
          <span className="text-2xl font-bold text-gray-900">{letterCount}</span>
          <span className="text-xs text-gray-500 mt-1">letter</span>
        </div>
      </div>

      <div>
        <div className="text-sm font-semibold text-gray-700 mb-2">
          Web and Social Media Limits
        </div>
       <div className="w-full overflow-x-auto">
  <table className="hidden md:table w-full text-sm border border-gray-300 rounded-lg bg-white">
    <thead>
      <tr className="bg-gray-50">
        <th className="py-2 px-3 text-left font-semibold">Name</th>
        <th className="py-2 px-3 text-left font-semibold">Min/Max</th>
        <th className="py-2 px-3 text-left font-semibold">Limit</th>
        <th className="py-2 px-3 text-left font-semibold">Type</th>
        <th className="py-2 px-3 text-left font-semibold">Current Status</th>
      </tr>
    </thead>
    <tbody>
      {LIMITS.map((limit, i) => (
        <tr key={limit.name} className={i % 2 ? "bg-gray-50" : ""}>
          <td className="py-2 px-3">{limit.name}</td>
          <td className="py-2 px-3">{limit.minmax}</td>
          <td className="py-2 px-3">{limit.limit}</td>
          <td className="py-2 px-3">{limit.type}</td>
          <td className="py-2 px-3">{getStatus(limit)}</td>
        </tr>
      ))}
    </tbody>
  </table>

  {/* Mobile Version */}
  <div className="md:hidden space-y-4">
    {LIMITS.map((limit, i) => (
      <div
        key={limit.name}
        className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm"
      >
        <div className="mb-2">
          <span className="font-semibold">Name:</span> {limit.name}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Min/Max:</span> {limit.minmax}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Limit:</span> {limit.limit}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Type:</span> {limit.type}
        </div>
        <div>
          <span className="font-semibold">Current Status:</span>{" "}
          {getStatus(limit)}
        </div>
      </div>
    ))}
  </div>
</div>

      </div>
    </div>
      <Comment />
      </>
  );
}

export default LetterCounter;
