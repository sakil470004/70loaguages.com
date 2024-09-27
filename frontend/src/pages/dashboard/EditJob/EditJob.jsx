import { useEffect, useState } from "react";
import {
  FaGlobe,
  FaCalendarAlt,
  FaDollarSign,
  FaLanguage,
} from "react-icons/fa"; // Icons from react-icons
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import APP_URL from "../../../../APP_URL";

const EditJob = () => {
  const { jobId } = useParams(); // Get the job ID from the route parameters

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sourceLanguageName, setSourceLanguageName] = useState(""); // Read-only source language
  const [selectedLanguage, setSelectedLanguage] = useState(null); // Target language
  const [wordCount, setWordCount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [budget, setBudget] = useState(0); // Auto-calculated budget
  const [complexityLevel, setComplexityLevel] = useState(""); // Complexity level
  const [requiredCertification, setRequiredCertification] = useState(false); // Certification requirement
  const [category, setCategory] = useState(""); // Category
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch job details and populate form fields
    setLoading(true);
    const fetchJobDetails = async () => {
      try {
        const res = await fetch(`${APP_URL}/api/job/getCurrentJob/${jobId}`);
        const data = await res.json();
        setTitle(data.title);
        setDescription(data.description);
        setSourceLanguageName(data?.sourceLanguageName || "english"); // Read-only source language
        setSelectedLanguage({
          languageName: data.languageName,
          languageCost: data.languageCost,
        });
        setWordCount(data.languageWord);
        setComplexityLevel(data?.complexityLevel || "basic"); // Set complexity level
        setRequiredCertification(data?.requiredCertification||false); // Set certification requirement
        setCategory(data?.category|| "General"); // Set category

        // Format the deadline to "yyyy-MM-dd"
        const formattedDeadline = new Date(data.deadline)
          .toISOString()
          .split("T")[0];
        setDeadline(formattedDeadline);

        setBudget(data.budget);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch job details");
      }
    };
    fetchJobDetails();
    setLoading(false);
  }, [jobId]);

  // Automatically calculate the budget based on word count and selected language cost
  useEffect(() => {
    if (selectedLanguage && wordCount) {
      setBudget((selectedLanguage.languageCost * wordCount).toFixed(2));
    }
  }, [selectedLanguage, wordCount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const posterData = localStorage.getItem("chat-user");
    const posterId = JSON.parse(posterData)._id;
    const data = {
      title,
      description,
      sourceLanguageName, // Keep the source language
      languageName: selectedLanguage?.languageName,
      languageCost: selectedLanguage?.languageCost,
      complexityLevel, // Include complexity level
      requiredCertification, // Include certification requirement
      deadline,
      budget,
      category, // Include category
      posterId,
      languageWord: wordCount,
    };
    console.log(data);

    // Update the job details in the database
    fetch(`${APP_URL}/api/job/updateJob/${jobId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.message === "Job Updated") {
          toast.success(data?.message);
          navigate("/dashboard/jobList");
        }
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full  p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            <FaGlobe className="inline mr-2 text-blue-500" /> Edit Job
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Title
              </label>
              <input
                type="text"
                defaultValue={title}
                onChange={(e) => setTitle(e.target.value)}
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
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered w-full mt-1"
                placeholder="Enter job description"
                rows="4"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Source Language
              </label>
              <div>{sourceLanguageName}</div> {/* Read-only source language */}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Target Language{" "}
                <FaLanguage className="inline ml-1 text-xl text-green-500" />
              </label>
              <div>
                {selectedLanguage?.languageName} -- $
                {selectedLanguage?.languageCost}/word
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Word Count
              </label>
              <input
                type="number"
                defaultValue={wordCount}
                onChange={(e) => setWordCount(e.target.value)}
                className="input input-bordered w-full mt-1"
                placeholder="Enter the word count"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Complexity Level
              </label>
              <select
                value={complexityLevel}
                onChange={(e) => setComplexityLevel(e.target.value)}
                className="select select-bordered w-full mt-1"
                required
              >
                <option value="basic">Basic</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Required Certification
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={requiredCertification}
                  onChange={(e) => setRequiredCertification(e.target.checked)}
                  className="checkbox checkbox-primary mr-2"
                />
                <span>Yes, certification is required</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                defaultValue={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input input-bordered w-full mt-1"
                placeholder="Enter category"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Deadline <FaCalendarAlt className="inline ml-1 text-red-500" />
              </label>
              <input
                type="date"
                defaultValue={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="input input-bordered w-full mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Estimated Budget{" "}
                <FaDollarSign className="inline ml-1 text-yellow-500" />
              </label>
              <input
                type="number"
                value={budget}
                className="input input-bordered w-full mt-1"
                readOnly
                placeholder="Budget auto-calculated"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className={`btn btn-primary w-full mt-4 py-3 px-5 ${
                  loading ? "loading loading-dots" : ""
                }`}
                disabled={loading}
              >
                Update Job
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditJob;
