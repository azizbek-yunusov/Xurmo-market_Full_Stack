import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import BannerCarousel from "../components/Banner/BannerCarousel";
import CategoryList from "../components/Categories/CategoryList";
import { UserContext } from "../reducers/useReducer";

const Home = () => {
  const { state } = useContext(UserContext);
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
        <>
          <BannerCarousel />
          <CategoryList />
        </>
      )}
    </>
  );
};

export default Home;
