import React from "react";
import { useSelector } from "react-redux";
import LayoutP from "./LayoutP";
import ProfileBg from "../../assets/images/profilebg.png";

const MyInfor = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <LayoutP>
      <div className="">
        <div className="">
          <img src={ProfileBg} className="h-[235px] rounded-3xl" alt="" />
        </div>
      </div>
      {/* <div className="">
        <h1 className="md:text-3xl font-semibold">Personal data</h1>
        <div className="">
          <ul className="border-t border-t-gray-300 text-gray-700 mt-5">
            <li className="my-2">
              <span className="text-zinc-600 mr-2">Full name:</span>{user.name}
            </li>
            <li className="my-2">
              <span className="text-zinc-600 mr-2">Email:</span>{user.email}
            </li>
            <li className="my-2">
              <span className="text-zinc-600 mr-2">Status:</span>
              {"active"}
            </li>
            <li className="my-2">
              <span className="text-zinc-600 mr-2">Role:</span>
            </li>
            <li className="my-2">
              <span className="text-zinc-600 mr-2">Contact:</span>
              {"+1 (479) 232-9151"}
            </li>
            <li className="my-2">
              <span className="text-zinc-600 mr-2">Language:</span>
              {"English"}
            </li>
            <li className="text-zinc-500 my-2">
              <span className="text-zinc-600 mr-2">Country:</span>
              {"Uzbekistan"}
            </li>
          </ul>
        </div>
      </div> */}
    </LayoutP>
  );
};

export default MyInfor;
