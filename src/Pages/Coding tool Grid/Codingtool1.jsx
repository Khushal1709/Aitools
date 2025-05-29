import arrowIcon from "../../image/arrowIcon.svg";
import arrowIcon2 from "../../image/arrowIcon2.svg";
import whishlist from "../../image/whishlist.svg"; // wishlist icon
import whishlist2 from "../../image/whishlist2.svg";// wishlist icon
import { RiCodeBlock } from "react-icons/ri";
import { FaLink } from "react-icons/fa";
import { PiFileHtmlBold } from "react-icons/pi";
import { FaReact } from "react-icons/fa6";
import { PiDatabaseBold } from "react-icons/pi";
import { TbHtml } from "react-icons/tb";
import { ImHtmlFive2 } from "react-icons/im";
import { PiFileCssLight } from "react-icons/pi";
import { PiFileJsxBold } from "react-icons/pi";
import { LiaHtml5 } from "react-icons/lia";
import { SiCsswizardry } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FavoritesContext } from "../../Context/FavoriteContext";

function Codingtools1() {
  const tools = [
    {
      title: "Code to Image Converter",
      description: "Convert your codes to fancy images and share with your friends or colleagues",
      icon: <RiCodeBlock className='w-[200px] h-[60px] text-indigo-400'/>,
      filename: '/CodetoImage'
    },
    {
      title: "URL Slug Generator",
      description: "Generate SEO-friendly slugs from titles or any other strings for your webpages or blog posts",
      icon: <FaLink className='w-[200px] h-[60px] text-indigo-400' />,
      filename: '/Slug'
    },
    {
      title: "React Native Shadow Generator",
      description: "Generate fancy box shadows in React Native both for iOS and Android",
      icon: <FaReact className='w-[200px] h-[60px] text-indigo-400' />,
      filename: '/Shadow'
    },
    {
      title: "Base64 Encoder/Decoder",
      description: "Encode your strings to Base64 or decode strings encoded with Base64",
      icon: <PiDatabaseBold className='w-[200px] h-[60px] text-indigo-400' />,
      filename: '/BaseEncoderDecoder'
    },
    {
      title: "HTML Encoder/Decoder",
      description: "Encode or decode your HTML by replacing special characters into equivalent escape forms",
      icon: <TbHtml className='w-[200px] h-[60px] text-indigo-400' />,
      filename: '/HTMLEncoderDecoder'
    },
    {
      title: "URL Encoder/Decoder",
      description: "Encode your URL by escaping characters that may break your navigation and decode it ",
      icon: <PiFileHtmlBold className='w-[200px] h-[60px] text-indigo-400' />,
      filename: '/URLEncoderDcoder'
    },
    {
      title: "HTML Minifier",
      description: "Minify your HTML code and copy the minified code to your clipboard or download as .html file",
      icon: <ImHtmlFive2 className='w-[200px] h-[60px] text-indigo-400' />,
      filename: '/HTMLMinifier'
    },
    {
      title: "CSS Minifier",
      description: "Minify your CSS code and copy the minified code to your clipboard or download as style.min.css file",
      icon: <PiFileCssLight className='w-[200px] h-[60px] text-indigo-400' />,
      filename: '/CSSMinifier'
    },
    {
      title: "JavaScript Minifier",
      description: "Minify your JavaScript code and copy the minified code to your clipboard or download as .min.js file",
      icon: <PiFileJsxBold className='w-[200px] h-[60px] text-indigo-400' />,
      filename: '/JavaScriptMinifier'
    },
    {
      title: "HTML Formatter",
      description: "Format your HTML code with HTML beautifier and either copy the formatted HTML or download it",
      icon: <LiaHtml5 className='w-[200px] h-[60px] text-indigo-400' />,
      filename: '/Hf'
    },
    {
      title: "CSS Formatter",
      description: "Format your CSS code and copy the beautified code to your clipboard or download as style.css file",
      icon: <SiCsswizardry className='w-[200px] h-[60px] text-indigo-400' />,
      filename: '/Cs'
    },
    {
      title: "JavaScript Formatter",
      description: "Format/beautify your JavaScript code and copy the formatted code to your clipboard or download as a file",
      icon: <PiFileJsxBold className='w-[200px] h-[60px] text-indigo-400' />,
      filename: '/Javaf'
    },
  ];

  const navigate = useNavigate();
  const { favoriteTools, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWishlistClick = (e, tool) => {
    e.stopPropagation(); // Prevent card click navigation
    
    const isAlreadyFavorite = favoriteTools.includes(tool.title);
    
    if (isAlreadyFavorite) {
      removeFromFavorites(tool.title);
    } else {
      addToFavorites(tool.title);
    }
  };

  const handleCardClick = (filename) => {
    scrollToTop();
    navigate(filename);
  };

  return (
    <div>
      <div className="py-10 px-4 md:px-10 max-w-7xl mx-auto">
        <h2 style={{ fontFamily: "David Libre" }} className="text-2xl md:text-4xl font-semibold text-center text-[#1F2B56] mb-2">
          Coding Tools
        </h2>
        <p className="text-center text-gray-500 mb-10">
          Smart Tools. Simple Solutions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => {
            const isFavorite = favoriteTools.includes(tool.title);
            
            return (
              <div
                key={index}
                className="relative rounded-2xl shadow-md cursor-pointer p-6 bg-[#F6F5F8] flex flex-col justify-between transition-all duration-300"
                onClick={() => handleCardClick(tool.filename)}
              >
                {/* Wishlist Icon */}
                <div 
                  className="group relative"
                  onClick={(e) => handleWishlistClick(e, tool)}
                >
                  <img
                    src={isFavorite ? whishlist2 : whishlist}
                    alt="Wishlist"
                    className={`absolute top-1 right-2 w-5 h-5 transition-opacity duration-300 ${
                      isFavorite 
                        ? "opacity-100" 
                        : "opacity-100 group-hover:opacity-0"
                    }`}
                  />
                  {!isFavorite && (
                    <img
                      src={whishlist2 || "/placeholder.svg"}
                      alt="Wishlist"
                      className="absolute top-1 right-2 w-5 h-5 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    />
                  )}
                </div>

                {/* Tool Icon with background */}
                <div className="rounded-md flex items-center justify-center mb-4">
                  <div alt="Tool Icon" className="">{tool.icon}</div>
                </div>

                {/* Title */}
                <h3 className="text-center font-semibold text-[#1F2B56] mb-2 break-words">
                  {tool.title}
                </h3>

                {/* Description */}
                <p className="text-center text-gray-600 mb-8">
                  {tool.description}
                </p>

                {/* Arrow Button */}
                <div className="group absolute bottom-5.5 right-1">
                  <div className="relative w-28 h-10 flex items-center justify-center bg-gray-100 rounded-full z-0">
                    <img
                      src={arrowIcon || "/placeholder.svg"}
                      alt="Arrow"
                      className="absolute inset-0 m-auto transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                    />
                    <img
                      src={arrowIcon2 || "/placeholder.svg"}
                      alt="Arrow"
                      className="absolute inset-0 m-auto transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Codingtools1;