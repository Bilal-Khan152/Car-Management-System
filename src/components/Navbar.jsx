import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';
import { FaRegBell } from "react-icons/fa";
import { toast } from 'react-toastify';

function Navbar({ notifications }) {

  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleLogOut = () => {
    firebase.signOutUser();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const renderBellIcon = () => (
    <div className="relative">
      <FaRegBell className="text-xl" />
      {notifications.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          {notifications.length}
        </span>
      )}
    </div>
  );





  const { role, isLoggedIn } = firebase;

  return (
    <nav className="bg-blue-600 text-white px-6 py-2 flex items-center justify-between shadow-md">
      {/* Left Logo */}
      <div className="text-2xl font-bold">
        <Link to="/">MyApp</Link>
      </div>

      {/* Navigation Links */}
      <ul className="flex gap-6 items-center text-lg">
        <li>
          <Link to="/" className="hover:bg-blue-700 px-3 py-1 rounded">Home</Link>
        </li>

        {!isLoggedIn && (
          <>
            <li>
              <Link to="/login" className="hover:bg-blue-700 px-3 py-1 rounded">Login</Link>
            </li>
            <li>
              <Link to="/signUp" className="hover:bg-blue-700 px-3 py-1 rounded">Sign Up</Link>
            </li>
          </>  
        )}

        {isLoggedIn && role === "admin" && (
          <>
            <li>
              <Link to="/admin" className="hover:bg-blue-700 px-3 py-1 rounded">Admin</Link>
            </li>

            <li>
              <Link to="/manageRenterListing" className="hover:bg-blue-700 px-3 py-1 rounded">Manage Listings</Link>
            </li>

             <li>
              <Link to="/chatting" className="hover:bg-blue-700 px-3 py-1 rounded">Your Chats</Link>
            </li>

            <li>
              <Link to="/notification" className="  px-3 py-1 rounded">{renderBellIcon()}</Link>
            </li>
          </>
        )}

        {isLoggedIn && role === "renter" && (
          <>
            <li>
              <Link to="/renter" className="hover:bg-blue-700 px-3 py-1 rounded">My-Rentals</Link>
            </li>
             <li>
              <Link to="/chatting" className="hover:bg-blue-700 px-3 py-1 rounded">Your Chats</Link>
            </li>
            <li>
              <Link to="/notification" className="  px-3 py-1 rounded">{renderBellIcon()}</Link>
            </li>
          </>
        )}

        {isLoggedIn && role === "purchaser" && (
          <>
            <li>
              <Link to="/carsForRent" className=" px-3 py-1 rounded hover:bg-blue-700 ">Cars For Rent</Link>
            </li>
            <li>
              <Link to="/carsForSell" className=" px-3 py-1 rounded hover:bg-blue-700">Cars For Buy</Link>
            </li>
             <li>
              <Link to="/chatting" className="hover:bg-blue-700 px-3 py-1 rounded">Your Chats</Link>
            </li>
            <li>
              <Link to="/notification" className=" px-3 py-1 rounded">{renderBellIcon()}</Link>
            </li>

          </>
        )}

        {/* ✅ Log Out button for all logged-in users */}
        {isLoggedIn && (
          <li>
            <button
              onClick={handleLogOut}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100"
            >
              Log Out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
