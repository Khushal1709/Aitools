import arrowIcon from "../../image/arrowIcon.svg";
import arrowIcon2 from "../../image/arrowIcon2.svg";
import whishlist from "../../image/whishlist.svg";
import whishlist2 from "../../image/whishlist2.svg";
import { ImBarcode } from "react-icons/im";
import { BsQrCode } from "react-icons/bs";
import { MdOutlineContentPaste, MdShare } from "react-icons/md";
import { BiSolidLock } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FavoritesContext } from "../../Context/FavoriteContext";

const tools = [
  {
    title: "Bar Code Generator",
    description:
      "Generate barcodes for different internatinal standardizations with desired sizes",
    icon: <ImBarcode className='w-[200px] h-[60px] text-indigo-400' />,
    filename: '/Barcode'
  },
  {
    title: "QR Code Generator",
    description:
      "Generate QR code for your links or texts easily and download them as an image file",
    icon: <BsQrCode className='w-[200px] h-[60px] text-indigo-400' />,
    filename: '/QRcode'
  },
  {
    title: "List Randomizer",
    description:
      "Randomize your lists, make lotteries, draw campigns or select random people from a group",
    icon: <MdOutlineContentPaste className='w-[200px] h-[60px] text-indigo-400' />,
    filename: '/Randomizer'
  },
  {
    title: "Strong Random Password Generator",
    description:
      "Generate strong random passwords and check its stregth with password strength meter",
    icon: <BiSolidLock className='w-[200px] h-[60px] text-indigo-400' />,
    filename: '/StrongRandom'
  },
];

const Miscellaneoustool1 = () => {
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
    <>
      <div className="py-10 px-4 md:px-10 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2B56] mb-2">
          Miscellaneous Tools
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
    </>
  );
};

export default Miscellaneoustool1;