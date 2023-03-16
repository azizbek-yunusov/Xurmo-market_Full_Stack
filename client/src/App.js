import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { useEffect } from "react";
import { ActivationEmail, Home, NotFound, SignIn, SignUp } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import {
  Addresses,
  EditMyProfile,
  Favorites,
  MyOrders,
  OverView,
  Settings,
} from "./components/client-components/Profile";
import {
  ProductDetail,
  ProductsList,
} from "./components/client-components/ProductItems";
import { WishList } from "./components/client-components/Wish";
import CheckOut from "./components/client-components/CheckOut";
import {
  AllProductList,
  CreateProduct,
  ProductDetails,
  UpdateProduct,
} from "./components/dashboard-components/ProductElements";
import {
  AddBanner,
  BannersList,
} from "./components/dashboard-components/BannerItems";
import {
  BrandDetail,
  BrandsList,
  CreateBrand,
  UpdateBrand,
} from "./components/dashboard-components/Brand";
import {
  AddCategory,
  CategoriesTable,
  CategoryDetail,
  UpdateCategory,
} from "./components/dashboard-components/CategoryItems";
import {
  AccountSetting,
  CreateUser,
  Profile,
  UpdateUser,
  UserList,
  UserProfile,
} from "./components/dashboard-components/UserItems";
import {
  OrderItem,
  OrdersList,
} from "./components/dashboard-components/OrderItems";
import Footer from "./components/client-components/Footer";
import {
  BottomNavigation,
  Navbar,
  TopLink,
} from "./components/client-components/Header";
import { Basket } from "./components/client-components/Cart";
import { SearchPage } from "./components/client-components/Search";
import { refreshToken } from "./redux/actions/authAction";
import { HomeDashboard } from "./components/dashboard-components/Overview";
import { FetchLoader } from "./components/client-components/SkeletonLoaders";
import NetworkStatus from "./components/client-components/Helpers/NetworkStatus";
import {
  EditCabinet,
  Projects,
  Team,
} from "./components/dashboard-components/UserItems/Cabinet";
import { CurrentCategory } from "./components/client-components/Categories";
import { CurrentBrand } from "./components/client-components/Brand";
import {
  CategoryItemsList,
  CreateCategoryItem,
} from "./components/dashboard-components/CategoryItems/CategoryItem";
import {
  CreatePost,
  PostDetail,
  PostsList,
  UpdatePost,
} from "./components/dashboard-components/Post";
import { PostPage } from "./components/client-components/Post";

function App() {
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    window.replainSettings = { id: "9ba7af42-4b86-455f-b953-ebe0286ecce7" };
    (function (u) {
      var s = document.createElement("script");
      s.async = true;
      s.src = u;
      var x = document.getElementsByTagName("script")[0];
      x.parentNode.insertBefore(s, x);
    })("https://widget.replain.cc/dist/client.js");
  }, []);

  return (
    <>
      <Toaster position="top-left" reverseOrder={true} />
      <NetworkStatus />
      <>
        {pathname === "/signup" ||
        pathname === "/signin" ||
        pathname === "/user/activate/:activationtoken" ||
        pathname === "/check-out" ? null : (
          <>
            <TopLink />
            <Navbar />
            <BottomNavigation />
          </>
        )}
      </>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/product/view/:id" element={<ProductDetail />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/category/:id" element={<CurrentCategory />} />
        <Route path="/brand/:slug" element={<CurrentBrand />} />
        <Route path="/cart" element={<Basket />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/post/view/:id" element={<PostPage />} />
        {auth.isLogged && (
          <>
            <Route path="/myprofile" element={<OverView />} />
            <Route path="/myprofile/orders" element={<MyOrders />} />
            <Route path="/myprofile/addresses" element={<Addresses />} />
            <Route path="/myprofile/settings" element={<Settings />} />
            <Route path="/myprofile/update" element={<EditMyProfile />} />
            <Route path="/myprofile/favorites" element={<Favorites />} />
            <Route path="/check-out" element={<CheckOut />} />
          </>
        )}
        <Route
          path="/user/activate/:activationtoken"
          element={<ActivationEmail />}
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

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
            <Route path="/brand/detail/:id" element={<BrandDetail />} />
            <Route path="/dashboard/categories" element={<CategoriesTable />} />
            <Route path="/category/add" element={<AddCategory />} />
            <Route path="/category/update/:id" element={<UpdateCategory />} />
            <Route path="/category/detail/:id" element={<CategoryDetail />} />
            <Route
              path="/categories/category/items"
              element={<CategoryItemsList />}
            />
            <Route
              path="/category/item/create"
              element={<CreateCategoryItem />}
            />
            <Route path="/dashboard/users" element={<UserList />} />
            <Route path="/user/create" element={<CreateUser />} />
            <Route path="/dashboard/orders" element={<OrdersList />} />
            <Route path="/dashboard/order/:id" element={<OrderItem />} />
            <Route path="/dashboard/cabinet" element={<Profile />} />
            <Route path="/cabinet/edit" element={<EditCabinet />} />
            <Route path="/cabinet/team" element={<Team />} />
            <Route path="/cabinet/projects" element={<Projects />} />
            <Route path="/cabinet/settings" element={<AccountSetting />} />
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path="/user/update/:id" element={<UpdateUser />} />
            <Route path="/dashboard/posts" element={<PostsList />} />
            <Route path="/post/create" element={<CreatePost />} />
            <Route path="/post/update/:id" element={<UpdatePost />} />
            <Route path="/post/detail/:id" element={<PostDetail />} />
          </>
        )}
      </Routes>
      {auth.isLoading && <FetchLoader isLoading={auth.isLoading} />}

      {pathname === "/signup" || pathname === "/signin" ? null : <Footer />}
    </>
  );
}

export default App;
