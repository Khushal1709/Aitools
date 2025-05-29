import { useState, useContext, useEffect } from 'react';
import { FaBrain, FaCheck, FaRegStar, FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope, FaCopy } from "react-icons/fa6";
import { MdShare } from "react-icons/md";
import { FiAlertCircle, FiShare2 } from "react-icons/fi";
import Comment from "../Text tools/Comment";
import { FavoritesContext } from "../../Context/FavoriteContext";


const baseColors = {
    light: {
        red: ['#ff0000', '#ff4d4d', '#ff7373', '#ff9999', '#fff2f2', '#290000'],
        blue: ['#007bff', '#3399ff', '#66b3ff', '#99ccff', '#e6f2ff', '#00274d'],
        green: ['#28a745', '#5cd65c', '#85e085', '#b3ffb3', '#e6ffe6', '#003300'],
        purple: ['#800080', '#9932CC', '#DA70D6', '#E6E6FA', '#f5f5ff', '#330033'],
        orange: ['#ff6600', '#ff944d', '#ffb366', '#ffd1b3', '#fff2e6', '#4d2600'],
        default: ['#cccccc', '#dddddd', '#eeeeee', '#f4f4f4', '#fafafa', '#111111'],
    },
    dark: {
        red: ['#ff4d4d', '#cc0000', '#990000', '#660000', '#330000', '#ffffff'],
        blue: ['#66b3ff', '#3399ff', '#0066cc', '#004080', '#001f33', '#ffffff'],
        green: ['#85e085', '#28a745', '#1e7e34', '#145c2c', '#0b3d1e', '#ffffff'],
        purple: ['#DA70D6', '#9932CC', '#800080', '#4B0082', '#2c0033', '#ffffff'],
        orange: ['#ff944d', '#ff6600', '#cc5200', '#993d00', '#662900', '#ffffff'],
        default: ['#666666', '#4d4d4d', '#333333', '#1a1a1a', '#111111', '#ffffff'],
    }
};

const generateColors = (prompt, theme) => {
    const colors = baseColors[theme.toLowerCase()];
    return colors[prompt.toLowerCase()] || colors.default;
};

function ColorCard({ label, hex }) {
    return (
        <div className="border border-gray-200 rounded-xl p-4 flex justify-between items-center shadow">
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="font-semibold">{hex}</p>
            </div>
            <div className="w-8 h-8 rounded-full border" style={{ backgroundColor: hex }}></div>
        </div>
    );
}

function PreviewSection({ primary, accent, background, text }) {
    return (
        <div className="mt-6 p-6 rounded-xl border" style={{ backgroundColor: background, color: text }}>
            <h2 className="text-xl font-bold mb-2" style={{ color: primary }}>Preview Section</h2>
            <p>This is a preview using your generated palette.</p>
            <button className="mt-4 px-4 py-2 rounded-md" style={{ backgroundColor: accent, color: text }}>
                Sample Button
            </button>
        </div>
    );
}

function ExportModal({ open, onClose, palette }) {
    const cssVars = `
:root {
  --primary: ${palette[0]};
  --accent: ${palette[1]};
  --background: ${palette[4]};
  --text: ${palette[5]};
}`;

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-lg relative">
                <h2 className="text-xl font-semibold mb-4">Export CSS Variables</h2>
                <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm mb-4">{cssVars}</pre>
                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">Close</button>
                    <button onClick={() => {
                        navigator.clipboard.writeText(cssVars);
                        alert("Copied!");
                    }} className="px-4 py-2 bg-indigo-500 text-white rounded-md">Copy</button>
                </div>
            </div>
        </div>
    );
}

