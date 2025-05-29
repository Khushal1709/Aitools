import { useState, useRef, useEffect,useContext } from "react";
import {
  Settings,
  Upload,
  Download,
  Trash2,
} from "lucide-react";
import {
  FaCheck,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaCopy,
  FaRegStar,
} from "react-icons/fa6";
import { FileIcon, defaultStyles } from "react-file-icon";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  dracula,
  duotoneLight,
  atomDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import html2canvas from "html2canvas";
import { FiShare2 } from "react-icons/fi";
import { FiAlertCircle } from 'react-icons/fi';
import { MdOutlineContentPaste, MdShare } from "react-icons/md";
import { FavoritesContext } from "../../Context/FavoriteContext";
import { RiCodeBlock } from "react-icons/ri";
import Comment from "../Text tools/Comment";


// Map UI themes to syntax highlighter themes
const syntaxThemeMap = {
  "Devibeans - Dark": oneDark,
  "GitHub Light": duotoneLight,
  Monokai: atomDark,
  Dracula: dracula,
  "One Dark Pro": oneDark,
};

// UI theme mapping
const themeClassMap = {
  "Devibeans - Dark": {
    container: "bg-gray-900",
    text: "text-gray-300",
    filename: "text-white",
    border: "border-gray-700",
  },
  "GitHub Light": {
    container: "bg-gray-100",
    text: "text-gray-800",
    filename: "text-gray-900",
    border: "border-gray-300",
  },
  Monokai: {
    container: "bg-[#272822]",
    text: "text-[#f8f8f2]",
    filename: "text-[#a6e22e]",
    border: "border-[#75715e]",
  },
  Dracula: {
    container: "bg-[#282a36]",
    text: "text-[#f8f8f2]",
    filename: "text-[#bd93f9]",
    border: "border-[#44475a]",
  },
  "One Dark Pro": {
    container: "bg-[#282c34]",
    text: "text-[#abb2bf]",
    filename: "text-[#61afef]",
    border: "border-[#3e4451]",
  },
};

// Map UI language names to syntax highlighter language keys
const languageMap = {
  Awk: "awk",
  JavaScript: "javascript",
  Python: "python",
  Java: "java",
  "C++": "cpp",
  HTML: "html",
  CSS: "css",
  TypeScript: "typescript",
};

function getFileExtension(fileName) {
  const match = fileName.match(/\.([a-zA-Z0-9]+)$/);
  return match ? match[1].toLowerCase() : "";
}

function getIconStyle(extension) {
  return defaultStyles[extension] || {};
}

// Responsive preview mode classes (updated for square)
const previewModeClasses = {
  Wide: "w-full max-w-5xl mx-auto",
  Compact: "w-full max-w-2xl mx-auto",
  Square:
    "mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square relative flex items-center justify-center",
};

// Watermark position styles
const watermarkPositionStyles = {
  "Top Left": "top-4 left-4",
  "Top Right": "top-4 right-4",
  "Bottom Left": "bottom-4 left-4",
  "Bottom Right": "bottom-4 right-4",
};

// Watermark type icons/styles
const watermarkTypeIcons = {
  "Twitter Hand": "🐦",
  GitHub: "🐙",
  LinkedIn: "💼",
  Custom: "⭐",
};

// Shadow styles
const shadowStyles = {
  None: "",
  Soft: "shadow-lg",
  Medium: "shadow-xl",
  Hard: "shadow-2xl",
};

