import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { BannerCarousel } from "../components/client-components/Banner";
import BrandsList from "../components/client-components/Brand/BrandList";
import { CategoryList } from "../components/client-components/Categories";
import MobileApp from "../components/client-components/Footer/MobileApp";
import { PostList } from "../components/client-components/Post";
import { BestProductsList } from "../components/client-components/ProductItems";
import { ListBox } from "../components/client-components/TopBrand";
import { getBanners } from "../redux/banner";
import { getBrands } from "../redux/brand/brandSlice";
import { getCategories } from "../redux/category";
import { getPosts } from "../redux/post";
import { HelmetTitle } from "../utils";

const Home = () => {
  const { auth } = useSelector((state) => state);
  let { t } = useTranslation(["home"]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBanners());
    dispatch(getCategories());
    dispatch(getBrands());
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <>
      {auth.isAdmin ? (
        <Navigate to={"/dashboard"} />
      ) : (
        <>
          <HelmetTitle title={t("home")} />
        </>
      )}
      <BannerCarousel />
      <CategoryList />
      <BestProductsList />
      <BrandsList />
      <ListBox />
      <PostList />
      <MobileApp />
    </>
  );
};

export default Home;
