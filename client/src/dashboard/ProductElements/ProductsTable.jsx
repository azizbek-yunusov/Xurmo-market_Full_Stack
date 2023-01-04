import HelmetTitle from "../../utils/HelmetTitle";
import Layout from "../Layout";
import AllProductList from "./AllProductList";

const ProductsTable = () => {
  return (
    <Layout>
      <HelmetTitle title="All products" />
      <div className="flex items-center flex-col mt-8 justify-center font-sans">
        <AllProductList />
      </div>
    </Layout>
  );
};

export default ProductsTable;
