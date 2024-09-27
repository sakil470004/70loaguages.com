import { useEffect, useState } from "react";
import {
    FaEdit,
    FaTrashAlt,
    FaSave,
    FaTimes,
    FaPlusCircle,
} from "react-icons/fa";
import APP_URL from "../../../../APP_URL"; // Assuming this is where the base URL is stored
import toast from "react-hot-toast";

const LanguageManagement = () => {
    const [languages, setLanguages] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({
        languageCode: "",
        englishName: "",
        nativeName: "",
        writingSystem: "",
        countryCodes: [],
    });

    const [newLanguageData, setNewLanguageData] = useState({
        languageCode: "",
        englishName: "",
        nativeName: "",
        writingSystem: "",
        countryCodes: [],
    });

    // Fetch all languages when component mounts
    useEffect(() => {
        fetch(`${APP_URL}/api/languageManagement/getAllLanguage`)
            .then((res) => res.json())
            .then((data) => setLanguages(data))
            .catch((error) => toast.error("Failed to fetch languages", error));
    }, []);

    // Handle editing a language
    const handleEdit = (language) => {
        setEditingId(language._id);
        setEditData({
            languageCode: language?.languageCode,
            englishName: language?.englishName,
            nativeName: language?.nativeName,
            writingSystem: language?.writingSystem,
            countryCodes: language?.countryCodes.join(", "), // Convert array to string for editing
        });
    };

    // Handle canceling the edit
    const handleCancelEdit = () => {
        setEditingId(null);
        setEditData({
            languageCode: "",
            englishName: "",
            nativeName: "",
            writingSystem: "",
            countryCodes: [],
        });
    };

    // Handle saving edited language
    const handleSaveEdit = (id) => {
        fetch(`${APP_URL}/api/languageManagement/updateLanguage/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("chat-user"))?.jwt}`,
            },
            body: JSON.stringify({
                ...editData,
                countryCodes: editData.countryCodes.split(",").map((code) => code.trim()), // Convert string back to array
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setLanguages((prevData) =>
                        prevData.map((lang) =>
                            lang._id === id
                                ? {
                                    ...lang,
                                    ...editData,
                                    countryCodes: editData.countryCodes.split(",").map((code) => code.trim()),
                                }
                                : lang
                        )
                    );
                    toast.success("Language updated successfully");
                } else {
                    toast.error("Failed to update language");
                }
            });
        setEditingId(null);
    };

    // Handle deleting a language
    const handleDelete = (id) => {
        fetch(`${APP_URL}/api/languageManagement/deleteLanguage/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("chat-user"))?.jwt}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setLanguages((prevData) => prevData.filter((lang) => lang._id !== id));
                    toast.success("Language deleted successfully");
                } else {
                    toast.error("Failed to delete language");
                }
            });
    };

    // Handle adding a new language
    const handleAddNewLanguage = () => {
        fetch(`${APP_URL}/api/languageManagement/addLanguage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("chat-user"))?.jwt}`,
            },
            body: JSON.stringify({
                ...newLanguageData,
                countryCodes: newLanguageData.countryCodes.split(",").map((code) => code.trim()),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setLanguages((prevData) => [...prevData, data]);
                    setNewLanguageData({
                        languageCode: "",
                        englishName: "",
                        nativeName: "",
                        writingSystem: "",
                        countryCodes: [],
                    });
                    toast.success("New language added successfully");
                } else {
                    toast.error("Failed to add new language");
                }
            });
    };

    return (
        <div className="min-h-screen p-6 ">
            <div className="container mx-auto ">
                <h1 className="text-4xl  font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">
                    Language Management
                </h1>

                {/* Table Section */}
                <div className="bg-white  max-h-[450px] overflow-auto  shadow-lg rounded-lg p-6 mb-8">
                    <table className="w-full sm:table-auto lg:table-fixed  border-collapse ">
                        <thead className="">
                            <tr className=" w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white">
                                <th className="border-b p-4 text-left font-medium">Language Code</th>
                                <th className="border-b p-4 text-left font-medium">English & Native Name</th>

                                <th className="border-b p-4 text-left font-medium">Writing System</th>
                                <th className="border-b p-4 text-left font-medium">Country Codes</th>
                                <th className="border-b p-4 text-center font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody >
                            {languages.map((language, idx) => (
                                <tr key={language?._id} className={`hover:bg-gray-100 ${idx % 2 ? "bg-gray-50" : ""}`}>
                                    <td className="p-4 border-b text-gray-800">
                                        {editingId === language?._id ? (
                                            <input
                                                type="text"
                                                value={editData?.languageCode}
                                                onChange={(e) =>
                                                    setEditData({
                                                        ...editData,
                                                        languageCode: e.target.value,
                                                    })
                                                }
                                                className="border rounded px-2 py-1 focus:ring-2 focus:ring-blue-300"
                                            />
                                        ) : (
                                            language?.languageCode
                                        )}
                                    </td>
                                    <td className="p-4 border-b text-gray-800">
                                        <p>

                                            {editingId === language?._id ? (
                                                <input
                                                    type="text"
                                                    value={editData?.englishName}
                                                    onChange={(e) =>
                                                        setEditData({
                                                            ...editData,
                                                            englishName: e.target.value,
                                                        })
                                                    }
                                                    className="border rounded px-2 py-1 focus:ring-2 focus:ring-blue-300"
                                                />
                                            ) : (
                                                language.englishName
                                            )}
                                        </p>
                                        <p>
                                            {editingId === language?._id ? (
                                                <input
                                                    type="text"
                                                    value={editData?.nativeName}
                                                    onChange={(e) =>
                                                        setEditData({
                                                            ...editData,
                                                            nativeName: e.target.value,
                                                        })
                                                    }
                                                    className="border rounded px-2 py-1 focus:ring-2 focus:ring-blue-300"
                                                />
                                            ) : (
                                                language?.nativeName
                                            )}
                                        </p>
                                    </td>

                                    <td className="p-4 border-b text-gray-800">
                                        {editingId === language?._id ? (
                                            <input
                                                type="text"
                                                value={editData?.writingSystem}
                                                onChange={(e) =>
                                                    setEditData({
                                                        ...editData,
                                                        writingSystem: e.target.value,
                                                    })
                                                }
                                                className="border rounded px-2 py-1 focus:ring-2 focus:ring-blue-300"
                                            />
                                        ) : (
                                            language.writingSystem
                                        )}
                                    </td>
                                    <td className="p-4 border-b text-gray-800">
                                        {editingId === language?._id ? (
                                            <input
                                                type="text"
                                                value={editData?.countryCodes}
                                                onChange={(e) =>
                                                    setEditData({
                                                        ...editData,
                                                        countryCodes: e.target.value,
                                                    })
                                                }
                                                className="border rounded px-2 py-1 focus:ring-2 focus:ring-blue-300"
                                            />
                                        ) : (
                                            language?.countryCodes.join(", ")
                                        )}
                                    </td>
                                    <td className="p-4 border-b text-center flex justify-center items-center">
                                        {editingId === language?._id ? (
                                            <>
                                                <button
                                                    onClick={() => handleSaveEdit(language?._id)}
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
                                                    onClick={() => handleDelete(language?._id)}
                                                    className="bg-red-500 text-white px-4 py-2 btn-sm flex items-center rounded-md shadow hover:bg-red-600 mx-2"
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

                {/* Add New Language Section */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-6">Add New Language</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Language Code"
                            value={newLanguageData?.languageCode}
                            onChange={(e) =>
                                setNewLanguageData({
                                    ...newLanguageData,
                                    languageCode: e.target.value,
                                })
                            }
                            className="border rounded px-2 py-2 focus:ring-2 focus:ring-blue-300"
                        />
                        <input
                            type="text"
                            placeholder="English Name"
                            value={newLanguageData.englishName}
                            onChange={(e) =>
                                setNewLanguageData({
                                    ...newLanguageData,
                                    englishName: e.target.value,
                                })
                            }
                            className="border rounded px-2 py-2 focus:ring-2 focus:ring-blue-300"
                        />
                        <input
                            type="text"
                            placeholder="Native Name"
                            value={newLanguageData.nativeName}
                            onChange={(e) =>
                                setNewLanguageData({
                                    ...newLanguageData,
                                    nativeName: e.target.value,
                                })
                            }
                            className="border rounded px-2 py-2 focus:ring-2 focus:ring-blue-300"
                        />
                        <input
                            type="text"
                            placeholder="Writing System"
                            value={newLanguageData?.writingSystem}
                            onChange={(e) =>
                                setNewLanguageData({
                                    ...newLanguageData,
                                    writingSystem: e.target.value,
                                })
                            }
                            className="border rounded px-2 py-2 focus:ring-2 focus:ring-blue-300"
                        />
                        <input
                            type="text"
                            placeholder="Country Codes (comma-separated)"
                            value={newLanguageData?.countryCodes}
                            onChange={(e) =>
                                setNewLanguageData({
                                    ...newLanguageData,
                                    countryCodes: e.target.value,
                                })
                            }
                            className="border rounded px-2 py-2 focus:ring-2 focus:ring-blue-300"
                        />
                    </div>
                    <button
                        onClick={handleAddNewLanguage}
                        className="bg-green-500 text-white px-4 py-2 mt-4 flex items-center rounded-md shadow hover:bg-green-600"
                    >
                        <FaPlusCircle className="mr-2" /> Add Language
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LanguageManagement;
