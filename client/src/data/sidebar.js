import {
  AiOutlineHome,
  AiOutlineInbox,
  AiOutlineSetting,
  AiOutlineTeam,
  AiOutlineUser,
} from "react-icons/ai";
import { BsCardImage, BsCart2, BsUiChecksGrid } from "react-icons/bs";
import {
  RiAdminLine,
  RiShoppingBag3Line,
  RiUserFollowLine,
} from "react-icons/ri";
import { BiBuildingHouse, BiCategory, BiHomeAlt } from "react-icons/bi";
import { HiLocationMarker } from "react-icons/hi";
import { MdFavoriteBorder } from "react-icons/md";

export const sidebarProfileEn = [
  {
    id: 1,
    path: "/myprofile",
    name: "Overview",
    icon: <BiHomeAlt className="md:text-xl text-xl" />,
  },
  {
    id: 2,
    path: "/myprofile/orders",
    name: "My orders",
    icon: <RiShoppingBag3Line className="md:text-xl text-xl" />,
  },
  {
    id: 4,
    path: "/myprofile/favorites",
    name: "Favorites",
    icon: <MdFavoriteBorder className="md:text-xl text-xl" />,
  },
  {
    id: 1,
    path: "/myprofile/settings",
    name: "Settings",
    icon: <AiOutlineSetting className="md:text-xl text-xl" />,
  },
];
export const sidebarProfileUz = [
  {
    id: 1,
    path: "/myprofile",
    name: "Umumiy",
    icon: <BiHomeAlt className="md:text-xl text-xl" />,
  },
  {
    id: 2,
    path: "/myprofile/orders",
    name: "Buyurtmalarim",
    icon: <RiShoppingBag3Line className="md:text-xl text-xl" />,
  },
  {
    id: 4,
    path: "/myprofile/favorites",
    name: "Sevimlilar",
    icon: <MdFavoriteBorder className="md:text-xl text-xl" />,
  },
  {
    id: 1,
    path: "/myprofile/settings",
    name: "Sozlamalar",
    icon: <AiOutlineSetting className="md:text-xl text-xl" />,
  },
];
export const sidebarProfileRu = [
  {
    id: 1,
    path: "/myprofile",
    name: "Общий",
    icon: <BiHomeAlt className="md:text-xl text-xl" />,
  },
  {
    id: 2,
    path: "/myprofile/orders",
    name: "Мои заказы",
    icon: <RiShoppingBag3Line className="md:text-xl text-xl" />,
  },
  {
    id: 4,
    path: "/myprofile/favorites",
    name: "Избранное",
    icon: <MdFavoriteBorder className="md:text-xl text-xl" />,
  },
  {
    id: 1,
    path: "/myprofile/settings",
    name: "Настройки",
    icon: <AiOutlineSetting className="md:text-xl text-xl" />,
  },
];

