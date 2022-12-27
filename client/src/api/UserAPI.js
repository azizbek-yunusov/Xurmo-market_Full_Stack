import { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../reducers/useReducer";

function UserAPI() {
  const { state } = useContext(UserContext);
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { userInfo } = state;
  const [cart, setCart] = useState([]);
  const getUser = async () => {
    try {
      const {data} = await axios.get("/infor", {
        headers: { Authorization: localStorage.getItem("jwt") },
      });
      setIsLogged(true);
      console.log(data.userItems);
      data.userItems.admin === true ? setIsAdmin(true) : setIsAdmin(false);
    } catch (err) {
      console.log(err);
    }
  };
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
    try {
      if (userInfo) {
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

  const newOrder = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/order", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
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
    if (userInfo) {
      fetchCart();
      getUser();
    }
  }, [userInfo]);
  console.log(isAdmin);
  console.log(isLogged);
  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addToCartHanle,
    deleteHandler,
    newOrder
  };
}

export default UserAPI;
