import arrowIcon from "../../image/arrowIcon.svg";
import arrowIcon2 from "../../image/arrowIcon2.svg";
import whishlist from "../../image/whishlist.svg";
import whishlist2 from "../../image/whishlist2.svg";
import { FaBrain } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa";
import { FaSwatchbook } from "react-icons/fa";
import { IoColorFilterOutline } from "react-icons/io5";
import { HiCircleStack } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FavoritesContext } from "../../Context/FavoriteContext";

const tools = [
  {
    title: "AI Color Palette Generator",
    description:
      "Craft perfect color palettes effortlessly with AI-driven creativity.",
    icon: <FaBrain className="w-[200px] h-[60px] text-indigo-400" />,
    filename: "/AIColor",
  },
  {
    title: "HEX to RGBA Converter",
    description:
      "Convert HEX color codes to RGBA equivalents and see all details of a color",
    icon: <IoColorFilterOutline className="w-[200px] h-[60px] text-indigo-400" />,
    filename: "/HEX",
  },
  {
    title: "RGBA to HEX Converter",
    description:
      "Convert RGBA color codes to alpha supported 6 or 8 digit HEX equivalents",
    icon: <FaHashtag className="w-[200px] h-[60px] text-indigo-400" />,
    filename: "/RGBA",
  },
  {
    title: "Color Shades Generator",
    description:
      "Get all shades of a color by setting up steps for darken, lighten, saturation and desaturation",
    icon: (
      <FaSwatchbook className="w-[200px] h-[60px] text-indigo-400" />
    ),
    filename: "/ColorMixer",
  },
  {
    title: "Color Mixer",
    description:
      "Mix 2 colors and get color codes for intermediate colors from 2 to 10 steps",
    icon: <HiCircleStack className="w-[200px] h-[60px] text-indigo-400" />,
    filename: "/ColorShades",
  },
];

function Colortool1() {
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
        <h2
          style={{ fontFamily: "David Libre" }}
          className="text-2xl md:text-4xl font-semibold text-center text-[#1F2B56] mb-2"
        >
          Color Tools
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
                  <div alt="Tool Icon" className="">
                    {tool.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-center font-semibold text-[#1F2B56] mb-2 break-words">
                  {tool.title}
                </h3>

                {/* Description */}
                <p className="text-center text-gray-600 mb-8">{tool.description}</p>

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

export default Colortool1;