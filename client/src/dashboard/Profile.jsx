import React, { useContext } from "react";
import { UserContext } from "../reducers/useReducer";
import Layout from "./Layout";

const Profile = () => {
  const { state } = useContext(UserContext);
  const { userInfo} = state
  return (
    <Layout>
      <div className="pr-5 relative">
        <div className="rounded-t-3xl overflow-hidden h-52">
          <img
            src="https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80"
            alt=""
            className="w-full"
          />
        </div>
        <div className="w-full flex justify-between">
          <div className="flex">
            <div className="-mt-11 ml-4">
              <div className=" border-4 rounded-full bg-white">
                <img
                  src="https://avatars.githubusercontent.com/u/100751089?v=4"
                  alt=""
                  className="rounded-full w-44"
                />
              </div>
            </div>
            <div className="ml-4 mt-4">
              <h1 className="text-3xl font-semibold text-gray-800">
                {userInfo.name}
              </h1>
            </div>
          </div>
        </div>
        <div className="mt-8 ml-5 grid grid-cols-6">
          <div className="col-span-2">
            <h1 className="text-2xl font-semibold text-gray-800">
              Personal Info
            </h1>
            <ul class="mt-2 text-gray-700">
              <li class="flex border-y py-2">
                <span class="font-bold w-24">Full name:</span>
                <span class="text-gray-700">{userInfo.name}</span>
              </li>
              <li class="flex border-b py-2">
                <span class="font-bold w-24">Joined:</span>
                <span class="text-gray-700">10 Jan 2022 (25 days ago)</span>
              </li>
              <li class="flex border-b py-2">
                <span class="font-bold w-24">Mobile:</span>
                <span class="text-gray-700">(123) 123-1234</span>
              </li>
              <li class="flex border-b py-2">
                <span class="font-bold w-24">Email:</span>
                <span class="text-gray-700">{userInfo.email}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
