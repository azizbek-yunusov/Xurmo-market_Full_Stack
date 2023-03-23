import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { BannerCarousel } from "../components/client-components/Banner";
import BrandsList from "../components/client-components/Brand/BrandList";
import { CategoryList } from "../components/client-components/Categories";
import MobileApp from "../components/client-components/Footer/MobileApp";
import { PostList } from "../components/client-components/Post";
import {
  BestProductsList,
  DiscountedProducts,
} from "../components/client-components/ProductItems";
import { ListBox } from "../components/client-components/TopBrand";
import { getBanners } from "../redux/banner";
import { getBrands } from "../redux/brand/brandSlice";
import { getCategories } from "../redux/category";
import { getPosts } from "../redux/post";
import { getProducts } from "../redux/product";
import { HelmetTitle } from "../utils";

const Home = () => {
  const { auth } = useSelector((state) => state);
  let { t } = useTranslation(["home"]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBanners());
    dispatch(getCategories());
    dispatch(getProducts());
    dispatch(getBrands());
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <main>
      <HelmetTitle title={t("home")} />
      {auth.isAdmin && <Navigate to={"/dashboard"} />}
      <BannerCarousel />
      <CategoryList />
      <BestProductsList />
      <DiscountedProducts />
      <BrandsList />
      <ListBox />
      <PostList />
      <MobileApp />
    </main>
  );
};

export default Home;
