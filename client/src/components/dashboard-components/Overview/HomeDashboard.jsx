import React from "react";
import TopData from "./TopData";
import { Layout } from "../Layouts";
import { HelmetTitle } from "../../../utils";
import OrderStatistic from "./OrderStatistic";

const HomeDashboard = () => {
  return (
    <>
      <HelmetTitle title="Admin Panel" />
      <Layout>
        <h1 className="text-2xl xl:text-3xl text-gray-700 dark:text-gray-200 font-semibold mt-3 xl:ml-4">
          {" "}
          Overview
        </h1>
        <TopData />
        <OrderStatistic />
      </Layout>
    </>
  );
};

export default HomeDashboard;
