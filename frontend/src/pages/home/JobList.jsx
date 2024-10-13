import { MdOutlineWork, MdAccessTime, MdLanguage } from "react-icons/md";
import {
  FaMoneyBillWave,
  FaChevronRight,
  FaRegCheckCircle,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import APP_URL from "../../../APP_URL";

const JobCard = ({ job }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 relative border border-gray-100 hover:border-blue-500">
      <div className="flex items-center mb-4">
        <MdOutlineWork className="text-3xl text-blue-500 mr-3" />
        <h2 className="text-xl font-bold text-gray-800 truncate">
          {job?.title.length > 40
            ? job?.title?.slice(0, 40) + "..."
            : job?.title}
        </h2>
      </div>
      <p className="text-gray-600 mb-4">
        {job?.description.length > 80
          ? job?.description?.slice(0, 80) + "..."
          : job?.description}
      </p>
      <div className="flex justify-between items-center text-gray-500 mb-3">
        <div className="flex items-center">
          <MdLanguage className="text-xl text-green-500 mr-2" />
          <span>
            {job?.sourceLanguageName} {"=>"} {job?.languageName} - ${job?.languageCost}/word
          </span>
        </div>
        <div className="flex items-center">
          <FaRegCheckCircle className="text-xl text-gray-400 mr-2" />
          <span> {job?.status}</span>
        </div>
      </div>
      <div className="flex justify-between items-center text-gray-500 mb-4">
        <div className="flex items-center">
          <MdAccessTime className="text-xl text-yellow-500 mr-2" />
          <span>{job?.deadline?.split("T")[0]}</span>
        </div>
        <div className="flex items-center">
          <FaMoneyBillWave className="text-xl text-purple-500 mr-2" />
          <span>${job?.budget}</span>
        </div>
      </div>
      <Link
        to={`/jobDetail/${job?._id}`}
        className="btn btn-sm btn-primary w-full flex justify-center items-center py-2 hover:bg-blue-600 transition-all duration-300"
      >
        View Details <FaChevronRight className="ml-2" />
      </Link>
    </div>
  );
};

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(`${APP_URL}/api/job/getAllJob`)
      .then((res) => res.json())
      .then((data) => {
        let newData = data.filter(
          (job) =>
            job?.status?.toLowerCase() === "open" && job?.takerId === null
        );
        setJobs(newData.reverse().slice(0, 6));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="py-16 bg-gray-50">
      <h2 className="text-4xl font-extrabold text-blue-600 text-center uppercase mb-10">
        Recently Posted Jobs
      </h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2  gap-4">
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
