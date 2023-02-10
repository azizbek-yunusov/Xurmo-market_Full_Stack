import React from "react";
import LayoutP from "./LayoutP";
import { BiCheck, BiPhone, BiShieldQuarter, BiUser } from "react-icons/bi";
import { GoMail } from "react-icons/go";
import { MdLanguage } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { useSelector } from "react-redux";

const OverView = () => {
  const { name, email } = useSelector((state) => state.auth.user);
  return (
    <>
      <LayoutP>
        <div className="grid grid-cols-3 gap-x-5">
          <div className="col-span-1 bg-white border_l rounded-lg p-5">
            <h1 className="text-gray-400 mb-2">About</h1>
            <div className="">
              <ul className="border-t border-t-gray-200">
                <li className="text-zinc-500 dark:text-zinc-400 my-3 flex items-center">
                  <BiUser className="mr-1 text-lg" />
                  <span className="text-zinc-500 font-semibold dark:text-zinc-100 mr-2">
                    Full name:
                  </span>
                  {name}
                </li>
                <li className="text-zinc-500 dark:text-zinc-400 my-3 flex items-center">
                  <GoMail className="mr-1 text-lg" />
                  <span className="text-zinc-500 font-semibold dark:text-zinc-100 mr-2">
                    Email:
                  </span>
                  {email}
                </li>
                <li className="text-zinc-500 dark:text-green-400 my-3 flex items-center">
                  <BiCheck className="mr-1 text-lg" />
                  <span className="text-zinc-500 font-semibold dark:text-zinc-100 mr-2">
                    Status:
                  </span>
                  {"active"}
                </li>
                <li className="text-zinc-500 dark:text-zinc-400 my-3 flex items-center">
                  <BiShieldQuarter className="mr-1 text-lg" />
                  <span className="text-zinc-500 font-semibold dark:text-zinc-100 mr-2">
                    Role:
                  </span>
                  Client
                </li>
                <li className="text-zinc-500 dark:text-zinc-400 my-3 flex items-center">
                  <BiPhone className="mr-1 text-lg" />
                  <span className="text-zinc-500 font-semibold dark:text-zinc-100 mr-2">
                    Contact:
                  </span>
                  {"+1 (479) 232-9151"}
                </li>
                <li className="text-zinc-500 dark:text-zinc-400 my-3 flex items-center">
                  <MdLanguage className="mr-1 text-lg" />
                  <span className="text-zinc-500 font-semibold dark:text-zinc-100 mr-2">
                    Language:
                  </span>
                  {"English"}
                </li>
                <li className="text-zinc-500 dark:text-zinc-400 my-3 flex items-center">
                  <SlLocationPin className="mr-1 text-lg" />
                  <span className="text-zinc-500 font-semibold dark:text-zinc-100 mr-2">
                    Country:
                  </span>
                  {"Uzbekistan"}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-2 bg-white border_l rounded-lg p-5">no data</div>
        </div>
      </LayoutP>
    </>
  );
};

export default OverView;
