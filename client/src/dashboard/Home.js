import React from "react";
import { Helmet } from "react-helmet";
import Layout from "./Layout";
import TopData from "./TopData";

const HomeDashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | E-commerce</title>
      </Helmet>
      <Layout>
        <h1 className="text-3xl text-gray-700 font-semibold mt-2 ml-4">
          {" "}
          Overview
        </h1>
        <TopData />
      </Layout>
    </>
  );
};

export default HomeDashboard;
