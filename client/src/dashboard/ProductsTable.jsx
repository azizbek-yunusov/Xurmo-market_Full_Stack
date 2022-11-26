import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import Layout from "./Layout";
import AllProductList from "./AllProductList";

const ProductsTable = () => {

  return (
    <Layout>
      <div className="flex items-center flex-col justify-center font-sans">
        <Link to={"/product/create"} className="w-full float-left">
          <button className="py-2 px-3 m-2 bg-blue-500 text-white">
            create product
          </button>
        </Link>
        <AllProductList />
      </div>
    </Layout>
  );
};

export default ProductsTable;
