import React, { useContext } from "react";
import { UserContext } from "../../reducers/useReducer";

const MyProfile = () => {
  const { state } = useContext(UserContext);
  const { userInfo } = state;
  return (
    <div className="grid grid-cols-12 gap-5 mx-5 min-h-screen my-5">
      <div className="col-span-4 border p-5 bg-white dark:bg-[#2e2d4a] border-gray-300 dark:border-gray-700 rounded-xl  flex flex-col">
        <div className="flex flex-col items-center mt-10">
          <img
            src="https://demos.themeselection.com/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/4.png"
            className="w-28 h-28 rounded-xl"
            alt=""
          />
          <h1 className="text-2xl mt-3 text-zinc-600 font-medium">
            {userInfo.name}
          </h1>
          <p className="bg-pink-200 text-center text-red-500 px-4 pb-1 mt-3 rounded-xl">
            {userInfo.admin ? "admin" : "user"}
          </p>
        </div>
        <div className="mt-8">
          <h1 className="text-2xl my-3 text-zinc-600">Details</h1>
          <ul className="border-t border-t-gray-300">
            <li className="text-zinc-500 my-2">
              <span className="text-zinc-600 mr-2">Full name:</span>
              {userInfo.name}
            </li>
            <li className="text-zinc-500 my-2">
              <span className="text-zinc-600 mr-2">Email:</span>
              {userInfo.email}
            </li>
            <li className="text-zinc-500 my-2">
              <span className="text-zinc-600 mr-2">Status:</span>
              {"active"}
            </li>
            <li className="text-zinc-500 my-2">
              <span className="text-zinc-600 mr-2">Role:</span>
              {userInfo.admin && "admin"}
            </li>
            <li className="text-zinc-500 my-2">
              <span className="text-zinc-600 mr-2">Contact:</span>
              {"+1 (479) 232-9151"}
            </li>
            <li className="text-zinc-500 my-2">
              <span className="text-zinc-600 mr-2">Language:</span>
              {"English"}
            </li>
            <li className="text-zinc-500 my-2">
              <span className="text-zinc-600 mr-2">Country:</span>
              {"Uzbekistan"}
            </li>
          </ul>
        </div>
      </div>
      <div className="col-span-8 border p-5 bg-white dark:bg-[#2e2d4a] border-gray-300 rounded-xl dark:border-gray-700 flex flex-col">
        <ul className="flex justify-around items-center border-b border-b-gray-300 pb-4">
          <li className="text-xl">Address</li>
          <li className="text-xl">My profile</li>
          <li className="text-xl">My orders</li>
          <li className="text-xl">Settings</li>
        </ul>
      </div>
    </div>
  );
};

export default MyProfile;
