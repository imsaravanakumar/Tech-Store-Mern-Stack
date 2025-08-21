import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

import Userlayout from "./components/Layout/Userlayout";
import Adminlayout from "./components/Layout/Adminlayout";

import Home from "./pages/Home";
import Phones from "./pages/Phones";
import Laptops from "./pages/Laptops";
import Watches from "./pages/Watchs";
import Cart from "./components/Cart/Cart";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SearchProducts from "./components/Comman/SearchProducts";

// ✅ Import your product details to use in search
import ProductDetails from "./components/Products/ProductDetails";
import AddressForm from "./components/Checkout/AddressForm";
import PaymentPage from "./components/Checkout/PaymentPage";
import OrderSuccess from "./components/Checkout/OrderSuccess";
import RazorPayment from "./components/Checkout/RazorPayment";
import PaymentFailed from "./components/Checkout/PaymentFailed";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Listen to login/logout from other tabs
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* 👤 User Layout Pages */}
        <Route path="/" element={<Userlayout token={token} setToken={setToken} />}>
          <Route index element={<Home />} />
          <Route path="phones" element={<Phones />} />
          <Route path="laptops" element={<Laptops />} />
          <Route path="watches" element={<Watches />} />

          {/* Auth Pages */}
          <Route
            path="signup"
            element={token ? <Navigate to="/" /> : <Signup setToken={setToken} />}
          />
          <Route
            path="login"
            element={token ? <Navigate to="/" /> : <Login setToken={setToken} />}
          />

          {/* 🔐 Protected Routes */}
          <Route
            path="cart"
            element={token ? <Cart /> : <Navigate to="/login" />}
          />
          <Route
            path="profile"
            element={token ? <Profile setToken={setToken} /> : <Navigate to="/login" />}
          />

          {/* 🔍 Search Products Route */}
          <Route
            path="search/:query"
            element={
              <SearchProducts
                products={[
                  ...ProductDetails.Phones,
                  ...ProductDetails.Laptops,
                  ...ProductDetails.Watches
                ]}
              />
            }
          />
        </Route>
        <Route path="/checkout/address" element={<AddressForm/>}/>
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/razorpay" element={<RazorPayment/>} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="payment-failed" element={<PaymentFailed />}/>
        {/* 🛠️ Admin Layout Pages */}
        <Route path="/admin" element={<Adminlayout />}>
          <Route
            index
            element={<div className="p-6">Welcome to Admin Dashboard</div>}
          />
        </Route>

        <Route
          path="*"
          element={<h1 className="text-center p-6 text-3xl">404 - Page Not Found</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
