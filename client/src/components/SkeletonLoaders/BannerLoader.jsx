import React from "react";
import ContentLoader from "react-content-loader";

const BannerLoader = (props) => {
  return (
    <ContentLoader
      speed={3}
      width={1200}
      height={400}
      viewBox="0 0 1200 400"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="16" rx="12" ry="12" width="1130" height="346" />
    </ContentLoader>
  );
};

export default BannerLoader;
