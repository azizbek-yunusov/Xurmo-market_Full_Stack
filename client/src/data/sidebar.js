import { AiOutlineHome, AiOutlineInbox, AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { BsCardImage, BsCart2 } from "react-icons/bs";
import { RiAdminLine, RiShoppingBag3Line, RiUserFollowLine } from "react-icons/ri";
import { BiBuildingHouse, BiCategory } from "react-icons/bi";
import { HiLocationMarker } from "react-icons/hi";
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
    id: 2,
    path: "/dashboard/brands",
    name: "Brands",
    icon: <BiBuildingHouse className="md:text-lg ml-4" />,
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
    name: "Users",
    icon: <AiOutlineUser className="md:text-lg ml-4" />,
  },
];

export const sidebarProfileEn = [
  {
    id: 2,
    path: "/myprofile/orders",
    name: "My orders",
    icon: <RiShoppingBag3Line className="md:text-xl" />,
  },
  {
    id: 3,
    path: "/myprofile/addresses",
    name: "Addresses",
    icon: <HiLocationMarker className="md:text-xl" />,
  },
  {
    id: 4,
    path: "/myprofile/favorites",
    name: "Favorites",
    icon: <MdFavoriteBorder className="md:text-xl" />,
  },
  {
    id: 1,
    path: "/myprofile/settings",
    name: "Settings",
    icon: <AiOutlineSetting className="md:text-xl" />,
  },
];
export const sidebarProfileUz = [
  {
    id: 2,
    path: "/myprofile/orders",
    name: "Buyurtmalarim",
    icon: <RiShoppingBag3Line className="md:text-xl" />,
  },
  {
    id: 3,
    path: "/myprofile/addresses",
    name: "Manzillar",
    icon: <HiLocationMarker className="md:text-xl" />,
  },
  {
    id: 4,
    path: "/myprofile/favorites",
    name: "Sevimlilar",
    icon: <MdFavoriteBorder className="md:text-xl" />,
  },
  {
    id: 1,
    path: "/myprofile/settings",
    name: "Sozlamalar",
    icon: <AiOutlineSetting className="md:text-xl" />,
  },
];
export const sidebarProfileRu = [
  {
    id: 2,
    path: "/myprofile/orders",
    name: "Mening Buyurtmalarim",
    icon: <RiShoppingBag3Line className="md:text-xl" />,
  },
  {
    id: 3,
    path: "/myprofile/addresses",
    name: "Manzillar",
    icon: <HiLocationMarker className="md:text-xl" />,
  },
  {
    id: 4,
    path: "/myprofile/favorites",
    name: "Sevimlilar",
    icon: <MdFavoriteBorder className="md:text-xl" />,
  },
  {
    id: 1,
    path: "/myprofile/settings",
    name: "Sozlamalar",
    icon: <AiOutlineSetting className="md:text-xl" />,
  },
];
export const sidebarAdminUz = [
  {
    id: 2,
    path: "/dashboard/myprofile",
    name: "Profil",
    icon: <RiUserFollowLine className="md:text-xl" />,
  },
  {
    id: 3,
    path: "/myprofile/addresses",
    name: "Manzillar",
    icon: <HiLocationMarker className="md:text-xl" />,
  },
  {
    id: 4,
    path: "/myprofile/favorites",
    name: "Sevimlilar",
    icon: <MdFavoriteBorder className="md:text-xl" />,
  },
  {
    id: 1,
    path: "/myprofile/settings",
    name: "Sozlamalar",
    icon: <AiOutlineSetting className="md:text-xl" />,
  },
];