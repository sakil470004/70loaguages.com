const DashboardHome = () => {
  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome back, John!</h1>
        <div className="dropdown dropdown-end flex items-center gap-2">
          <span className="font-bold text-xl">Jhon</span>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://th.bing.com/th/id/OIP.wlMwawdnFE1IXgrS3BGUvwHaLG?rs=1&pid=ImgDetMain"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Finance Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-lg font-bold">Total Payable</h3>
          <p className="text-2xl">$10,000</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-lg font-bold">Total Paid</h3>
          <p className="text-2xl">$5,000</p>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-lg font-bold">Others</h3>
          <p className="text-2xl">$300</p>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-lg font-bold">Object-Oriented Programming</h3>
          <button className="btn btn-primary mt-4">View</button>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-lg font-bold">
            Fundamentals of Database Systems
          </h3>
          <button className="btn btn-primary mt-4">View</button>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
