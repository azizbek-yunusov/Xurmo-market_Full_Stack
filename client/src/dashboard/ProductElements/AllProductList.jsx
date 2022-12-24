import moment from "moment";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Tooltip, Button, Avatar, Checkbox } from "@material-tailwind/react";
import { FiEdit } from "react-icons/fi";
import DataTableLoader from "../../components/SkeletonLoaders/DataTableLoader";

const AllProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    const { data } = await axios.get("/products", {
      headers: { Authorization: localStorage.getItem("jwt") },
    });
    setProducts(data.products);
    setLoading(false);
  };
  const deleteHandler = async (id) => {
    try {
      fetch(`http://localhost:5000/product/${id}`, {
        method: "delete",
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      }).then((data) => {
        if (data.err) {
        } else {
          toast.success("Deleted product");
          fetchData();
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full px-5">
      {loading ? (
        <DataTableLoader />
      ) : (
        <>
          <div className="bg-white dark:bg-[#2e2d4a] rounded-lg overflow-hidden my-6 border border-gray-300">
            <Link
              to={"/product/create"}
              className="w-full flex items-center justify-end"
            >
              <Tooltip content="Add new product">
                <Button variant="gradient" className="my-2 mx-2">
                  create product
                </Button>
              </Tooltip>
            </Link>
            <table className="min-w-max w-full table-auto rounded-lg ">
              <thead>
                <tr className="bg-gray-100 dark:bg-[#232338] text-gray-700 dark:text-gray-200 text-sm rounded-t-lg leading-normal">
                  <th className="py-3 px-6 text-left">
                    <Checkbox /> Name
                  </th>
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
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 hover:dark:bg-gray-600"
                    >
                      <td className="py-3 px-3 whitespace-nowrap">
                        <div className="flex justify-start items-center">
                          <Checkbox />
                          <div className="mr-2">
                            <img
                              className="w-10 h-10 rounded"
                              src={product.images[0].url}
                              alt=""
                            />
                          </div>
                          <span className="mr-2">
                            {product.name.slice(0, 40)}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {product.price}
                        {"$"}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex justify-center items-center">
                          <div className="mr-2">
                            <Avatar
                              src="https://www.material-tailwind.com/img/face-2.jpg"
                              alt="avatar"
                              size="sm"
                            />
                          </div>
                          <span className="mr-2">
                            {product.createdBy
                              ? product.createdBy.name
                              : "deleted account"}
                          </span>
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
        </>
      )}
    </div>
  );
};

export default AllProductList;
