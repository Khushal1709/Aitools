"use client"

import { useState, useRef, useEffect, useContext } from "react"
import {
  ChevronDown,
  Upload,
  FileText,
  Maximize,
  X,
} from "lucide-react"
import {
  FaCheck,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaCopy,
  FaRegStar,
} from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { FiAlertCircle } from 'react-icons/fi';
import { FavoritesContext } from "../../Context/FavoriteContext";
import Comment from "../Text tools/Comment";
import { MdOutlineContentPaste, MdShare } from "react-icons/md";

// PDF.js script URLs - using stable CDN links
const PDFJS_LIB = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js"
const PDFJS_WORKER = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js"

const fixationLevels = [
  { label: "Very Low - 40%", value: 0.4 },
  { label: "Low - 50%", value: 0.5 },
  { label: "Medium - 60%", value: 0.6 },
  { label: "High - 70%", value: 0.7 },
]

const contrastLevels = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
]

function getBionicText(text, fixation = 0.4) {
  // Split by lines first to preserve line structure
  return text
    .split("\n")
    .map((line) => {
      if (!line.trim()) return "" // Empty line

      // Apply bionic reading to each word in the line
      return line
        .split(" ")
        .map((word) => {
          if (!word.trim()) return word // Preserve spaces
          const n = Math.ceil(word.length * fixation)
          return `<b>${word.slice(0, n)}</b>${word.slice(n)}`
        })
        .join(" ")
    })
    .join("<br>") // Use <br> to preserve line breaks in HTML
}

const contrastClass = {
  low: "bionic-low",
  medium: "bionic-medium",
  high: "bionic-high",
}

