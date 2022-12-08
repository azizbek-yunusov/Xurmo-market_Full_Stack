import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiOutlineFolderAdd } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEdit } from "react-icons/fi";

const AllProductList = () => {
  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    const { data } = await axios.get("/products", {
      headers: { Authorization: localStorage.getItem("jwt") },
    });
    setProducts(data.products);
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`/product/delete/${id}`, {
        headers: { Authorization: localStorage.getItem("jwt") },
      });
      if (data.error) {
        toast.error(data.err);
      } else {
        fetchData();
        toast.success("Deleted");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(products);
  return (
    <div className="w-full px-5">
      <div className="bg-white dark:bg-[#2e2d4a] shadow-md rounded my-6">
        <Link
          to={"/product/create"}
          className="w-full flex items-center justify-end"
        >
          <button className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 my-2 mx-2 px-10 text-lg text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <AiOutlineFolderAdd className="text-2xl mr-2 text-white" />
            Create
          </button>
        </Link>
        <table className="min-w-max w-full table-auto rounded-lg">
          <thead>
            <tr className="bg-gray-300 dark:bg-[#232338] text-gray-900 dark:text-gray-200 text-sm rounded-t-lg leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-center">CreatedBy</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 dark:text-gray-300 text-sm font-light">
            {products
              .map((product, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 whitespace-nowrap">
                    <div className="flex justify-start items-center">
                      <div className="mr-2">
                        <img
                          className="w-7 h-7 rounded-lg"
                          src={product.image}
                          alt=""
                        />
                      </div>
                      <span className="mr-2">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    {product.price}
                    {"$"}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex justify-center items-center">
                      <div className="mr-2">
                        <img
                          className="w-6 h-6 rounded-full"
                          src="https://randomuser.me/api/portraits/men/1.jpg"
                          alt=""
                        />
                      </div>
                      <span className="mr-2">{product.createdBy.name}</span>
                      <span>{moment(product.createdAt).format("lll")}</span>
                      {/* <span>{product.createdAt.toDateString()}</span> */}
                    </div>
                  </td>

                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center">
                      <Link
                        to={`/product/${product._id}`}
                        className="cursor-pointer w-5 mr-3 transform hover:text-purple-500 hover:scale-110"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </Link>
                      <Link to={`/product/update/${product._id}`}>
                        <div className="cursor-pointer w-5 mr-3 transform hover:text-purple-500 hover:scale-110">
                          <FiEdit className="text-lg" />
                        </div>
                      </Link>
                      <button
                        type="submit"
                        onClick={() => deleteHandler(product._id)}
                        className="cursor-pointer w-5 mr-3 transform hover:text-purple-500 hover:scale-110"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
              .reverse()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProductList;
