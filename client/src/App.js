import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navbar from "./components/Navbar";
import HomeDashboard from "./dashboard/HomeDashboard HomeDashboard";
import AddProduct from "./pages/AddProduct";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { initialState, reducer } from "./reducers/useReducer";

export const UserContext = createContext();

const Routing = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
      setIsAdmin(user.admin);
      if(user.admin) {
        navigate("/")
      }
      else {
        navigate("/");
      }
    } else {
      navigate("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(isAdmin);
  if (isAdmin) {
    return (
      <Routes>
        <Route path="/" element={<HomeDashboard />} />
      </Routes>
    );
  }
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/add" element={<AddProduct />} />
      </Routes>
    </>
  );
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <ToastContainer />
      <Routing />
    </UserContext.Provider>
  );
}

export default App;
