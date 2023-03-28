import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { BannerCarousel } from "../components/Banner";
import BrandsList from "../components/Brand/BrandList";
import { CategoryList } from "../components/Categories";
import MobileApp from "../components/Footer/MobileApp";
import { PostList } from "../components/Post";
import {
  BestProductsList,
  DiscountedProducts,
} from "../components/ProductItems";
import { ListBox } from "../components/TopBrand";
import { getBanners } from "../redux/banner";
import { getBrands } from "../redux/brand/brandSlice";
import { getCategories } from "../redux/category";
import { getPosts } from "../redux/post";
import { getProducts } from "../redux/product";
import { HelmetTitle } from "../utils";

const Home = () => {
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
