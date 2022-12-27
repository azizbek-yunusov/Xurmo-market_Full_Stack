import axios from "axios";
import { useEffect, useState } from "react";
export default function useAuth() {
  const [auth, setAuth] = useState(false);
  const verifyAuth = async () => {
    try {
      const res = await axios.get("/islogged");
      return res.data;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      const data = await verifyAuth();
      setAuth(data);
    })();
  }, []);

  return { auth };
}
