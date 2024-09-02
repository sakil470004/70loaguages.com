import { useEffect, useState } from "react";
import {
  FaUser,

  FaUserEdit,
} from "react-icons/fa";
import { BsClipboard2DataFill, BsGenderAmbiguous } from "react-icons/bs";
import { AiFillPicture } from "react-icons/ai";
import toast from "react-hot-toast";
import { useAuthContext } from "../../../context/AuthContext";
import { HiIdentification } from "react-icons/hi";
const ReferredPeople = () => {
  const { authUser } = useAuthContext();
  return (
    <div>
      <div>
        <div role="tablist" className="tabs tabs-lifted">
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="Referred People"
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            <ReferredTable />
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="My Refer Link"
            defaultChecked
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            <ReferLink />
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="My Referrals"
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
          {/* 3rd tab staff */}
          <p className=" bg-gray-100 px-4 py-2 rounded-full text-center">{authUser?.referredBy ?"You got Referred By 'User ID' "+ authUser?.referredBy:"You got yourself in our Website"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferredPeople;

const ReferredTable = () => {
  const [users, setUsers] = useState([]);
  const { authUser } = useAuthContext();

  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users/myreferredusers/" + authUser?._id);
        const data = await res.json();
        setUsers(data?.reverse());
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  
  }, [authUser?._id]);

  return (
    <div className="overflow-x-auto">
      <h1 className="text-3xl uppercase mb-4">List of Referred People</h1>
      <div className="">
        <table className="table">
          <thead>
            <tr>
              <th className="text-2xl">#</th>
              <th>
                <div className="flex items-center gap-2">
                  <AiFillPicture /> Name{" "}
                </div>
              </th>
              <th>
                <div className="flex items-center gap-2">
                  <FaUserEdit /> User Name{" "}
                </div>
              </th>
              <th>
                <div className="flex items-center gap-2">
                  <BsGenderAmbiguous /> Gender{" "}
                </div>
              </th>
              <th>
                <div className="flex items-center gap-2 uppercase">
                  <HiIdentification />
                  User ID{" "}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user?.profilePic}
                          alt={`${user?.fullName}'s Avatar`}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUser />
                      <span className="font-bold">{user?.fullName}</span>
                    </div>
                  </div>
                </td>
                <td className="font-bold">{user?.username}</td>
                <td>{user?.gender}</td>
                <td>
                  <button className="badge badge-success text-white flex items-center gap-1">
                    <HiIdentification /> {user?._id}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th className="text-2xl">#</th>
              <th>
                <div className="flex items-center gap-2">
                  <AiFillPicture /> Name{" "}
                </div>
              </th>
              <th>
                <div className="flex items-center gap-2">
                  <FaUserEdit /> User Name{" "}
                </div>
              </th>
              <th>
                <div className="flex items-center gap-2">
                  <BsGenderAmbiguous /> Gender{" "}
                </div>
              </th>
              <th>
                <div className="flex items-center gap-2 uppercase">
                  <HiIdentification />
                  User ID{" "}
                </div>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
// ReferLink component

const ReferLink = () => {
  const [link, setLink] = useState("");
  const { authUser } = useAuthContext();
  const handleCopyClick = () => {
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard");
  };
  
  useEffect(() => {
    // get automatically 
    setLink(`${window.location.origin}/signup/${authUser._id}`);
  }, [authUser._id]);
  return (
    <div className=" space-x-2 flex items-center justify-center">
      <p className="text-blue-500 hover:underline bg-gray-100 px-4 py-2 rounded-full">
        {" "}
        {link}
      </p>
      <button
        onClick={handleCopyClick}
        className=" btn btn-outline btn-sm text-lg px-2 outline-none rounded "
      >
        <BsClipboard2DataFill/>
      </button>
    </div>
  );
};
