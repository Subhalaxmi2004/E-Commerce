import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Home from "./pages/home/Home";
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Nopage from "./pages/nopage/Nopage";
import MyState from "./context/data/MyState";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import Productinfo from "./pages/productinfo/Productinfo";
import DashboardTab from "./pages/admin/dashboard/DashboardTab";
import AddProduct from "./pages/admin/page/AddProduct";
import UpdateProduct from "./pages/admin/page/UpdateProduct";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductCard from './components/productCard/ProductCard';
const App = () => {
  
  return (
    <div>
      <MyState>
        <Router>
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/Order" element={<UserRoute><Order /></UserRoute>} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
            <Route path="/DashboardTab" element={<DashboardTab />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/ProductCard" element={<ProductCard />} />
            <Route path="/" element={<Signup />} />
            <Route path="/AddProduct" element={<AdminRoute><AddProduct /></AdminRoute>} />
            <Route path="/UpdateProduct" element={<AdminRoute><UpdateProduct /></AdminRoute>} />
            <Route path="/*" element={<Nopage />} />
            <Route path="/Productinfo/:id" element={<Productinfo />} />
          </Routes>
          <ToastContainer />
        </Router>
      </MyState>
    </div>
  );
}

export default App;

const UserRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return children;
  } else {
    return <Navigate to={"/Login"} />;
  }
};

const AdminRoute = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));

  if (admin && admin.user.email === "subha234@gmail.com") {
    return children;
  } else {
    return <Navigate to={"/Login"} />;
  }
};