const CodeToImageConverter = ({id="Code to Image Generator"}) => {
     const { updateFavorites } = useContext(FavoritesContext);
    const [open, setOpen] = useState(false);
      const [bugDescription, setBugDescription] = useState("");
      const [shareOpen, setShareOpen] = useState(false);
      const [activeTab, setActiveTab] = useState("tool");
      const [isFavorite, setIsFavorite] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");
  const [selectedTheme, setSelectedTheme] = useState("Devibeans - Dark");
  const [fileName, setFileName] = useState("Hello.js");
  const [code, setCode] = useState(
    `function helloWorld() {\n  console.log('Hello, world!');\n}`
  );
  const [showWatermark, setShowWatermark] = useState(true);
  const [watermarkPosition, setWatermarkPosition] = useState("Bottom Left");
  const [watermarkType, setWatermarkType] = useState("Twitter Hand");
  const [username, setUsername] = useState("Tools");
  const [fontColor, setFontColor] = useState("#ffffff");
  const [backgroundType, setBackgroundType] = useState("Solid Color");
  const [backgroundColor, setBackgroundColor] = useState("#1a1a2e");
  const [gradientStart, setGradientStart] = useState("#667eea");
  const [gradientEnd, setGradientEnd] = useState("#764ba2");
  const [customBackgroundImage, setCustomBackgroundImage] = useState(null);
  const [previewMode, setPreviewMode] = useState("Wide");
  const [showSettings, setShowSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [avatarImage, setAvatarImage] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  // New settings from the image
  const [fontFamily, setFontFamily] = useState("Space Mono");
  const [fontSize, setFontSize] = useState(15);
  const [tabSize, setTabSize] = useState(3);
  const [shadow, setShadow] = useState("Soft");
  const [imageQuality, setImageQuality] = useState("High");
  const [padding, setPadding] = useState(40);
  const [showLineNumbers, setShowLineNumbers] = useState(true);

  const previewRef = useRef(null);
  const fileInputRef = useRef(null);
  const backgroundFileInputRef = useRef(null);

  // --- Robust Fullscreen logic with all vendor prefixes ---
  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(
        Boolean(
          document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement
        )
      );
    }
    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange);
    document.addEventListener("mozfullscreenchange", onFullscreenChange);
    document.addEventListener("MSFullscreenChange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
      document.removeEventListener("mozfullscreenchange", onFullscreenChange);
      document.removeEventListener("MSFullscreenChange", onFullscreenChange);
    };
  }, []);

  const handleFullscreen = () => {
    const el = previewRef.current;
    if (!el) return;
    if (!isFullscreen) {
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
      else if (el.msRequestFullscreen) el.msRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    }
  };

  const handleDeleteCode = () => {
    setCode("");
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomBackgroundImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const triggerBackgroundUpload = () => {
    backgroundFileInputRef.current?.click();
  };

  const getExportScale = () => {
    switch (imageQuality) {
      case "Low":
        return 1;
      case "Medium":
        return 1.5;
      case "High":
        return 2;
      case "Ultra":
        return 3;
      default:
        return 2;
    }
  };

  // THIS FUNCTION HANDLES THE EXPORT AND DOWNLOAD
  const handleExportImage = async () => {
    if (!previewRef.current) return;

    setIsExporting(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        scale: getExportScale(),
        logging: false,
        useCORS: true,
      });

      const link = document.createElement("a");
      link.download = `${fileName.replace(/\.[^/.]+$/, "")}-code-image.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const getBackgroundStyle = () => {
    switch (backgroundType) {
      case "Solid Color":
        return { backgroundColor };
      case "Gradient":
        return {
          background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
        };
      case "Image (Upload)":
        return customBackgroundImage
          ? {
              backgroundImage: `url(${customBackgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : { backgroundColor };
      case "None":
        return { backgroundColor: "transparent" };
      default:
        return { backgroundColor };
    }
  };

  const languages = Object.keys(languageMap);
  const themes = Object.keys(themeClassMap);
  const positions = ["Top Left", "Top Right", "Bottom Left", "Bottom Right"];
  const watermarkTypes = ["Twitter Hand", "GitHub", "LinkedIn", "Custom"];
  const backgroundTypes = [
    "Solid Color",
    "Gradient",
    "Image (Upload)",
    "None",
  ];
  const previewModes = ["Wide", "Compact", "Square"];
  const fontFamilies = [
    "Space Mono",
    "Fira Code",
    "JetBrains Mono",
    "Source Code Pro",
    "Monaco",
    "Consolas",
  ];
  const shadowOptions = ["None", "Soft", "Medium", "Hard"];
  const qualityOptions = ["Low", "Medium", "High", "Ultra"];

  const theme = themeClassMap[selectedTheme];
  const syntaxTheme = syntaxThemeMap[selectedTheme];
  const fileExtension = getFileExtension(fileName);
  const iconStyle = getIconStyle(fileExtension);

  // Watermark component
  const WatermarkOverlay = () => {
    if (!showWatermark) return null;
    return (
      <div
        className={`absolute ${watermarkPositionStyles[watermarkPosition]} z-10 flex items-center space-x-2 px-2 py-1 rounded opacity-80`}
        style={{
          color: fontColor,
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(4px)",
        }}
      >
        {avatarImage ? (
          <img
            src={avatarImage}
            alt="Avatar"
            className="w-6 h-6 rounded-full object-cover"
          />
        ) : (
          <span className="text-lg">{watermarkTypeIcons[watermarkType]}</span>
        )}
        <span className="text-sm font-medium" style={{ color: fontColor }}>
          {username}
        </span>
      </div>
    );
  };

  // Responsive preview wrapper for Square mode
  const PreviewWrapper = ({ children }) => {
    if (previewMode !== "Square") {
      return (
        <div
          className={previewModeClasses[previewMode]}
          style={{ padding: `${padding}px` }}
        >
          {children}
        </div>
      );
    }
    // Square mode: wrapper ensures square aspect and responsive sizing
    return (
      <div
        className={previewModeClasses.Square}
        style={{
          padding: `${padding / 2}px`,
          minWidth: 220,
          minHeight: 220,
          maxWidth: "100vw",
          maxHeight: "70vw",
        }}
      >
        <div
          ref={previewRef}
          className={`
            relative rounded-lg w-full h-full transition-all duration-300 overflow-auto
            ${shadowStyles[shadow]}
            ${
              isFullscreen
                ? "w-screen h-screen max-w-none max-h-none fixed top-0 left-0 z-50"
                : ""
            }
          `}
          style={{
            ...getBackgroundStyle(),
            ...(isFullscreen ? { margin: 0, borderRadius: 0 } : {}),
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <WatermarkOverlay />
          <div className="flex items-center space-x-2 mb-4 mt-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              {fileExtension && (
                <span className="w-6 h-6 flex items-center">
                  <FileIcon extension={fileExtension} {...iconStyle} />
                </span>
              )}
              <span className={`${theme.filename} text-sm`}>{fileName}</span>
            </div>
          </div>
          <SyntaxHighlighter
            language={languageMap[selectedLanguage] || "text"}
            style={syntaxTheme}
            customStyle={{
              background: "transparent",
              fontSize: fontSize,
              fontFamily:
                fontFamily === "Space Mono"
                  ? "Space Mono, monospace"
                  : fontFamily,
              margin: 0,
              padding: 0,
              minHeight: "120px",
              height: isFullscreen ? "80vh" : "auto",
              tabSize: tabSize,
              flex: 1,
              overflow: "auto",
            }}
            showLineNumbers={showLineNumbers}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    );
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
    <div className="max-w-4xl mx-auto  p-2 sm:p-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 bg-white rounded-lg p-3 sm:p-4  gap-2">
           <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <span className="text-4xl text-indigo-400 mt-3">
            <RiCodeBlock />
          </span>
          <h1 className="text-2xl font-bold text-gray-900 md:text-lg lg:text-2xl sm:text-lg mt-3">
            Code&nbsp;to&nbsp;Image&nbsp;Converter
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
                  </div>
        </div>

        {/* Settings Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6 p-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Highlight Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md outline-none"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme
            </label>
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md outline-none"
            >
              {themes.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              File Name
            </label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md outline-none"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors w-full justify-center"
            >
              <Settings size={16} />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Advanced Settings Panel */}
        {showSettings && (
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6 mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
              Advanced Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Family
                </label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md outline-none"
                >
                  {fontFamilies.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Size
                </label>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-md  outline-none"
                >
                  {[10, 12, 14, 15, 16, 18, 20, 22, 24].map((size) => (
                    <option key={size} value={size}>
                      {size}px
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tab Size
                </label>
                <select
                  value={tabSize}
                  onChange={(e) => setTabSize(parseInt(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-md  outline-none"
                >
                  {[2, 3, 4, 6, 8].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shadow
                </label>
                <select
                  value={shadow}
                  onChange={(e) => setShadow(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md  outline-none"
                >
                  {shadowOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Quality
                </label>
                <select
                  value={imageQuality}
                  onChange={(e) => setImageQuality(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md  outline-none"
                >
                  {qualityOptions.map((quality) => (
                    <option key={quality} value={quality}>
                      {quality}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Padding
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="20"
                    max="100"
                    step="5"
                    value={padding}
                    onChange={(e) => setPadding(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-600 w-12">
                    {padding}px
                  </span>
                </div>
              </div>
              <div className="flex items-end">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="lineNumbers"
                    checked={showLineNumbers}
                    onChange={(e) => setShowLineNumbers(e.target.checked)}
                    className="rounded"
                  />
                  <label
                    htmlFor="lineNumbers"
                    className="text-sm text-gray-700"
                  >
                    Line Numbers
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Code Editor and Preview */}
        <div className="bg-white rounded-lg shadow-sm mb-4 sm:mb-6">
          <div className="p-3 sm:p-6">
           
            <div className="mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-2 gap-2">
                <label className="block text-sm font-medium text-gray-700">
                  Code Editor
                </label>
                <button
                  onClick={handleDeleteCode}
                  className="flex items-center space-x-1 px-3 py-1.5 text-sm text-red-600 hover:text-red-800 hover:bg-red-100 rounded-md transition-colors"
                >
                  <Trash2 size={16} />
                  <span>Delete Code</span>
                </button>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-48 sm:h-64 p-3 sm:p-4 border border-gray-300 rounded-md font-mono text-sm resize-y outline-none"
                placeholder="Enter your code here..."
                style={{
                  fontFamily:
                    fontFamily === "Space Mono"
                      ? "Space Mono, monospace"
                      : fontFamily,
                  fontSize: `${fontSize}px`,
                  tabSize: tabSize,
                }}
              />
            </div>
       
            <PreviewWrapper>
              {previewMode !== "Square" && (
                <div
                  ref={previewRef}
                  className={`
                    relative rounded-lg p-3 sm:p-6 mb-4 min-h-64 transition-all duration-300 overflow-auto
                    ${shadowStyles[shadow]}
                    ${
                      isFullscreen
                        ? "w-screen h-screen max-w-none max-h-none fixed top-0 left-0 z-50"
                        : ""
                    }
                  `}
                  style={{
                    ...getBackgroundStyle(),
                    ...(isFullscreen ? { margin: 0, borderRadius: 0 } : {}),
                  }}
                >
                  <WatermarkOverlay />
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {fileExtension && (
                        <span className="w-6 h-6 flex items-center">
                          <FileIcon extension={fileExtension} {...iconStyle} />
                        </span>
                      )}
                      <span className={`${theme.filename} text-sm`}>
                        {fileName}
                      </span>
                    </div>
                  </div>
                  <SyntaxHighlighter
                    language={languageMap[selectedLanguage] || "text"}
                    style={syntaxTheme}
                    customStyle={{
                      background: "transparent",
                      fontSize: fontSize,
                      fontFamily:
                        fontFamily === "Space Mono"
                          ? "Space Mono, monospace"
                          : fontFamily,
                      margin: 0,
                      padding: 0,
                      minHeight: "200px",
                      height: isFullscreen ? "80vh" : "auto",
                      tabSize: tabSize,
                    }}
                    showLineNumbers={showLineNumbers}
                  >
                    {code}
                  </SyntaxHighlighter>
                </div>
              )}
            </PreviewWrapper>
            {/* Preview Mode Buttons */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="watermark"
                  checked={showWatermark}
                  onChange={(e) => setShowWatermark(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="watermark" className="text-sm text-gray-700">
                  Add Your Watermark
                </label>
              </div>
              {previewModes.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setPreviewMode(mode)}
                  className={`px-4 py-1.5 rounded font-medium text-sm transition-colors
                    ${
                      previewMode === mode
                        ? "bg-blue-600 text-white shadow"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }
                    focus:outline-none`}
                  disabled={isFullscreen}
                >
                  {mode}
                </button>
              ))}
              <button
                type="button"
                onClick={handleFullscreen}
                className={`ml-3 text-blue-600 hover:text-blue-800 text-sm font-medium bg-transparent border-0 p-0`}
                disabled={isExporting}
              >
                {isFullscreen ? "Fullscreen Preview" : ""}
              </button>
            </div>
          </div>
        </div>

        {/* Watermark Settings */}
        {showWatermark && (
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6 mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
              Watermark Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position
                </label>
                <select
                  value={watermarkPosition}
                  onChange={(e) => setWatermarkPosition(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md outline-none"
                >
                  {positions.map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Watermark Type
                </label>
                <select
                  value={watermarkType}
                  onChange={(e) => setWatermarkType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md outline-none"
                >
                  {watermarkTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avatar
                </label>
                <button
                  onClick={triggerFileUpload}
                  className="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center space-x-2"
                >
                  <Upload size={16} />
                  <span className="text-sm">Upload</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username/URL
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={fontColor}
                    onChange={(e) => setFontColor(e.target.value)}
                    className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={fontColor}
                    onChange={(e) => setFontColor(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-md text-sm outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Background Settings and Export */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Type
                  </label>
                  <select
                    value={backgroundType}
                    onChange={(e) => setBackgroundType(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md outline-none"
                  >
                    {backgroundTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Background Image
                  </label>
                  <button
                    onClick={triggerBackgroundUpload}
                    className="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center space-x-2"
                  >
                    <Upload size={16} />
                    <span className="text-sm">Click to upload</span>
                  </button>
                  <input
                    ref={backgroundFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleBackgroundImageUpload}
                    className="hidden"
                  />
                </div>
              </div>
              {/* Additional Background Options */}
              {backgroundType === "Solid Color" && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-md text-sm outline-none"
                    />
                  </div>
                </div>
              )}
              {backgroundType === "Gradient" && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gradient Start
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={gradientStart}
                        onChange={(e) => setGradientStart(e.target.value)}
                        className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={gradientStart}
                        onChange={(e) => setGradientStart(e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gradient End
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={gradientEnd}
                        onChange={(e) => setGradientEnd(e.target.value)}
                        className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={gradientEnd}
                        onChange={(e) => setGradientEnd(e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <button
              onClick={handleExportImage}
              disabled={isExporting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
            >
              <Download size={18} />
              <span>{isExporting ? "Exporting..." : "Export Image"}</span>
            </button>
          </div>
        </div>
    </div>
        <Comment/>
        </>
  );
};

export default CodeToImageConverter;