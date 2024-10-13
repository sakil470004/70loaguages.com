import {
  MdOutlineWork,
  MdAccessTime,
  MdLanguage,
  MdDeleteOutline,
  MdPayments,
} from "react-icons/md";
import {
  FaMoneyBillWave,
  FaChevronRight,
  FaRegCheckCircle,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import toast from "react-hot-toast";
import APP_URL from "../../../../APP_URL";

const JobCard = ({ job, handleDelete }) => {
  const handlePayment = (job) => {
    fetch(`${APP_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price: job.budget, ...job, success_url: `${window.location.origin}/dashboard/paymentDetails/${job?.posterId}?success=true&jobId=${job?._id}&amount=${job.budget}`, // Redirect to this URL after payment
        cancel_url: `${window.location.origin}/dashboard/paymentDetails/${job?.posterId}?cancelled=true` // Redirect to this URL after payment


      }), // Convert price to cents
    }).then((res) => {
      if (res.ok) return res.json();
      return res.json().then(({ error }) => Promise.reject(error));
    }).then(({ url }) => {
      window.location = url;
    })
      .catch((error) => {
        console.error("Error:", error);
      });

  }
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
      <div className="flex justify-between">
        <Link
          to={`/jobDetail/${job?._id}`}
          className="btn btn-sm btn-primary  flex justify-center items-center py-2 hover:bg-blue-600 transition-all duration-300"
        >
          View Details <FaChevronRight className="ml-2" />
        </Link>
        {!job?.takerId ? (
          <>
            <Link
              to={`/dashboard/edit/${job?._id}`}
              className="btn btn-sm btn-accent  flex justify-center items-center py-2 hover:bg-yellow-500 transition-all duration-300"
            >
              Edit <BiEdit className="ml-2" />
            </Link>
            <button
              onClick={() => handleDelete(job?._id)}
              className="btn btn-sm btn-error flex justify-center items-center py-2 hover:bg-red-600 transition-all duration-300"
            >
              Delete <MdDeleteOutline className="text-xl" />
            </button>
          </>
        ) : (
          <button
            // to={`/dashboard/payment/${job?._id}`}
            onClick={() => { handlePayment(job) }}
            className="btn btn-sm btn-warning text-white  flex justify-center items-center py-2 hover:bg-yellow-500 transition-all duration-300"
            disabled={job?.paymentStatus === "Paid"}
          >
            {job?.paymentStatus==="Paid"?"Paid":"PAY"} <MdPayments className="ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};

const DashboardJobList = () => {
  const [jobs, setJobs] = useState([]);
  const [acceptedJobs, setAcceptedJobs] = useState([]);
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
    const posterData = localStorage.getItem("chat-user");
    const posterId = JSON.parse(posterData)._id;
    fetch(`${APP_URL}/api/job/getCurrentUserJob/${posterId}`)
      .then((res) => res.json())
      .then((data) => {
        let newData = data.filter(
          (job) =>
            job?.status?.toLowerCase() === "open" && job?.takerId === null
        );
        setJobs(newData.reverse());
        const acceptedJobs = data.filter(
          (job) =>
            job?.status?.toLowerCase() === "open" && job?.takerId !== null
        );
        setAcceptedJobs(acceptedJobs);
      });
  }, []);

  return (
    <div className="py-10 bg-gray-50">
      <h2 className="text-3xl font-extrabold text-blue-600 uppercase mb-8 text-center">
        Your Posted Jobs
      </h2>
      {jobs?.length === 0 ? (
        <div className="text-center">
          <img
            src="https://img.icons8.com/ios/452/nothing-found.png"
            alt="No Posted Jobs Found"
            className="w-40 h-40 mx-auto"
          />
          <h3 className="text-xl text-red-500 font-bold">
            No Posted Jobs Found
          </h3>
        </div>
      ) : (
        <div className="container mx-auto grid grid-cols-1 xl:grid-cols-2 gap-4">
          {jobs?.map((job, index) => (
            <JobCard key={index} job={job} handleDelete={handleDelete} />
          ))}
        </div>
      )}
      {acceptedJobs?.length > 0 && (
        <div className="py-10 bg-gray-50">
          <h2 className="text-3xl font-extrabold text-blue-600 uppercase mb-8 text-center">
            Your Accepted Jobs
          </h2>
          <div className="container mx-auto grid grid-cols-1 xl:grid-cols-2 gap-4">
            {acceptedJobs.map((job, index) => (
              <JobCard key={index} job={job} handleDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardJobList;
