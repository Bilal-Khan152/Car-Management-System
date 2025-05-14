import SignUpPage from './pages/SignUpPage';
import './App.css' ;
import LoginPage from './pages/LoginPage';
import { Route, Routes } from "react-router-dom";
import AdminPage from "./pages/AdminPage" ;
import NewsPost from './pages/NewsPost';
import RenterPage from './pages/RenterPage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Notifications from './pages/Notifications';
import ManageRenterListing from './pages/ManageRenterListing';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



function App() {
 
   

  return (
    <> 

    <Navbar/>
       <ToastContainer 
        position="top-right"
        autoClose={5000} // Auto close after 5 seconds
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />


    <Routes>
       



       
        <Route path="/" element={<HomePage/>} />
       <Route path="/login" element={<LoginPage/>} />
        
        <Route path="/admin" element={<AdminPage/>} />
        <Route path="/signUp" element={<SignUpPage/>} />
        <Route path="/newsPost" element={<NewsPost/>} />
        <Route path="/renter" element={<RenterPage/>} />
        <Route path="/notification" element={<Notifications/>} />
        <Route path="/manageRenterListing" element={<ManageRenterListing/>} />
        

       
      </Routes>



    </>
  )
}

export default App ; 
