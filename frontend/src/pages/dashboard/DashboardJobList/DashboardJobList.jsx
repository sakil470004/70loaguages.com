import {
  MdOutlineWork,
  MdAccessTime,
  MdLanguage,
  MdDeleteOutline,
} from "react-icons/md";
import { FaMoneyBillWave, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import toast from "react-hot-toast";
import APP_URL from "../../../../APP_URL";

const JobCard = ({ job, handleDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-5 hover:shadow-xl transition-shadow duration-300 relative">
      <div className="flex items-center mb-3">
        <MdOutlineWork className="text-2xl text-blue-500 mr-2" />
        <h2 className="text-xl font-bold text-gray-800">
          {job?.title.length > 40
            ? job?.title?.slice(0, 40) + "..."
            : job?.title}
        </h2>
      </div>
      <p className="text-gray-600 mb-4">
        {job?.description.length > 60
          ? job?.description?.slice(0, 60) + "..."
          : job?.description}
      </p>
      <div className="flex justify-between items-center text-gray-500">
        <div className="flex items-center">
          <MdLanguage className="text-lg text-green-500 mr-1" />
          <span>
            {job?.languagePair.map((lg, index) =>
              index !== job.languagePair.length - 1 ? lg + ", " : lg
            )}
          </span>
        </div>
        <div className="flex items-center">
          <MdAccessTime className="text-lg text-yellow-500 mr-1" />
          <span>{job?.deadline?.split("T")[0]}</span>
        </div>
        <div className="flex items-center">
          <FaMoneyBillWave className="text-lg text-purple-500 mr-1" />
          <span>${job?.budget}</span>
        </div>
      </div>
      <div className="mt-5 flex justify-between">
        <Link
          to={`/jobDetail/${job?._id}`}
          className="btn btn-sm cursor-pointer btn-primary  flex items-center justify-center"
        >
          View Details <FaChevronRight className="ml-2" />
        </Link>
        <Link
          to={`/dashboard/edit/${job?._id}`}
          className="btn btn-sm cursor-pointer btn-accent   flex items-center justify-center"
        >
          Edit <BiEdit className="ml-2" />
        </Link>
        <button
          onClick={() => {
            handleDelete(job._id);
          }}
          className="btn cursor-pointer btn-sm btn-error btn-outline   flex items-center justify-center"
        >
          <MdDeleteOutline className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

const DashboardJobList = () => {
  // demo data for jobs
  // const jobs = [
  //   {
  //     title: "Translate English to Spanish",
  //     description: "Need a translation of a legal document from English to Spanish.",
  //     languagePair: "English - Spanish",
  //     deadline: "2024-09-01",
  //     budget: 200,
  //   },
  //
  // ];

  const [jobs, setJobs] = useState([]);

  const handleDelete = (id) => {
    const isConfirmed = confirm("Are you sure you want to delete this job?");
    if (isConfirmed) {
      fetch(`${APP_URL}/api/job/delete/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Job Deleted") {
            const newJobs = jobs.filter((job) => job._id !== id);
            setJobs(newJobs);
            toast.success("Job Deleted Successfully");
          } else {
            toast.error(data?.message);
          }
        });
    }
  };
  useEffect(() => {
    //get current user id
    const posterData = localStorage.getItem("chat-user");
    // convert posterData to object
    const posterId = JSON.parse(posterData)._id;
    fetch(`${APP_URL}/api/job/getCurrentUserJob/${posterId}`)
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold text-gray-500 uppercase mb-8 text-center">
        Posted Jobs
      </h2>
      {jobs?.length === 0 ? (
        "No Posted Job Found"
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {jobs?.map((job, index) => (
            <JobCard key={index} job={job} handleDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardJobList;
