import arror from "../../image/arror.svg";
import ston from "../../image/ston.svg";
import Information from "../../components/Information";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Oval2 from "../../image/Oval2.svg";
import leaf1 from "../../image/leaf1.svg";
import Textimg from "../../image/Textimg.svg";
import Texttool1 from "../Text tool Grid/Texttool1";

function Texttool() {
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
            title="Online  Text  Tools For Free"
            description="Looking for some great online text tools? Look no further than 10015.io!

Our text tools are the best in the web and they're all available for free. Whether you're looking for a tool to help you with generating, editing, formatting, converting, manipulating text, or just general writing, we've got you covered."
            buttonText="EXPLORE TOOL"
            buttonText1="LOGIN / REGISTER"
            buttonText2="SIGN IN"
            srcImg={arror}
            srcImg1={Textimg}
            exploreLinkState={{ scrollTo: 'featured-tools' }}

          />

          {/* image grid section */}

          <Texttool1 />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Texttool;


