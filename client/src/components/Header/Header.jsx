import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../reducers/useReducer";
import Cart from "../Cart/Cart";
import UserButton from "../Buttons/UserButton";
import FavoritesButton from "../Buttons/FavoritesButton";
import SearchBox from "../Search/SearchBox";
import AuthButton from "../Buttons/AuthButton";

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
const Header = (props) => {
  const {cart} = props
  const { state } = useContext(UserContext);
  const { userInfo } = state;
  const isTop = useIsScrollTop();
  return (
    <>
      {userInfo && userInfo.admin ? null : (
        <div
          className={`bg-white w-full tranistion_normal ${
            isTop
              ? ""
              : "fixed top-0 left-0 w-full z-50 bg-slate-50 border-b shadow-xl border-b-gray-300"
          }`}
        >
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
              <ul className="flex justify-between items-center my-1">
                <li className="mx-4">
                  <FavoritesButton />
                </li>
                <li className="mx-4">
                  <Cart cart={cart} />
                </li>
                <li className="mx-4 -mt-1">
                  {userInfo ? <AuthButton /> : <UserButton />}
                </li>
              </ul>
              {/* {userNavigation()} */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
