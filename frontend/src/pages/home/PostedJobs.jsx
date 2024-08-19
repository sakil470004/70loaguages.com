import React from 'react';

const PostedJobs = () => {
  const jobs = [
    {
      id: 1,
      title: "Spanish to English Translation",
      description: "Need a document translated from Spanish to English. 5,000 words.",
      postedBy: "John Doe",
      deadline: "2024-08-20",
      budget: "$200",
    },
    {
      id: 2,
      title: "French Website Localization",
      description: "Looking for a translator to localize a French website for the Canadian market.",
      postedBy: "Jane Smith",
      deadline: "2024-08-22",
      budget: "$500",
    },
    {
      id: 3,
      title: "Chinese Medical Document Translation",
      description: "Translate a medical document from Chinese to English. Approximately 10,000 words.",
      postedBy: "Global Health Inc.",
      deadline: "2024-08-25",
      budget: "$1000",
    },
  ];

  return (
    <div className="py-14">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Posted Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <div key={job.id} className="card bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h3 className="text-xl font-semibold text-blue-500">{job.title}</h3>
            <p className="text-gray-600 mt-2">{job.description}</p>
            <div className="mt-4">
              <span className="text-gray-800 font-bold">Posted by: </span>
              <span className="text-gray-500">{job.postedBy}</span>
            </div>
            <div className="mt-2">
              <span className="text-gray-800 font-bold">Deadline: </span>
              <span className="text-gray-500">{job.deadline}</span>
            </div>
            <div className="mt-2">
              <span className="text-gray-800 font-bold">Budget: </span>
              <span className="text-gray-500">{job.budget}</span>
            </div>
            <button className="btn btn-primary mt-4">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostedJobs;
