import React from 'react';
import { MdOutlineWork, MdAccessTime, MdLanguage } from "react-icons/md";
import { FaMoneyBillWave, FaChevronRight } from "react-icons/fa";

// JobCard component
const JobCard = ({ job }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-5 hover:shadow-xl transition-shadow duration-300 relative">
      <div className="flex items-center mb-3">
        <MdOutlineWork className="text-2xl text-blue-500 mr-2" />
        <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
      </div>
      <p className="text-gray-600 mb-4">{job.description}</p>
      <div className="flex justify-between items-center text-gray-500">
        <div className="flex items-center">
          <MdLanguage className="text-lg text-green-500 mr-1" />
          <span>{job.languagePair}</span>
        </div>
        <div className="flex items-center">
          <MdAccessTime className="text-lg text-yellow-500 mr-1" />
          <span>{job.deadline}</span>
        </div>
        <div className="flex items-center">
          <FaMoneyBillWave className="text-lg text-purple-500 mr-1" />
          <span>${job.budget}</span>
        </div>
      </div>
      <button className="btn btn-primary btn-block mt-5 flex items-center justify-center">
        View Details <FaChevronRight className="ml-2" />
      </button>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-lg"></div>
    </div>
  );
};

// DashboardJobList component
const DashboardJobList = () => {
  // Demo data for jobs
  const jobs = [
    {
      id: 1,
      title: 'English to Spanish Translation',
      description: 'Translate a 5,000-word document from English to Spanish.',
      languagePair: 'English to Spanish',
      deadline: '2024-08-20',
      budget: 500,
    },
    {
      id: 2,
      title: 'French to German Legal Document Translation',
      description: 'Translate a legal document from French to German. Experience in legal translation is required.',
      languagePair: 'French to German',
      deadline: '2024-08-25',
      budget: 800,
    },
    {
      id: 3,
      title: 'Website Localization: English to Japanese',
      description: 'Localize a website from English to Japanese. Experience in SEO translation is preferred.',
      languagePair: 'English to Japanese',
      deadline: '2024-08-30',
      budget: 1200,
    },
  ];

  return (
    <div className="min-h-screen p-6  justify-center">
      <div className="">
        <h2 className="text-3xl font-bold text-gray-600 mb-6 text-center">My Posted Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardJobList;
