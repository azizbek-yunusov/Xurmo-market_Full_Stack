import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

function useGlobalApi(access_token) {
  const dispatch = useDispatch();

  const fetchCart = async () => {
    try {
      const res = await axios.get("/mycart", {
        headers: { Authorization: access_token },
      });
      dispatch({ type: "GET_CART", payload: res.data });
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
  const decrementQtyItem = async (id) => {
    try {
      const { data } = await axios.delete(`/decr/${id}`, {
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

  // Wish
  const fetchFavorites = async () => {
    try {
      const res = await axios.get("/favorites", {
        headers: { Authorization: access_token },
      });
      dispatch({ type: "GET_FAVORITES", payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
  const addToFavorite = async (id) => {
    try {
      if (access_token) {
        fetch(`http://localhost:5000/fovorite/${id}`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: access_token,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            toast.success("Add to favorites item");
            fetchFavorites();
          });
      } else {
        toast.error("You must register");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const deleteFavoriteItem = async (id) => {
    try {
      const { data } = await axios.delete(`/fovorite/${id}`, {
        headers: { Authorization: access_token },
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        fetchFavorites();
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (access_token) {
      fetchCart();
      fetchFavorites();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access_token]);
  return {
    addToCartHandle,
    decrementQtyItem,
    deleteHandle,
    newOrder,
    addToFavorite,
    deleteFavoriteItem,
  };
}

export default useGlobalApi;
