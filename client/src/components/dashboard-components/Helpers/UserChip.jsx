import React from "react";

const UserChip = ({ admin }) => {
  return (
    <div className="">
      {admin ? (
        <div className="flex_betwen md:w-full max-w-max px-1 text-sm font-semibold rounded-md bg-green-200 text-green-500">
          {/* <MdCheckCircle className="text-green-500 text-xl mr-1" /> */}
          <span>admin</span>
        </div>
      ) : (
        <div className="flex_betwen w-full px-1 max-w-min text-sm font-semibold rounded-md bg-blue-200 text-blue-500">
          {/* <MdError className="text-red-500 text-xl mr-1" /> */}
          <span>user</span>
        </div>
      )}
    </div>
  );
};

export default UserChip;
