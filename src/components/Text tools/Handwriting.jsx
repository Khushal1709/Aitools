
import React, { useState,useRef,useContext,useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FavoritesContext } from "../../Context/FavoriteContext";

Quill.register('formats/align', Quill.import('formats/align'), true);

// Import your frame images
import frame1 from "../../image/frame1.png";
import frame2 from "../../image/frame2.png";
import frame3 from "../../image/frame3.png";
import frame4 from "../../image/frame4.png";
import frame5 from "../../image/frame5.png";
import frame6 from "../../image/frame6.png";
import frame7 from "../../image/frame7.png";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { FiShare2 } from "react-icons/fi";
import { FiAlertCircle } from 'react-icons/fi';
import {
  FaCheck,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaCopy,
  FaRegStar,
} from "react-icons/fa6";
import { MdShare } from "react-icons/md";

// Font options for the dropdown
const fontOptions = [
  { label: "Satisfy", value: "Satisfy" },
  { label: "Homemade Apple", value: "Homemade Apple" },
  { label: "Mansalva", value: "Mansalva" },
  { label: "Mali", value: "Mali" },
  { label: "Amatic SC", value: "Amatic SC" },
  { label: "Dancing Script", value: "Dancing Script" },
  { label: "Pacifico", value: "Pacifico" },
  { label: "Indie Flower", value: "Indie Flower" },
  { label: "Shadows Into Light", value: "Shadows Into Light" },
  { label: "Gloria Hallelujah", value: "Gloria Hallelujah" },
  { label: "Patrick Hand", value: "Patrick Hand" },
  { label: "Caveat", value: "Caveat" },
  { label: "Covered By Your Grace", value: "Covered By Your Grace" },
  { label: "Reenie Beanie", value: "Reenie Beanie" },
  { label: "Handlee", value: "Handlee" },
  { label: "Rock Salt", value: "Rock Salt" },
  { label: "Just Another Hand", value: "Just Another Hand" },
  { label: "Kalam", value: "Kalam" },
  { label: "Permanent Marker", value: "Permanent Marker" },
  { label: "Amarante", value: "Amarante" },
];

// Paper frame options for the dropdown and preview
const paperFrames = [
  { label: "frame 1", value: "frame1", image: frame1 },
  { label: "frame 2", value: "frame2", image: frame2 },
  { label: "frame 3", value: "frame3", image: frame3 },
  { label: "frame 4", value: "frame4", image: frame4 },
  { label: "frame 5", value: "frame5", image: frame5 },
  { label: "frame 6", value: "frame6", image: frame6 },
  { label: "frame 7", value: "frame7", image: frame7 },
];

// Custom Quill toolbar with alignment group horizontally
const quillModules = {
  toolbar: [
    [
      { 'align': '' },
      { 'align': 'center' },
      { 'align': 'right' },
      { 'align': 'justify' }
    ],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['clean']
  ]
};

// Simple Input component
const Input = React.forwardRef(function Input({ className = '', ...props }, ref) {
  return (
    <input
      ref={ref}
      className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${className}`}
      {...props}
    />
  );
});

// Simple Card component
function Card({ className = '', children, ...props }) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`} {...props}>
      {children}
    </div>
  );
}



