/* eslint-disable react-hooks/exhaustive-deps */
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import NewsPost from "./pages/NewsPost";
import RenterPage from "./pages/RenterPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Notifications from "./pages/Notifications";
import ManageRenterListing from "./pages/ManageRenterListing";
import { useState, useEffect } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useFirebase } from "./context/Firebase";
import CarsForRent from "./pages/CarsForRent";
import ProtectedRoute from "./components/ProtectedRoute";
import DetailsOfSellCar from "./pages/DetailsOfSellCar";

function App() {
  const [notifications, setNotications] = useState([]);

  const firebase = useFirebase();

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const data = await firebase.fetchNotifications();
        setNotications(data);
      } catch (error) {
        console.log("error fetching notifications", error);
      }
    };

    getNotifications();
  }, []);

  return (
    <>
      <Navbar notifications={notifications} setNotications={setNotications} />
      <ToastContainer
        position="top-right"
        autoClose={3000} // Auto close after 3 seconds
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />

      <Routes>
        {/*  public routes  */}

        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />

        {/* protected admin route */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manageRenterListing"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageRenterListing />
            </ProtectedRoute>
          }
        />

        {/* protected renter route */}

        <Route
          path="/renter"
          element={
            <ProtectedRoute allowedRoles={["renter"]}>
              <RenterPage />
            </ProtectedRoute>
          }
        />

        {/* protected purchaser route     */}

        <Route
          path="/carsForRent"
          element={
            <ProtectedRoute allowedRoles={["purchaser"]}>
              <CarsForRent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/carsForSell"
          element={
            <ProtectedRoute allowedRoles={["purchaser"]}>
              <NewsPost />
            </ProtectedRoute>
          }
        />
         <Route
          path="/viewCarDetail/:id"
          element={
            <ProtectedRoute allowedRoles={["purchaser"]}>
               <DetailsOfSellCar/>
            </ProtectedRoute>
          } 
        />

        {/* notification is common to all roles */}

        <Route
          path="/notification"
          element={
            <ProtectedRoute allowedRoles={["admin", "renter", "purchaser"]}>
              <Notifications
                notifications={notifications}
                setNotications={setNotications}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
