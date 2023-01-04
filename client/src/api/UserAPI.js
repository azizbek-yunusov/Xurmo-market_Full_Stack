import { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function UserAPI(token) {
  const [cart, setCart] = useState([]);
  const fetchCart = async () => {
    try {
      const { data } = await axios.get("/mycart", {
        headers: { Authorization: token },
      });
      setCart(data);
    } catch (err) {
      console.log(err);
    }
  };
  const addToCartHanle = async (id) => {
    try {
      if (token) {
        fetch(`http://localhost:5000/addcart/${id}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            toast.success("add to cart +1");
            fetchCart();
          });
      } else {
        toast.error("You must register");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`/cart/${id}`, {
        headers: { Authorization: token },
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

  const newOrder = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/order", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
        } else {
          fetchCart();
          toast.success("Your order has been accepted");
        }
      });
  };
  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, []);
  return {
    cart: [cart, setCart],
    addToCartHanle,
    deleteHandler,
    newOrder,
  };
}

export default UserAPI;
