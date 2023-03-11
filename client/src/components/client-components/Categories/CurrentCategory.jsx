import React from "react";
import { useParams } from "react-router-dom";

const CurrentCategory = () => {
  const { slug } = useParams();
  return <div className="container-full min-h-screen">{slug}</div>;
};

export default CurrentCategory;
