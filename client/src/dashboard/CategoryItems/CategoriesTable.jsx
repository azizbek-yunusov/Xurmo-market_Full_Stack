import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Layout from '../Layout'

const CategoriesTable = () => {
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState("");
  const fetchData = async () => {
    try {
      fetch("http://localhost:5000/categories", {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((data) => setCategories(data.categories));
    } catch (err) {
      console.log(err);
    }
  };
  const deleteBanner = async (e) => {
    e.preventDefault();
    try {
      fetch(`http://localhost:5000/category/delete/${id}`, {
        method: "delete",
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      }).then((data) => {
        if (data.err) {
          toast.error(data.err);
        } else {
          toast.success("Deleted");
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
    <>
     <Layout>
      <div className="flex items-center flex-col justify-center font-sans">
        <div className="w-full px-5">
          <div className="bg-white shadow-md rounded my-6">
            <Link
              to={"/category/add"}
              className="w-full flex items-center justify-end"
            >
              <button className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 my-2 mx-2 px-10 text-lg text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <AiOutlineUserAdd className="text-2xl mr-2 text-white" />
                Add category
              </button>
            </Link>
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Id</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-center">Created At</th>
                  <th className="py-3 px-6 text-center">Created By</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {categories
                  .map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {item._id}
                      </td>
                      <td className="py-3 px-6 text-left">{item.slug}</td>
                      <td className="text-center">
                        {item.createdAt
                          ? moment(item.createdAt).format("lll")
                          : null}
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
                          <span className="mr-2">{item.createdBy.name}</span>
                          <span>{moment(item.createdAt).format("lll")}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <Link
                            to={`/user/${item._id}`}
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
                          <Link to={`/users/update/${item._id}`}>
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

                          <form onSubmit={deleteBanner}>
                            <button
                              onClick={() => setId(item._id)}
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
      </div>
    </Layout>
    </>
  )
}

export default CategoriesTable