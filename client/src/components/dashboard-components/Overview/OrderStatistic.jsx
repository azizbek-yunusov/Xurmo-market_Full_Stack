import React from "react";
import NewOrderList from "./NewOrderList";
import UserCharts from "./UserCharts";

const OrderStatistic = () => {
  return (
    <div className="grid grid-cols-2 gap-x-5">
      <h1 className="">User</h1>
      {/* <UserCharts /> */}
      <NewOrderList />
    </div>
  );
};

export default OrderStatistic;
