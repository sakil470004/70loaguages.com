import {
  MdLogout,
  MdWork,
  MdPostAdd,
  MdMessage,
  MdAccountCircle,
  MdHome,
  MdPayments,
} from "react-icons/md";
import { GrLanguage, GrUserAdmin } from "react-icons/gr";
import { BsChatDots, BsPeople, BsWrenchAdjustableCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import APP_URL from "../../../APP_URL";
import { SiJamboard } from "react-icons/si";

const DashboardSidebar = () => {
  // check if user is admin
  const [admin, setAdmin] = useState(false);
  const { authUser } = useAuthContext();
  useEffect(() => {
    const checkAdmin = async () => {
      const res = await fetch(
        `${APP_URL}/api/users/checkadmin/${authUser._id}`
      );
      const data = await res.json();
      setAdmin(data.admin);
    };
    checkAdmin();
  }, [authUser._id]);

  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-purple-500 text-white min-h-full w-80 font-bold font-serif px-4">
        <div className="mb-8">
          <div className="flex items-center mb-2 cursor-pointer">
            <div className="w-16  rounded-full bg-black  mr-2">
              <img src={logo} alt="Dashboard Icon" />
            </div>
            <span className="text-2xl font-bold">70Language</span>
          </div>
          <li className="mb-2">
            <Link to="/dashboard/jobList" className="flex items-center">
              <MdWork className="text-xl" />
              <span className="ml-2">My Posted Job</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/dashboard/addJob" className="flex items-center">
              <MdPostAdd className="text-xl" />
              <span className="ml-2">Post a Job</span>
            </Link>
          </li>
          <li>
            <Link to="/chat" className="flex items-center">
              <BsChatDots className="text-xl" />
              <span className="ml-2">Chat</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/dashboard/appliedJob" className="flex items-center">
              <SiJamboard className="text-xl" />
              <span className="ml-2">Applied Job</span>
            </Link>
          </li>

          <li className="mb-2">
            <Link to="/dashboard" className="flex items-center">
              <MdMessage className="text-xl" />
              <span className="ml-2">Responses</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/dashboard/refer" className="flex items-center">
              <BsPeople className="text-xl" />
              <span className="ml-2">Referred People</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/dashboard/profile" className="flex items-center">
              <MdAccountCircle className="text-xl" />
              <span className="ml-2">Profile</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link to={`paymentDetails/${authUser._id}`} className="flex items-center">
              <MdPayments className="text-xl" />
              <span className="ml-2">Payment Details</span>
            </Link>
          </li>
          {admin && (
            <li className="mb-2">
              <Link
                to="/dashboard/adjustvariable"
                className="flex items-center"
              >
                <BsWrenchAdjustableCircle className="text-xl" />
                <span className="ml-2">Adjust Variable</span>
              </Link>
            </li>
          )}
          {admin && (
            <li className="mb-2">
              <Link to="/dashboard/wordPerCost" className="flex items-center">
                <GrLanguage className="text-xl" />
                <span className="ml-2">Language Word/Cost</span>
              </Link>
            </li>
          )}
          {admin && (
            <li className="mb-2">
              <Link to="/dashboard/makeadmin" className="flex items-center">
                <GrUserAdmin className="text-xl" />
                <span className="ml-2">Make Admin</span>
              </Link>
            </li>
          )}
          {/* add purple divider */}

          <div className="divider bg-purple-600 rounded-full divide-gray-600">
            --------
          </div>
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
