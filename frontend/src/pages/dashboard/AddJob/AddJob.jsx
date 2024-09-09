import { useEffect, useState } from "react";
import {
  FaGlobe,
  FaCalendarAlt,
  FaDollarSign,
  FaLanguage,
} from "react-icons/fa"; // Icons from react-icons
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import APP_URL from "../../../../APP_URL";

const AddJob = () => {
  const [languages, setLanguages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [deadline, setDeadline] = useState("");
  const [budget, setBudget] = useState(0); // Auto-calculated budget
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch languages from the database
    fetch(`${APP_URL}/api/languagecost/all`)
      .then((res) => res.json())
      .then((data) => {
        setLanguages(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Automatically calculate the budget based on word count and selected language cost
  useEffect(() => {
    if (selectedLanguage && wordCount) {
      setBudget(selectedLanguage.languageCost * wordCount);
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
      languageName: selectedLanguage?.languageName,
      languageCost: selectedLanguage?.languageCost,
      deadline,
      budget,
      posterId,
      languageWord:wordCount,
    };
    console.log(data)
    fetch(`${APP_URL}/api/job/addJob`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?._id) {
          setTitle("");
          setDescription("");
          setSelectedLanguage(null);
          setWordCount(0);
          setDeadline("");
          toast.success("Job added successfully");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full  p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          <FaGlobe className="inline mr-2 text-blue-500" /> Post a New Job
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              value={title}
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
              Language{" "}
              <FaLanguage className="inline ml-1 text-xl text-green-500" />
            </label>
            <select
              value={selectedLanguage?.languageName || ""}
              onChange={(e) =>
                setSelectedLanguage(
                  languages.find((lang) => lang.languageName === e.target.value)
                )
              }
              className="select select-bordered w-full mt-1"
              required
            >
              <option value="">Select Language</option>
              {languages.map((lang) => (
                <option key={lang._id} value={lang?.languageName}>
                  {lang?.languageName} - ${lang.languageCost}/word
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Word Count
            </label>
            <input
              type="number"
              value={wordCount}
              onChange={(e) => setWordCount(e.target.value)}
              className="input input-bordered w-full mt-1"
              placeholder="Enter the word count"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Deadline <FaCalendarAlt className="inline ml-1 text-red-500" />
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
              Submit Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
