import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import BannerCarousel from "../components/Banner/BannerCarousel";
import CategoryList from "../components/Categories/CategoryList";
import BestProductsList from "../components/ProductItems/BestProductsList";

const Home = () => {
  // const navigate = useNavigate();
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
  const { auth } = useSelector((state) => state);

  return (
    <>
      {auth.isAdmin ? (
        <Navigate to={"/dashboard"} />
      ) : (
        <>
          <Helmet>
            <title data-rh="true">Home page | E-commerce</title>
          </Helmet>
        </>
      )}
      <BannerCarousel />
      <CategoryList />
      <BestProductsList />
    </>
  );
};

export default Home;
