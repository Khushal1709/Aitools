import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./components/Contact";
import Getfeatured from "./components/Getfeatured";
import Submit from "./components/Submit";
import Productfinder from "./components/Productfinder";
import Productfinder1 from "./components/Productfinder1";
import Login from "./components/Login";
import Signup from "./components/Signup"
import Caseconveter from "./components/Text tools/Caseconveter";
import LoremIpsumGenerator from "./components/Text tools/LoremIpsum";
import Layout from "./components/Layout";
import CaseConverter from "./components/Text tools/Caseconveter";
import LetterCounter from "./components/Text tools/LetterCounter";
import Handwriting from "./components/Text tools/Handwriting";
import BionicReading from "./components/Text tools/BionicReading";
import Whitespace from "./components/Text tools/Whitespace";
import Googlefont from "./components/Text tools/Googlefont";
import Randomizer from "./components/Miscellaneous Tools/Randomizer";
import QRcode from "./components/Miscellaneous Tools/QRcode";
import StrongRandom from "./components/Miscellaneous Tools/StrongRandom";
import Barcode from "./components/Miscellaneous Tools/Barcode";
import AIColor from "./components/Colour Tool/AIColor";
import HEX from "./components/Colour Tool/HEX";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RGBA from "./components/Colour Tool/RGBA";
import ColorMixer from "./components/Colour Tool/ColorMixer";
import Resizer from "./components/Image Tool/Resizer";
import Svgpng from "./components/Image Tool/Svgpng";
import ColorShades from "./components/Colour Tool/ColorShades";
import CodetoImage from "./components/Coding Tool/CodetoImage";
import Slug from "./components/Coding Tool/Slug";
import Shadow from "./components/Coding Tool/Shadow";
import BaseEncoderDecoder from "./components/Coding Tool/BaseEncoderDecoder";
import HTMLEncoderDecoder from "./components/Coding Tool/HTMLEncoderDecoder";
import URLEncoderDcoder from "./components/Coding Tool/URLEncoderDcoder";
import HTMLMinifier from "./components/Coding Tool/HTMLMinifier";
import CSSMinifier from "./components/Coding Tool/CSSMinifier";
import JavaScriptMinifier from "./components/Coding Tool/JavaScriptMinifier";
import Hf from "./components/Coding Tool/Hf";
import Cs from "./components/Coding Tool/Cs";
import Javaf from "./components/Coding Tool/Javaf";
import MD5 from "./components/Coding Tool/MD5";
import SHA1 from "./components/Coding Tool/SHA1";
import InstagramFilters from "./components/Social Media Tools/InstagramFilters";
import InstagramPostGenerator from "./components/Social Media Tools/InstagramPostGenerator";
import TweetGenerator from "./components/Social Media Tools/TweetGenerator";
import Photocensor from "./components/Image Tool/Photocensor";
import ImageCropper from "./components/Image Tool/ImageCropper";
import AverageColor from "./components/Image Tool/AverageColor";
import ImageColorPicker from "./components/Image Tool/ImageColorPicker";
import SVGpattern from "./components/Image Tool/SVGpattern";
import BlobGenerator from "./components/Image Tool/BlobGenerator";
import Opengraphmetagenerator from "./components/Social Media Tools/Opengraphmetagenerator";
import Vimeothumbnailgrabber from "./components/Social Media Tools/Vimeothumbnailgrabber";
import Youtubethumbnailgrabber from "./components/Social Media Tools/Youtubethumbnailgrabber";
import Twitteradrevenuegenerator from "./components/Social Media Tools/Twitteradrevenuegenerator";
import Cssclippathgenerator from "./components/CSS Tool/Cssclippathgenerator";
import Cssloader from "./components/CSS Tool/Cssloader";
import CSSbackgroundpattern from "./components/CSS Tool/CSSbackgroundpattern";
import Csscubic from "./components/CSS Tool/Csscubic";
import Cssglassmorphism from "./components/CSS Tool/Cssglassmorphism";
import Csstextglitch from "./components/CSS Tool/Csstextglitch";
import Cssgradientgenerator from "./components/CSS Tool/Cssgradientgenerator";
import CSStrianglegenerator from "./components/CSS Tool/CSStrianglegenerator";
import Cssboxshadowgenerator from "./components/CSS Tool/Cssboxshadowgenerator";
import Borderradiusgenerator from "./components/CSS Tool/Borderradiusgenerator";
import ImageColorExtractor from "./components/Image Tool/ImageColorExtractor";
import { FavoritesProvider } from "./Context/FavoriteContext";
import About from "./components/About";
import Home from "./components/Home";
import Texttool from "./Pages/Text tool Grid/Texttool";
import Imagetool from "./Pages/Image tool Grid/Imagetool";
import CSStool from "./Pages/CSS tool Grid/CSStool";
import Codingtool from "./Pages/Coding tool Grid/Codingtool";
import Colortool from "./Pages/Color tool Grid/Colortool";
import Socialmediatool from "./Pages/Socialmedia tool Grid/Socialmediatool";
import Miscellaneoustool from "./Pages/Miscellaneous tool Grid/Miscellaneoustool";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <FavoritesProvider>
        <Router>
          <Routes>
            {/* Home route WITHOUT layout */}
            <Route path="/" element={<Home />} />

            {/* All other routes WITH sidebar/footer layout */}
            <Route element={<Layout />}>
              <Route path="/lorem" element={<LoremIpsumGenerator />} />
              <Route path="/caseconverter" element={<CaseConverter />} />
              <Route path="/letter" element={<LetterCounter />} />
              <Route path="/Text" element={<Handwriting />} />
              <Route path="/BionicReading" element={<BionicReading />} />
              <Route path="/Whitespace" element={<Whitespace />} />
              <Route path="/Googlefont" element={<Googlefont />} />
              <Route path="/Randomizer" element={<Randomizer />} />
              <Route path="/QRcode" element={<QRcode />} />
              <Route path="/StrongRandom" element={<StrongRandom />} />
              <Route path="/Barcode" element={<Barcode />} />
              <Route path="/AIColor" element={<AIColor />} />
              <Route path="/HEX" element={<HEX />} />
              <Route path="/RGBA" element={<RGBA />} />
              <Route path="/ColorMixer" element={<ColorMixer />} />
              <Route path="/Resizer" element={<Resizer />} />
              <Route path="/Svgpng" element={<Svgpng />} />
              <Route path="/ColorShades" element={<ColorShades />} />
              <Route path="/CodetoImage" element={<CodetoImage />} />
              <Route path="/Slug" element={<Slug />} />
              <Route path="/Shadow" element={<Shadow />} />
              <Route path="/BaseEncoderDecoder" element={<BaseEncoderDecoder />} />
              <Route path="/HTMLEncoderDecoder" element={<HTMLEncoderDecoder />} />
              <Route path="/URLEncoderDcoder" element={<URLEncoderDcoder />} />
              <Route path="/HTMLMinifier" element={<HTMLMinifier />} />
              <Route path="/CSSMinifier" element={<CSSMinifier />} />
              <Route path="/JavaScriptMinifier" element={<JavaScriptMinifier />} />
              <Route path="/Hf" element={<Hf />} />
              <Route path="/Cs" element={<Cs />} />
              <Route path="/Javaf" element={<Javaf />} />
              <Route path="/MD5" element={<MD5 />} />
              <Route path="/SHA1" element={<SHA1 />} />
              <Route path="/InstagramFilters" element={<InstagramFilters />} />
              <Route path="/InstagramPostGenerator" element={<InstagramPostGenerator />} />
              <Route path="/TweetGenerator" element={<TweetGenerator />} />
              <Route path="/Photocensor" element={<Photocensor />} />
              <Route path="/ImageCropper" element={<ImageCropper />} />
              <Route path="/AverageColor" element={<AverageColor />} />
              <Route path="/ImageColorPicker" element={<ImageColorPicker />} />
              <Route path="/SVGpattern" element={<SVGpattern />} />
              <Route path="/BlobGenerator" element={<BlobGenerator />} />
              <Route path="/Opengraphmetagenerator" element={<Opengraphmetagenerator />} />
              <Route path="/Vimeothumbnailgrabber" element={<Vimeothumbnailgrabber />} />
              <Route path="/Youtubethumbnailgrabber" element={<Youtubethumbnailgrabber />} />
              <Route path="/Twitteradrevenuegenerator" element={<Twitteradrevenuegenerator />} />
              <Route path="/Cssclippathgenerator" element={<Cssclippathgenerator />} />
              <Route path="/Cssloader" element={<Cssloader />} />
              <Route path="/CSSbackgroundpattern" element={<CSSbackgroundpattern />} />
              <Route path="/Csscubic" element={<Csscubic />} />
              <Route path="/Cssglassmorphism" element={<Cssglassmorphism />} />
              <Route path="/Csstextglitch" element={<Csstextglitch />} />
              <Route path="/Cssgradientgenerator" element={<Cssgradientgenerator />} />
              <Route path="/CSStrianglegenerator" element={<CSStrianglegenerator />} />
              <Route path="/Cssboxshadowgenerator" element={<Cssboxshadowgenerator />} />
              <Route path="/Borderradiusgenerator" element={<Borderradiusgenerator />} />
              <Route path="/ImageColorExtractor" element={<ImageColorExtractor />} />
            </Route>
            <Route path="/Getfeatured" element={<Getfeatured />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Submit" element={<Submit />} />
            <Route path="/Productfinder" element={<Productfinder />} />
            <Route path="/Productfinder1" element={<Productfinder1 />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/About" element={<About />} />
            <Route path="/Texttool" element={<Texttool />} />
            <Route path="/Imagetool" element={<Imagetool />} />
            <Route path="/CSStool" element={<CSStool />} />
            <Route path="/Codingtool" element={<Codingtool />} />
            <Route path="/Colortool" element={<Colortool />} />
            <Route path="/Socialmediatool" element={<Socialmediatool />} />
            <Route path="/Miscellaneoustool" element={<Miscellaneoustool />} />
          </Routes>
        </Router>

      </FavoritesProvider>
    </>
  )
}
export default App;



