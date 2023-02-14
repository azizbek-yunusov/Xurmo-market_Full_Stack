import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { SearchBox } from "../Search";
import { FavoritesButton } from "../Wish";
import { Cart } from "../Cart";
import { AuthButton, CatalogButton, Menu, UserButton } from "../Buttons";

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
const Navbar = () => {
  const { isLogged, isAdmin } = useSelector((state) => state.auth);
  const isTop = useIsScrollTop();
  return (
    <>
      {isLogged && isAdmin ? null : (
        <div>
          <div
            className={`bg-white md:block hidden w-full tranistion_normal ${
              isTop
                ? ""
                : "md:fixed top-0 right-0 w-full z-50 border-b shadow-xl border-b-gray-300"
            }`}
          >
            <div className="container-full relative grid grid-cols-12 md:py-[14px] py-1">
              <div className="col-span-3 flex justify-between items-center">
                <Link
                  to="/"
                  className="text-red-600 md:block hidden md:text-3xl text-xl font-bold global-font"
                >
                  logo
                </Link>
                <CatalogButton />
              </div>
              <div className="md:col-span-7 col-span-9 flex justify-center items-center">
                <SearchBox />
              </div>
              <div className="hidden col-span-2 lg:flex justify-end items-center">
                <ul className="flex justify-between items-center my-1">
                  <li className="mx-4">
                    <FavoritesButton />
                  </li>
                  <li className="mx-4">
                    <Cart />
                  </li>
                  <li className="mx-4 -mt-1">
                    {isLogged ? <AuthButton /> : <UserButton />}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`bg-white ${
              isTop
                ? ""
                : "fixed top-0 right-0 w-full z-50 border-b shadow-xl border-b-gray-300"
            }`}
          >
            <div className="container-full md:hidden flex_betwen my-2">
              <Menu />
              <div className="w-full ml-3">
                <SearchBox />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
