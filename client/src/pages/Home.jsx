import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { BannerCarousel } from "../components/client-components/Banner";
import BrandsList from "../components/client-components/Brand/BrandList";
import { CategoryList } from "../components/client-components/Categories";
import { BestProductsList } from "../components/client-components/ProductItems";
import { ListBox } from "../components/client-components/TopBrand";
import { HelmetTitle } from "../utils";

const Home = () => {
  const { auth } = useSelector((state) => state);
  let { t } = useTranslation(["home"]);

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
    </>
  );
};

export default Home;
