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
  const proficiencyColors = {
    basic: "bg-red-500 text-white",
    intermediate: "bg-yellow-500 text-white",
    advanced: "bg-green-500 text-white",
  };

  const [userData, setUserData] = useState({
    fullName: "",
    username: "",
    gender: "",
    languages: [],
    languageProficiency: [],
    translationYearOfExperience: 0,
    availability: true,
    certification: [],
  });

  const [newLanguages, setNewLanguages] = useState([{ language: "", proficiency: "" }]);
  const [newCertificates, setNewCertificates] = useState([{ title: "", year: "" }]);

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
          availability: data.availability,
          certification: data.certification || [], // Initialize certification
        });

        if (data.languages && data.languageProficiency) {
          const languagesWithProficiency = data.languages.map((lang, index) => ({
            language: lang,
            proficiency: data.languageProficiency[index] || "",
          }));
          setNewLanguages(languagesWithProficiency.length ? languagesWithProficiency : [{ language: "", proficiency: "" }]);
        }
        console.log(data);
        // Set certificate data
        if (data.certification) {
          setNewCertificates(data.certification.length ? data.certification : [{ title: "", year: "" }]);
        }
      });
  }, [userId]);

  const handleAddLanguageInput = () => {
    setNewLanguages([...newLanguages, { language: "", proficiency: "" }]);
  };

  const handleRemoveLanguageInput = (index) => {
    const updatedLanguages = newLanguages.filter((_, i) => i !== index);
    setNewLanguages(updatedLanguages);
  };

  const handleLanguageChange = (index, field, value) => {
    const updatedLanguages = [...newLanguages];
    updatedLanguages[index][field] = value;
    setNewLanguages(updatedLanguages);
  };

  const handleAddCertificate = () => {
    setNewCertificates([...newCertificates, { title: "", year: "" }]);
  };

  const handleRemoveCertificate = (index) => {
    const updatedCertificates = newCertificates.filter((_, i) => i !== index);
    setNewCertificates(updatedCertificates);
  };

  const handleCertificateChange = (index, field, value) => {
    const updatedCertificates = [...newCertificates];
    updatedCertificates[index][field] = value;
    setNewCertificates(updatedCertificates);
  };

  const handleUpdate = async () => {
    const updatedLanguages = newLanguages
      .filter((lang) => lang.language !== "") // Remove empty language inputs
      .map((lang) => ({ language: lang.language, proficiency: lang.proficiency }));

    const updatedCertificates = newCertificates.filter((cert) => cert.title !== "" && cert.year !== ""); // Remove empty certificates

    const updatedData = {
      ...userData,
      languages: updatedLanguages.map((lang) => lang.language),
      languageProficiency: updatedLanguages.map((lang) => lang.proficiency),
      certification: updatedCertificates, // Update certificates
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
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Update Profile</h2>

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
          <label className="block text-sm font-semibold text-gray-700">Languages and Proficiency</label>
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
                  className={`flex-grow block w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring focus:ring-blue-200 focus:outline-none ${proficiencyColors[langObj.proficiency] ?? proficiencyColors.basic}`}
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

        {/* Certificates Section */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700">Certificates</label>
          {newCertificates.map((cert, index) => (
            <div key={index} className="mb-3">
              <div className="grid grid-cols-4 items-center space-x-3 mb-2">
                <input
                  type="text"
                  value={cert.title}
                  onChange={(e) => handleCertificateChange(index, "title", e.target.value)}
                  placeholder="Certificate Title"
                  className="col-span-3 block w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring focus:ring-blue-200 focus:outline-none"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={cert.year}
                    onChange={(e) => handleCertificateChange(index, "year", e.target.value)}
                    placeholder="Year"
                    className="flex-grow block w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring focus:ring-blue-200 focus:outline-none"
                  />
                  {newCertificates.length > 1 && (
                    <button onClick={() => handleRemoveCertificate(index)} className="text-red-500 hover:text-red-700">
                      <FaMinusCircle size={22} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          <button onClick={handleAddCertificate} className="mt-3 text-blue-500 hover:text-blue-700 flex items-center">
            <FaPlusCircle size={22} className="mr-2" /> Add another certificate
          </button>
        </div>
        {/* availability : it updated before data even come that's way we need to do condition that if there is username then we input availability*/}
        {userData?.username && <div className="my-2 flex gap-4">
          <label htmlFor="profileavailability" className="select-none font-bold text-xl cursor-pointer" >Availability
          </label>
          <input id="profileavailability" type="checkbox" className="toggle toggle-success" defaultChecked={userData?.availability} onChange={(e) => {
            setUserData({ ...userData, availability: e.target.checked })
          }} />
        </div>}
        {/* Update Button */}
        <button
          onClick={handleUpdate}
          className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-200 focus:outline-none transition ease-in-out duration-200"
        >
          Update Profile
        </button>
      </div>

      <div className="max-w-2xl mx-auto w-full p-8 bg-white shadow-lg rounded-lg">
        <img src={userData.profilePic || cover} alt="Profile Cover" className="rounded-lg w-full" />
        <h3 className="text-xl mt-4 text-center font-semibold">{userData.fullName}</h3>
      </div>
    </div>
  );
};

export default UserProfile;
