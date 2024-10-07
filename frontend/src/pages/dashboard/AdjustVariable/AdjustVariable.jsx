import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { RiBook3Line, RiGitRepositoryCommitsFill, RiGroupLine } from "react-icons/ri";
import APP_URL from "../../../../APP_URL";

const AdjustVariable = () => {
  const [userCommission, setUserCommission] = useState(0);
  // const [bossCommission, setBossCommission] = useState(0);
  const [tier1, setTier1] = useState({ commission: 0, numberOfUser: 0 });
  const [tier2, setTier2] = useState({ commission: 0, numberOfUser: 0 });
  const [tier3, setTier3] = useState({ commission: 0, numberOfUser: 0 });
  const [saleRepCommission, setSaleRepCommission] = useState({
    initialCommission: 0,
    midTimeCommission: 0,
    finalCommission: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const userCommissionRef = useRef(null);
  // const bossCommissionRef = useRef(null);

  // Tier refs for commission and number of users
  const tier1CommissionRef = useRef(null);
  const tier1NumberOfUserRef = useRef(null);

  const tier2CommissionRef = useRef(null);
  const tier2NumberOfUserRef = useRef(null);

  const tier3CommissionRef = useRef(null);
  const tier3NumberOfUserRef = useRef(null);
  // Sale Rep Commission refs
  const saleRepInitialCommissionRef = useRef(null);
  const saleRepMidTimeCommissionRef = useRef(null);
  const saleRepFinalCommissionRef = useRef(null);


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
      fetch(`${APP_URL}/api/app/usercommission`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userCommission }),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success(data.message);
          setUserCommission(userCommission);
        })
        .finally(() => setIsLoading(false));
    }
  };



  const saveTierData = (tier, setTier, commissionRef, numberOfUserRef) => {
    const confirmBox = confirm(
      `Are you sure you want to update the Tier-${tier} data?`
    );
    if (confirmBox) {
      const commission = parseInt(commissionRef.current.value);
      const numberOfUser = parseInt(numberOfUserRef.current.value);
      if (
        commission < 0 ||
        commission > 100 ||
        isNaN(commission) ||
        numberOfUser < 0 ||
        isNaN(numberOfUser)
      ) {
        toast.error("Invalid Commission or Number of Users");
        return;
      }
      setIsLoading(true);
      fetch(`${APP_URL}/api/app/tier${tier}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tier, commission, numberOfUser }),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success(data.message);
          setTier({ commission, numberOfUser });
        })
        .finally(() => setIsLoading(false));
    }
  };

  const saveSaleRepCommission = () => {
   const confirmBox = confirm(
      "Are you sure you want to update the sale rep commission?"
    );
    if (confirmBox) {
      const initialCommission = parseInt(saleRepInitialCommissionRef.current.value);
      const midTimeCommission = parseInt(saleRepMidTimeCommissionRef.current.value);
      const finalCommission = parseInt(saleRepFinalCommissionRef.current.value);
      if (
        initialCommission < 0 || initialCommission > 100 || isNaN(initialCommission) ||
        midTimeCommission < 0 || midTimeCommission > 100 || isNaN(midTimeCommission) ||
        finalCommission < 0 || finalCommission > 100 || isNaN(finalCommission)
      ) {
        toast.error("Invalid Commission for Sale Rep");
        return;
      }
      setIsLoading(true);
      fetch(`${APP_URL}/api/app/salerepcommission`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ initialCommission, midTimeCommission, finalCommission }),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success(data.message);
          setSaleRepCommission({ initialCommission, midTimeCommission, finalCommission });
        })
        .finally(() => setIsLoading(false));
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchVariables = async () => {
      try {
        const res = await fetch(`${APP_URL}/api/app/variables`);
        const data = await res.json();
        setUserCommission(data.userCommission);
        // setBossCommission(data.bossCommission);
        setTier1(data.tier1);
        setTier2(data.tier2);
        setTier3(data.tier3);
        setSaleRepCommission(data.saleRepCommission);
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

      {/* User and Boss Commission Section */}
      <div className="mt-10 grid xl:grid-cols-2 gap-5">
        {/* Boss Commission */}
        <div className="card shadow-lg bg-gray-50 p-10">
          <h2 className="text-2xl mb-4 flex items-center gap-2">
            <RiBook3Line /> Commission Details
          </h2>
          <div>
            {/* here is all the details of ties and user commission */}
            <div className="flex items-center gap-2">
              <RiGitRepositoryCommitsFill /> User Commission: {userCommission}%
            </div>
            <div className="flex items-center gap-2">
              <RiGitRepositoryCommitsFill /> Tier-1 Commission: {tier1.commission}%
            </div>
            <div className="flex items-center gap-2">
              <RiGitRepositoryCommitsFill /> Tier-2 Commission: {tier2.commission}%
            </div>
            <div className="flex items-center gap-2">
              <RiGitRepositoryCommitsFill /> Tier-3 Commission: {tier3.commission}%
            </div>
            <div className="divide-red-300 bg-red-500 w-2"></div>
            <div className="flex items-center gap-2">
              <RiGitRepositoryCommitsFill /> Sale Rep Initial Commission: {saleRepCommission.initialCommission}%
            </div>
            <div className="flex items-center gap-2">

              <RiGitRepositoryCommitsFill /> Sale Rep Mid-Time Commission: {saleRepCommission.midTimeCommission}%
            </div>
            <div className="flex items-center gap-2">
              <RiGitRepositoryCommitsFill /> Sale Rep Final Commission: {saleRepCommission.finalCommission}%
            </div>

            {/* organization commition */}

          </div>
          {/* <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Update Commission </span>
            </div>
            <input
              ref={bossCommissionRef}
              type="number"
              placeholder="Enter new commission"
              className="input input-bordered w-full"
            />
          </label> */}
          {/* <button
            onClick={saveBossCommission}
            className={`btn btn-sm mt-4 btn-success text-white ${isLoading ? "loading loading-spinner" : ""
              }`}
            disabled={isLoading}
          >
            Save
          </button> */}
        </div>
        {/* User Commission */}
        <div className="card shadow-lg bg-gray-50 p-10">
          <h2 className="text-2xl mb-4 flex items-center gap-2">
            <RiGitRepositoryCommitsFill /> Current User Commission :{" "}
            {userCommission} %
          </h2>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Update Commission </span>
            </div>
            <input
              ref={userCommissionRef}
              type="number"
              placeholder="Enter new commission"
              className="input input-bordered w-full"
            />
          </label>
          <button
            onClick={saveUserCommission}
            className={`btn btn-sm mt-4 btn-success text-white ${isLoading ? "loading loading-spinner" : ""
              }`}
            disabled={isLoading}
          >
            Save
          </button>
        </div>


      </div>
      <div className="divider divide-blue-600"></div>
      {/* Tier Settings */}
      <div className="mt-10 grid xl:grid-cols-2 gap-5">
        {/* Tier 1 */}
        <div className="card shadow-lg bg-gray-50 p-10">
          <h2 className="text-2xl mb-4 flex items-center gap-2">
            <p className="flex items-center gap-2"><RiGroupLine /> Tier-1: {tier1.commission}% Commission</p>

            <p className="text-sm badge badge-info text-white">Users: {tier1.numberOfUser}</p>
          </h2>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Update Tier 1 Commission</span>
            </div>
            <input
              ref={tier1CommissionRef}
              type="number"
              placeholder="Enter new commission"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full mt-4">
            <div className="label">
              <span className="label-text">Update Tier 1 Number of Users</span>
            </div>
            <input
              ref={tier1NumberOfUserRef}
              type="number"
              placeholder="Enter number of users"
              className="input input-bordered w-full"
            />
          </label>
          <button
            onClick={() => saveTierData(1, setTier1, tier1CommissionRef, tier1NumberOfUserRef)}
            className={`btn btn-sm mt-4 btn-success text-white ${isLoading ? "loading loading-spinner" : ""
              }`}
            disabled={isLoading}
          >
            Save
          </button>
        </div>

        {/* Tier 2 */}
        <div className="card shadow-lg bg-gray-50 p-10">
          <h2 className="text-2xl mb-4 flex items-center gap-2">
            <p className="flex items-center gap-2"><RiGroupLine /> Tier-2: {tier2.commission}% Commission</p>

            <p className="text-sm badge badge-info text-white">Users: {tier2.numberOfUser}</p>
          </h2>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Update Tier 2 Commission</span>
            </div>
            <input
              ref={tier2CommissionRef}
              type="number"
              placeholder="Enter new commission"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full mt-4">
            <div className="label">
              <span className="label-text">Update Tier 2 Number of Users</span>
            </div>
            <input
              ref={tier2NumberOfUserRef}
              type="number"
              placeholder="Enter number of users"
              className="input input-bordered w-full"
            />
          </label>
          <button
            onClick={() => saveTierData(2, setTier2, tier2CommissionRef, tier2NumberOfUserRef)}
            className={`btn btn-sm mt-4 btn-success text-white ${isLoading ? "loading loading-spinner" : ""
              }`}
            disabled={isLoading}
          >
            Save
          </button>
        </div>

        {/* Tier 3 */}
        <div className="card shadow-lg bg-gray-50 p-10">
          <h2 className="text-2xl mb-4 flex items-center gap-2">
            <p className="flex items-center gap-2"><RiGroupLine /> Tier-3: {tier3.commission}% Commission</p>

            <p className="text-sm badge badge-info text-white">Users: {tier3.numberOfUser}</p>
          </h2>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Update Tier 3 Commission</span>
            </div>
            <input
              ref={tier3CommissionRef}
              type="number"
              placeholder="Enter new commission"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full mt-4">
            <div className="label">
              <span className="label-text">Update Tier 3 Number of Users</span>
            </div>
            <input
              ref={tier3NumberOfUserRef}
              type="number"
              placeholder="Enter number of users"
              className="input input-bordered w-full"
            />
          </label>
          <button
            onClick={() => saveTierData(3, setTier3, tier3CommissionRef, tier3NumberOfUserRef)}
            className={`btn btn-sm mt-4 btn-success text-white ${isLoading ? "loading loading-spinner" : ""
              }`}
            disabled={isLoading}
          >
            Save
          </button>
        </div>
      </div>
      {/* Sale Rep Commission */}
      <div className="card shadow-lg bg-gray-50 p-10 mt-10">
        <h2 className="text-2xl mb-4 flex items-center gap-2">
          <RiGroupLine /> Sale Rep Commission
        </h2>
        <div className="grid gap-4">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Initial Commission -- Current {saleRepCommission.initialCommission}%</span>
            </div>
            <input
              ref={saleRepInitialCommissionRef}
              type="number"
              placeholder="Enter initial commission"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Mid-Time Commission -- Current {saleRepCommission.midTimeCommission}%</span>
            </div>
            <input
              ref={saleRepMidTimeCommissionRef}
              type="number"
              placeholder="Enter mid-time commission"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Final/Regular Commission -- Current {saleRepCommission.finalCommission}%</span>
            </div>
            <input
              ref={saleRepFinalCommissionRef}
              type="number"
              placeholder="Enter final commission"
              className="input input-bordered w-full"
            />
          </label>
          <button
            onClick={saveSaleRepCommission}
            className={`btn btn-sm btn-success text-white ${isLoading ? "loading loading-spinner" : ""
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
