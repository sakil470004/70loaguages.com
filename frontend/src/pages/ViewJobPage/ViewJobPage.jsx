import { MdOutlineWork, MdAccessTime, MdLanguage } from "react-icons/md";
import { FaMoneyBillWave, FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { BsPeople } from "react-icons/bs";
import { SiStatuspage } from "react-icons/si";
import Footer from "../../components/Footer/Footer";
import APP_URL from "../../../APP_URL";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const JobDetails = ({ job }) => {
  const [disabled, setDisabled] = useState(false);
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  // update job here add takerId to job
  const handleAppliedJob = () => {
    if (authUser._id === job.posterId) {
      return;
    }
    const updatedJob = { ...job, takerId: authUser._id };
    fetch(`${APP_URL}/api/job/updateJob/${job._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedJob),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.message === "Job not found") {
          toast.error("Job not found");
          return;
        }
        // send notification to poster
        const newNotification = {
          userId: job.posterId,
          title: `User ${authUser.username} has accept your job `,
          message: `User ${authUser.username} has applied for your job which title is "${job.title}"`,
        };
        fetch(`${APP_URL}/api/notification/create/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newNotification),
        })
          .then((res) => res.json())
          .then((data) => console.log(data)),
          toast.success("Job Applied Successfully");
        navigate(-1);
      });
  };

  useEffect(() => {
    if (job.takerId === authUser._id) {
      // console.log("job taker id", job.takerId, authUser._id);
      setDisabled(true);
    }
    if (job.status === "Closed") {
      setDisabled(true);
    }
    if (job?.takerId) {
      setDisabled(true);
    }
  }, [job, authUser._id]);
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 ">
      <div className="container mx-auto ">
        <Navbar className="bg-inherit" />
        <div className="  p-5 my-5 ">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 mb-6 hover:text-gray-800 transition-colors"
            >
              <FaArrowLeft className="mr-2" /> Back to Jobs
            </button>
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <MdOutlineWork className="text-4xl text-blue-600 mr-3" />
                <h1 className="text-3xl font-extrabold text-gray-800">
                  {job.title}
                </h1>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                {job.description}
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center text-gray-700">
                <MdLanguage className="text-3xl text-green-600 mr-3" />
                <span className="text-xl">
                  {job.languageName} - ${job.languageCost}/word
                </span>
              </div>
              <div className="flex items-center text-gray-700">
                <MdAccessTime className="text-3xl text-yellow-600 mr-3" />
                <span className="text-xl">
                  Deadline: {job?.deadline?.split("T")[0]}
                </span>
              </div>
              <div className="flex items-center text-gray-700">
                <BsPeople className="text-3xl text-yellow-600 mr-3" />
                <span className="text-xl">Poster ID: {job?.posterId}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <SiStatuspage className="text-3xl text-yellow-600 mr-3" />
                <span className="text-xl">Status: {job?.status}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <FaMoneyBillWave className="text-3xl text-purple-600 mr-3" />
                <span className="text-xl">Budget: ${job.budget}</span>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleAppliedJob}
                disabled={disabled}
                className="btn btn-primary btn-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-purple-500 hover:to-blue-500"
              >
                {job?.takerId ? "This Job is Already Accepted" : "Apply"}
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

const ViewJobPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});

  useEffect(() => {
    fetch(`${APP_URL}/api/job/getCurrentJob/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setJob(data);
      });
  }, [id]);

  return <JobDetails job={job} />;
};

export default ViewJobPage;
