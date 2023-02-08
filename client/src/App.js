import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { refreshToken } from "./redux/actions/authAction";
import { useEffect } from "react";
import { ActivationEmail, Home, NotFound, SignIn, SignUp } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import {
  Addresses,
  EditMyProfile,
  Favorites,
  MyInfor,
  MyOrders,
  Settings,
} from "./components/client-components/Profile";
import { ProductDetail, ProductsList } from "./components/client-components/ProductItems";
import { WishList } from "./components/client-components/Wish";
import CheckOut from "./components/client-components/CheckOut";
import {
  AllProductList,
  CreateProduct,
  ProductDetails,
  UpdateProduct,
} from "./components/dashboard-components/ProductElements";
import { AddBanner, BannersList } from "./components/dashboard-components/BannerItems";
import {
  BrandsList,
  CreateBrand,
  UpdateBrand,
} from "./components/dashboard-components/Brand";
import {
  AddCategory,
  CategoriesTable,
} from "./components/dashboard-components/CategoryItems";
import {
  AccountSetting,
  CreateUser,
  Profile,
  UpdateUser,
  UserList,
  UserProfile,
} from "./components/dashboard-components/UserItems";
import { OrderItem, OrdersList } from "./components/dashboard-components/OrderItems";
import Footer from "./components/client-components/Footer";
import { Navbar, TopLink } from "./components/client-components/Header";
import { Basket } from "./components/client-components/Cart";
import { SearchPage } from "./components/client-components/Search";
import { useNetworkStatus } from "./hooks";
import { HomeDashboard } from "./components/dashboard-components";

function App() {
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const status = useNetworkStatus();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);
  useEffect(() => {
    // replain config
    window.replainSettings = { id: "c95b900e-06ea-42b1-8cbc-f4c2fe9edce6" };
    (function (u) {
      var s = document.createElement("script");
      s.async = true;
      s.src = u;
      var x = document.getElementsByTagName("script")[0];
      x.parentNode.insertBefore(s, x);
    })("https://widget.replain.cc/dist/client-components.js");
  }, []);
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
            <Navbar />
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
        <Route path="/cart" element={<Basket />} />
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
            <Route path="/dashboard/order/:id" element={<OrderItem />} />
            <Route path="/dashboard/myprofile" element={<Profile />} />
            <Route path="/cabinet/settings" element={<AccountSetting />} />
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
