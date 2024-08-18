import { Link } from "react-router-dom";
import img1 from "../../assets/about-1.jpg";
import img2 from "../../assets/about-2.jpg";
import img3 from "../../assets/about-3.jpg";
import img4 from "../../assets/about-4.jpg";

const About = () => {
  const images = [img1, img2, img3, img4];
  return (
    <div className="container mx-auto pt-28 pb-14">
      <div className="grid md:grid-cols-2 gap-5 items-center ">
        <div className="grid grid-cols-2 gap-2 rounded overflow-hidden">
          {images.map((img, index) => (
            <div className=" " key={index}>
              <img
                src={img}
                className="w-full h-full object-cover max-h-[240px] object-top"
                alt="about"
              />
            </div>
          ))}
        </div>
        <div className=" ">
          <h1 className="text-3xl font-bold mb-4">
            We Help To Get The Best Job And Find A Talent
          </h1>
          <p className="mb-4 text-base-content">
            We provide high-quality translation services across multiple
            languages, ensuring accurate and culturally relevant translations
            for all your content needs.
          </p>
          <ul className="list-decimal list-inside font-bold space-y-2 my-2">
            <li>
              Quality Assurance:{" "}
              <span className="font-normal">
                Our platform offers a robust review and rating system, allowing
                clients to choose top-rated translators and providing feedback
                to maintain high-quality standards.
              </span>
            </li>
            <li>
              Qualified and Vetted Translators:{" "}
              <span className="font-normal">
                Our platform connects you with experienced and certified
                translators, carefully vetted to ensure they meet the highest
                standards of professionalism and expertise.
              </span>
            </li>
            <li>
              Customizable Job Postings:{" "}
              <span className="font-normal">
                Clients can easily create and customize translation job
                postings, specifying language pairs, deadlines, and other
                specific requirements to match their unique needs.
              </span>
            </li>
          </ul>
          <div className="mt-4">
            <button className="btn  btn-outline btn-primary  lg:block">
              <Link to={"/ourworkdetails"}>Read More</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