export default function ColorPaletteGenerator({ id = "AI Color Palette Generator" }) {
    const { updateFavorites } = useContext(FavoritesContext);
    const [prompt, setPrompt] = useState('red');
    const [theme, setTheme] = useState('light');
    const [palette, setPalette] = useState(generateColors('red', 'light'));
    const [showPreview, setShowPreview] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [bugDescription, setBugDescription] = useState("");
    const [shareOpen, setShareOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("tool");
    const [isFavorite, setIsFavorite] = useState(false);

    const [primary, accent, , , background, text] = palette;

    const handleGenerate = () => {
        setPalette(generateColors(prompt, theme));
        setShowPreview(false);
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
                                        <FaBrain/>
                                    </span>
                                    <h1 className="text-xl sm:text-2xl md:text-lg font-bold text-gray-900">
                                        AI&nbsp;Color
                                    </h1>
                                </div>
                                <div className="flex flex-col w-full sm:w-auto sm:flex-row sm:items-center gap-2 sm:gap-3">
                                    <button
                                        onClick={() => setShareOpen(true)}
                                        className="flex items-center justify-center w-full sm:w-auto px-3 py-2 text-sm rounded-xl border border-indigo-600 bg-indigo-50 text-indigo-600 cursor-pointer"
                                    >
                                        <FiShare2 className="mr-2" size={18} />
                                        Share
                                    </button>
                                    <button
                                        className="flex items-center justify-center gap-2 w-full sm:w-auto px-3 py-2 text-sm rounded-xl border border-indigo-600 bg-indigo-50 text-indigo-600 cursor-pointer hover:bg-indigo-100 transition"
                                        onClick={() => setOpen(true)}
                                    >
                                        <FiAlertCircle className="text-indigo-600 text-base" />
                                        Report Bug
                                    </button>
                                    <button
                                        onClick={onFavoriteToggle}
                                        className={`px-3 py-2 rounded-xl border text-sm w-full sm:w-auto ${
                                            isFavorite
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
                                                <FaRegStar className="inline-block mr-1" size={12} /> Add to Favorites
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter a color (e.g., red)"
                        className="flex-1 p-3 border border-gray-300 rounded-md outline-none"
                    />
                    <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        className="p-3 border border-gray-300 rounded-md outline-none"
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                    <button
                        onClick={handleGenerate}
                        className="bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-black px-5 py-3 rounded-md"
                    >
                        Generate
                    </button>
                </div>

                <div className="mt-4">
                    <h2 className="text-lg mb-2">Color Palette</h2>
                    <div className="flex flex-wrap gap-2 ">
                        {palette.map((color, idx) => (
                            <div key={idx} className="h-6 w-6 rounded-sm " style={{ backgroundColor: color }} title={color}></div>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4 ">
                    <ColorCard label="Primary" hex={primary} />
                    <ColorCard label="Accent" hex={accent} />
                    <ColorCard label="Background" hex={background} />
                    <ColorCard label="Text" hex={text} />
                </div>

                <div className="flex gap-4 mt-4">
                    <button onClick={() => setShowExportModal(true)} className="bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-black px-4 py-2 rounded-md">
                        Export Colors
                    </button>
                    <button onClick={() => setShowPreview(!showPreview)} className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md">
                        {showPreview ? "Hide Preview" : "Show Preview"}
                    </button>
                </div>

                {showPreview && <PreviewSection primary={primary} accent={accent} background={background} text={text} />}
                {showExportModal && <ExportModal open={showExportModal} onClose={() => setShowExportModal(false)} palette={palette} />}

                {shareOpen && (
                    <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center p-4">
                        <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full relative">
                            <div className="flex justify-between mb-4 bg-indigo-50 p-1 rounded-xl">
                                <button onClick={() => setActiveTab("tool")} className={`w-1/2 px-4 py-2 rounded-xl font-semibold text-sm ${activeTab === "tool" ? "bg-indigo-600 text-white" : "text-indigo-600 hover:bg-indigo-600 hover:text-white"}`}>⚙️ Share Tool</button>
                                <button onClick={() => setActiveTab("home")} className={`w-1/2 px-4 py-2 rounded-xl font-semibold text-sm ${activeTab === "home" ? "bg-indigo-600 text-white" : "text-indigo-600 hover:bg-indigo-600 hover:text-white"}`}>🏠 Share 10015</button>
                            </div>
                            <div className="text-center border border-gray-300 rounded-xl p-6">
                                <p className="text-sm mb-1 text-gray-500">You are currently sharing:</p>
                                <h2 className="text-xl font-semibold mb-5 text-gray-600">{activeTab === "tool" ? "AI Color Palette Generator" : "10015 Tools"}</h2>
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
                            <button className="absolute top-0 right-4 text-gray-600 text-lg" onClick={() => setShareOpen(false)}>✕</button>
                        </div>
                    </div>
                )}

                {open && (
                    <div className="fixed inset-0 bg-black/30 flex z-40 justify-center items-center">
                        <div className="bg-white max-w-md w-full p-6 rounded-2xl shadow-lg relative">
                            <h2 className="text-xl font-bold mb-2">Bug Report</h2>
                            <p className="text-sm mb-4"><strong>Tool:</strong> AI Color Palette Generator</p>
                            <label className="text-sm mb-1 block" htmlFor="bugDescription">Please describe the issue.</label>
                            <textarea
                                id="bugDescription"
                                className="w-full p-3 border border-gray-300 rounded-xl h-32"
                                placeholder="Description*"
                                value={bugDescription}
                                onChange={(e) => setBugDescription(e.target.value)}
                            />
                            <div className="flex justify-end gap-3 mt-4">
                                <button onClick={() => setOpen(false)} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                                <button
                                    onClick={() => {
                                        if (!bugDescription.trim()) {
                                            alert("Please enter a description.");
                                            return;
                                        }
                                        console.log("Bug submitted:", bugDescription);
                                        setOpen(false);
                                        setBugDescription("");
                                    }}
                                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Comment />
        </>
    );
}
