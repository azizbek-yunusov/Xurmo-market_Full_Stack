import React from "react";
import Layout from "./Layout";
import TopData from "./TopData";

const HomeDashboard = () => {
  return (
    <Layout>
      <h1 className="text-3xl text-gray-700 font-semibold mt-2 ml-4"> Overview</h1>
      <TopData />
    </Layout>
  );
};

export default HomeDashboard;
