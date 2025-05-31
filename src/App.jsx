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
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useFirebase } from "./context/Firebase";
import CarsForRent from "./pages/CarsForRent";
import ProtectedRoute from "./components/ProtectedRoute";
import DetailsOfSellCar from "./pages/DetailsOfSellCar";
import DetailsOfRentCar from "./pages/DetailsOfRentCar";
import ProfilePage from "./pages/ProfilePage";
import Chats from "./pages/Chats";
import "./App.css";


function App() {
  const [notifications, setNotications] = useState([]) ;

  const firebase = useFirebase() ;

 // console.log(firebase.user.uid)

  useEffect(() => {
  if (!firebase.user) return;

  const getNotifications = async () => {
    try {
      const unread = await firebase.fetchNotifications(firebase.user.uid);
      setNotications(unread);
    } catch (error) {
      console.log("error fetching notifications", error);
    }
  };

  getNotifications();
}, [firebase.user]);



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

          <Route
          path="/viewRentCarDetail/:id"
          element={
            <ProtectedRoute allowedRoles={["purchaser"]}>
               <DetailsOfRentCar/>
            </ProtectedRoute>
          } 
        />
        
        {/* notification , chats and profile page are common to all roles */}

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
 
         <Route
          path="/chatting"
          element={
            <ProtectedRoute allowedRoles={["admin", "renter", "purchaser"]}>
               <Chats/>
            </ProtectedRoute>
          }
        />
         
           <Route
          path="/profilePage"
          element={
            <ProtectedRoute allowedRoles={["admin", "renter", "purchaser"]}>
               <ProfilePage/>
            </ProtectedRoute>
          }
        />

      </Routes>

    </>
  );
}

export default App;
