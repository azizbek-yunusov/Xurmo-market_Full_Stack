import { Rate, Tooltip } from "antd";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../api";
import useAddCart from "../../hooks/useAddCart";
import { getUser, refreshToken } from "../../redux/actions/authAction";

const ProductCard = (props) => {
  const { _id, name, images, price, ratings } = props;
  const { access_token } = useSelector((state) => state.auth);
  const { addToCartHandle, cart, deleteHandle } = useAddCart(access_token);

  // const dispatch = useDispatch();

  // const { user, access_token } = useSelector((state) => state.auth);
  // const { cart } = user;
  // const addToCartHanle = state.userAPI.addToCartHanle;
  // const deleteHandler = state.userAPI.deleteHandler;
  // const [cart] = state.userAPI.cart;
  // const existItem = cart.find((x) => x.productId._id === _id);
  // const isCart = existItem === undefined ? false : true;
  return (
    <>
      <div className="overflow-hidden flex tranistion_normal hover:shadow-xl flex-col justify-between h-[400px] border border-gray-200 hover:border-gray-50 rounded-2xl p-3 px-4">
        <div className="">
          <Link
            to={`/product/view/${_id}`}
            className="flex justify-center items-center"
          >
            <img className="h-44" src={images[0].url} alt="" />
          </Link>
          <div className="w-full mt-1">
            <h1 className="md:text-base font-semibold global-font">{name}</h1>
          </div>
        </div>
        <div className="w-full">
          <p className="md:text-lg font-semibold">{price}$</p>

          <div className="flex mt-2">
            <h1 className="text-base text-gray-700 mr-2">
              {ratings?.toFixed(1)}
            </h1>
            <Rate className="text-base" disabled allowHalf value={ratings} />
          </div>
        </div>
        <div className="w-full flex justify-between items-center px-2">
          <button className="p-1 rounded-full border-none mr-4 border-gray-400">
            {/* <BsHeartFill className=" text-[26px] text-gray-400" /> */}
            <BsHeart className="text-[32px] text-gray-400" />
          </button>
          {/* {isCart ? (
          <div className="flex justify-between px-3 items-center border-2 border-[#01f736] py-[6px] w-full rounded-3xl text-lg transition_normal hover:border-blue-500">
            <Tooltip title="remove from cart">
              <button
                onClick={() => deleteHandler(existItem.productId._id)}
                className="text-gray-600 px-4 py-1"
              >
                <AiOutlineMinus />
              </button>
            </Tooltip>
            <p className="font-mono text-lg">{existItem.quantity}</p>
            <Tooltip title="Increase by one">
              <button
                onClick={() => addToCartHanle(_id)}
                className=" tranistion_normal  px-4 py-1"
              >
                <AiOutlinePlus />
              </button>
            </Tooltip>
          </div>
        ) : (
          <button
            onClick={() => addToCartHanle(_id)}
            className="border-2 border-[#7a2dff] py-[6px] flex items-center justify-center w-full rounded-3xl hover:text-indigo-600 bg-[#7a2dff] text-lg text-white hover:bg-white transition_normal  hover:border-indigo-500"
          >
            <FiShoppingCart className="text-xl" />
            <span className="ml-2">add to cart</span>
          </button>
        )} */}

          <button
            onClick={() => addToCartHandle(_id)}
            className="border-2 border-red-600 py-[6px] w-full rounded-lg hover:text-red-600 bg-red-600 text-lg text-white hover:bg-white transition_normal  hover:border-red-500"
          >
            add to cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
