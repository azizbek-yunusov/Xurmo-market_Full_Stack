import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../reducers/useReducer";

const TopLink = () => {
  const { state } = useContext(UserContext);
  const { userInfo } = state;
  return (
    <>
      {userInfo && userInfo.admin ? null : (
        <div className="w-full primary_bg">
          <div className="container-full py-[10px] flex items-center justify-between">
            <div className="flex justify-between items-center">
              <Link className="bg-slate-50 mr-4 text-center rounded-xl px-2 py-1 text-red-600">
                0% Muddatli to'lov
              </Link>
              <Link className="border-2 mr-6 text-center border-white rounded-xl px-2 py-1 text-white">
                Chegirmalar
              </Link>
              <Link className="text-white">Sayt xaritasi</Link>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xl mr-5 font-semibold text-white">
                +998 (71) 202 20 21
              </p>
              <Link className="border-2 mr-8 text-center border-white rounded-xl px-2 py-1 text-white">
                olcha da soting
              </Link>
              <div className="flex justify-between items-center">
                <Link className="text-white text-lg mr-6">Ўзб</Link>
                <Link className="text-white text-lg mr-6">Ўзб</Link>
                <Link className="text-white text-lg">Ўзб</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopLink;
