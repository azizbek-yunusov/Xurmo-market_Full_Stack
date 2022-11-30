import Layout from "./Layout";
import AllProductList from "./AllProductList";

const ProductsTable = () => {

  return (
    <Layout>
      <div className="flex items-center flex-col justify-center font-sans">
        <AllProductList />
      </div>
    </Layout>
  );
};

export default ProductsTable;
