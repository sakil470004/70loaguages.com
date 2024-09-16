import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardHome from "./pages/dashboard/dashboardHome/DashboardHome";
import AddJob from "./pages/dashboard/AddJob/AddJob";
import DashboardJobList from "./pages/dashboard/DashboardJobList/DashboardJobList";
import ViewJobPage from "./pages/ViewJobPage/ViewJobPage";
import Chat from "./pages/chat/Chat";
import MakeAdmin from "./pages/dashboard/MakeAdmin/MakeAdmin";
import AdjustVariable from "./pages/dashboard/AdjustVariable/AdjustVariable";
import EditJob from "./pages/dashboard/EditJob/EditJob";
import ReferredPeople from "./pages/dashboard/ReferredPeople/ReferedPeople";
import LanguageWordPerCost from "./pages/dashboard/LanguageWordPerCost/LanguageWordPerCost";
import NotificationsPage from "./pages/dashboard/Notification/Notification";
import UserProfile from "./pages/dashboard/UserProfile/UserProfile";
import AppliedJob from "./pages/dashboard/AppliedJob/AppliedJob";
import Payment from "./pages/dashboard/DashboardPayment/Payment";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="">
      <Routes>
        {/* <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        /> */}
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/chat"
          element={authUser ? <Chat/> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/jobDetail/:id"
          element={authUser ? <ViewJobPage/> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to={"/"} /> : <SignUp />}
        />
        <Route
          path="/signup/:referralId"
          element={authUser ? <Navigate to={"/"} /> : <SignUp />}
        />
        {/* dashboard route */}
        <Route
          path="/dashboard"
          element={authUser ? <Dashboard /> : <Navigate to={"/login"} />}
        >
          {/* nested route */}
          <Route path="" element={<DashboardHome />} />
          <Route path="home" element={<DashboardHome />} />
          <Route path="refer" element={<ReferredPeople />} />
          <Route path="addJob" element={<AddJob />} />
          <Route path="edit/:jobId" element={<EditJob />} />
          <Route path="jobList" element={<DashboardJobList />} />
          <Route path="wordPerCost" element={<LanguageWordPerCost />} />
          <Route path="makeadmin" element={<MakeAdmin />} />
          <Route path="adjustvariable" element={<AdjustVariable />} />
          <Route path="notification" element={<NotificationsPage />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="appliedJob" element={<AppliedJob />} />
          <Route path="payment/:paymentId" element={<Payment />} />
        </Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
