import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";
import BannerCarousel from "../components/Banner/BannerCarousel";
import CategoryList from "../components/Categories/CategoryList";
import BestProductsList from "../components/ProductItems/BestProductsList";
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
         <Helmet>
        <title data-rh="true">Home page | E-commerce</title>
      </Helmet>
          <BannerCarousel />
          <CategoryList />
          <BestProductsList />
        </>
      )}
    </>
  );
};

export default Home;
