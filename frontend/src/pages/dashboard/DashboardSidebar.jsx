import {
    MdPayment,
    MdLocalOffer,
    MdGroupAdd,
    MdAccountBalanceWallet,
    MdLogout,
  } from "react-icons/md";
import { Link } from "react-router-dom";

const DashboardSidebar = () => {
  return (
    <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-purple-600 text-white min-h-full w-80 p-4">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-white p-2 mr-2">
                <img src="/path/to/icon" alt="Dashboard Icon" />
              </div>
              <span className="text-2xl font-bold">Dashboard</span>
            </div>
            <li className="mb-4">
              <Link to="/payment-info" className="flex items-center">
                <MdPayment className="text-xl" />
                <span className="ml-2">Payment Info</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/sales-programs" className="flex items-center">
                <MdLocalOffer className="text-xl" />
                <span className="ml-2">Sales Programs</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/generate-referral" className="flex items-center">
                <MdGroupAdd className="text-xl" />
                <span className="ml-2">Generate Referral</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/withdrawal" className="flex items-center">
                <MdAccountBalanceWallet className="text-xl" />
                <span className="ml-2">Withdrawal</span>
              </Link>
            </li>
            <li>
              <Link to="/logout" className="flex items-center">
                <MdLogout className="text-xl" />
                <span className="ml-2">Logout</span>
              </Link>
            </li>
          </div>
        </ul>
      </div>
  )
}

export default DashboardSidebar