const DashboardHome = () => {
  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Welcome back to 70Languages!</h1>
          <div className="flex items-center">
            <div className="mr-4">
              <span className="block text-gray-600">Username</span>
              <span className="text-gray-500">Translator/Job Poster</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-300">
              <img src="/path/to/profile-pic" alt="Profile" />
            </div>
          </div>
        </div>

        {/* Job Postings and Responses Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-bold">Your Job Postings</h3>
            <button className="btn btn-primary mt-4">View All</button>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-bold">Job Responses</h3>
            <button className="btn btn-primary mt-4">View Responses</button>
          </div>
        </div>

        {/* Advertise Yourself */}
        <div className="bg-white p-4 rounded shadow-md mb-8">
          <h3 className="text-lg font-bold">Advertise Yourself</h3>
          <button className="btn btn-primary mt-4">Create Ad</button>
        </div>

        {/* Profile and Settings */}
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-lg font-bold">Your Profile</h3>
          <button className="btn btn-primary mt-4">Edit Profile</button>
        </div>
     
    </>
  );
};

export default DashboardHome;
