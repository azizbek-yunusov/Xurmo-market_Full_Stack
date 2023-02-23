import { useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBrand } from "../../../redux/brand/brandSlice";
import { HelmetTitle } from "../../../utils";
import { Layout } from "../Layouts";

const BrandDetail = () => {
  let { t } = useTranslation(["brand-d"]);
  const { id } = useParams();
  const isXl = useMediaQuery("(min-width: 1245px)");
  const { currentBrand } = useSelector((state) => state.brand);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrand({ id }));
  }, [dispatch, id]);
  return (
    <>
      <HelmetTitle title={`${currentBrand?.name} - Brand`} />
      <Layout>
        <section className="relative">
          <h1 className="">{currentBrand?.name}</h1>
        </section>
      </Layout>
    </>
  );
};

export default BrandDetail;
