import React from "react";
import { useTranslation } from "react-i18next";
import PaymentTypeText from "../../../client-components/Helpers/PaymentTypeText";
import PaymentStatus from "../../Helpers/PaymentStatus";

const ShippingInfo = ({ order }) => {
  let { t } = useTranslation(["order"]);

  return (
    <div className="grid grid-cols-3 gap-x-5 my-5">
      <div className="border_l rounded-md text_color p-5">
        <h1 className="mb-2 text-lg text-gray-700 font-semibold">
          {t("shipping-info")}
        </h1>
        <ul>
          <li className="my-2 font-semibold text-gray-600">
            {t("client")}
            {": "}{" "}
            <span className="text-gray-500 font-light">
              {order?.firstName}
              {order?.lastName}
            </span>
          </li>
          <li className="my-2 font-semibold text-gray-600">
            {t("address")}
            {": "}{" "}
            <span className="text-gray-500 font-light">
              {" "}
              {order?.shippingAddress.region.slice(0, -5)}
              {", "}
              {order?.shippingAddress.district.slice(0, -3)}
              {", "}
              {order?.shippingAddress.street}
              {", "}
              {order?.shippingAddress.house}
            </span>
          </li>
          <li className="my-2 font-semibold text-gray-600">
            {t("contact")}
            {": "}
            <span className="text-gray-500 font-light">
              {"+998 "}
              {order?.contact}
            </span>
          </li>
          <li className="my-2 font-semibold text-gray-600">
            {t("email")}
            {": "}
            <span className="text-gray-500 font-light">{order?.email}</span>
          </li>
        </ul>
      </div>
      <div className="border_l rounded-md text_color p-5">
        <h1 className="mb-2 text-lg text-gray-700 font-semibold">
          {t("payment-infor")}
        </h1>
        <ul>
          <li className="my-2 font-semibold text-gray-600">
            {t("payment")}
            {": "}
            <PaymentStatus status={order?.paymentMethod} />
          </li>
          <li className="my-2 font-semibold text-gray-600">
            {t("is-payment")}
            {": "}
            <span className="text-gray-500 font-light">{t("payment-no")}</span>
          </li>

          <li className="my-2 font-semibold text-gray-600">
            {t("payment-date")}
            {": "}
            <span className="text-gray-500 font-light"></span>
          </li>
        </ul>
      </div>
      <div className="border_l rounded-md text_color p-5">
        <h1 className="">{t("shipping-info")} </h1>
      </div>
    </div>
  );
};

export default ShippingInfo;
