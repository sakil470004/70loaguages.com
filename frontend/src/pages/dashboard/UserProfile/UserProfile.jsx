import { useState, useEffect } from "react";
import { FaPlusCircle, FaMinusCircle, FaSave } from "react-icons/fa";
import APP_URL from "../../../../APP_URL";
import { useAuthContext } from "../../../context/AuthContext";
import toast from "react-hot-toast";
import cover from "../../../assets/cover.png";

const UserProfile = () => {
  const { authUser } = useAuthContext();
  const userId = authUser._id;
  const proficiencyOptions = [
    { value: "basic", label: "Basic", color: "bg-red-500 text-white" },
    { value: "intermediate", label: "Intermediate", color: "bg-yellow-500 text-white" },
    { value: "advanced", label: "Advanced", color: "bg-green-500 text-white" },
  ];
  const proficiencyColors={
    basic: "bg-red-500 text-white",
    intermediate: "bg-yellow-500 text-white",
    advanced: "bg-green-500 text-white",
  }
  const [userData, setUserData] = useState({
    fullName: "",
    username: "",
    gender: "",
    languages: [],
    languageProficiency: [],
    translationYearOfExperience: 0,
  });

  const [newLanguages, setNewLanguages] = useState([{ language: "", proficiency: "" }]);


  // Fetch user data on component mount
  useEffect(() => {
    fetch(`${APP_URL}/api/users/getUser/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData({
          fullName: data.fullName,
          username: data.username,
          gender: data.gender,
          languages: data.languages,
          languageProficiency: data.languageProficiency,
          translationYearOfExperience: data.translationYearOfExperience,
          profilePic: data.profilePic,
        });

        if (data.languages && data.languageProficiency) {
          const languagesWithProficiency = data.languages.map((lang, index) => ({
            language: lang,
            proficiency: data.languageProficiency[index] || "",
          }));
          setNewLanguages(languagesWithProficiency.length ? languagesWithProficiency : [{ language: "", proficiency: "" }]);
        }
      });
  }, [userId]);

  // Add new language input
  const handleAddLanguageInput = () => {
    setNewLanguages([...newLanguages, { language: "", proficiency: "" }]);
  };

  // Remove a language input
  const handleRemoveLanguageInput = (index) => {
    const updatedLanguages = newLanguages.filter((_, i) => i !== index);
    setNewLanguages(updatedLanguages);
  };

  const handleLanguageChange = (index, field, value) => {
    const updatedLanguages = [...newLanguages];
    updatedLanguages[index][field] = value;
    setNewLanguages(updatedLanguages);
  };

  // Handle profile update, converting proficiency to strings before sending
  const handleUpdate = async () => {
    const updatedLanguages = newLanguages
      .filter((lang) => lang.language !== "") // Remove empty language inputs
      .map((lang) => {
        return { language: lang.language, proficiency: lang.proficiency }; // Convert to object for clarity
      });

    const updatedData = {
      ...userData,
      languages: updatedLanguages.map((lang) => lang.language), // Extract only languages
      languageProficiency: updatedLanguages.map((lang) => lang.proficiency), // Extract only proficiencies
    };


    const response = await fetch(`${APP_URL}/api/users/updateUser/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      toast.success("Profile updated successfully!");
    } else {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="max-w-2xl mx-auto w-full p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Update Profile
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700">Full Name</label>
          <input
            type="text"
            value={userData.fullName}
            onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
            className="mt-2 block w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700">Username</label>
          <input
            type="text"
            value={userData.username}
            disabled
            className="mt-2 block w-full border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700">Gender</label>
          <select
            value={userData.gender}
            onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
            className="mt-2 block w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring focus:ring-blue-200 focus:outline-none"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700">
          Languages and Proficiency
        </label>
        {newLanguages.map((langObj, index) => (
          <div key={index} className="mb-3">
            <div className="flex items-center space-x-3 mb-2">
              <input
                type="text"
                value={langObj.language}
                onChange={(e) => handleLanguageChange(index, "language", e.target.value)}
                placeholder="Enter a language"
                className="flex-grow block w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring focus:ring-blue-200 focus:outline-none"
              />
              <select
                value={langObj.proficiency}
                onChange={(e) => handleLanguageChange(index, "proficiency", e.target.value)}
                className={`flex-grow block w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring focus:ring-blue-200 focus:outline-none ${proficiencyColors[langObj.proficiency]?? proficiencyColors.basic}`}
              >
                {proficiencyOptions.map((option) => (
                  <option key={option?.value} className={`${option?.color}`} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {newLanguages.length > 1 && (
                <button onClick={() => handleRemoveLanguageInput(index)} className="text-red-500 hover:text-red-700">
                  <FaMinusCircle size={22} />
                </button>
              )}
            </div>
          </div>
        ))}
        <button onClick={handleAddLanguageInput} className="mt-3 text-blue-500 hover:text-blue-700 flex items-center">
          <FaPlusCircle size={22} className="mr-2" /> Add another language
        </button>
      </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700">
            Years of Translation Experience
          </label>
          <input
            type="number"
            value={userData.translationYearOfExperience}
            onChange={(e) =>
              setUserData({ ...userData, translationYearOfExperience: e.target.value })
            }
            className="mt-2 block w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="w-full bg-blue-500 text-white font-semibold px-4 py-3 rounded-lg hover:bg-blue-600 flex items-center justify-center transition-all duration-200"
        >
          <FaSave className="mr-2" size={18} /> Save Profile
        </button>
      </div>

      <div>
        <img
          src={userData?.profilePic}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = cover;
          }}
          alt="User Profile"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default UserProfile;
