import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";
import { BiExit } from "react-icons/bi";
import { useEffect, useState } from "react";

import { GiCrossMark } from "react-icons/gi";

const Navbar = ({ setSearchText, searchText }) => {
  //   const { logout, cartTotalType } = useAuth();
  //   demo functions
  const user=null;
//   const user = {
//     email: "sk.470004@gmail.com",
//     photoURL:
//       "https://lh3.googleusercontent.com/a-/AOh14GgZ1j6n7HwXz9G9FwJr0wZ5z7q3Gq6F2sVzWx9K=s96-c",
//     displayName: "Sourav Kumar",
//   };
  const logout = () => {};
  const cartTotalType = () => { return 0; };

  const navigate = useNavigate();
  const [userData2, setUserData2] = useState({});
  useEffect(() => {
    fetch(`https://easy-bazar-server.vercel.app/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData2(data);
      });
  }, [user?.email]);

  const handleLogout = async () => {
    await logout().then(() => {
      localStorage.removeItem("token");
    });
  };
  const handleProfile = () => {
    navigate("/dashboard/profile");
  };
  const cartComponent = (
    <Link to={"/cart"} className="indicator cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <span className="badge badge-sm indicator-item">{cartTotalType()}</span>
    </Link>
  );
  const searchComponent = (
    <label className="input relative input-xs input-bordered flex items-center gap-2">
      <input
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
        required
        type="text"
        className="grow"
        placeholder="Search"
      />
      {!searchText ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <GiCrossMark
          onClick={() => setSearchText("")}
          className="absolute right-2"
        />
      )}
    </label>
  );
  return (
    <div className="navbar bg-base-100 pr-6">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 "
          >
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/about"}>About</Link>
            </li>
            {!user && (
              <>
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
                <li>
                  <Link to={"/register"}>Register</Link>
                </li>
              </>
            )}
            {user && (
              <li>
                <Link to={"/dashboard"}>Dashboard</Link>
              </li>
            )}
            <li>{searchComponent}</li>
            {user && (
              <>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm flex items-center justify-center bg-red-500 text-white"
                  >
                    <BiExit />
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link to={"/"} className="cursor-pointer w-36 h-auto font-bold">
          <img className="w-full h-full" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex items-center gap-2">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/about"}>About</Link>
          </li>
          {!user && (
            <li>
              <Link to={"/register"}>Register</Link>
            </li>
          )}
          {user && (
            <li>
              <Link to={"/dashboard"}>Dashboard</Link>
            </li>
          )}
          <li>{searchComponent}</li>
        </ul>
      </div>
      <div className="navbar-end space-x-2">
        {user ? (
          <>
            <button
              onClick={handleLogout}
              className="mr-4 btn btn-sm bg-red-500 text-white  lg:flex hidden  items-center justify-center"
            >
              <BiExit /> Logout
            </button>
            {cartComponent}
            <div className="pl-4 avatar group" title={userData2?.name || ""}>
              <div
                onClick={handleProfile}
                className="w-12 rounded-full border-2 border-black group-hover:border-yellow-300"
              >
                <img
                  src={
                    userData2?.img ||
                    user?.photoURL ||
                    "/public/placeholder.jpg"
                  }
                />
              </div>
            </div>
          </>
        ) : (
          <button className="btn btn-sm btn-outline btn-primary  lg:block">
            <Link to={"/login"}>Login</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