// Admin Sidebar Profile data
export const sidebarProAdminUz = [
  {
    id: 2,
    path: "/dashboard/cabinet",
    name: "Umumiy",
    icon: <BiHomeAlt className="md:text-xl text-xl" />,
  },
  {
    id: 3,
    path: "/cabinet/projects",
    name: "Loyihalar",
    icon: <BsUiChecksGrid className="md:text-xl text-xl" />,
  },
  {
    id: 4,
    path: "/myprofile/favorites",
    name: "Jamoa",
    icon: <AiOutlineTeam className="md:text-xl text-xl" />,
  },
  {
    id: 1,
    path: "/myprofile/settings",
    name: "Sozlamalar",
    icon: <AiOutlineSetting className="md:text-xl text-xl" />,
  },
];
export const sidebarProAdminEn = [
  {
    id: 2,
    path: "/dashboard/myprofile",
    name: "Overview",
    icon: <BiHomeAlt className="md:text-xl text-xl" />,
  },
  {
    id: 3,
    path: "/myprofile/addresses",
    name: "Projects",
    icon: <BsUiChecksGrid className="md:text-xl text-xl" />,
  },
  {
    id: 4,
    path: "/myprofile/favorites",
    name: "Teams",
    icon: <AiOutlineTeam className="md:text-xl text-xl" />,
  },
  {
    id: 1,
    path: "/myprofile/settings",
    name: "Settings",
    icon: <AiOutlineSetting className="md:text-xl text-xl" />,
  },
];
export const sidebarProAdminRu = [
  {
    id: 2,
    path: "/dashboard/myprofile",
    name: "Общий",
    icon: <BiHomeAlt className="md:text-xl text-xl" />,
  },
  {
    id: 3,
    path: "/myprofile/addresses",
    name: "Manzillar",
    icon: <BsUiChecksGrid className="md:text-xl text-xl" />,
  },
  {
    id: 4,
    path: "/myprofile/favorites",
    name: "Sevimlilar",
    icon: <AiOutlineTeam className="md:text-xl text-xl" />,
  },
  {
    id: 1,
    path: "/myprofile/settings",
    name: "Sozlamalar",
    icon: <AiOutlineSetting className="md:text-xl text-xl" />,
  },
];

// Admin Sidebar data
export const sidebarAdminUz = [
  {
    id: 1,
    path: "/dashboard",
    name: "Umumiy",
    icon: <AiOutlineHome className="md:text-lg ml-4" />,
  },
  {
    id: 2,
    path: "/dashboard/products",
    name: "Mahsulotlar",
    icon: <AiOutlineInbox className="md:text-lg ml-4" />,
  },
  {
    id: 3,
    path: "/dashboard/banners",
    name: "Bannerlar",
    icon: <BsCardImage className="md:text-lg ml-4" />,
  },
  {
    id: 2,
    path: "/dashboard/categories",
    name: "Categoriylar",
    icon: <BiCategory className="md:text-lg ml-4" />,
  },
  {
    id: 2,
    path: "/dashboard/brands",
    name: "Brendlar",
    icon: <BiBuildingHouse className="md:text-lg ml-4" />,
  },
  {
    id: 1,
    path: "/dashboard/orders",
    name: "Buyurtmalar",
    icon: <BsCart2 className="md:text-lg ml-4" />,
  },
  {
    id: 1,
    path: "/dashboard/users",
    name: "Foydalanuvchilar",
    icon: <AiOutlineUser className="md:text-lg ml-4" />,
  },
];
export const sidebarAdminEn = [
  {
    id: 1,
    path: "/dashboard",
    name: "Overview",
    icon: <AiOutlineHome className="md:text-lg ml-4" />,
  },
  {
    id: 2,
    path: "/dashboard/products",
    name: "Products",
    icon: <AiOutlineInbox className="md:text-lg ml-4" />,
  },
  {
    id: 3,
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
export const sidebarAdminRu = [
  {
    id: 1,
    path: "/dashboard",
    name: "Общий",
    icon: <AiOutlineHome className="md:text-lg ml-4" />,
  },
  {
    id: 2,
    path: "/dashboard/products",
    name: "Продукты",
    icon: <AiOutlineInbox className="md:text-lg ml-4" />,
  },
  {
    id: 3,
    path: "/dashboard/banners",
    name: "Баннеры",
    icon: <BsCardImage className="md:text-lg ml-4" />,
  },
  {
    id: 2,
    path: "/dashboard/categories",
    name: "Категории",
    icon: <BiCategory className="md:text-lg ml-4" />,
  },
  {
    id: 2,
    path: "/dashboard/brands",
    name: "Бренды",
    icon: <BiBuildingHouse className="md:text-lg ml-4" />,
  },
  {
    id: 1,
    path: "/dashboard/orders",
    name: "Заказы",
    icon: <BsCart2 className="md:text-lg ml-4" />,
  },
  {
    id: 1,
    path: "/dashboard/users",
    name: "Пользователи",
    icon: <AiOutlineUser className="md:text-lg ml-4" />,
  },
];
