import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Header from "./components/Header/Header";
import TopLink from "./components/Header/TopLink";
import CreateProduct from "./dashboard/CreateProduct";
import CreateUser from "./dashboard/CreateUser";
import HomeDashboard from "./dashboard/Home";
import ProductsTable from "./dashboard/ProductsTable";
import UpdateProduct from "./dashboard/UpdateProduct";
import UsersTable from "./dashboard/UsersTable";
import AddProduct from "./pages/AddProduct";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { UserContext } from "./reducers/useReducer";

function App() {
  const { state } = useContext(UserContext);

  console.log(state);

  return (
    <>
      <ToastContainer autoClose={1000} />
      <>
        <TopLink />
        <Header />
        {/* <Navbar /> */}
      </>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        {!state.userInfo && (
          <>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/user/create" element={<CreateUser />} />
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
            <Route path="/dashboard/users" element={<UsersTable />} />
            <Route path="/user/create" element={<CreateUser />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
