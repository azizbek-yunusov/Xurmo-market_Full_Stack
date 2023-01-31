import moment from "moment";
import React from "react";
import { AiFillCalendar } from "react-icons/ai";
import { MdLocationOn, MdVerifiedUser } from "react-icons/md";
import { useSelector } from "react-redux";

const CabinetTop = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-white shadow-lg rounded-xl p-2 relative">
      <div className="-z-20">
        <img
          src="/images/profilebg.png"
          className="h-64 rounded-md w-full "
          alt="Bg"
        />
      </div>
      <div className="flex justify-between">
        <div className="px-8 pb-5">
          <div className="z-40 absolute top-64 left-10 bg-white p-[6px] max-w-max rounded-2xl -mt-14">
            <img src={user.avatar.url || "/images/profile.png"} className="h-36 w-36 object-cover rounded-xl" alt="" />
          </div>
          <div className="flex flex-col pl-48">
            <h1 className="text-2xl mt-6 mb-3 text-gray-700 font-semibold">
              {user.name}
            </h1>
            <div className="flex items-center">
              <p className="flex text-gray-400 mr-5">
                <MdVerifiedUser className="text-xl mr-1" />
                Admin
              </p>
              <p className="flex text-gray-400 mr-5">
                <MdLocationOn className="text-xl mr-1" />
                Uzbekistan
              </p>
              <p className="flex text-gray-400">
                <AiFillCalendar className="text-xl mr-1" />
                {moment(user.createdAt).format("LL")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabinetTop;
