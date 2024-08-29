import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const [title, setTittle] = useState("");
  const [description, setDescription] = useState("");
  const [languagePair, setLanguagePair] = useState("");
  const [deadline, setDeadline] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  // adding navigation to the dashboard after job submission
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    //get current user id
    const posterData = localStorage.getItem("chat-user");
    // convert posterData to object
    const posterId = JSON.parse(posterData)._id;
    // adding job to the database
    fetch("/api/job/addJOb", {
      method: "POST",
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
        // console.log(data);
        if (data?._id) {
          // Clear the form after submission

          setTittle("");
          setDescription("");
          setLanguagePair("");
          setDeadline("");
          setBudget("");
          // Redirect to the dashboard
          navigate("/dashboard/jobList");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to add job");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Post a New Job
        </h2>
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
              placeholder="e.g., English , Spanish"
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
              Submit Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
