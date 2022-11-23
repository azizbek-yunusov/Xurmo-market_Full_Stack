import React, { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const fetchData = () => {
    fetch("http://localhost:5000/products", {
    })
      .then((res) => res.json())
      .then((data) => console.log());
  };
  useEffect(() => {
    fetchData();
  }, []);

  return <div className="container-full"></div>;
};

export default Home;
