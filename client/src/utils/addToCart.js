import axios from "axios";
import toast from "react-hot-toast";

export const addCart = async (id) => {
  console.log(id);
  try {
    await axios.patch(`/addcart/${id}`, {
      headers: { Authorization: localStorage.getItem("jwt") },
    });
    toast.success("added to cart");
  } catch (err) {
    console.log(err);
  }
};
