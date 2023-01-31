import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import TopLink from "./components/Header/TopLink";
import AddCategory from "./dashboard/CategoryItems/AddCategory";
import CategoriesTable from "./dashboard/CategoryItems/CategoriesTable";
import HomeDashboard from "./dashboard/Home";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import BasketList from "./components/Cart/BasketList";
import OrdersList from "./dashboard/OrderItems/OrdersList";
import { AddBanner, BannersList } from "./dashboard/BannerItems";
import {
  AllProductList,
  CreateProduct,
  ProductDetails,
  UpdateProduct,
} from "./dashboard/ProductElements";
import {
  CreateUser,
  Profile,
  UpdateUser,
  UserList,
  UserProfile,
} from "./dashboard/UserItems";
import { ProductDetail, ProductsList } from "./components/ProductItems";
import ActivationEmail from "./pages/ActivationEmail";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { refreshToken } from "./redux/actions/authAction";
import { WishList } from "./components/Wish";
import CheckOut from "./components/CheckOut";
import { Addresses, EditMyProfile, Favorites, MyInfor, MyOrders, Settings } from "./components/Profile";
import useNetworkStatus from "./hooks/useNetworkStatus";
import { SearchPage } from "./pages";
import { BrandsList, CreateBrand, UpdateBrand } from "./dashboard/Brand";

function App() {
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const status = useNetworkStatus();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <>
      <Toaster position="top-left" reverseOrder={true} />
      <>
        {pathname === "/signup" ||
        pathname === "/signin" ||
        pathname === "/user/activate/:activationtoken" ||
        pathname === "/checkout" ? null : (
          <>
            <TopLink />
            <Header />
          </>
        )}
      </>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myprofile" element={<MyInfor />} />
        <Route path="/myprofile/orders" element={<MyOrders />} />
        <Route path="/myprofile/addresses" element={<Addresses />} />
        <Route path="/myprofile/settings" element={<Settings />} />
        <Route path="/myprofile/update" element={<EditMyProfile />} />
        <Route path="/myprofile/favorites" element={<Favorites />} />
        <Route path="/product/view/:id" element={<ProductDetail />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/cart" element={<BasketList />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route
          path="/user/activate/:activationtoken"
          element={<ActivationEmail />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
        {!auth.isLogged && (
          <>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </>
        )}
        {auth && auth.isAdmin && (
          <>
            <Route path="/dashboard" element={<HomeDashboard />} />,
            <Route path="/product/update/:id" element={<UpdateProduct />} />
            <Route path="/product/create" element={<CreateProduct />} />
            <Route path="/dashboard/products" element={<AllProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/dashboard/banners" element={<BannersList />} />
            <Route path="/banner/add" element={<AddBanner />} />
            <Route path="/dashboard/brands" element={<BrandsList />} />
            <Route path="/brand/create" element={<CreateBrand />} />
            <Route path="/brand/:id" element={<UpdateBrand />} />
            <Route path="/dashboard/categories" element={<CategoriesTable />} />
            <Route path="/category/add" element={<AddCategory />} />
            <Route path="/dashboard/users" element={<UserList />} />
            <Route path="/user/create" element={<CreateUser />} />
            <Route path="/dashboard/orders" element={<OrdersList />} />
            <Route path="/dashboard/myprofile" element={<Profile />} />
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path="/users/update/:id" element={<UpdateUser />} />
          </>
        )}
      </Routes>

      {pathname === "/signup" || pathname === "/signin" ? null : <Footer />}
    </>
  );
}

export default App;
