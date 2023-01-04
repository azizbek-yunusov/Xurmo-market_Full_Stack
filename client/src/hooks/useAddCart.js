// import axios from "axios";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";

// export default function useAddCart(access_token) {
//   const [cart, setCart] = useState([]);
//   const fetchCart = async () => {
//     try {
//       const { data } = await axios.get("/mycart", {
//         headers: { Authorization: access_token },
//       });
//       setCart(data);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   const addToCartHandle = async (id) => {
//     try {
//       if (access_token) {
//         fetch(`http://localhost:5000/addcart/${id}`, {
//           method: "put",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: access_token,
//           },
//         });
//         fetchCart();
//         toast.success("add to cart");
//       } else {
//         toast.error("You must register");
//       }
//     } catch (error) {
//       toast.error(error);
//     }
//   };

//   useEffect(() => {
//     if (access_token) {
//       fetchCart();
//     }
//   }, [access_token]);
//   console.log(cart);
//   return { addToCartHandle, cart };
// }
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function useAddCart(access_token) {
  const [cart, setCart] = useState([]);
  const fetchCart = async () => {
    try {
      const { data } = await axios.get("/mycart", {
        headers: { Authorization: access_token },
      });
      setCart(data);
    } catch (err) {
      console.log(err);
    }
  };
  const addToCartHandle = async (id) => {
    try {
      if (access_token) {
        fetch(`http://localhost:5000/addcart/${id}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: access_token,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            toast.success("Add to cart this product");
            fetchCart();
          });
      } else {
        toast.error("You must register");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const deleteHandle = async (id) => {
    try {
      const { data } = await axios.delete(`/cart/${id}`, {
        headers: { Authorization: access_token },
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
        Authorization: access_token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        fetchCart();
        toast.success("Your order has been accepted");
      });
  };
  useEffect(() => {
    if (access_token) {
      fetchCart();
    }
  }, [access_token]);
  return {
    cart,
    addToCartHandle,
    deleteHandle,
    newOrder,
  };
}

export default useAddCart;