// Main Handwriting Converter component
export default function HandwritingConverter({id="Text"}) {
  const { updateFavorites } = useContext(FavoritesContext);
  const [open, setOpen] = useState(false);
  const [bugDescription, setBugDescription] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tool");
  const [isFavorite, setIsFavorite] = useState(false);

  // State variables
  const [tabchange, setTabchange] = useState('textarea'); // 'textarea' or 'editor'
  const [textAreaValue, setTextAreaValue] = useState('');
  const [editorValue, setEditorValue] = useState('');
  const [font, setFont] = useState('Satisfy');
  const [fontSize, setFontSize] = useState('18px');
  const [inkColor, setInkColor] = useState('#8B0000');
  const [frame, setFrame] = useState('frame2');
    const previewRef = useRef(null);


  // Get the selected frame object (for image preview)
  const selectedFrame = paperFrames.find(f => f.value === frame) || paperFrames[1];

  // Handle font size input with automatic px suffix if needed
  const handleFontSizeChange = (e) => {
    let value = e.target.value.trim();
    if (/^\d+$/.test(value)) {
      value = `${value}px`;
    }
    if (/^\d+(px|em|rem|%|pt)?$/.test(value)) {
      setFontSize(value);
    }
  };




  // Get the text to preview based on active tab
  const previewText = tabchange === 'textarea'
    ? (textAreaValue ? textAreaValue.replace(/\n/g, '<br/>') : 'Your handwriting text will appear here...')
    : (editorValue || 'Your handwriting text will appear here...');


      const handleDownloadImage = async () => {
    if (previewRef.current) {
      const canvas = await html2canvas(previewRef.current);
      const link = document.createElement("a");
      link.download = "handwriting-preview.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  // Download as PDF
  const handleDownloadPDF = async () => {
    if (previewRef.current) {
      const canvas = await html2canvas(previewRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("handwriting-preview.pdf");
    }
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
    <div className="max-w-4xl mx-auto p-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <span className="text-3xl sm:text-4xl text-indigo-400">
            <BsLayoutTextSidebarReverse />
          </span>
          <span className="font-bold text-gray-900 text-lg sm:text-xl md:text-2xl lg:text-3xl">
            Text&nbsp;to&nbsp;Handwriting&nbsp;Converter
          </span>
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
            onClick={ onFavoriteToggle}
            className={`px-3 py-2 rounded-xl border text-sm mt-2 md:mt-0 ml-0 cursor-pointer ${isFavorite
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
              className="absolute top-4 right-4 text-gray-600 text-lg"
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
      <div className="max-w-3xl mx-auto space-y-4">

        {/* Tab Switcher */}
        <div className="flex bg-[#f3f4fa] rounded-lg p-1 w-fit mx-auto mb-2">
          <button
            className={`flex items-center gap-2 px-6 py-2 rounded-md transition font-medium text-base
              ${tabchange === 'textarea'
                ? 'cursor-pointer bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B]    shadow'
                : 'text-[#7a7a9d]'
              }`}
            onClick={() => setTabchange('textarea')}
            style={{ border: 'none', outline: 'none', cursor: 'pointer' }}
          >
            <span role="img" aria-label="textarea" style={{ fontSize: 18 }}>📋</span>
            Text Area
          </button>
          <button
            className={`flex items-center gap-2 px-6 py-2 rounded-md transition font-medium text-base ml-2
              ${tabchange === 'editor'
                ? 'cursor-pointer bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF]   shadow'
                : 'text-[#7a7a9d]'
              }`}
            onClick={() => setTabchange('editor')}
            style={{ border: 'none', outline: 'none', cursor: 'pointer' }}
          >
            <span style={{ fontStyle: 'italic', fontWeight: 700, fontSize: 18 }}>T</span>
            Text Editor
          </button>
        </div>

        {/* Text Input Section */}
        {tabchange === 'textarea' ? (
          <textarea
            className="w-full min-h-[120px] border border-gray-300  rounded px-3 py-2 outline-none"
            placeholder="Enter text here..."
            value={textAreaValue}
            onChange={e => setTextAreaValue(e.target.value)}
          />
        ) : (
          <ReactQuill
            theme="snow"
            value={editorValue}
            onChange={setEditorValue}
            modules={quillModules}
            placeholder="Type here..."
            style={{
              background: "white",
              borderRadius: "8px",
              height: "300px",
              marginBottom: "8px",
            }}
          />
        )}

        {/* Controls: Font, Font Size, Ink Color, Frame */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-15">
          {/* Font Dropdown */}
          <select
            className="border border-gray-300 rounded px-3 py-2 outline-none"
            value={font}
            onChange={e => setFont(e.target.value)}
          >
            {fontOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          {/* Font Size Input */}
          <input
            type="text"
            value={fontSize}
            onChange={handleFontSizeChange}
            placeholder="Font Size (e.g. 18px)"
            className="border border-gray-300 rounded px-3 py-2  outline-none"
          />

          {/* Ink Color Picker */}
          <input
            type="color"
            value={inkColor}
            onChange={e => setInkColor(e.target.value)}
            className="border border-gray-300 rounded  outline-none"

          />

          {/* Frame Dropdown */}
          <select
            className="border border-gray-300 rounded px-3 py-2 outline-none"
            value={frame}
            onChange={e => setFrame(e.target.value)}
          >
            {paperFrames.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

         <div className="flex gap-3 justify-start mt-4">
        <button
          onClick={handleDownloadImage}
          className="cursor-pointer bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B]  px-8 py-2 rounded-lg shadow-md"
        >
          Download as Image
        </button>
        <button
          onClick={handleDownloadPDF}
          className="cursor-pointer bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B]  px-8 py-2 rounded-lg shadow-md"
        >
          Download as PDF
        </button>
      </div>

        <div className="mt-8 flex flex-col items-center">
          <div
            ref={previewRef}
            style={{
              backgroundImage: `url(${selectedFrame.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: 550,
              height: 750,
              maxWidth: '100%',
              borderRadius: 14,
              padding: '48px 36px',
              margin: '0 auto',
              position: 'relative',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',

            }}
          >
            <div
              className="ql-editor lg:mt-[55px]  lg:ml-[50px] "  // <-- THIS LINE IS THE KEY!
              style={{
                width: '100%',
                minHeight: 250,
                fontFamily: font,
                fontSize: fontSize,
                color: inkColor,
                wordBreak: 'break-word',
                padding: 0,
                border: 'none',
                background: 'transparent',
               

              }}
              dangerouslySetInnerHTML={{
                __html: previewText


              }}

            />
          </div>
        </div>
        {/* Card with handwriting preview */}

      </div>
    </div>
  );
}