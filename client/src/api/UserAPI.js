import { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../reducers/useReducer";

function UserAPI() {
  const { state } = useContext(UserContext);
  const { userInfo } = state;
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
  const addToCartHanle = async (id) => {
    fetch(`http://localhost:5000/addcart/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        toast.success("add to cart +1");
        fetchCart();
      });
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`/cart/${id}`, {
        headers: { Authorization: localStorage.getItem("jwt") },
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        fetchCart();
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if(userInfo) {
      fetchCart();

    }
  }, [userInfo]);

  return {
    cart: [cart, setCart],
    addToCartHanle: addToCartHanle,
    deleteHandler: deleteHandler,
  };
}

export default UserAPI;
