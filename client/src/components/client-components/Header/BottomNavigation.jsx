import { useScrollTrigger } from "@mui/material";
import React from "react";
import { BiHomeAlt } from "react-icons/bi";
import { MdManageSearch } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AuthButton, UserButton } from "../Buttons";
import { Cart } from "../Cart";
import { FavoritesButton } from "../Wish";

const BottomNavigation = () => {
  const { isLogged } = useSelector((state) => state.auth);
  const scroll = useScrollTrigger();
  return (
    <>
      {!scroll ? (
        <div className="lg:hidden block w-full rounded-t-3xl z-50 bg-gray-300/50 backdrop-blur-md fixed left-0 bottom-0 shadow-xl">
          <div className="container-full flex_betwen px-8 py-4 text-gray-700">
            <Link to={"/"}>
              <BiHomeAlt className="text-xl" />
            </Link>
            <MdManageSearch className="text-xl" />
            <FavoritesButton className="text-xl" />
            <Cart />
            {isLogged ? <AuthButton /> : <UserButton />}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default BottomNavigation;
