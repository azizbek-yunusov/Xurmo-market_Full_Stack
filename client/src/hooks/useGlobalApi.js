import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart, getUserInfor } from "../redux/actions/userAction";
import { useTranslation } from "react-i18next";

function useGlobalApi(access_token) {
  const dispatch = useDispatch();
  let { t } = useTranslation(["profile"]);

  const fetchUser = async () => {
    try {
      // dispatch(getUserInfor(access_token));
    } catch (err) {
      console.log(err);
    }
  };
  const addToCartHandle = async (id) => {
    try {
      if (access_token) {
        dispatch(addToCart(id, access_token));
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
  const decrementQtyItem = async (id) => {
    try {
      const { data } = await axios.delete(`/decr/${id}`, {
        headers: { Authorization: access_token },
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        fetchUser();
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
        fetchUser();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Wish
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
            fetchUser();
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
        fetchUser();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (access_token) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access_token]);
  return {
    addToCartHandle,
    decrementQtyItem,
    deleteHandle,
    addToFavorite,
    deleteFavoriteItem,
  };
}

export default useGlobalApi;
