import React from "react";
import { Link } from "react-router-dom";

const AutoComplate = ({ filteredData, clearFilter, query }) => {
  return (
    <>
      {filteredData.length !== 0 && (
        <>
          <div className="block lg:w-[500px] md:w-[420px] mt-[2px] rounded-lg shadow-md text-left overflow-hidden z-20 max-h-96 absolute left-0 top-11 bg-white">
            <Link
              to={`/product/`}
              onClick={clearFilter}
              className="cursor-pointer py-2 w-full px-5 hover:bg-gray-100 flex items-center"
            >
              <p className="ml-5">"{query}" qidirish </p>
            </Link>
            {filteredData.slice(0, 20).map((value, key) => {
              return (
                <Link
                  to={`/product/${value._id}`}
                  onClick={clearFilter}
                  className="cursor-pointer py-2 w-full px-5 hover:bg-gray-100 flex items-center"
                  key={key}
                >
                  <img
                    src={value.images[0].url}
                    alt={value.name}
                    width="40"
                    height="40"
                  />
                  <p className="ml-5">{value.name}</p>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default AutoComplate;
