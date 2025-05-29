import arrowIcon from "../../image/arrowIcon.svg";
import arrowIcon2 from "../../image/arrowIcon2.svg";
import whishlist from "../../image/whishlist.svg"; 
import whishlist2 from "../../image/whishlist2.svg";
import { TbFilters } from "react-icons/tb";
import { GiResize } from "react-icons/gi";
import { SiConvertio } from "react-icons/si";
import { TbFileTypeSvg } from "react-icons/tb";
import { GiSlowBlob } from "react-icons/gi";
import { TbColorPicker } from "react-icons/tb";
import { FaCropSimple } from "react-icons/fa6";
import { MdMovieFilter } from "react-icons/md";
import { MdFormatColorFill } from "react-icons/md";
import { PiImageSquareFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FavoritesContext } from "../../Context/FavoriteContext";

const tools = [
  {
    title: "Image Resizer",
    description: "Resize any image to desired width and height either by protecting aspect ratio or not",
    icon: <GiResize className='w-[200px] h-[60px] text-indigo-400'/>,
    filename: '/Resizer'
  },
  {
    title: "Image Cropper",
    description: "Crop unwanted parts of images and download desired part of the image as a new file",
    icon: <FaCropSimple className='w-[200px] h-[60px] text-indigo-400'/>,
    filename: '/ImageCropper'
  },
  {
    title: "Image Average Color Finder",
    description: "Calculate average and dominant color of an image by ignoring transparency",
    icon: <MdFormatColorFill className='w-[200px] h-[60px] text-indigo-400'/>,
    filename: '/AverageColor'
  },
  {
    title: "Image Color Extractor",
    description: "Extract all colors from an image and get color codes and details of this colors as a list",
    icon: <PiImageSquareFill className='w-[200px] h-[60px] text-indigo-400'/>,
    filename: '/ImageColorExtractor'
  },
  {
    title: "Image Color Picker",
    description: "Pick any color from an image with an eyedropper and get detailed info about the color you picked",
    icon: <TbColorPicker className='w-[200px] h-[60px] text-indigo-400'/>,
    filename: '/ImageColorPicker'
  },
  {
    title: "SVG Pattern Generator",
    description: "Generate SVG patterns with different shapes and download it as SVG or an image file",
    icon: <TbFileTypeSvg className='w-[200px] h-[60px] text-indigo-400'/>,
    filename: '/SVGpattern'
  },
  {
    title: "Photo Censor",
    description: "Censor photos and hide faces by pixelating/blurring them or by putting a black bar",
    icon: <MdMovieFilter className='w-[200px] h-[60px] text-indigo-400'/>,
    filename: '/Photocensor'
  },
  {
    title: "SVG To PNG Converter",
    description: "Convert any SVG file into PNG format image and scale it to desired size by preserving aspect ratio",
    icon: <SiConvertio className='w-[200px] h-[60px] text-indigo-400'/>,
    filename: '/Svgpng'
  },
];

function Imagestools1() {
  const navigate = useNavigate();
  const { favoriteTools, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
      <div className="px-4 md:px-10 max-w-7xl mx-auto">
        <h2 style={{ fontFamily: "David Libre" }} className="text-2xl md:text-4xl font-semibold text-center text-[#1F2B56] mb-2">
          Image Tools
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

export default Imagestools1;