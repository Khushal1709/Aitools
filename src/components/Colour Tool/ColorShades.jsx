import React, { useState, useEffect,useContext } from 'react';
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
import { FaSwatchbook } from "react-icons/fa";
import Comment from "../Text tools/Comment"; import { FiAlertCircle } from 'react-icons/fi'; // Add this at the top
import { FiShare2 } from "react-icons/fi";
import { FavoritesContext } from "../../Context/FavoriteContext";

const hexToRgb = (hex) => {
    const result = hex.replace('#', '');
    const bigint = parseInt(result, 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
    };
};

const rgbToHex = ({ r, g, b }) => {
    return (
        '#' +
        [r, g, b]
            .map((x) => {
                const hex = x.toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            })
            .join('')
    );
};

const adjustColor = (color, amount) => {
    return {
        r: Math.min(255, Math.max(0, Math.round(color.r + amount))),
        g: Math.min(255, Math.max(0, Math.round(color.g + amount))),
        b: Math.min(255, Math.max(0, Math.round(color.b + amount))),
    };
};

const generateShades = (hex, stepPercent, steps) => {
    const base = hexToRgb(hex);
    const shades = [];
    for (let i = steps; i > 0; i--) {
        const delta = stepPercent * i * 2.55;
        shades.push(rgbToHex(adjustColor(base, delta)));
    }
    shades.push(hex);
    for (let i = 1; i <= steps; i++) {
        const delta = -stepPercent * i * 2.55;
        shades.push(rgbToHex(adjustColor(base, delta)));
    }
    return shades;
};

const ColorShadesGenerator = ({id="Color Shades Generator"}) => {
    const { updateFavorites } = useContext(FavoritesContext);
    const [color, setColor] = useState('#808080');
    const [step, setStep] = useState(10);
    const [count, setCount] = useState(3);
    const [shades, setShades] = useState([]);
    const [selectedShade, setSelectedShade] = useState(null);
    const [open, setOpen] = useState(false);
    const [bugDescription, setBugDescription] = useState("");
    const [shareOpen, setShareOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("tool");
    const [isFavorite, setIsFavorite] = useState(false);

    // Added for copy feedback
    const [copiedShade, setCopiedShade] = useState(null);
    const [copiedAll, setCopiedAll] = useState(false);

    useEffect(() => {
        const newShades = generateShades(color, step, count);
        setShades(newShades);
        setSelectedShade(newShades[0]);
    }, [color, step, count]);

    // Updated copy function with feedback and error handling
    const copyToClipboard = async (value, type = "shade") => {
        try {
            await navigator.clipboard.writeText(value);
            if (type === "shade") {
                setCopiedShade(value);
                setTimeout(() => setCopiedShade(null), 1200);
            } else {
                setCopiedAll(true);
                setTimeout(() => setCopiedAll(false), 1200);
            }
        } catch (err) {
            alert("Copy failed. Please try again or check browser permissions.");
        }
    };

    const formatRgb = (hex) => {
        const { r, g, b } = hexToRgb(hex);
        return `rgb(${r}, ${g}, ${b})`;
    };

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
        <div className="max-w-4xl mx-auto px-4 py-6 mt-3">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                    <span className="text-4xl text-indigo-400">
                        <FaSwatchbook />
                    </span>
                    <h1 className="text-2xl font-bold text-gray-900 md:text-lg lg:text-2xl sm:text-lg">
                        Color&nbsp;Shades&nbsp;Generator&nbsp;
                    </h1>
                </div>
                <div className="flex flex-col w-full md:flex-row md:justify-center md:items-center md:gap-4 lg:justify-end lg:gap-2">
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
                        className={`px-3 py-2 rounded-xl border text-sm mt-2 md:mt-0 ml-0 cursor-pointer ${isFavorite
                            ? "bg-indigo-100 border-indigo-600 text-indigo-700"
                            : "bg-indigo-50 border-indigo-600 text-indigo-600"
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

            <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className='border border-gray-300 rounded-lg p-2'>
                    <label className="text-gray-700">Color</label>
                    <div className="flex items-center gap-1 ">
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="w-10 h-10 rounded-xl text-sm"
                        />
                        <input
                            type="text"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className=""
                        />
                    </div>
                </div>

                <div>
                    <label className="text-gray-500 font-medium">Darken/Lighten Step: {step}%</label>
                    <input
                        type="range"
                        min="1"
                        max="20"
                        value={step}
                        onChange={(e) => setStep(Number(e.target.value))}
                        className="w-48 block"
                    />
                </div>

                <div>
                    <label className="text-gray-500 font-medium">Step Count: {count}</label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={count}
                        onChange={(e) => setCount(Number(e.target.value))}
                        className="w-48 block"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 rounded overflow-hidden">
                {shades.map((shade, i) => (
                    <div key={i} className="text-center">
                        <div
                            className={`h-20 cursor-pointer flex items-end justify-center relative group transition-all duration-200 ${selectedShade === shade ? 'ring-2 ring-blue-600' : ''}`}
                            style={{ backgroundColor: shade }}
                            onClick={() => setSelectedShade(shade)}
                        >
                            <button
                                className="absolute bottom-2 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent parent onClick
                                    copyToClipboard(shade, "shade");
                                }}
                            >
                                {copiedShade === shade ? "Copied!" : "COPY"}
                            </button>
                        </div>
                        <div className="text-sm text-gray-700 py-1">{shade}</div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-6">
                <button
                    onClick={() => copyToClipboard(shades.join(', '), "all")}
                    className="bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-black cursor-pointer px-6 py-2 rounded-lg"
                >
                    {copiedAll ? "Copied!" : "Copy All Colors"}
                </button>
            </div>

            {selectedShade && (
                <div className="mt-6 mx-auto w-fit bg-gray-100 p-6 rounded-lg shadow text-center">
                    <div
                        className="w-20 h-20 mx-auto rounded mb-3"
                        style={{ backgroundColor: selectedShade }}
                    ></div>
                    <div className="text-sm font-medium">HEX</div>
                    <div className="text-lg font-mono">{selectedShade}</div>
                    <div className="text-sm font-medium mt-2">RGBA</div>
                    <div className="text-lg font-mono">{formatRgb(selectedShade)}</div>
                </div>
            )}
        </div>
            <Comment />
            </>
    );
};

export default ColorShadesGenerator;
