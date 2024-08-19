import Slider from "../../components/carouselHome/CarouselHome";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import About from "./AboutUs";
import Accordion from "./Accordian";
import PostedJobs from "./PostedJobs";
import WhatOurUserSays from "./WhatOurUserSays";

const Home = () => {
  return (
    <div className="container mx-auto ">
      <Navbar />
      <Slider />
      <About />
      {/* JOBS */}
      <PostedJobs/>
      <WhatOurUserSays/>
      <Accordion/>
      <Footer/>
    </div>
  );
};
export default Home;
