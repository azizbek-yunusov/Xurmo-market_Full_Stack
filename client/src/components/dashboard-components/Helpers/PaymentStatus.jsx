import React from "react";
import { useTranslation } from "react-i18next";
import { paymentMethodData } from "../../../data/OrderTypeData";

const PaymentStatus = ({ status }) => {
  let { t } = useTranslation(["order"]);
  const paymentType = paymentMethodData.filter((item) => {
    return item.value === status;
  });
  return <span className="">{t(`${paymentType[0].name.slice(0, 10)}`)}</span>;
};

export default PaymentStatus;
