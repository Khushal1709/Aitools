import React, { useState, useRef,useContext,useEffect } from 'react';
import html2canvas from 'html2canvas-pro';
import { MdPostAdd } from "react-icons/md";
import { FiShare2 } from "react-icons/fi";
import { FiAlertCircle } from 'react-icons/fi';
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
import Comment from "../Text tools/Comment";
import { FavoritesContext } from "../../Context/FavoriteContext";

export default function InstagramPostGenerator({id="Instagram Post Generator"}) {
      const { updateFavorites } = useContext(FavoritesContext);
    const [open, setOpen] = useState(false);
    const [bugDescription, setBugDescription] = useState("");
    const [shareOpen, setShareOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("tool");
    const [isFavorite, setIsFavorite] = useState(false);
    const [theme, setTheme] = useState('Light');
    const [username, setUsername] = useState('johndoe');
    const [verified, setVerified] = useState(true);
    const [location, setLocation] = useState('New York, USA');
    const [postDate, setPostDate] = useState(new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }));
    const [postText, setPostText] = useState('This is a sample post text. @mentions, #hashtags, https://links.com are all automatically converted.');
    const [avatarSrc, setAvatarSrc] = useState('');
    const [postImageSrc, setPostImageSrc] = useState('');
    const [likeCount, setLikeCount] = useState('1234');
    const [commentCount, setCommentCount] = useState('1234');
    const [isLiked, setIsLiked] = useState(false);
    const [isTagged, setIsTagged] = useState(false);
    const [hasStory, setHasStory] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const avatarInputRef = useRef(null);
    const postImageInputRef = useRef(null);
    const postPreviewRef = useRef(null);
    const dropdownRef = useRef(null);

    // Handle file uploads
    const handleAvatarUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => setAvatarSrc(event.target.result);
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handlePostImageUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => setPostImageSrc(event.target.result);
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    // Format post text with hashtags, mentions, and links
    const formatPostText = (text) => {
        return text
            .replace(/@(\w+)/g, '<span class="text-blue-500">@$1</span>')
            .replace(/#(\w+)/g, '<span class="text-blue-500">#$1</span>')
            .replace(/(https?:\/\/[^\s]+)/g, '<span class="text-blue-500">$1</span>');
    };

    // Download Image function
    // const downloadImage = async () => {
    //     if (!postPreviewRef.current) return;

    //     try {
    //         const canvas = await html2canvas(postPreviewRef.current, {
    //             scale: 2,
    //             backgroundColor: theme === 'Dark' ? '#121212' : '#ffffff',
    //             logging: false,
    //             useCORS: true,
    //             allowTaint: true // Add this option
    //         });

    //         // Rest of your download logic remains the same
    //     } catch (error) {
    //         console.error('Error downloading image:', error);
    //     }
    // };

    const downloadImage = async () => {
        const element = postPreviewRef.current;
        if (!element) return;

        try {
            // Step 1: Wait for all images inside the element to load
            const images = element.querySelectorAll('img');
            await Promise.all([...images].map(img =>
                img.complete ? Promise.resolve() : new Promise((res, rej) => {
                    img.onload = res;
                    img.onerror = rej;
                })
            ));

            // Step 2: Capture the element as canvas
            const canvas = await html2canvas(element, {
                scale: 3,
                useCORS: true,
                backgroundColor: theme === 'Dark' ? '#121212' : '#ffffff',
                ignoreElements: el => el.classList?.contains('ignore-in-export'),
            });

            // Step 3: Convert canvas to image
            const dataURL = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = `post-${Date.now()}.png`;

            // Step 4: Trigger download (Safari-friendly)
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (err) {
            console.error('Image download failed:', err);
            alert('Download failed! Please try again.');
        }
    };


    // Copy Image to Clipboard function (optional)
    const copyImageToClipboard = async () => {
        if (!postPreviewRef.current) return;
        try {
            const canvas = await html2canvas(postPreviewRef.current, {
                scale: 2,
                backgroundColor: theme === 'Dark' ? '#121212' : '#ffffff',
                useCORS: true,
                allowTaint: true,
                logging: false,
            });
            canvas.toBlob(async (blob) => {
                try {
                    const clipboardItem = new window.ClipboardItem({ 'image/png': blob });
                    await navigator.clipboard.write([clipboardItem]);
                    alert('Image copied to clipboard!');
                    setShowDropdown(false);
                } catch (err) {
                    alert('Failed to copy image. Your browser may not support this feature.');
                }
            });
        } catch (error) {
            alert('Error capturing image!');
        }
    };

    // Dropdown close on outside click
    React.useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    const toggleDropdown = () => setShowDropdown(!showDropdown);

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
        <div className="max-w-4xl mx-auto p-3 md:py-7">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                    <span className="text-4xl text-indigo-400 mt-4">
                        <MdPostAdd />
                    </span>
                    <span className="text-2xl font-bold text-gray-900 md:text-lg lg:text-2xl sm:text-lg mt-4">
                       Instagram&nbsp;Post&nbsp;Generator
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

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Instagram Post Preview */}
                <div className="flex-1">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden" ref={postPreviewRef}>
                        <div className={`instagram-post ${theme === 'Dark' ? 'bg-gray-900 text-white' : 'bg-white'}`}>
                            {/* Post Header */}
                            <div className="p-3 flex items-center">
                                {/* <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                                        {avatarSrc ? (
                                            <img src={avatarSrc} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                        )}
                                            
                                    </div> */}
                                <div
                                    className={`w-10 h-10 rounded-full overflow-hidden border-2 flex-shrink-0
                                         ${hasStory
                                            ? "border-transparent ring-2 ring-red-500 " // Red story ring
                                            : "border-gray-200"
                                        }`}
                                    style={{
                                        // Optional: Instagram gradient ring (uncomment to use gradient)
                                        // background: hasStory
                                        //   ? "conic-gradient(from 180deg at 50% 50%, #f58529 0deg, #dd2a7b 120deg, #8134af 240deg, #f58529 360deg)"
                                        //   : "transparent"
                                    }}
                                >
                                    {avatarSrc ? (
                                        <img src={avatarSrc} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                <div className="ml-3">
                                    <div className="flex items-center">
                                        <span className="font-semibold text-sm">{username}</span>
                                        {verified && (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1 text-blue-500">
                                                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                        <span className="text-xs ml-1 text-gray-500">• {postDate.includes(':') ? postDate.split(' ')[0] : '1s'}</span>
                                    </div>
                                    <div className="text-xs text-gray-500">{location}</div>
                                </div>
                                <div className="ml-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                    </svg>
                                </div>
                            </div>
                            {/* Post Image */}
                            <div className="aspect-square bg-gray-100">
                                {postImageSrc ? (
                                    <img src={postImageSrc} alt="Post" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <svg className="w-24 h-24 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="10" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            {/* Post Actions */}
                            <div className="flex p-2">
                                <div className="flex space-x-4">
                                    <button className={`${isLiked ? 'text-red-500' : ''}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill={isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>
                                    </button>
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                                        </svg>
                                    </button>
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="ml-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                    </svg>
                                </div>
                            </div>
                            {/* Likes */}
                            <div className="px-4 pb-2">
                                <p className="font-semibold text-sm">{likeCount} likes</p>
                            </div>
                            {/* Caption */}
                            <div className="px-4 pb-2">
                                <span className="font-semibold text-sm mr-1">{username}</span>
                                <span className="text-sm" dangerouslySetInnerHTML={{ __html: formatPostText(postText) }} />
                            </div>
                            {/* View Comments */}
                            {showComments && (
                                <div className="px-4 pb-2">
                                    <span className="text-sm text-gray-500">View all {commentCount} comments</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* Configuration Panel */}
                <div className="flex-1">
                    <div>
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">Post Body</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            {/* Theme Selector */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                                <select
                                    value={theme}
                                    onChange={(e) => setTheme(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
                                >
                                    <option value="Light">Light</option>
                                    <option value="Dark">Dark</option>
                                </select>
                            </div>
                            {/* Username */}
                            <div className="flex items-end gap-2">
                                <div className="flex-grow">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
                                    />
                                </div>
                                <button
                                    className={`px-3 py-2 border rounded-md text-sm font-medium ${verified ? 'bg-indigo-100 text-indigo-800 border-indigo-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}
                                    onClick={() => setVerified(!verified)}
                                >
                                    {verified ? 'Verified' : 'Not Verified'}
                                </button>
                            </div>
                            {/* Description/Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
                                    placeholder="New York, USA"
                                />
                            </div>
                            {/* Post Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Post Date</label>
                                <input
                                    type="datetime-local"
                                    value={postDate}
                                    onChange={(e) => setPostDate(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
                                    placeholder="May 21, 2025 11:50 AM"
                                />
                            </div>
                            {/* Avatar Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Avatar</label>
                                <div
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 flex items-center cursor-pointer bg-white hover:bg-gray-50 outline-none"
                                    onClick={() => avatarInputRef.current.click()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                    <span className="text-gray-500">Click to upload</span>
                                    <input
                                        ref={avatarInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleAvatarUpload}
                                    />
                                </div>
                            </div>
                            {/* Post Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Post Image</label>
                                <div
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 flex items-center cursor-pointer bg-white hover:bg-gray-50"
                                    onClick={() => postImageInputRef.current.click()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-gray-500">Click to upload</span>
                                    <input
                                        ref={postImageInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handlePostImageUpload}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Post Text */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Post Text <span className="text-gray-400">(max. 120 characters will be seen)</span>
                            </label>
                            <textarea
                                value={postText}
                                rows={4}
                                onChange={(e) => setPostText(e.target.value)}
                                className="outline-none w-full border border-gray-300 rounded-md px-3 "
                                maxLength={220}
                            />
                        </div>
                        {/* Stats */}
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">Stats & States</h2>
                        {/* Counts */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Like Count</label>
                                <input
                                    type="text"
                                    value={likeCount}
                                    onChange={(e) => setLikeCount(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Comment Count</label>
                                <input
                                    type="text"
                                    value={commentCount}
                                    onChange={(e) => setCommentCount(e.target.value)}
                                    className="w-full border  border-gray-300 rounded-md px-3 py-2 outline-none"
                                />
                            </div>
                        </div>
                        {/* Checkboxes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isLiked"
                                    checked={isLiked}
                                    onChange={(e) => setIsLiked(e.target.checked)}
                                    className="h-4 w-4  border-gray-300 rounded"
                                />
                                <label htmlFor="isLiked" className="ml-2 block text-sm text-gray-700">
                                    Is post liked by viewer?
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isTagged"
                                    checked={isTagged}
                                    onChange={(e) => setIsTagged(e.target.checked)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="isTagged" className="ml-2 block text-sm text-gray-700">
                                    Is someone tagged?
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="hasStory"
                                    checked={hasStory}
                                    onChange={(e) => setHasStory(e.target.checked)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="hasStory" className="ml-2 block text-sm text-gray-700">
                                    Has an Instagram story?
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="showComments"
                                    checked={showComments}
                                    onChange={(e) => setShowComments(e.target.checked)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="showComments" className="ml-2 block text-sm text-gray-700">
                                    Are comments displayed?
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 mb-4">
                    By using Instagram Post Generator by 10015.io, you agree to our <span className="text-indigo-600">Usage Policy</span>.
                </p>
                <div className="relative inline-block" ref={dropdownRef}>
                    <button
                        onClick={toggleDropdown}
                        className="cursor-pointer bg-gradient-to-r from-[#B8D0FF] to-[#E8D0FF] text-[#14143B]   px-8 py-2 rounded-full  text-lg flex items-center justify-center mx-auto transition-colors"
                    >
                        Export Instagram Post
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {showDropdown && (
                        <div className="absolute z-10 mt-2 w-56 origin-top-right right-0 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                <button
                                    onClick={downloadImage}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download Image
                                    </div>
                                </button>
                                <button
                                    onClick={copyImageToClipboard}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        Copy Image to Clipboard
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
            <Comment/>
            </>
    );
}

