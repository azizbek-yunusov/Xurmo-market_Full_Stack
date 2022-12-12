import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { toast } from "react-toastify";

const BasketList = () => {
  const [id, setId] = useState("");
  const [cart, setCart] = useState([]);
  const fetchCart = async () => {
    try {
      const { data } = await axios.get("/mycart", {
        headers: { Authorization: localStorage.getItem("jwt") },
      });
      setCart(data);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`/cart/remove/${id}`, {
        headers: { Authorization: localStorage.getItem("jwt") },
      });
      fetchCart();
      toast.success("data");
    } catch (err) {
      console.log(err);
    }

    // try {
    //   await fetch(`http://localhost:5000/cart/remove/${id}`, {
    //     method: "delete",
    //     headers: {
    //       Authorization: localStorage.getItem("jwt"),
    //     },
    //   }).then((data) => {
    //     toast.success("Deleted");
    //     fetchCart();
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  };
  useEffect(() => {
    fetchCart();
  }, []);
  console.log(`http://localhost:5000/cart/remove/${id}`);
  return (
    <>
      {cart.length ? (
        <div className="container-full grid grid-cols-12 gap-5 min-h-screen">
          <div className="col-span-8 border border-gray-200 p-5 md:rounded-2xl">
            <h1 className="md:text-2xl mb-5">Shopping cart</h1>
            <div className="py-3 border-t border-t-gray-200">
              {cart && cart[0]
                ? cart.map((item, index) => (
                    <div key={index} className=" p-1 my-2">
                      <li className="flex lg:py-4 py-3 ease-in-out duration-300 lg:justify-between border-b border-b-gray-200">
                        <div className="lg:h-32 lg:w-32 w-24 h-24 overflow-hidden rounded-md">
                          <img
                            src={item.productId.images[0].url}
                            alt={""}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="flex lg:flex-row lg:justify-between w-full flex-col">
                          <div className="float-left lg:px-0 px-2 lg:ml-5 ml-2">
                            <p className=" md:text-xl font-semibold">
                              {item.productId.name}
                            </p>
                            <p className="font-semibold lg:py-3 p-1 text-lg">
                              {item.productId.price}
                              {"$"}
                            </p>
                          </div>
                          <div className="flex lg:items-end h-min items-center justify-between py-0 lg:flex-col lg:px-0 pl-5">
                            <div className="flex items-center w-max md:justify-center justify-between h-min rounded-md lg:p-1 p-[2px] border">
                              <button className="h-8 rounded-[50%] text-red-600">
                                <AiOutlineMinus />
                              </button>
                              <p className="mx-3">{item.count}</p>
                              <button className="w-8 h-8 rounded-[50%] text-red-600">
                                <AiOutlinePlus />
                              </button>
                            </div>
                            <form onClick={deleteHandler}>
                              <button
                                type="submit"
                                onClick={() => setId(item.productId._id)}
                                className="font-medium flex text-zinc-500 lg:mt-5  rounded-lg lg:px-0 float-right py-2"
                              >
                                <HiOutlineTrash className="md:text-2xl" />
                                {item.productId._id}
                              </button>
                            </form>
                          </div>
                        </div>
                      </li>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className="col-span-4 bg-orange-600">s</div>
        </div>
      ) : (
        <div className="">not cart</div>
      )}
    </>
  );
};

export default BasketList;
