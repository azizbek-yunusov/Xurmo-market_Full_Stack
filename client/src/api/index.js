import toast from "react-hot-toast";

export const addToCart = async (token, id) => {
  try {
    if (token) {
      fetch(`http://localhost:5000/addcart/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      toast.success("add to cart +1");
    } else {
      toast.error("You must register");
    }
  } catch (error) {
    toast.error(error);
  }
};