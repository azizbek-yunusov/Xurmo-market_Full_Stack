import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/actions/authAction";
import toast from "react-hot-toast";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { Button, IconButton, Input, Tooltip } from "@material-tailwind/react";
import Modal from "antd/es/modal/Modal";

const SideBarPf = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const signOutHandle = () => {
    dispatch(signOut());
    navigate("/signin");
    toast.success("Sign out ");
  };
  const { auth, address } = useSelector((state) => state);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-col justify-between sticky top-56">
      <div className="relative flex items-center flex-col w-[350px] h-[450px] bg-white -mt-28 ml-5 md:py-5 shadow-lg rounded-2xl">
        <div className="absolute top-3 right-3">
          <Tooltip content="Edit">
            <IconButton variant="gradient" onClick={showModal}>
              <BiEdit className="text-xl" />
            </IconButton>
          </Tooltip>
          <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={null}
          width={700}
        >
          <h1 className="w-full global_font text-2xl font-semibold mb-4 text-center">
            Edit 
          </h1>
          <form >
            <div className="md:my-6 grid grid-cols-2 gap-5">
              <Input
                // value={region}
                // onChange={(e) => setRegion(e.target.value)}
                // label={t("shop:region")}
                label="Name"
                size="lg"
              />
              <Input
                // value={district}
                // onChange={(e) => setDistrict(e.target.value)}
                // label={t("shop:district")}
                size="lg"
              />
              <Input
                // value={street}
                // onChange={(e) => setStreet(e.target.value)}
                // label={t("shop:street")}
                size="lg"
              />
              <Input
                // value={house}
                // onChange={(e) => setHouse(e.target.value)}
                // label={t("shop:housenumber")}
                size="lg"
              />
            </div>

            <div className="flex justify-end items-center mt-3">
              <Button
                color="red"
                size="md"
                onClick={handleCancel}
                className="md:mr-3"
              >
                close
              </Button>

              <Button type="submit" size="md" onClick={handleOk}>
                save
              </Button>
            </div>
          </form>
        </Modal>
        </div>
        <div className="z-10 overflow-hidden rounded-full max-w-max bg-white">
          <img
            className="h-40 md:rounded-full p-[6px]"
            src="https://demos.themeselection.com/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png"
            alt=""
          />
        </div>
        <h1 className="md:my-3 md:text-2xl text-gray-900 font-semibold my-3 ">
          {auth.user.name}
        </h1>
        {address.length ? (
          <div className="flex items-center bg-light-green-100 rounded-md p-1 px-2">
            <MdLocationOn className="text-lg text-gray-800" />
            <p className="text-sm font-semibold text-gray-800">
              {address[0].region}
              {", "}
              {address[0].district}
              {", "}
              {address[0].street}
            </p>
          </div>
        ) : null}

        <div className="flex items-center text-base font-semibold text-gray-800 my-2">
          <MdEmail className="text-base mx-1" />
          <span>{auth.user.email}</span>
        </div>
        <Button
          color="red"
          onClick={() => signOutHandle()}
          className="my-3"
          variant="gradient"
        >
          <div className="flex_center">sign out</div>
        </Button>
      </div>
    </div>
  );
};

export default SideBarPf;
