import React, { useEffect, useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { BsCheckCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import LayoutP from "./LayoutP";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { Button, CircularProgress } from "@mui/material";
import NewAddress from "./NewAddress";
import HelmetTitle from "../../../utils/HelmetTitle";
import { deleteAddress } from "../../../redux/actions/addressAction";

const Addresses = () => {
  let { t } = useTranslation(["user"]);
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.auth);
  const { isLoading, addresses } = useSelector((state) => state.address);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const deleteAddressHandle = async (id) => {
    try {
      dispatch(deleteAddress(id, access_token));
      toast.success("delete-address");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (access_token) {
      // fetchAdresses();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access_token]);
  return (
    <LayoutP>
      <HelmetTitle title={`${t("addresses")} - ${t("personal")}`} />
      <div className="flex justify-between items-center md:my-0 my-4">
        <h1 className="md:text-2xl font-semibold">{t("addresses")}</h1>
        <Button
          size="large"
          variant="contained"
          color="secondary"
          onClick={() => handleOpen()}
        >
          {t("new-address")}
        </Button>
        <NewAddress open={open} setOpen={setOpen} />
      </div>
      {!isLoading ? (
        <div className="">
          {addresses.length ? (
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              {addresses.map((item) => (
                <div
                  key={item._id}
                  className="md:p-5 p-3 border-2 shadow-lg rounded-lg border-orange-500"
                >
                  <div className="flex justify-between md:mb-2">
                    <div className="grid grid-cols-2 gap-5">
                      <div className="">
                        <ul className="text-gray-600">
                          <li className="lg:my-2 my-1">
                            {t("region")}
                            {":"}
                          </li>
                          <li className="lg:my-2 my-1">
                            {t("district")}
                            {":"}
                          </li>
                          <li className="lg:my-2 my-1">
                            {t("street")}
                            {":"}
                          </li>
                        </ul>
                      </div>
                      <div className="">
                        <ul className="text-gray-800 font-semibold">
                          <li className="lg:my-2 my-1">{item.region}</li>
                          <li className="lg:my-2 my-1">{item.district}</li>
                          <li className="lg:my-2 my-1">{item.street}</li>
                        </ul>
                      </div>
                    </div>
                    <BiEdit className="cursor-pointer text-3xl text-gray-400" />
                  </div>
                  <div className="flex justify-end items-center md:mt-7 mt-5">
                    <Button
                      size="medium"
                      variant="contained"
                      color="error"
                      sx={{ borderRadius: "6px", marginRight: "8px" }}
                      onClick={() => deleteAddressHandle(item._id)}
                      className="mr-3"
                      startIcon={<BiTrash />}
                    >
                      {t("delete")}
                    </Button>
                    {item.isActive ? (
                      <Button
                        size="medium"
                        variant="contained"
                        className="ml-2"
                        color="secondary"
                        startIcon={<BsCheckCircle />}
                      >
                        {t("default")}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        size="medium"
                        color="inherit"
                        startIcon={<BsCheckCircle />}
                        className="ml-2"
                      >
                        {t("default")}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex_center mt-12">
              <h1 className="md:text-2xl text-xl text-gray-700">
                {t("not-address")}
              </h1>
            </div>
          )}
        </div>
      ) : (
        <CircularProgress />
      )}
    </LayoutP>
  );
};

export default Addresses;
