import { BsCreditCard2Back } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { SiVisa } from "react-icons/si";

export const paymentMethodData = [
  {
    id: "1",
    name: "by-cash",
    value: "Cash on Delivery",
    icon: <GiMoneyStack className="text-2xl text-green-500 mr-3" />,
  },
  {
    id: "2",
    name: "payme",
    value: "Payme",
    icon: "",
  },
  {
    id: "3",
    name: "uzcard-or-xumo",
    value: "UZCARD or XUMO",
    icon: <BsCreditCard2Back className="text-2xl text-teal-300 mr-3" />,
  },
  {
    id: "4",
    name: "card",
    value: "Through Card",
    icon: <SiVisa className="text-2xl text-blue-500 mr-3" />,
  },
];

export const deliveryTypeData = [
  {
    id: "1",
    name: "delivery-address",
    value: "Delivery address",
  },
  {
    id: "2",
    name: "store-pickup",
    value: "Store pickup",
  },
];
