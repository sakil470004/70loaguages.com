import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardHome from "./pages/dashboard/dashboardHome/DashboardHome";
import Chat from "./pages/Chat/Chat";
import AddJob from "./pages/dashboard/AddJob/AddJob";
import DashboardJobList from "./pages/dashboard/DashboardJobList/DashboardJobList";
import ViewJobPage from "./pages/ViewJobPage/ViewJobPage";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/chat"
          element={authUser ? <Chat /> : <Navigate to={"/login"} />}
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
        {/* dashboard route */}
        <Route
          path="/dashboard"
          element={authUser ? <Dashboard /> : <Navigate to={"/login"} />}
        >
          {/* nested route */}
          <Route path="" element={<DashboardHome />} />
          <Route path="home" element={<DashboardHome />} />
          <Route path="addJob" element={<AddJob />} />
          <Route path="jobList" element={<DashboardJobList />} />
        </Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