export default function BionicReadingConverter({ id = "Bionic Reading Converter" }) {
  const [fixation, setFixation] = useState(0.4)
  const [contrast, setContrast] = useState("medium")
  const [text, setText] = useState("")
  const [bionic, setBionic] = useState("")
  const [fileError, setFileError] = useState("")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)
  const [bugReportOpen, setBugReportOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [pdfJsLoaded, setPdfJsLoaded] = useState(false)
  const [fileName, setFileName] = useState("")
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [shareOpen, setShareOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tool");
  const [isFavorite, setIsFavorite] = useState(false);
  const [open, setOpen] = useState(false);
  const [bugDescription, setBugDescription] = useState("");
  const { updateFavorites } = useContext(FavoritesContext);

  const exportRef = useRef(null)
  const fileInputRef = useRef(null)
  const mainRef = useRef(null)

  // Load PDF.js library
  useEffect(() => {
    if (!pdfJsLoaded) {
      const loadPdfJs = async () => {
        try {
          // Check if PDF.js is already loaded
          if (window.pdfjsLib) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER
            setPdfJsLoaded(true)
            return
          }

          // Load PDF.js script
          const script = document.createElement("script")
          script.src = PDFJS_LIB
          script.async = true
          script.onload = () => {
            // Set worker source
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER
            setPdfJsLoaded(true)
          }
          document.body.appendChild(script)
        } catch (error) {
          console.error("Failed to load PDF.js:", error)
          setFileError("Failed to load PDF processing library. Please try again later.")
        }
      }

      loadPdfJs()
    }
  }, [pdfJsLoaded])

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false)
      }
    }

    if (isFullscreen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isFullscreen])

  // Extract text from PDF preserving exact line structure
  const extractTextFromPDF = async (file) => {
    if (!window.pdfjsLib) {
      throw new Error("PDF.js library not loaded. Please refresh the page and try again.")
    }

    try {
      // Read the file as ArrayBuffer
      const arrayBuffer = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsArrayBuffer(file)
      })

      // Load the PDF document
      const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer })
      const pdf = await loadingTask.promise

      console.log(`PDF loaded. Number of pages: ${pdf.numPages}`)
      setFileError(`Processing PDF: 0/${pdf.numPages} pages...`)

      let fullText = ""

      // Process each page
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        setFileError(`Processing PDF: ${pageNum}/${pdf.numPages} pages...`)

        // Get the page
        const page = await pdf.getPage(pageNum)

        // Extract text content
        const textContent = await page.getTextContent()

        // Group text items by their Y position to preserve lines
        const lines = {}

        for (const item of textContent.items) {
          if (item.str.trim() === "") continue

          const y = Math.round(item.transform[5]) // Y position

          if (!lines[y]) {
            lines[y] = []
          }

          lines[y].push({
            text: item.str,
            x: item.transform[4], // X position for sorting
          })
        }

        // Sort lines by Y position (top to bottom) and items by X position (left to right)
        const sortedYPositions = Object.keys(lines)
          .map((y) => Number.parseInt(y))
          .sort((a, b) => b - a) // Sort descending (top to bottom)

        let pageText = ""

        for (const y of sortedYPositions) {
          // Sort items in this line by X position (left to right)
          const lineItems = lines[y].sort((a, b) => a.x - b.x)

          // Combine items in this line
          const lineText = lineItems.map((item) => item.text).join(" ")

          if (lineText.trim()) {
            pageText += lineText.trim() + "\n"
          }
        }

        fullText += pageText

        // Update the text area in real-time as pages are processed
        setText((prevText) => prevText + pageText)

        // Add page break if not the last page
        if (pageNum < pdf.numPages) {
          fullText += "\n--- Page Break ---\n\n"
          setText((prevText) => prevText + "\n--- Page Break ---\n\n")
        }
      }

      return fullText.trim()
    } catch (error) {
      console.error("Error extracting text from PDF:", error)
      throw new Error(`Failed to extract text: ${error.message}`)
    }
  }

  const handleFileChange = async (e) => {
    setFileError("")
    setText("") // Clear previous text
    setBionic("") // Clear previous bionic text
    setIsProcessing(true)

    const file = e.target.files?.[0]
    if (!file) {
      setIsProcessing(false)
      return
    }

    setFileName(file.name)

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setFileError("File size exceeds 5MB. Please choose a smaller file.")
      setIsProcessing(false)
      e.target.value = ""
      return
    }

    // Check file type
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setFileError("Only PDF files are supported.")
      setIsProcessing(false)
      e.target.value = ""
      return
    }

    if (!pdfJsLoaded) {
      setFileError("PDF.js library is still loading. Please wait a moment and try again.")
      setIsProcessing(false)
      return
    }

    try {
      setFileError(`Processing PDF: ${file.name}...`)

      // Extract text from PDF
      const extractedText = await extractTextFromPDF(file)

      if (extractedText && extractedText.trim()) {
        // Text is already being updated in real-time during extraction
        setFileError(`PDF imported successfully! Extracted ${extractedText.length} characters from "${file.name}".`)

        // Auto-convert after successful import
        setBionic(getBionicText(extractedText, fixation))
      } else {
        setFileError("PDF appears to be empty or contains no readable text.")
      }
    } catch (error) {
      console.error("PDF processing error:", error)
      setFileError(`Error processing PDF: ${error.message}`)
      setText("") // Clear text on error
    } finally {
      setIsProcessing(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (exportRef.current && !exportRef.current.contains(event.target)) {
        setExportOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleConvert = () => {
    if (text.trim()) {
      setBionic(getBionicText(text, fixation))
    }
  }

  const handleReset = () => {
    setText("")
    setBionic("")
    setFileError("")
    setFileName("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleExportHTML = () => {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Bionic Reading Export</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
        .bionic-low b { font-weight: 500; color: #666; }
        .bionic-medium b { font-weight: 700; color: #222; }
        .bionic-high b { font-weight: 900; color: #000; }
    </style>
</head>
<body>
    <div class="${contrastClass[contrast]}">${bionic}</div>
</body>
</html>`

    const blob = new Blob([htmlContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "bionic-reading.html"
    a.click()
    URL.revokeObjectURL(url)
    setExportOpen(false)
  }

  // Simple PDF generation using browser's print functionality
  const handleExportPDF = async () => {
    if (!bionic.trim()) {
      alert("No content to export. Please convert some text first.")
      return
    }

    setIsGeneratingPdf(true)

    try {
      // Create a new window with the bionic content
      const printWindow = window.open("", "_blank")

      if (!printWindow) {
        throw new Error("Popup blocked. Please allow popups for this site.")
      }

      // Convert bionic HTML to plain text with formatting
      const plainText = bionic
        .replace(/<br>/g, "\n")
        .replace(/<b>(.*?)<\/b>/g, "$1") // Remove bold tags for plain text
        .replace(/<[^>]*>/g, "") // Remove any remaining HTML tags

      // Create HTML content for the PDF
      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Bionic Reading Document</title>
    <style>
        @page {
            margin: 1in;
            size: A4;
        }
        body {
            font-family: 'Times New Roman', serif;
            font-size: 12pt;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            color: #000;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
        }
        .title {
            font-size: 18pt;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .settings {
            font-size: 10pt;
            color: #666;
            margin-bottom: 20px;
        }
        .content {
            white-space: pre-wrap;
            font-family: 'Courier New', monospace;
            font-size: 11pt;
            line-height: 1.5;
        }
        .bionic-word {
            display: inline;
        }
        .bold-part {
            font-weight: bold;
        }
        @media print {
            body { print-color-adjust: exact; }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="title">Bionic Reading Document</div>
        <div class="settings">
            Fixation Level: ${(fixation * 100).toFixed(0)}% | 
            Contrast: ${contrast.charAt(0).toUpperCase() + contrast.slice(1)} | 
            Generated: ${new Date().toLocaleDateString()}
        </div>
    </div>
    <div class="content">${bionic.replace(/<br>/g, "<br>\n")}</div>
</body>
</html>`

      // Write content to the new window
      printWindow.document.write(htmlContent)
      printWindow.document.close()

      // Wait for content to load
      setTimeout(() => {
        // Focus the window and print
        printWindow.focus()
        printWindow.print()

        // Close the window after printing
        setTimeout(() => {
          printWindow.close()
        }, 1000)
      }, 500)

      setExportOpen(false)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert(`Error generating PDF: ${error.message}`)
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  const handleCopyHTML = async () => {
    try {
      await navigator.clipboard.writeText(bionic)
      alert("HTML copied to clipboard!")
    } catch (error) {
      console.error("Failed to copy:", error)
    }
    setExportOpen(false)
  }

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(text)
      alert("Text copied to clipboard!")
    } catch (error) {
      console.error("Failed to copy:", error)
    }
    setExportOpen(false)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const handleFullscreen = () => {
    if (!bionic.trim()) {
      alert("Please convert some text to bionic reading format first!")
      return
    }
    setIsFullscreen(!isFullscreen)
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
    <div ref={mainRef} className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <span className="text-4xl text-indigo-400 mt-6">
            <FaBookOpen />
          </span>
          <span className="text-2xl font-bold text-gray-900 md:text-lg lg:text-2xl sm:text-lg">
            {/* Java&nbsp;Script&nbsp;Minifier */}
            Bionic&nbsp;Reading&nbsp;Converter
          </span>
        </div>
        <div className="flex flex-col w-full md:flex-row md:justify-center md:items-center md:gap-4 mt-2 lg:justify-end lg:gap-2">
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

      {/* File Upload */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
        <div className="p-6">
          <div
            onClick={() => !isProcessing && fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isProcessing
                ? "border-blue-400 bg-blue-50 cursor-not-allowed"
                : "border-gray-300 cursor-pointer hover:border-blue-400 hover:bg-blue-50"
              }`}
          >
            {fileName ? (
              <FileText
                className={`mx-auto mb-4 ${isProcessing ? "text-blue-500 animate-pulse" : "text-blue-500"}`}
                size={48}
              />
            ) : (
              <Upload
                className={`mx-auto mb-4 ${isProcessing ? "text-blue-500 animate-pulse" : "text-gray-400"}`}
                size={48}
              />
            )}

            <div className="text-lg font-medium text-gray-700 mb-2">
              {isProcessing ? "Processing PDF..." : fileName ? `File: ${fileName}` : "Import PDF File"}
            </div>

            <div className="text-sm text-gray-500">
              {isProcessing
                ? "Extracting text from your PDF file..."
                : fileName
                  ? "Click to upload a different PDF file"
                  : "Click to upload a PDF file (Max 5MB)"}
            </div>

            <input
              type="file"
              accept=".pdf,application/pdf"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              disabled={isProcessing}
            />
          </div>

          {fileError && (
            <div
              className={`mt-4 p-3 rounded-md text-sm ${fileError.includes("success") || fileError.includes("Processing")
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
                }`}
            >
              {fileError}
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="fixation" className="block text-sm font-medium text-gray-700 mb-2">
            Fixation Level
          </label>
          <select
            id="fixation"
            value={fixation}
            onChange={(e) => setFixation(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {fixationLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contrast" className="block text-sm font-medium text-gray-700 mb-2">
            Contrast Level
          </label>
          <select
            id="contrast"
            value={contrast}
            onChange={(e) => setContrast(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {contrastLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Text Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="input-text" className="block text-sm font-medium text-gray-700 mb-2">
            Input Text {text.length > 0 && `(${text.length} characters)`}
          </label>
          <textarea
            id="input-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here, or upload a PDF file above..."
            className="w-full h-80 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            style={{ whiteSpace: "pre-wrap" }}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Bionic Reading Output {bionic.length > 0 && `(${bionic.length} characters)`}
            </label>
            <button
              onClick={handleFullscreen}
              disabled={!bionic.trim()}
              className="flex items-center gap-1 px-2 py-1 text-xs rounded-lg cursor-pointer bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B]"
            >
              <Maximize size={12} />
              Full Screen
            </button>
          </div>
          <div
            className={`h-80 p-3 border border-gray-300 rounded-md overflow-y-auto bg-white ${contrastClass[contrast]}`}
            style={{ whiteSpace: "pre-wrap", fontFamily: "monospace", fontSize: "14px" }}
            dangerouslySetInnerHTML={{
              __html: bionic || "<span class='text-gray-400'>Converted text will appear here...</span>",
            }}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <button
          onClick={handleReset}
          className="px-6 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B]"
        >
          Reset
        </button>

        <div className="flex gap-2">
          <button
            onClick={handleConvert}
            disabled={!text.trim() || isProcessing}
            className="px-6 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B]"
          >
            Convert to Bionic Reading
          </button>

          <div ref={exportRef} className="relative">
            <button
              onClick={() => setExportOpen(!exportOpen)}
              disabled={!bionic}
              className="flex items-center gap-2 px-6 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B]"
            >
              Export <ChevronDown size={16} />
            </button>

            {exportOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  onClick={handleExportHTML}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded-t-lg"
                >
                  Download HTML
                </button>
                <button
                  onClick={handleExportPDF}
                  disabled={isGeneratingPdf}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed"
                >
                  {isGeneratingPdf ? "Generating PDF..." : "Download PDF"}
                </button>
                <button onClick={handleCopyHTML} className="w-full px-4 py-2 text-left hover:bg-gray-100">
                  Copy HTML
                </button>
                <button onClick={handleCopyText} className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded-b-lg">
                  Copy Text
                </button>
              </div>
            )}
          </div>

          <button
            onClick={handleFullscreen}
            disabled={!bionic.trim()}
            className="flex items-center gap-2 px-6 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B]"
          >
            <Maximize size={16} />
            Full Screen
          </button>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Bionic Reading - Full Screen View</h2>
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div
                className={`text-base leading-relaxed ${contrastClass[contrast]}`}
                style={{
                  lineHeight: "1.6",
                  fontSize: "16px",
                  fontFamily: "monospace",
                  whiteSpace: "pre-wrap",
                }}
                dangerouslySetInnerHTML={{ __html: bionic }}
              />
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div>
                  Fixation: {(fixation * 100).toFixed(0)}% | Contrast:{" "}
                  {contrast.charAt(0).toUpperCase() + contrast.slice(1)}
                </div>
                <div>{bionic.length} characters</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .bionic-low b { 
          font-weight: 500; 
          color: #666; 
        }
        .bionic-medium b { 
          font-weight: 700; 
          color: #222; 
        }
        .bionic-high b { 
          font-weight: 900; 
          color: #000; 
        }
      `}</style>
    </div>
  )
}
