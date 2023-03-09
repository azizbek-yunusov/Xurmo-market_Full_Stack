import { Breadcrumbs } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { HelmetTitle } from "../../../../utils";
import Layout from "../../Layouts/Layout";
import ItemsTable from "./ItemsTable";
import TrackOrder from "./TrackOrder";

const OrderItem = () => {
  let { t } = useTranslation(["shop"]);

  return (
    <>
      <HelmetTitle title={t("order-detail")} />
      <Layout>
        <section>
          <div className="flex_betwen mb-5">
            <h1 className="text-2xl text-gray-800 font-semibold">
              {t("order-detail")}
            </h1>
            <Breadcrumbs>
              <Link to={"/dashboard"} className="">
                {t("home")}
              </Link>
              <Link to={"/dashboard/orders"} className="">
                {t("orders")}
              </Link>
              <Link to={"/"} className="">
                {t("order-detail")}
              </Link>
            </Breadcrumbs>
          </div>
          <div className="grid grid-cols-6 gap-x-5">
            <TrackOrder />
            <ItemsTable />
          </div>
        </section>
      </Layout>
    </>
  );
};

export default OrderItem;
