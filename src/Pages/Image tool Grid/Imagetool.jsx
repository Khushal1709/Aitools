import arror from "../../image/arror.svg";
import ston from "../../image/ston.svg";
import Information from "../../components/Information";
import Imagestools1 from "../Image tool Grid/Imagetool1";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Oval2 from "../../image/Oval2.svg";
import leaf1 from "../../image/leaf1.svg";
import Imageimg from "../../image/Imageimg.svg";

function Imagetool() {
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
            title="Online  Image  Tools For Free"
            description="Looking for the best online image tools? Look no further than our collection of image tools here at 10015.io.From basic editing to complex effects, these tools will help you get the most out of your images."
            buttonText="EXPLORE TOOL"
            buttonText1="LOGIN / REGISTER"
            buttonText2="SIGN IN"
            srcImg={arror}
            srcImg1={Imageimg}
            exploreLinkState={{ scrollTo: 'featured-tools' }}
          />

          {/* image grid section */}

          <Imagestools1 />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Imagetool;
