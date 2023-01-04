import axios from "axios";
import toast from "react-hot-toast";

export const signInApi = async (email, password) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post("/signin", { email, password }, config);
    toast.success(data.msg);
  } catch (err) {
    console.log(err);
  }
};
