import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../reducers/useReducer";
import Cart from "../Cart/Cart";
import UserButton from "../Buttons/UserButton";
import FavoritesButton from "../Buttons/FavoritesButton";
import SearchBox from "../Search/SearchBox";
import AuthButton from "../Buttons/AuthButton";

const Header = () => {
  const { state } = useContext(UserContext);
  const { userInfo } = state;

  return (
    <>
      {userInfo && userInfo.admin ? null : (
        <div className="md:my-2">
          <div className="container-full grid grid-cols-12 md:py-4">
            <div className="col-span-3 flex justify-start items-center">
              <Link to="/" className="text-red-600 md:text-4xl font-bold">
                Logo
              </Link>
            </div>
            <div className="col-span-6 flex justify-center items-center">
              <SearchBox />
            </div>
            <div className="col-span-3 flex justify-end items-center">
              <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
                {/* {userNavigation()} */}
                <FavoritesButton />
                <Cart />
                {userInfo ? <AuthButton /> : <UserButton />}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
