import { AiOutlineHome, AiOutlineInbox, AiOutlineUser } from "react-icons/ai";
import { BsCardImage, BsCart2 } from "react-icons/bs";
import { RiAdminLine, RiShoppingBag3Line } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import { MdFavoriteBorder } from "react-icons/md";

export const sidebar = [
  {
    id: 1,
    path: "/dashboard",
    name: "Home",
    icon: <AiOutlineHome className="md:text-lg ml-4" />,
  },
  {
    id: 2,
    path: "/dashboard/products",
    name: "Products",
    icon: <AiOutlineInbox className="md:text-lg ml-4" />,
  },
  {
    id: 2,
    path: "/dashboard/banners",
    name: "Banners",
    icon: <BsCardImage className="md:text-lg ml-4" />,
  },
  {
    id: 2,
    path: "/dashboard/categories",
    name: "Categories",
    icon: <BiCategory className="md:text-lg ml-4" />,
  },
  {
    id: 1,
    path: "/dashboard/orders",
    name: "Orders",
    icon: <BsCart2 className="md:text-lg ml-4" />,
  },
  {
    id: 1,
    path: "/dashboard/users",
    name: "Clients",
    icon: <AiOutlineUser className="md:text-lg ml-4" />,
  },
  {
    id: 1,
    path: "/dashboard/admins",
    name: "Admins",
    icon: <RiAdminLine className="md:text-lg ml-4" />,
  },
];

export const sidebarProfile = [
  {
    id: 1,
    path: "/myprofile",
    name: "Personal Data",
    icon: <AiOutlineUser className="md:text-2xl ml-4" />,
  },
  {
    id: 2,
    path: "/myprofile/orders",
    name: "My orders",
    icon: <RiShoppingBag3Line className="md:text-2xl ml-4" />,
  },
  {
    id: 3,
    path: "/myprofile/addresses",
    name: "Addresses",
    icon: <GrLocation className="md:text-2xl ml-4" />,
  },
  {
    id: 4,
    path: "/myprofile/wishlist",
    name: "Favorites",
    icon: <MdFavoriteBorder className="md:text-2xl ml-4" />,
  },
];
