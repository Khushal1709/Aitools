import { useState, useEffect, useContext } from "react";
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
import { FiAlertCircle } from 'react-icons/fi';
import { FiShare2 } from "react-icons/fi";
import { FavoritesContext } from "../../Context/FavoriteContext";

const LOREM =
  "Lorem ipsum odor amet, consectetur adipiscing elit. Class mattis donec felis habitant vestibulum habitasse amet pharetra sed dictumst massa faucibus dictum mattis rhoncus class sollicitudin vestibulum quisque conubia finibus. Ut aenean justo conubia hendrerit lobortis ligula proin nulla at fringilla eleifend penatibus maximus malesuada finibus euismod volutpat tempus pharetra ac. Magnis facilisi maximus vehicula vulputate dignissim convallis rutrum malesuada quam montes in euismod nisl aenean praesent diam felis bibendum faucibus nostra id. Sapien sit dignissim ultricies enim integer imperdiet congue taciti montes eget potenti sollicitudin gravida donec magnis aliquam pretium ut class lacus massa quisque pharetra varius suscipit feugiat nisi montes elit nullam lobortis. Felis eu lobortis mollis sem rhoncus blandit tempor hac primis pellentesque penatibus etiam rutrum molestie ac aliquam pulvinar sagittis gravida adipiscing nulla conubia. Condimentum luctus auctor senectus auctor posuere cubilia maecenas mi gravida himenaeos tristique leo torquent et per cras dictum condimentum maecenas dictum. Netus mi dictumst vel sed mauris lacus.";

function LoremIpsumGenerator({ id = "Lorem Ipsum Generator" }) {
  const { updateFavorites } = useContext(FavoritesContext);
  const [paragraphs, setParagraphs] = useState(1);
  const [wordsPerSentence, setWordsPerSentence] = useState(25);
  const [sentencesPerParagraph, setSentencesPerParagraph] = useState(11);
  const [output, setOutput] = useState("");
  const [open, setOpen] = useState(false);
  const [bugDescription, setBugDescription] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tool");
  const [isFavorite, setIsFavorite] = useState(false);

  // const onFavoriteToggle = () => setIsFavorite(!isFavorite);

  const generateSentence = (words) => {
    const loremWords = LOREM.split(" ");
    let sentence = [];
    for (let i = 0; i < words; i++) {
      sentence.push(loremWords[i % loremWords.length]);
    }
    let str = sentence.join(" ");
    return str.charAt(0).toUpperCase() + str.slice(1) + ".";
  };

  const generateParagraph = () => {
    let paragraph = [];
    for (let i = 0; i < sentencesPerParagraph; i++) {
      paragraph.push(generateSentence(wordsPerSentence));
    }
    return paragraph.join(" ");
  };

  const generate = () => {
    let paras = [];
    for (let i = 0; i < paragraphs; i++) {
      paras.push(generateParagraph());
    }
    setOutput(paras.join("\n\n"));
  };

  // Auto-generate text when inputs change
  useEffect(() => {
    generate();
  }, [paragraphs, wordsPerSentence, sentencesPerParagraph]);

  const reset = () => {
    setParagraphs(1);
    setWordsPerSentence(25);
    setSentencesPerParagraph(11);
    setOutput("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

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
    <div className="max-w-4xl mx-auto mt-8">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <span className="text-4xl text-indigo-400">
            <MdOutlineContentPaste />
          </span>
          <h1 className="text-2xl font-bold text-gray-900 md:text-lg lg:text-2xl sm:text-lg">
            Lorem&nbsp;Ipsum&nbsp;Generator
          </h1>
        </div>
        <div className="flex flex-col w-full md:flex-row md:justify-center md:items-center md:gap-4 lg:justify-end lg:gap-2">
          <button
            onClick={() => setShareOpen(true)}
            className="flex items-center justify-center md:w-auto px-3 py-2 text-sm rounded-xl border border-indigo-500 bg-indigo-50 text-indigo-600 mb-2 md:mb-0 cursor-pointer"
          >
            <FiShare2 className="mr-2" size={18} />
            Share
          </button>
          <button
            className="flex items-center justify-center gap-2 w-full md:w-auto px-3 py-2 text-sm rounded-xl border border-indigo-500 bg-indigo-50 text-indigo-600 cursor-pointer hover:bg-indigo-100 transition"
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

      {/* Sliders */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <label className="text-sm text-gray-500 block mb-1">
            Paragraph Count:{" "}
            <span className="font-semibold text-indigo-500">{paragraphs}</span>
          </label>
          <input
            type="range"
            min={1}
            max={10}
            value={paragraphs}
            onChange={(e) => setParagraphs(Number(e.target.value))}
            className="w-full accent-indigo-500"
          />
        </div>
        <div className="flex-1">
          <label className="text-sm text-gray-500 block mb-1">
            Avg. Words Per Sentence:{" "}
            <span className="font-semibold text-indigo-500">
              {wordsPerSentence}
            </span>
          </label>
          <input
            type="range"
            min={4}
            max={40}
            value={wordsPerSentence}
            onChange={(e) => setWordsPerSentence(Number(e.target.value))}
            className="w-full accent-indigo-500"
          />
        </div>
        <div className="flex-1">
          <label className="text-sm text-gray-500 block mb-1">
            Avg. Sentences Per Paragraph:{" "}
            <span className="font-semibold text-indigo-500">
              {sentencesPerParagraph}
            </span>
          </label>
          <input
            type="range"
            min={2}
            max={20}
            value={sentencesPerParagraph}
            onChange={(e) => setSentencesPerParagraph(Number(e.target.value))}
            className="w-full accent-indigo-500"
          />
        </div>
      </div>

      {/* Output */}
      <div className="bg-white rounded-2xl border border-gray-300 shadow-lg p-6 mb-6">
        <div className="text-xs text-indigo-500 mb-2 font-semibold">
          Lorem Ipsum Text
        </div>
        <div
          className="text-gray-700 text-base whitespace-pre-line overflow-x-auto max-h-60"
          style={{ minHeight: 80 }}
        >
          {output || "Click Generate to create Lorem Ipsum text."}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={reset}
          className="bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] px-5 py-2 rounded-xl shadow-md flex items-center cursor-pointer disabled:opacity-50"
        >
          Reset
        </button>
        <button
          onClick={handleCopy}
          disabled={!output}
          className="bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] px-5 py-2 rounded-xl shadow-md flex items-center cursor-pointer disabled:opacity-50"
        >
          {!copied ? (
            <>
              <FaRegCopy className="mr-1" />
              <span>Copy</span>
            </>
          ) : (
            <span>Copied!</span>
          )}
        </button>

        <button
          onClick={generate}
          className="bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B] px-5 py-2 rounded-xl shadow-md flex items-center cursor-pointer disabled:opacity-50"
        >
          Generate
        </button>
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
        <div className="fixed inset-0 bg-black/30 z-20 flex justify-center items-center">
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

      {/* Comment Section */}
      <Comment />
    </div>
  );
}

export default LoremIpsumGenerator;

