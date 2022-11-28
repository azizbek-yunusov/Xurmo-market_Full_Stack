import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import Layout from "./Layout";
import AllProductList from "./AllProductList";

const ProductsTable = () => {
  // let resolved = useResolvedPath();
  // let match = useMatch({ path: resolved.pathname, end: true });
  // const matchs = useMatch()
// console.log(matchs);
// console.log(match);
  return (
    <Layout>
      <div className="flex items-center flex-col justify-center font-sans">

        <AllProductList />
      </div>
    </Layout>
  );
};

export default ProductsTable;
