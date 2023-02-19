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
      setIsTop(window.scrollY <= 50);
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
        <>
          <div
            className={`bg-white lg:block hidden w-full tranistion_normal ${
              isTop
                ? ""
                : "md:sticky top-0 w-full z-50 border-b md:drop-shadow-md  shadow-sm border-b-gray-300"
            }`}
          >
            <div className="container-full  grid lg:grid-cols-12 md:pb-2 md:pt-[14px] py-1">
              <div className="col-span-3 flex justify-between items-center">
                <Link
                  to="/"
                  className="text-red-600 lg:block hidden md:text-3xl text-xl font-bold global-font"
                >
                  logo
                </Link>
                <CatalogButton />
              </div>
              <div className="lg:col-span-6 col-span-9 flex justify-end items-center">
                <SearchBox />
              </div>
              <div className="hidden lg:col-span-3 lg:flex justify-end items-center">
                <ul className="flex justify-between items-center my-1">
                  <li className="lg:mr-3 xl:mr-6">
                    <FavoritesButton />
                  </li>
                  <li className="lg:mx-3 xl:mx-6">
                    <Cart />
                  </li>
                  <li className="xl:mx-4 ml-3 -mt-1">
                    {isLogged ? <AuthButton /> : <UserButton />}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`bg-white lg:hidden ${
              isTop
                ? ""
                : "sticky top-0 w-full z-50 border-b  shadow-xl border-b-gray-300"
            }`}
          >
            <div className="container-full  flex_betwen my-2 py-[2px]">
              <Menu />
              <div className="w-full ml-3">
                <SearchBox />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;