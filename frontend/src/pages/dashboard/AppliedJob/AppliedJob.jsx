import { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaInfoCircle, FaBriefcase } from 'react-icons/fa';
import APP_URL from '../../../../APP_URL';
import { useAuthContext } from '../../../context/AuthContext';

const AppliedJob = () => {
  const { authUser } = useAuthContext();
  const userId = authUser._id;
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch applied jobs when the component mounts
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await fetch(`${APP_URL}/api/job/getAllTakerJob/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch applied jobs');
        }
        const jobsData = await response.json();
        setAppliedJobs(jobsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [userId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading applied jobs...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  if (appliedJobs.length === 0) {
    return (
      <div className="text-center">
        <img
          src="https://img.icons8.com/ios/452/nothing-found.png"
          alt="No applied jobs found"
          className="w-40 h-40 mx-auto"
        />
        <h3 className="text-xl text-red-500 font-bold">No Applied Jobs Found</h3>
      </div>
    );
  }

  return (
    <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        <FaBriefcase className="inline-block mr-2" /> Applied Jobs
      </h2>
      <ul className="space-y-4">
        {appliedJobs.map((job) => (
          <li key={job._id} className="p-4 border border-gray-300 rounded-md hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <FaInfoCircle className="mr-2 text-blue-500" /> {job.title}
            </h3>
            <p className="text-gray-600 mt-2 flex items-center">
              <FaBriefcase className="mr-2 text-green-500" /> {job.description}
            </p>
            <p className="text-sm text-gray-500 mt-2 flex items-center">
              <FaCalendarAlt className="mr-2 text-yellow-500" /> Deadline: {new Date(job.deadline).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500 flex items-center">
              <FaInfoCircle className="mr-2 text-purple-500" /> Status: {job.status}
            </p>
            <div className="flex justify-end mt-4 space-x-4">
              <button className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-150">
                <FaCheckCircle />
                <span>Finished</span>
              </button>
              <button className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-150">
                <FaTimesCircle />
                <span>Cancel</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppliedJob;
