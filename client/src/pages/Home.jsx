import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../reducers/useReducer";

const Home = () => {
  const { state, dispatch } = useContext(UserContext);
  // const navigate = useNavigate();
  const { userInfo } = state;
  // const [products, setProducts] = useState([]);
  // const fetchData = () => {
  //   fetch("http://localhost:5000/products", {
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log());
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      {userInfo && userInfo.admin ? (
        <Navigate to={"/dashboard"} />
      ) : (
        <div className="">Home</div>
      )}
    </>
  );
};

export default Home;
