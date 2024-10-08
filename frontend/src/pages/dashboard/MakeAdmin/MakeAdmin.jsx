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
import cover from "../../../assets/cover.png";
import { useAuthContext } from "../../../context/AuthContext";
import APP_URL from "../../../../APP_URL";
const MakeAdmin = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { authUser } = useAuthContext();
  const [admin, setAdmin] = useState(false);
  const handleChangeRole = (user) => {
    // if user is already an admin no need to make him admin again
    if (user?.admin) {
      return;
    }
    setIsLoading(true);
    // confirm box
    const confirmBox = confirm(
      `Are you sure you want to make "${user?.username}" an admin?`
    );
    if (confirmBox) {
      fetch(`${APP_URL}/api/users/makeadmin`, {
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
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${APP_URL}/api/users/${authUser._id}`);
        const data = await res.json();
        setUsers(data?.reverse());
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
    // check if user is admin

    fetch(`${APP_URL}/api/users/checkadmin/${authUser._id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data?.admin) {
          // toast.success("You are an admin Can make other users admin");
          setAdmin(true);
        } else {
          toast.error("You are not an admin");
        }
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl uppercase mb-4">List of User</h1>
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
                          title={`${user?.fullName}'s Avatar`}
                          onError={(e) => {
                            e.target.src = cover;

                          }
                          }
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
                    disabled={isLoading || user?.admin || !admin}
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
