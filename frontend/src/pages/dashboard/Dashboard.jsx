import { GiHamburgerMenu } from "react-icons/gi";
import DashboardSidebar from "./DashboardSidebar";
import DashboardContent from "./DashboardContent";

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open scroll-m-0 overflow-auto ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main Content Area */}
      <div className="drawer-content relative bg-gray-100 max-h-screen  p-8 ">
        {/* Close Button for Mobile View */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden absolute top-10 right-4"
        >
          <GiHamburgerMenu />
        </label>
        <DashboardContent />
      </div>

      {/* Sidebar */}
      <DashboardSidebar />
    </div>
  );
};
export default Dashboard;
