import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditJob = () => {
  const { jobId } = useParams(); // Get the job ID from the route parameters
  const [title, setTittle] = useState("");
  const [description, setDescription] = useState("");
  const [languagePair, setLanguagePair] = useState("");
  const [deadline, setDeadline] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the existing job details and populate the form fields
    const fetchJobDetails = async () => {
      try {
        const res = await fetch(`/api/job/getCurrentJob/${jobId}`);
        const data = await res.json();
        setTittle(data.title);
        setDescription(data.description);
        setLanguagePair(data.languagePair.join(", "));

        // Format the deadline to "yyyy-MM-dd"
        const formattedDeadline = new Date(data.deadline).toISOString().split("T")[0];
        setDeadline(formattedDeadline);

        setBudget(data.budget);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch job details");
      }
    };
    fetchJobDetails();
  }, [jobId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    //get current user id
    const posterData = localStorage.getItem("chat-user");
    const posterId = JSON.parse(posterData)._id;

    // Update the job details in the database
    fetch(`/api/job/updateJob/${jobId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        languagePair: languagePair.split(",").map((lang) => lang.trim()),
        deadline,
        budget,
        posterId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.message==="Job Updated") {
          toast.success(data?.message);
          navigate("/dashboard/jobList");
        }
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to update job");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Job</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTittle(e.target.value)}
              className="input input-bordered w-full mt-1"
              placeholder="Enter the job title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full mt-1"
              placeholder="Enter job description"
              rows="4"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Language Pair
            </label>
            <input
              type="text"
              value={languagePair}
              onChange={(e) => setLanguagePair(e.target.value)}
              className="input input-bordered w-full mt-1"
              placeholder="e.g., English, Spanish"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Deadline
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="input input-bordered w-full mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Budget ($)
            </label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="input input-bordered w-full mt-1"
              placeholder="Enter your budget"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className={`btn btn-primary w-full mt-4 py-3 px-5 ${loading ? "loading loading-dots" : ""}`}
              disabled={loading}
            >
              Update Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
