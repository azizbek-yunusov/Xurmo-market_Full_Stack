import { useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Header from "./components/Header/Header";
import TopLink from "./components/Header/TopLink";
import AddBanner from "./dashboard/AddBanner";
import Admins from "./dashboard/Admins";
import BannersTable from "./dashboard/BannersTable";
import CreateProduct from "./dashboard/CreateProduct";
import CreateUser from "./dashboard/CreateUser";
import HomeDashboard from "./dashboard/Home";
import OrdersList from "./dashboard/OrdersList";
import ProductDetail from "./dashboard/ProductDetail";
import ProductsTable from "./dashboard/ProductsTable";
import Profile from "./dashboard/Profile";
import UpdateProduct from "./dashboard/UpdateProduct";
import UpdateUser from "./dashboard/UpdateUser";
import UserProfile from "./dashboard/UserProfile";
import UsersTable from "./dashboard/UsersTable";
import AddProduct from "./pages/AddProduct";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { UserContext } from "./reducers/useReducer";

function App() {
  const { state } = useContext(UserContext);
  const pathname = useLocation().pathname;
  return (
    <>
      <ToastContainer autoClose={1000} />
      <>
        {pathname === "/signup" || pathname === "/signin" ? null : (
          <>
            <TopLink />
            <Header />
          </>
        )}

        {/* <Navbar /> */}
      </>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        {!state.userInfo && (
          <>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </>
        )}
        <Route path="/add" element={<AddProduct />} />
        {state.userInfo && state.userInfo.admin && (
          <>
            <Route path="/dashboard" element={<HomeDashboard />} />,
            <Route path="/product/update/:id" element={<UpdateProduct />} />
            <Route path="/product/create" element={<CreateProduct />} />
            <Route path="/dashboard/products" element={<ProductsTable />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/dashboard/banners" element={<BannersTable />} />
            <Route path="/banner/add" element={<AddBanner />} />
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
    </>
  );
}

export default App;
