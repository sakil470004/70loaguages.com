import Slider from "../../components/carouselHome/CarouselHome";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import About from "./AboutUs";
import Accordion from "./Accordian";
import JobList from "./JobList";
import WhatOurUserSays from "./WhatOurUserSays";

const Home = () => {
  return (
    <div className="container mx-auto px-2 md:px-0  ">
      <Navbar />
      <Slider />
      <About />
      {/* JOBS */}
      <JobList/>
      <WhatOurUserSays/>
      <Accordion/>
      <Footer/>
    </div>
  );
};
export default Home;
