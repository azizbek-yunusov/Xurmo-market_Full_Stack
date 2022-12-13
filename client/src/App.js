import { useContext, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import TopLink from "./components/Header/TopLink";
import ProductDetail from "./components/ProductItems/ProductDetail";
import MyProfile from "./components/Profile/MyProfile";
import AddBanner from "./dashboard/AddBanner";
import Admins from "./dashboard/Admins";
import BannersTable from "./dashboard/BannersTable";
import AddCategory from "./dashboard/CategoryItems/AddCategory";
import CategoriesTable from "./dashboard/CategoryItems/CategoriesTable";
import CreateProduct from "./dashboard/ProductElements/CreateProduct";
import CreateUser from "./dashboard/CreateUser";
import HomeDashboard from "./dashboard/Home";
import OrdersList from "./dashboard/OrdersList";
// import ProductDetail from "./dashboard/ProductDetail";
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
import BasketList from "./components/Cart/BasketList";


function App() {
  // useEffect(() => {
  //   window.replainSettings = { id: '0db757df-71b5-4fe7-b872-436f5f6ccd57' };
  //   (function (u) {
  //     var s = document.createElement('script'); s.async = true; s.src = u;
  //     var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
  //   })('https://widget.replain.cc/dist/client.js');

  
  // }, [])
  const { state } = useContext(UserContext);
  const pathname = useLocation().pathname;
  return (
    <>
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
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/product/view/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<BasketList />} />
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
            {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
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
      {pathname === "/signup" || pathname === "/signin" ? null : (
         <Footer />
        )}
    </>
  );
}

export default App;
