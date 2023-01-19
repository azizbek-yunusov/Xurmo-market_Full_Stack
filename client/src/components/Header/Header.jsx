import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FavoritesButton from "../Wish/FavoritesButton";
import SearchBox from "../Search/SearchBox";
import AuthButton from "../Buttons/AuthButton";
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart";
import UserButton from "../Buttons/UserButton";

function useIsScrollTop() {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    function onScroll() {
      setIsTop(window.scrollY <= 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return isTop;
}
const Header = () => {
  const { isLogged, isAdmin, user } = useSelector((state) => state.auth);
  const isTop = useIsScrollTop();

  return (
    <>
      {isLogged && isAdmin ? null : (
        <div
          className={`bg-white w-full tranistion_normal ${
            isTop
              ? ""
              : "fixed top-0 right-0 w-full z-50 border-b shadow-xl border-b-gray-300"
          }`}
        >
          <div className="container-full grid grid-cols-12 md:py-4">
            <div className="col-span-3 flex justify-start items-center">
              <Link
                to="/"
                className="text-red-600 md:text-3xl font-bold global-font"
              >
                logoipsum
              </Link>
            </div>
            <div className="col-span-6 flex justify-center items-center">
              <SearchBox />
            </div>
            <div className="col-span-3 flex justify-end items-center">
              <ul className="flex justify-between items-center my-1">
                <li className="mx-4">
                  <FavoritesButton />
                </li>
                <li className="mx-4">
                  <Cart cart={user.cart} />
                </li>
                <li className="mx-4 -mt-1">
                  {isLogged ? <AuthButton /> : <UserButton />}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
