import { useEffect, useState } from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaSave,
  FaTimes,
  FaPlusCircle,
} from "react-icons/fa";
import APP_URL from "../../../../APP_URL";
import toast from "react-hot-toast";

const LanguageWordPerCost = () => {
  const [languageCosts, setLanguageCosts] = useState([]);
  const [languages, setLanguages] = useState([]); // New state to hold languages

  // Fetch all language costs when component mounts
  useEffect(() => {
    fetch(`${APP_URL}/api/languagecost/all`)
      .then((res) => res.json())
      .then((data) => setLanguageCosts(data));

    // Fetch all languages for dropdown
    fetch(`${APP_URL}/api/languageManagement/getAllLanguage`)
      .then((res) => res.json())
      .then((data) => setLanguages(data)); // Assuming the API returns a list of language objects
  }, []);

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    languageName: "",
    languageCost: 0,
  });

  const [newLanguageData, setNewLanguageData] = useState({
    languageName: "",
    languageCost: 0,
  });

  const handleEdit = (language) => {
    setEditingId(language._id);
    setEditData({
      languageName: language.languageName.toLowerCase(),
      languageCost: language.languageCost,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({
      languageName: "",
      languageCost: 0,
    });
  };

  const handleSaveEdit = (id) => {
    fetch(`${APP_URL}/api/languagecost/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id, ...editData }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setLanguageCosts((prevData) =>
            prevData.map((lang) =>
              lang._id === id
                ? {
                  ...lang,
                  languageName: editData.languageName,
                  languageCost: editData.languageCost,
                }
                : lang
            )
          );
          toast.success(data?.message);
        } else {
          toast.error("Failed to update language cost");
        }
      });
    setEditingId(null);
  };

  const handleDelete = (id) => {
    fetch(`${APP_URL}/api/languagecost/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          const updatedList = languageCosts.filter((lang) => lang._id !== id);
          setLanguageCosts(updatedList);
          toast.success(data?.message);
        } else {
          toast.error("Failed to delete language cost");
        }
      });
  };

  const handleAddNewLanguageCost = () => {
    fetch(`${APP_URL}/api/languagecost/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLanguageData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Language Cost Added") {
          setLanguageCosts((prevData) => [...prevData, data?._doc]);
          setNewLanguageData({
            languageName: "",
            languageCost: 0,
          });
          toast.success(data.message);
        } else if (data.message === "Language Cost Already Exist") {
          toast.error("Language Cost Already Exist Edit existing one");
        } else {
          toast.error("Failed to add new language cost");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to add new language cost");
      });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">
          Language Costs Management
        </h1>

        {/* Table Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
                <th className="border-b p-4 text-left font-medium">Language</th>
                <th className="border-b p-4 text-left font-medium">
                  Cost (per word) / USD
                </th>
                <th className="border-b p-4 text-center font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {languageCosts.map((language, idx) => (
                <tr
                  key={language?._id}
                  className={`hover:bg-gray-100 ${idx % 2 ? "bg-gray-50" : ""}`}
                >
                  <td className="p-4 uppercase border-b text-gray-800">

                    {language?.languageName}

                  </td>
                  <td className="p-4 border-b text-gray-800">
                    {editingId === language?._id ? (
                      <input
                        type="number"
                        value={editData?.languageCost}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            languageCost: parseFloat(e.target.value),
                          })
                        }
                        className="border rounded px-2 py-1 focus:ring-2 focus:ring-blue-300"
                      />
                    ) : (
                      `$${language?.languageCost}`
                    )}
                  </td>
                  <td className="p-4 border-b text-center flex items-center justify-center">
                    {editingId === language?._id ? (
                      <>
                        <button
                          onClick={() => handleSaveEdit(language._id)}
                          className="bg-green-500 text-white px-4 py-2 btn-sm flex items-center rounded-md shadow hover:bg-green-600 mx-2"
                        >
                          <FaSave className="mr-2" /> Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-gray-500 text-white px-4 py-2 btn-sm flex items-center rounded-md shadow hover:bg-gray-600 mx-2"
                        >
                          <FaTimes className="mr-2" /> Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(language)}
                          className="bg-blue-500 text-white px-4 py-2 btn-sm flex items-center rounded-md shadow hover:bg-blue-600 mx-2"
                        >
                          <FaEdit className="mr-2" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(language._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-md btn-sm flex items-center shadow hover:bg-red-600 mx-2"
                        >
                          <FaTrashAlt className="mr-2" /> Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Language Cost Form */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            Add New Language Cost
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dropdown for Language Selection */}
            <select
              value={newLanguageData.languageName}
              onChange={(e) =>
                setNewLanguageData({
                  ...newLanguageData,
                  languageName: e.target.value,
                })
              }
              className="border rounded w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              <option value="">Select Language</option>
              {languages.map((lang) => (
                <option key={lang._id} value={lang?.englishName}>
                  {lang?.englishName} - {lang?.nativeName}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={newLanguageData.languageCost}
              onChange={(e) =>
                setNewLanguageData({
                  ...newLanguageData,
                  languageCost: parseFloat(e.target.value),
                })
              }
              placeholder="Language Cost (per word)"
              className="border rounded w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
          </div>
          <button
            onClick={handleAddNewLanguageCost}
            className="mt-4 bg-teal-500 text-white px-6 py-2 rounded-md shadow hover:bg-teal-600 inline-flex items-center"
          >
            <FaPlusCircle className="mr-2" /> Add Language Cost
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageWordPerCost;
