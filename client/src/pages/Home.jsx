import React from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import BannerCarousel from "../components/Banner/BannerCarousel";
import CategoryList from "../components/Categories/CategoryList";
import BestProductsList from "../components/ProductItems/BestProductsList";

const Home = () => {
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
