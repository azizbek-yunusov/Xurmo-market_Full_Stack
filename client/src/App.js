import { useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import TopLink from "./components/Header/TopLink";
import MyProfile from "./components/Profile/MyProfile";
import Admins from "./dashboard/UserItems/Admins";
import AddCategory from "./dashboard/CategoryItems/AddCategory";
import CategoriesTable from "./dashboard/CategoryItems/CategoriesTable";
import HomeDashboard from "./dashboard/Home";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { UserContext } from "./reducers/useReducer";
import BasketList from "./components/Cart/BasketList";
import { DataProvider } from "./GlobalState";
import OrdersList from "./dashboard/OrderItems/OrdersList";
import GoogleMapPage from "./pages/GoogleMapPage";
import { AddBanner, BannersTable } from "./dashboard/BannerItems";
import {
  CreateProduct,
  ProductDetails,
  ProductsTable,
  UpdateProduct,
} from "./dashboard/ProductElements";
import {
  CreateUser,
  Profile,
  UpdateUser,
  UserProfile,
  UsersTable,
} from "./dashboard/UserItems";
import { ProductDetail } from "./components/ProductItems";

function App() {
  const { state } = useContext(UserContext);
  const pathname = useLocation().pathname;

  return (
    <DataProvider>
      <Toaster position="top-right" reverseOrder={true} />
      <>
        {pathname === "/signup" || pathname === "/signin" ? null : (
          <>
            <TopLink />
            <Header />
          </>
        )}

      </>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/product/view/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<BasketList />} />
        <Route path="/map" element={<GoogleMapPage />} />
        <Route path="*" element={<NotFound />} />
        {!state.userInfo && (
          <>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </>
        )}
        {state.userInfo && state.userInfo.admin && (
          <>
            <Route path="/dashboard" element={<HomeDashboard />} />,
            <Route path="/product/update/:id" element={<UpdateProduct />} />
            <Route path="/product/create" element={<CreateProduct />} />
            <Route path="/dashboard/products" element={<ProductsTable />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/dashboard/banners" element={<BannersTable />} />
            <Route path="/banner/add" element={<AddBanner />} />
            <Route path="/dashboard/categories" element={<CategoriesTable />} />
            <Route path="/category/add" element={<AddCategory />} />
            <Route path="/dashboard/users" element={<UsersTable />} />
            <Route path="/user/create" element={<CreateUser />} />
            <Route path="/dashboard/admins" element={<Admins />} />
            <Route path="/dashboard/orders" element={<OrdersList />} />
            <Route path="/dashboard/myprofile" element={<Profile />} />
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path="/users/update/:id" element={<UpdateUser />} />
          </>
        )}
      </Routes>
      {pathname === "/signup" || pathname === "/signin" ? null : <Footer />}
    </DataProvider>
  );
}

export default App;
