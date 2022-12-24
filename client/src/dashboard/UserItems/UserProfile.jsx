import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout";

const UserProfile = () => {
  const params = useParams();
  const { id: userId } = params;
  const [user, setUser] = useState([]);
  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/user/${userId}`, {
        headers: { Authorization: localStorage.getItem("jwt") },
      });
      setUser(data.user);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(user);

  return (
    <Layout>
      {user ? (
        <section className="text-gray-400 body-font">
          <div className="container px-5 py-10 mx-auto flex flex-col">
            <div className=" mx-auto">
              <div className="flex flex-col sm:flex-row mt-10">
                <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                  <div className="w-20 h-20 rounded-full bg-red-600 inline-flex items-center justify-center  text-gray-600">
                    <img src={user.image} alt="" />
                  </div>
                  <div className="flex flex-col items-center text-center justify-center">
                    <h2 className="font-medium title-font mt-4 text-gray-700 text-lg">
                      {user.name}
                    </h2>
                    <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                    <p className="text-base text-gray-400">
                      Raclette knausgaard hella meggs normcore williamsburg
                      enamel pin sartorial venmo tbh hot chicken gentrify
                      portland.
                    </p>
                  </div>
                </div>
                <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                  <div className="col-span-2">
                    <h1 className="text-2xl font-semibold text-gray-800">
                      Personal Info
                    </h1>
                    <ul className="mt-2 text-gray-700">
                      <li className="flex border-y py-2">
                        <span className="font-bold w-24">Full name:</span>
                        <span className="text-gray-700">{user.name}</span>
                      </li>
                      <li className="flex border-b py-2">
                        <span className="font-bold w-24">Joined:</span>
                        <span className="text-gray-700">
                          10 Jan 2022 (25 days ago)
                        </span>
                      </li>
                      <li className="flex border-b py-2">
                        <span className="font-bold w-24">Mobile:</span>
                        <span className="text-gray-700">(123) 123-1234</span>
                      </li>
                      <li className="flex border-b py-2">
                        <span className="font-bold w-24">Email:</span>
                        <span className="text-gray-700">{user.email}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        "not found"
      )}
    </Layout>
  );
};

export default UserProfile;
