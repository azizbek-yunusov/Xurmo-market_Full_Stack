import React, { useEffect, useState } from "react";

const TopData = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      fetch("http://localhost:5000/products", {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((data) => setProducts(data.products));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(products);
  return (
    <div className="w-full grid grid-cols-4 gap-4 md:my-4">
      <div className="flex justify-between bg-violet-700 px-5 py-4 rounded-md">
        <div className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="w-8"
            viewBox="0 0 16 16"
          >
            <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z" />
          </svg>
        </div>
        <div className="">
          <p className="">Total products</p>
          <p className="">{products.length}</p>
        </div>
      </div>
      <div className="bg-violet-700 px-3 py-3 rounded-md"></div>
      <div className="bg-violet-700 px-3 py-3 rounded-md"></div>
      <div className="bg-violet-700 px-3 py-3 rounded-md"></div>
    </div>
  );
};

export default TopData;
