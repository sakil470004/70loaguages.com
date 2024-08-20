import {
  MdLogout,
  MdWork,
  MdPostAdd,
  MdMessage,
  MdAccountCircle,
  MdHome,
} from "react-icons/md";
import { Link } from "react-router-dom";

const DashboardSidebar = () => {
  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-purple-600 text-white min-h-full w-80 p-4">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-white p-2 mr-2">
              <img src="/path/to/icon" alt="Dashboard Icon" />
            </div>
            <span className="text-2xl font-bold">Dashboard</span>
          </div>
          <li className="mb-4">
            <Link to="/dashboard" className="flex items-center">
              <MdWork className="text-xl" />
              <span className="ml-2">Job Postings</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard" className="flex items-center">
              <MdPostAdd className="text-xl" />
              <span className="ml-2">Post a Job</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard" className="flex items-center">
              <MdMessage className="text-xl" />
              <span className="ml-2">Responses</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard" className="flex items-center">
              <MdAccountCircle className="text-xl" />
              <span className="ml-2">Profile</span>
            </Link>
          </li>

          {/* add purple divider */}

          <div className="divider bg-purple-800 divide-gray-600"></div>
          <li>
            <Link to="/" className="flex items-center">
              <MdHome className="text-xl" />
              <span className="ml-2">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="flex items-center">
              <MdLogout className="text-xl" />
              <span className="ml-2">Logout</span>
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default DashboardSidebar;
