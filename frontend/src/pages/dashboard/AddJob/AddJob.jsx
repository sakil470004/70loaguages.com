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
  const [sourceLanguageName, setSourceLanguageName] = useState(""); // Source language as dropdown option
  const [complexityLevel, setComplexityLevel] = useState("basic"); // Complexity level with color
  const [requiredCertification, setRequiredCertification] = useState(false); // Certification requirement
  const [wordCount, setWordCount] = useState(0);
  const [deadline, setDeadline] = useState("");
  const [budget, setBudget] = useState(0); // Auto-calculated budget
  const [category, setCategory] = useState(""); // Text field for category
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
      setBudget((selectedLanguage.languageCost * wordCount).toFixed(2));
    }
  }, [selectedLanguage, wordCount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const posterData = localStorage.getItem("chat-user");
    const posterId = JSON.parse(posterData)._id;

    // Convert sourceLanguageName and selectedLanguage.languageName to lowercase
    const lowercaseSourceLanguage = sourceLanguageName.toLowerCase();
    const lowercaseTargetLanguage = selectedLanguage?.languageName.toLowerCase();

    const data = {
      title,
      description,
      languageName: lowercaseTargetLanguage, // Target language in lowercase
      languageCost: selectedLanguage?.languageCost,
      sourceLanguageName: lowercaseSourceLanguage, // Source language in lowercase
      complexityLevel, // Include complexity level
      requiredCertification, // Include certification requirement
      deadline,
      budget,
      category, // Include category as a string
      posterId,
      languageWord: wordCount,
    };

    console.log(data);

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
          setSourceLanguageName("");
          setComplexityLevel("basic");
          setRequiredCertification(false);
          setWordCount(0);
          setDeadline("");
          setCategory(""); // Reset category
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

  // Get the color for the complexity level dropdown based on the selected value
  const getComplexityColor = () => {
    switch (complexityLevel) {
      case "basic":
        return "bg-green-200 text-green-800";
      case "intermediate":
        return "bg-yellow-200 text-yellow-800";
      case "advanced":
        return "bg-red-200 text-red-800";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full p-8 bg-white rounded-lg shadow-lg">
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
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input input-bordered w-full mt-1"
              placeholder="Enter category"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Source Language
            </label>
            <select
              value={sourceLanguageName}
              onChange={(e) => setSourceLanguageName(e.target.value)}
              className="select select-bordered w-full mt-1"
              required
            >
              <option value="">Select Source Language</option>
              {languages.map((lang) => (
                <option key={lang._id} value={lang.languageName}>
                  {lang.languageName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Target Language <FaLanguage className="inline ml-1 text-xl text-green-500" />
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
              <option value="">Select Target Language</option>
              {languages.map((lang) => (
                <option key={lang._id} value={lang.languageName}>
                  {lang.languageName} - ${lang.languageCost}/word
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Complexity Level
            </label>
            <select
              value={complexityLevel}
              onChange={(e) => setComplexityLevel(e.target.value)}
              className={`select select-bordered w-full mt-1 ${getComplexityColor()}`}
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
              Estimated Budget <FaDollarSign className="inline ml-1 text-yellow-500" />
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
