import { Breadcrumbs, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOrder } from "../../../../redux/order";
import { HelmetTitle } from "../../../../utils";
import Layout from "../../Layouts/Layout";
import ItemsTable from "./ItemsTable";
import ShippingInfo from "./ShippingInfo";
import TrackOrder from "./TrackOrder";

const OrderItem = () => {
  let { t } = useTranslation(["order"]);
  const { isLoading, order } = useSelector((state) => state.order);
  const { access_token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder({ access_token, id }));
  }, [access_token, dispatch, id]);
  console.log(order);
  return (
    <>
      <HelmetTitle title={t("order-detail")} />

      <Layout>
        {!isLoading ? (
          <section>
            <div className="flex_betwen mb-5">
              <h1 className="text-2xl text_color font-semibold">
                {t("order-detail")}
              </h1>
              <Breadcrumbs>
                <Link to={"/dashboard"} className="">
                  {t("home")}
                </Link>
                <Link to={"/dashboard/orders"} className="">
                  {t("all-orders")}
                </Link>
                <Link to={"/"} className="">
                  {t("order-detail")}
                </Link>
              </Breadcrumbs>
            </div>
            <div className="grid grid-cols-6 gap-x-5">
              <TrackOrder order={order} />
              <ItemsTable order={order} />
            </div>
            <ShippingInfo order={order} />
          </section>
        ) : (
          <CircularProgress />
        )}
      </Layout>
    </>
  );
};

export default OrderItem;
