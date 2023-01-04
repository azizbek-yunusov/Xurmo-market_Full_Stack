import React from "react";
import { Helmet } from "react-helmet-async";

const HelmetTitle = ({title}) => {
  return (
    <Helmet>
      <title data-rh="true">{`${title} | E-commerce`}</title>
    </Helmet>
  );
};

export default HelmetTitle;
