import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { SearchProvider } from "./context/search";
// import Main from "./components/nav/Main";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AccountActivate from "./pages/auth/AccountActivate";
import ForgotPassword from "./pages/auth/ForgotPassword";
import PasswordReset from "./pages/auth/PasswordReset";
import AccessAccount from "./pages/auth/AccessAccount";
import Dashboard from "./pages/user/Dashboard";
import AdCreate from "./pages/user/ad/AdCreate";
import PrivateRoute from "./components/routes/PrivateRoute";
import SellHouse from "./pages/user/ad/SellHouse";
import SellLand from "./pages/user/ad/SellLand";
import RentHouse from "./pages/user/ad/RentHouse";
import RentLand from "./pages/user/ad/RentLand";
import AdView from "./pages/AdView";
import Footer from "./components/nav/Footer";
import UpdateProfile from "./pages/user/UpdateProfile";
// import Settings from "./pages/user/Settings";
import UpdatePassword from "./pages/user/UpdatePassword";

import AdEdit from "./pages/user/ad/AdEdit";
import Wishlist from "./pages/user/Wishlist";
import Enquiries from "./pages/user/Enquiries";
import Agents from "./pages/Agents";
import Agent from "./pages/Agent";
import Buy from "./pages/Buy";
import Rent from "./pages/Rent";
import Search from "./pages/Search";
import Payment from "./pages/payment/Payment";
import Completion from "./pages/payment/Completion";
import CheckoutForm from "./pages/payment/CheckoutForm";
import Navbar from "./components/nav/Navbar";

const PageNotFound = () => (
  <div className="container-fluid m-5 p-5">
    <div className="container mt-5 pt-5" style={{ marginTop: "80px" }}>
      <div className="text-center p-5">
        <h2>404 PAGE NOT FOUND!</h2>
      </div>
    </div>
  </div>
);

const stripe = loadStripe("PUBLIC-KEY");

function App() {
  return (
    <BrowserRouter>
      <Elements stripe={stripe}>
        <AuthProvider>
          <SearchProvider>
            {/* <Main /> */}
            <Navbar />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable={false}
              pauseOnHover
              theme="light"
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<PasswordReset />} />

              <Route
                path="/auth/account-activate"
                element={<AccountActivate />}
              />
              <Route
                path="/auth/forgot-password"
                element={<ForgotPassword />}
              />
              <Route
                path="/auth/access-account/:token"
                element={<AccessAccount />}
              />
              <Route path="user/payment" element={<Payment />} />
              <Route path="user/completion" element={<Completion />} />
              <Route path="user/checkout" element={<CheckoutForm />} />

              <Route path="/" element={<PrivateRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="ad/create" element={<AdCreate />} />
                <Route path="ad/create/sell/house" element={<SellHouse />} />
                <Route path="ad/create/sell/land" element={<SellLand />} />
                <Route path="ad/create/rent/house" element={<RentHouse />} />
                <Route path="ad/create/rent/land" element={<RentLand />} />
                <Route path="user/profile" element={<UpdateProfile />} />
                {/* <Route path="user/settings" element={<Settings />} /> */}
                <Route
                  path="user/update-password"
                  element={<UpdatePassword />}
                />

                <Route path="user/ad/:slug" element={<AdEdit />} />
                <Route path="user/wishlist" element={<Wishlist />} />
                <Route path="user/enquiries" element={<Enquiries />} />
                {/* <Route path="user/payment" element={<Payment />} /> */}
              </Route>

              <Route path="/ad/:slug" element={<AdView />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/agent/:username" element={<Agent />} />

              <Route path="/buy" element={<Buy />} />
              <Route path="/rent" element={<Rent />} />
              <Route path="/search" element={<Search />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
          </SearchProvider>
        </AuthProvider>
      </Elements>
    </BrowserRouter>
  );
}

export default App;
