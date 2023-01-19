import React from "react";
import { useSelector } from "react-redux";
import LayoutP from "./LayoutP";

const MyInfor = () => {
  const { auth, address } = useSelector((state) => state);
  return (
    <LayoutP>
      {/* <div className="">
        <div className="">
          <img
            src={ProfileBg}
            className="h-[180px] w-full rounded-t-xl"
            alt=""
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex">
          <div className="z-10 overflow-hidden rounded-full max-w-max bg-white -mt-12 ml-10">
            <img
              className="h-40 md:rounded-full p-[6px]"
              src="https://demos.themeselection.com/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png"
              alt=""
            />
          </div>
          <div className="ml-3">
            <h1 className="md:text-2xl text-gray-900 font-semibold my-3 ">
              {auth.user.name}
            </h1>
            <div className="flex items-center bg-light-green-100 rounded-md p-1 px-2">
              <MdLocationOn className="text-xl text-gray-800" />
              <p className=" font-semibold text-gray-800">
                {address[0].region}
                {", "}
                {address[0].district}
                {", "}
                {address[0].street}
              </p>
            </div>
          </div>
        </div>
        <div className="md:my-3">
          <Button size="md" color="pink" variant="gradient" className="w-40 flex_center">
            <div className="flex items-center">
              <MdModeEditOutline className="text-base mx-1" />
              <span>Edit Profile</span>
            </div>
          </Button>
        </div>
      </div> */}
    </LayoutP>
  );
};

export default MyInfor;
