import React from "react";
import { useTranslation } from "react-i18next";
import Price from "../../../client-components/Helpers/Price";

const ItemsTable = ({ order }) => {
  let { t } = useTranslation(["order"]);
  console.log(order);
  return (
    <div className="col-span-4 border_l rounded-lg p-5">
      <h1 className="mb-4 text-lg text_color font-semibold">
        {t("track-order")}
        {"#VL2537"}
      </h1>
      <div className="w-full">
        <div className="overflow-hidden rounded">
          <table className="min-w-full border-collapse">
            <thead className="bg-slate-200 dark:bg-gray-600 border border-gray-200 text_color">
              <tr>
                <th className="w-1/3 text-left uppercase py-4 border border-gray-400 px-4 font-semibold text-sm">
                  {t("product-name")}
                </th>
                <th className="text-left uppercase py-4 border border-gray-400 px-4 font-semibold text-sm">
                  {t("product")}
                </th>
                <th className="text-left uppercase py-4 border border-gray-400 px-4 font-semibold text-sm">
                  {t("quantity")}
                </th>
                <th className="text-left uppercase py-4 border border-gray-400 px-4 font-semibold text-sm">
                  {t("price")}
                </th>
                <th className="text-left uppercase py-4 border border-gray-400 px-4 font-semibold text-sm">
                  {t("total")}
                </th>
              </tr>
            </thead>

            <tbody className="text_color">
              {order?.orderItems?.map((item) => (
                <tr key={item._id}>
                  <td className="w-1/3 text-left py-3 border border-gray-300 px-4">
                    {item.productId.name}
                  </td>
                  <td className="text-left py-3 border border-gray-300 px-4">
                    <img
                      src={item.productId.images[0]?.url}
                      className="h-10"
                      alt={item.productId.name}
                    />
                  </td>
                  <td className="text-left py-3 border border-gray-300 px-4">
                    <p className="">{item.quantity}</p>
                  </td>
                  <td className="text-left py-3 border border-gray-300 px-4">
                    <p className="">
                      <Price price={item.productId?.price} className="" />
                    </p>
                  </td>
                  <td className="text-left py-3 border border-gray-300 px-4">
                    <p className="">
                      <Price
                        price={item.quantity * item.productId?.price}
                        className=""
                      />
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemsTable;
