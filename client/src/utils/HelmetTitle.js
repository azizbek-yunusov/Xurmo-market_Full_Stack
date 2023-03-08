import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const HelmetTitle = ({title}) => {
  return (
    <Helmet>
      <title data-rh="true">{`${title} — `}</title>
    </Helmet>
  );
};

export default HelmetTitle;
