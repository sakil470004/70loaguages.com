import {  FaBriefcase, FaComments, FaBullhorn, FaUserEdit } from "react-icons/fa";
import { useAuthContext } from "../../../context/AuthContext";

const DashboardHome = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 bg-white p-6 rounded shadow-md">
        <div>
          <h1 className="text-3xl font-bold text-blue-500">Welcome back to 70Languages!</h1>
          <span className="text-gray-600">Your translation gateway</span>
        </div>
        <div className="flex items-center">
          <div className="mr-4 text-right">
            <span className="block text-gray-600 font-semibold uppercase">{authUser?.username}</span>
           
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={authUser?.profilePic} alt="Profile" className="object-cover w-full h-full" />
          </div>
        </div>
      </div>

      {/* Job Postings and Responses Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Your Job Postings</h3>
            <FaBriefcase className="text-blue-500 text-3xl" />
          </div>
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
            View All
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Job Responses</h3>
            <FaComments className="text-green-500 text-3xl" />
          </div>
          <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors">
            View Responses
          </button>
        </div>
      </div>

      {/* Advertise Yourself */}
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Advertise Yourself</h3>
          <FaBullhorn className="text-orange-500 text-3xl" />
        </div>
        <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors">
          Create Ad
        </button>
      </div>

      {/* Profile and Settings */}
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Your Profile</h3>
          <FaUserEdit className="text-purple-500 text-3xl" />
        </div>
        <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default DashboardHome;
