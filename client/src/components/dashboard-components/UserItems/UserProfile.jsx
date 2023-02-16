import { Chip } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { HelmetTitle } from "../../../utils";
import { Layout } from "../Layouts";

const UserProfile = () => {
  const { access_token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);


  const params = useParams();
  const { id: userId } = params;
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/user/${userId}`, {
        headers: { Authorization: access_token },
      });
      setUser(data.user);
      setLoading(false)
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
    <>
      <HelmetTitle title={"User Profile"} />
      <Layout>
        {!loading ?  <div className="grid grid-cols-12 gap-5 mx-5 my-5">
          <div className="col-span-4 border p-5 bg-white dark:bg-[#2e2d4a] border-gray-300 dark:border-gray-700 rounded-xl  flex flex-col">
            <div className="flex flex-col items-center mt-10">
              <img
                src={user?.avatar.url || "hhss"}
                className="w-28 h-28 rounded-xl"
                alt=""
              />
              <h1 className="text-2xl my-3 text-zinc-600 dark:text-zinc-100 font-medium">
                {user?.name}
              </h1>
              <Chip label="Client" size="small" color="success" />
            </div>
            <div className="mt-8">
              <h1 className="text-2xl my-3 text-zinc-600 dark:text-zinc-100">
                Details
              </h1>
              <ul className="border-t border-t-gray-300">
                <li className="text-zinc-500 dark:text-zinc-400 my-2">
                  <span className="text-zinc-600 dark:text-zinc-100 mr-2">
                    Full name:
                  </span>
                </li>
                <li className="text-zinc-500 dark:text-zinc-400 my-2">
                  <span className="text-zinc-600 dark:text-zinc-100 mr-2">
                    Email:
                  </span>
                </li>
                <li className="text-zinc-500 dark:text-green-400 my-2">
                  <span className="text-zinc-600 dark:text-zinc-100 mr-2">
                    Status:
                  </span>
                  {"active"}
                </li>
                <li className="text-zinc-500 dark:text-zinc-400 my-2">
                  <span className="text-zinc-600 dark:text-zinc-100 mr-2">
                    Role:
                  </span>
                </li>
                <li className="text-zinc-500 dark:text-zinc-400 my-2">
                  <span className="text-zinc-600 dark:text-zinc-100 mr-2">
                    Contact:
                  </span>
                  {"+1 (479) 232-9151"}
                </li>
                <li className="text-zinc-500 dark:text-zinc-400 my-2">
                  <span className="text-zinc-600 dark:text-zinc-100 mr-2">
                    Language:
                  </span>
                  {"English"}
                </li>
                <li className="text-zinc-500 dark:text-zinc-400 my-2">
                  <span className="text-zinc-600 dark:text-zinc-100 mr-2">
                    Country:
                  </span>
                  {"Uzbekistan"}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-8 border p-5 bg-white dark:bg-[#2e2d4a] border-gray-300 rounded-xl dark:border-gray-700 flex flex-col">
            s
          </div>
        </div> : <h1 className="">Loading...</h1> }
        
      </Layout>
    </>
  );
};

export default UserProfile;
