import { useEffect, useState } from "react";
import {
  FaUser,
  FaCheck,
  FaTimes,
  FaInfoCircle,
  FaUserEdit,
} from "react-icons/fa";
import { BsGenderAmbiguous } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { AiFillPicture } from "react-icons/ai";
import toast from "react-hot-toast";
const MakeAdmin = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleChangeRole = (user) => {
    if (user?.admin) {
      return;
    }
    setIsLoading(true);
    // confirm box
    const confirmBox = confirm(
      `Are you sure you want to make "${user?.username}" an admin?`
    );
    if (confirmBox) {
      fetch("/api/users/makeadmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id }),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success(data.message);
          const newUsers = users.map((u) => {
            if (u._id === user._id) {
              u.admin = true;
            }
            return u;
          });
          setUsers(newUsers);
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await fetch("/api/users/");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdmins();
  }, []);

  return (
    <div>
      <h1 className="text-3xl">List of Admins</h1>
      <div className="overflow-x-auto">
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
                <div className="flex items-center gap-2">
                  <GrUserAdmin /> Is Admin{" "}
                </div>
              </th>
              <th>
                <div className="flex items-center gap-2">
                  <IoCheckmarkDoneSharp /> Action{" "}
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
                  <button className="badge badge-warning flex items-center gap-1">
                    {user?.admin ? (
                      <FaCheck className="text-green-700" />
                    ) : (
                      <FaTimes className="text-red-700" />
                    )}
                    {user?.admin ? "Yes" : "No"}
                  </button>
                </td>
                <th>
                  <button
                    className="btn btn-ghost btn-xs flex items-center gap-1"
                    onClick={() => handleChangeRole(user)}
                    disabled={isLoading || user?.admin}
                  >
                    <FaInfoCircle />
                    {user?.admin ? "Remove Admin" : "Make Admin"}
                  </button>
                </th>
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
                <div className="flex items-center gap-2">
                  <GrUserAdmin /> Is Admin{" "}
                </div>
              </th>
              <th>
                <div className="flex items-center gap-2">
                  <IoCheckmarkDoneSharp /> Action{" "}
                </div>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default MakeAdmin;
