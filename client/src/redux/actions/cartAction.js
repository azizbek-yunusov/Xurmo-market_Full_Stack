import axios from "axios";
import toast from "react-hot-toast";

export const addToCart = (id, access_token) => async (dispatch) => {
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
        .then((data) => {
          dispatch({ type: "GET_CART", payload: data.client.cart });
          toast.success("Add to cart this product");
        });
    }
    if (access_token === undefined) {
      window.location.reload();
    } else if (access_token === "") {
      toast.error("You must register");
    }
  } catch (error) {
    toast.error(error);
  }
};

export const deleteFromCart = (id, access_token) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/cart/${id}`, {
      headers: { Authorization: access_token },
    });
    if (data.error) {
      toast.error(data.error);
    } else {
      // dispatch({ type: "GET_CART", payload: data.cart });
      toast.success("Deleted");
    }
  } catch (err) {
    console.log(err);
  }
};
