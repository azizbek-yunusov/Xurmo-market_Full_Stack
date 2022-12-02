import { AiOutlineHome, AiOutlineInbox, AiOutlineUser } from "react-icons/ai";
import { BsCardImage, BsCart2 } from "react-icons/bs";
import { RiAdminLine } from "react-icons/ri";

export const sidebar = [
  {
    id: 1,
    path: "/dashboard",
    name: "Home",
    icon: <AiOutlineHome className="md:text-lg ml-4" />
  },
  {
    id: 2,
    path: "/dashboard/products",
    name: "Products",
    icon: <AiOutlineInbox className="md:text-lg ml-4" />
  },
  {
    id: 2,
    path: "/dashboard/banners",
    name: "Banners",
    icon: <BsCardImage className="md:text-lg ml-4" />
  },
  {
    id: 1,
    path: "/dashboard/orders",
    name: "Orders",
    icon: <BsCart2 className="md:text-lg ml-4" />
  },
  {
    id: 1,
    path: "/dashboard/users",
    name: "Clients",
    icon: <AiOutlineUser className="md:text-lg ml-4" />
  },
  {
    id: 1,
    path: "/dashboard/admins",
    name: "Admins",
    icon: <RiAdminLine className="md:text-lg ml-4" />
  },
]