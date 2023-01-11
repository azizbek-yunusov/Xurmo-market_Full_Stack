import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { sidebarProfile } from "../../data/sidebar";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/actions/authAction";
import toast from "react-hot-toast";

const SideBarPf = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathname = useLocation();
  const signOutHandle = () => {
    dispatch(signOut());
    navigate("/signin");
    toast.success("Sign out ");
  };
  return (
    <div className="">
      <div className="col-span-4 sticky top-5">
        <div className="flex flex-col justify-between sticky top-5">
          {sidebarProfile.map((item, index) => (
            <Link key={index} to={`${item.path}`}>
              <div
                className={`flex items-center md:my-3 ${
                  pathname === item.path
                    ? "profile-active"
                    : "profile-link"
                }`}
              >
                {item.icon}
                <p className="ml-2 md:text-xl">{item.name}</p>
              </div>
            </Link>
          ))}
          <div
            onClick={signOutHandle}
            className="flex items-center md:my-5 text-red-500 cursor-pointer"
          >
            <FiLogOut className="md:text-2xl ml-4" />
            <p className="ml-2 md:text-xl">Sign out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarPf;
