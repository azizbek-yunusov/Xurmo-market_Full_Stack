import { Breadcrumbs, Button, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HelmetTitle } from "../../../utils";
import Comments from "../../client-components/ProductItems/Comments";
import ImageThumbs from "../../client-components/ProductItems/ImageThumbs";
import { ReviewsBox } from "../../client-components/ProductItems/ReviewsBox";
import { Layout } from "../Layouts";

const ProductDetails = () => {
  const goback = useNavigate();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state);

  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const productDetail = async () => {
    try {
      const { data } = await axios.get(`/product/${id}`);
      dispatch({ type: "GET_PRODUCT", payload: data.product });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    productDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {_id, name, images, price, inStock, category, brand, createdAt, createdBy, reviews } = product
  return (
    <>
      <HelmetTitle title={`${name}`} />
      <Layout>
        {!loading ? (
          <div className="container-full md:px-5">
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginY: "8px" }}>
              <Link to={"/dashboard"}>Dashboard</Link>
              <Link to={"/dashboard/products"}>All Products</Link>
              <Typography color="blue">{name}</Typography>
            </Breadcrumbs>
            <div className="grid grid-cols-3 gap-x-5 border-t  border-r-gray-400 lg:py-5 py-4">
              <div className="col-span-1">
                <ImageThumbs images={images} />
              </div>
              <div className="col-span-1 block">
                <table className="border-collapse w-full shadow-md rounded-lg overflow-hidden">
                  <thead>
                    <tr className="text-sm">
                      <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                        Title
                      </th>
                      <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                        Feature
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0 text-sm">
                      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                        Object Id
                      </td>
                      <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                        {_id}
                      </td>
                    </tr>
                    <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0 text-sm">
                      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                        Name
                      </td>
                      <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                        {name}
                      </td>
                    </tr>
                    <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0 text-sm">
                      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                        Price
                      </td>
                      <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                        {price}
                      </td>
                    </tr>
                    <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0 text-sm">
                      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                        Category
                      </td>
                      <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                        {category}
                      </td>
                    </tr>
                    <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0 text-sm">
                      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                        Brand
                      </td>
                      <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                        {brand || "-------"}
                      </td>
                    </tr>
                    <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0 text-sm">
                      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                        Stock
                      </td>
                      <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                        {inStock}
                      </td>
                    </tr>
                    <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0 text-sm">
                      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                        Created At
                      </td>
                      <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                        {moment(createdAt).format("lll")}
                      </td>
                    </tr>
                    <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0 text-sm">
                      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                        Created At
                      </td>
                      <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                        {createdBy
                          ? createdBy.name
                          : "deleted account"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-span-1">
                <div className="p-5 rounded-lg border border-gray-200 shadow-lg">
                  <Tooltip title="Add new user">
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{
                        background: "rgb(145, 85, 253)",
                        borderRadius: "8px",
                        marginBottom: "25px",
                      }}
                      startIcon={<BiEditAlt />}
                    >
                      Update
                    </Button>
                  </Tooltip>
                  <Tooltip title="Add new user">
                    <Button
                      variant="contained"
                      color="error"
                      size="large"
                      fullWidth
                      sx={{
                        borderRadius: "8px",
                        minWidth: "130px",
                      }}
                      startIcon={<MdDelete />}
                    >
                      Delete
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="md:my-5">
              <h1 className="text-2xl font-semibold md:mb-5">
                Product reviews
              </h1>
              <div className="grid grid-cols-12 gap-9">
                <div className="w-full col-span-6">
                  {reviews && reviews[0] ? (
                    <div className="reviews">
                      {reviews &&
                        reviews
                          .map((review) => (
                            <Comments key={review._id} review={review} />
                          ))
                          .reverse()}
                    </div>
                  ) : (
                    <p className="noReviews">No Reviews Yet</p>
                  )}
                </div>
                <div className="w-full col-span-6 flex justify-end">
                  <ReviewsBox product={product} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="">s</div>
          // <ProductDetailLoader />
        )}
      </Layout>
    </>
  );
};

export default ProductDetails;
