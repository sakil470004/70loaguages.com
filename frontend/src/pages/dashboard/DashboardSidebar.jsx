import {
    MdPayment,
    MdLocalOffer,
    MdGroupAdd,
    MdAccountBalanceWallet,
    MdLogout,
  } from "react-icons/md";

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
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-8 mx-2 rounded-full ring ring-offset-2">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>

          <span className="text-2xl font-bold">Dashboard</span>
        </div>
        <li className="mb-4">
          <a href="#" className="flex items-center">
            <MdPayment className="text-xl" />
            <span className="ml-2">Payment Info</span>
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="flex items-center">
            <MdLocalOffer className="text-xl" />
            <span className="ml-2">Sales Programs</span>
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="flex items-center">
            <MdGroupAdd className="text-xl" />
            <span className="ml-2">Generate Referral</span>
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="flex items-center">
            <MdAccountBalanceWallet className="text-xl" />
            <span className="ml-2">Withdrawal</span>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center">
            <MdLogout className="text-xl" />
            <span className="ml-2">Logout</span>
          </a>
        </li>
      </div>
    </ul>
  </div>
  )
}

export default DashboardSidebar