import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AllProductList = () => {
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const fetchData = async () => {
    // const { products } = await axios.get("http://localhost:5000/api/travel");
    // setProducts(products);
    try {
      fetch("http://localhost:5000/products", {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((data) => setProducts(data.products));
    } catch (err) {
      console.log(err);
    }
  };
  const deleteHandler = async (e) => {
    e.preventDefault();
    try {
      fetch(`http://localhost:5000/product/delete/${id}`, {
        method: "delete",
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      }).then((data) => {
        if (data.err) {
          toast.error(data.err);
        } else {
          toast.success("Deleted");
          // navigate("/");
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
  console.log(products);
  return (
    <div className="w-full lg:w-5/6">
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-max w-full table-auto rounded-lg">
          <thead>
            <tr className="bg-gray-300 text-gray-900 text-sm rounded-t-lg leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-center">CreatedBy</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {products
              .map((product, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {product.name}
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
                      <Link to={`/product/${product._id}`} className="cursor-pointer w-5 mr-3 transform hover:text-purple-500 hover:scale-110">
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
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </div>
                      </Link>
                      <form onSubmit={deleteHandler}>
                        <button
                          onClick={() => setId(product._id)}
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
                      </form>
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
