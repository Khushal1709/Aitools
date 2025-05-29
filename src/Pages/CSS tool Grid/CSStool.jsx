import arror from "../../image/arror.svg";
import ston from "../../image/ston.svg";
import CSStool1 from "../CSS tool Grid/CSStool1";
import Information from "../../components/Information";
import Oval2 from "../../image/Oval2.svg";
import leaf1 from "../../image/leaf1.svg";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CSSimg from "../../image/CSSimg.svg";

function Csstool() {
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
        {/* image grid section */}
        <Information
          title="Online CSS  Tools For Free"
          description="Looking to spruce up your website's style? Check out 10015.io's online CSS Tools!With a variety of online tools available, you can easily customize your site's look and feel. And best of all, our CSS tools are free to use!"
          buttonText="EXPLORE TOOL"
          buttonText1="LOGIN / REGISTER"
          buttonText2="SIGN IN"
          srcImg={arror}
          srcImg1={CSSimg}
          exploreLinkState={{ scrollTo: 'featured-tools' }}

        />

        <CSStool1 />
      </div>
      <Footer />
    </>
  );
}

export default Csstool;
