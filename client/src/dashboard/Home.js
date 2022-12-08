import React from "react";
import Layout from "./Layout";
import TopData from "./TopData";
import { Helmet } from 'react-helmet-async';

const HomeDashboard = () => {
  return (
    <>
      <Helmet>
        <title data-rh="true">Dashboard | E-commerce</title>
      </Helmet>
      <Layout>
        <h1 className="text-3xl text-gray-700 dark:text-gray-200 font-semibold mt-2 ml-4">
          {" "}
          Overview
        </h1>
        <TopData />
      </Layout>
    </>
  );
};

export default HomeDashboard;
