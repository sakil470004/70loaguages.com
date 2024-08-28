import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { RiGitRepositoryCommitsFill } from "react-icons/ri";

const AdjustVariable = () => {
  const [userCommission, setUserCommission] = useState(0);
  const [bossCommission, setBossCommission] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const userCommissionRef = useRef(null);
  const bossCommissionRef = useRef(null);

  const saveUserCommission = () => {
    const confirmBox = confirm(
      "Are you sure you want to update the user commission?"
    );
    if (confirmBox) {
      const userCommission = parseInt(userCommissionRef.current.value);
      if (
        userCommission < 0 ||
        userCommission > 100 ||
        isNaN(userCommission) ||
        userCommission === null
      ) {
        toast.error("Invalid Commission");
        return;
      }
      setIsLoading(true);
      fetch("/api/app/usercommission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userCommission }),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success(data.message);
          // console.log(data);
          setUserCommission(userCommission);
        })
        .finally(() => setIsLoading(false));
    }
  };
  const saveBossCommission = () => {
    const confirmBox = confirm(
      "Are you sure you want to update the Organization commission?"
    );
    if (confirmBox) {
      const bossCommission = parseInt(bossCommissionRef.current.value);
      if (
        bossCommission < 0 ||
        bossCommission > 100 ||
        isNaN(bossCommission) ||
        bossCommission === null
      ) {
        toast.error("Invalid Commission");
        return;
      }
      setIsLoading(true);
      fetch("/api/app/bosscommission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bossCommission }),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success(data.message);
          // console.log(data);
          setBossCommission(bossCommission);
        })
        .finally(() => setIsLoading(false));
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchVariables = async () => {
      try {
        const res = await fetch("/api/app/variables");
        const data = await res.json();
        // console.log(data);
        setUserCommission(data.userCommission);
        setBossCommission(data.bossCommission);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVariables();
  }, []);
  return (
    <div>
      <h1 className="text-3xl">Change Web App Global Variable</h1>

      {/* there is a card card has a text(Current user commission). Then input box update user commission then a button for text save*/}
      <div className="mt-10 grid xl:grid-cols-2 gap-5">
        <div className="card shadow-lg bg-gray-50 p-10">
          <h2 className="text-2xl mb-4 flex items-center gap-2">
            <RiGitRepositoryCommitsFill /> Current User Commission :{" "}
            {userCommission} %
          </h2>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Update Commission </span>
            </div>
            <input
              ref={userCommissionRef}
              type="number"
              placeholder="Enter new commission"
              className="input input-bordered w-full "
            />
          </label>
          <button
            onClick={saveUserCommission}
            className={`btn btn-sm mt-4 btn-success text-white ${
              isLoading ? "loading loading-spinner" : ""
            }`}
            disabled={isLoading}
          >
            Save
          </button>
        </div>
        <div className="card   shadow-lg bg-gray-50 p-10">
          <h2 className="text-2xl mb-4 flex gap-2 items-center">
            <RiGitRepositoryCommitsFill /> Current Organization Commission :{" "}
            {bossCommission} %
          </h2>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Update Commission </span>
            </div>
            <input
              ref={bossCommissionRef}
              type="number"
              placeholder="Enter new commission"
              className="input input-bordered w-full "
            />
          </label>
          <button
            onClick={saveBossCommission}
            className={`btn btn-sm mt-4  btn-success text-white ${
              isLoading ? "loading loading-spinner" : ""
            }`}
            disabled={isLoading}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdjustVariable;
