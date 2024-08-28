import { MdOutlineWork, MdAccessTime, MdLanguage } from "react-icons/md";
import { FaMoneyBillWave, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";

const JobCard = ({ job }) => {

  return (
    <div className="bg-white rounded-lg shadow-lg p-5 hover:shadow-xl transition-shadow duration-300 relative">
      <div className="flex items-center mb-3">
        <MdOutlineWork className="text-2xl text-blue-500 mr-2" />
        <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
      </div>
      <p className="text-gray-600 mb-4">{job.description}</p>
      <div className="flex justify-between items-center text-gray-500">
        <div className="flex items-center">
          <MdLanguage className="text-lg text-green-500 mr-1" />
          <span>{job?.languagePair.map(lg=>lg+" ,")}</span>
        </div>
        <div className="flex items-center">
          <MdAccessTime className="text-lg text-yellow-500 mr-1" />
          <span>{job?.deadline?.split('T')[0]}</span>
        </div>
        <div className="flex items-center">
          <FaMoneyBillWave className="text-lg text-purple-500 mr-1" />
          <span>${job.budget}</span>
        </div>
      </div>
      <button className="btn btn-primary btn-block mt-5 flex items-center justify-center">
        View Details <FaChevronRight className="ml-2" />
      </button>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-lg"></div>
    </div>
  );
};

const JobList = () => {
  // const jobs = [
  //   {
  //     title: "Translate English to Spanish",
  //     description: "Need a translation of a legal document from English to Spanish.",
  //     languagePair: "English - Spanish",
  //     deadline: "2024-09-01",
  //     budget: 200,
  //   },
  //   {
  //     title: "French to German Translation",
  //     description: "Looking for a translator for a technical manual from French to German.",
  //     languagePair: "French - German",
  //     deadline: "2024-08-28",
  //     budget: 350,
  //   },
  //   {
  //     title: "Chinese Website Localization",
  //     description: "Localization of a website from English to Chinese.",
  //     languagePair: "English - Chinese",
  //     deadline: "2024-09-10",
  //     budget: 500,
  //   },
  // ];
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetch(`/api/job/getAllJob`)
      .then((res) => res.json())
      .then((data) => {
        data.reverse();
        setJobs(data.slice(0, 6));
      });
  }, []);

  return (
    <div className="py-14">
      <h2 className="text-3xl font-bold text-blue-500 uppercase mb-8 text-center">
        Posted Jobs
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
