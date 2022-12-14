import { Rate, Tooltip } from "antd";
import React, { useContext } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";
import { Link } from "react-router-dom";
import { UserContext } from "../../reducers/useReducer";

const ProductCard = (props) => {
  const { _id, name, images, price, ratings } = props;
  const { state, dispatch } = useContext(UserContext);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === _id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    dispatch({ type: "ADD_TO_CART", payload: { ...item, quantity } });
  };
  const existItem = cartItems.find((x) => x._id === _id);
  const isCart = existItem === undefined ? false : true;
  const updateCartHandler = async (item, quantity) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  return (
    <div className="overflow-hidden flex tranistion_normal hover:shadow-xl flex-col justify-between h-[400px] border border-gray-300 rounded-2xl p-3 px-4">
      <div className="">
        <Link
          to={`/product/view/${_id}`}
          className="flex justify-center items-center"
        >
          <img className="h-48" src={images[0].url} alt="" />
        </Link>
        <div className="w-full">
          <h1 className="md:text-base font-semibold">{name}</h1>
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
        {isCart ? (
          <div className="flex justify-between px-3 items-center border-2 border-[#017cf7] py-[6px] w-full rounded-3xl text-lg transition_normal hover:border-red-500">
            {existItem.quantity > 1 ? (
              <button
                onClick={() =>
                  updateCartHandler(
                    existItem,
                    existItem.quantity > 1
                      ? existItem.quantity - 1
                      : existItem.quantity === 1
                  )
                }
                className="tranistion_normal  px-4 py-1"
              >
                <AiOutlineMinus />
              </button>
            ) : (
              <Tooltip title="remove from cart">
                <button
                  onClick={() => removeItemHandler(existItem)}
                  className="text-gray-600 px-4 py-1"
                >
                  <AiOutlineMinus />
                </button>
              </Tooltip>
            )}
            <p className="font-mono text-lg">{existItem.quantity}</p>
            <Tooltip title="Increase by one">
              <button
                onClick={() =>
                  updateCartHandler(existItem, existItem.quantity + 1)
                }
                className=" tranistion_normal  px-4 py-1"
              >
                <AiOutlinePlus />
              </button>
            </Tooltip>
          </div>
        ) : (
          <button
            onClick={() =>
              addToCartHandler({ _id, name, images, price, ratings })
            }
            className="border-2 border-indigo-600 py-[6px] w-full rounded-3xl hover:text-indigo-600 bg-indigo-600 text-lg text-white hover:bg-white transition_normal  hover:border-indigo-500"
          >
            add to cart
          </button>
        )}
        {/* <button
          onClick={() =>
            addToCartHandler({ _id, name, images, price, ratings })
          }
          className="border-2 border-red-600 py-[6px] w-full rounded-lg hover:text-red-600 bg-red-600 text-lg text-white hover:bg-white transition_normal  hover:border-red-500"
        >
          add to cart
        </button> */}
      </div>
    </div>
  );
};

export default ProductCard;
