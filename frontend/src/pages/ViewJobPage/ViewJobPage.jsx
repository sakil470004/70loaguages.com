import { MdOutlineWork, MdAccessTime, MdLanguage } from "react-icons/md";
import { FaMoneyBillWave, FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import { BsPeople } from "react-icons/bs";
import { SiStatuspage } from "react-icons/si";
import Footer from "../../components/Footer/Footer";

const JobDetails = ({ job }) => {
 
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col ">
      <div className="container mx-auto">

      <Navbar />
      <div className="my-5">
        <div className="bg-white rounded-lg shadow-lg p-8  w-full">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 mb-6 hover:text-gray-800 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back to Jobs
          </button>
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <MdOutlineWork className="text-3xl text-blue-500 mr-2" />
              <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
            </div>
            <p className="text-gray-600 text-lg">{job.description}</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <MdLanguage className="text-2xl text-green-500 mr-2" />
              <span className="text-lg">Language Pair:  {job?.languagePair?.map((lg, index) =>
              index !== job.languagePair.length - 1 ? lg + ", " : lg
            )}</span>
            
            </div>
            
            <div className="flex items-center text-gray-700">
              <MdAccessTime className="text-2xl text-yellow-500 mr-2" />
              <span className="text-lg">Deadline: {job?.deadline?.split("T")[0]}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <BsPeople className="text-2xl text-yellow-500 mr-2" />
              <span className="text-lg">Poster ID : {job?.posterId}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <SiStatuspage className="text-2xl text-yellow-500 mr-2" />
              <span className="text-lg">Status : {job?.status}</span>
            </div>
            
            <div className="flex items-center text-gray-700">
              <FaMoneyBillWave className="text-2xl text-purple-500 mr-2" />
              <span className="text-lg">Budget: ${job.budget}</span>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button className="btn btn-primary">Apply Now</button>
          </div>
        </div>
      </div>
      <Footer/>
      </div>
    </div>
  );
};

// Example usage with demo job data
const ViewJobPage = () => {
  const { id } = useParams();
  // console.log(id);
  const [job, setJob] = useState({});

  useEffect(() => {
    fetch(`/api/job/getCurrentJob/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setJob(data);
      });
  }, [id]);
// demo job data
  // const job = {
  //   id: 1,
  //   title: "English to Spanish Translation",
  //   description:
  //     "Translate a 5,000-word document from English to Spanish. The document includes technical terms, so experience in technical translation is preferred.",
  //   languagePair: "English to Spanish",
  //   deadline: "2024-08-20",
  //   budget: 500,
  // };

  return <JobDetails job={job} />;
};

export default ViewJobPage;
