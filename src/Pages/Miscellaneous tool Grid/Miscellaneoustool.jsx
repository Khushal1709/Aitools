import arror from "../../image/arror.svg";
import ston from "../../image/ston.svg";
import Information from "../../components/Information";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Oval2 from "../../image/Oval2.svg";
import leaf1 from "../../image/leaf1.svg";
import Miscellaneousimg from "../../image/Miscellaneousimg.svg";
import Miscellaneoustool1 from "../Miscellaneous tool Grid/Miscellaneoustool1";

function Miscellaneoustool() {
  return (
    <>
      <div className="absolute hidden lg:block left-80 top-0 bottom-120 inset-0 overflow-hidden z-0 lg:left-0 2xl:right-100 ">
        <img
          src={Oval2 || "/placeholder.svg"}
          alt="Background"
          className="w-150 h-auto object-cover "
        />
      </div>
      <div
        className="absolute inset-0 w-140 left-280 top-[-50px] hidden lg:block md:left-150 lg:left-115 xl:left-230 2xl:left-280 "
        style={{ zIndex: -1 }}
      >
        <img
          src={ston || "/placeholder.svg"}
          alt="Background Shape"
          className="w-full h-auto object-cover"
        />
      </div>
      <Navbar />
      <img
        src={leaf1 || "/placeholder.svg"}
        alt="leav"
        className="top-15 absolute hidden lg:block"
      />
      <div>
        <div>
          <Information
            title="Miscellaneous Tools"
            description="A growing collection of free online tools to help you work smarter which are not categorized under main tool categories."
            buttonText="EXPLORE TOOL"
            buttonText1="LOGIN / REGISTER"
            buttonText2="SIGN IN"
            srcImg={arror}
            srcImg1={Miscellaneousimg}
            exploreLinkState={{ scrollTo: 'featured-tools' }}

          />

          {/* image grid section */}

          <Miscellaneoustool1 />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Miscellaneoustool;
