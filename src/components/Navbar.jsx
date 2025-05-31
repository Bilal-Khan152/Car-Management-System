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
      {notifications?.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          {notifications.length}
        </span>
      )}
    </div>
  );

  const { role, isLoggedIn } = firebase;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-blue-600 text-white px-4 py-2 flex flex-col md:flex-row items-center justify-between shadow-md z-50">
      {/* Left Logo */}
      <div className="text-xl md:text-2xl italic font-bold mb-2 md:mb-0">
        <Link to="/" className="hover:text-blue-100 transition-colors">MotorMinds</Link>
      </div>

      {/* Navigation Links */}
      <ul className="flex flex-wrap justify-center gap-2 items-center text-sm">
        <li>
          <Link to="/" className="hover:bg-blue-700 px-3 py-1.5 rounded transition-colors">Home</Link>
        </li>

        {!isLoggedIn && (
          <>
            <li>
              <Link to="/login" className="hover:bg-blue-700 px-3 py-1.5 rounded transition-colors">Login</Link>
            </li>
            <li>
              <Link to="/signUp" className="hover:bg-blue-700 px-3 py-1.5 rounded transition-colors">Sign Up</Link>
            </li>
          </>
        )}

        {isLoggedIn && role === "admin" && (
          <>
            <li>
              <Link to="/admin" className="hover:bg-blue-700 px-3 py-1.5 rounded transition-colors">Admin</Link>
            </li>
            <li>
              <Link to="/manageRenterListing" className="hover:bg-blue-700 px-3 py-1.5 rounded transition-colors">Manage Listings</Link>
            </li>
            <li>
              <Link to="/chatting" className="hover:bg-blue-700 px-3 py-1.5 rounded transition-colors">Chats</Link>
            </li>
             <li>
              <Link to="/profilePage" className=" px-3 py-1.5 rounded transition-colors">Profile Page</Link>
            </li>
            <li>
              <Link to="/notification" className=" px-3 py-1.5  rounded transition-colors">{renderBellIcon()}</Link>
            </li>
          </>
        )}

        {isLoggedIn && role === "renter" && (
          <>
            <li>
              <Link to="/renter" className="hover:bg-blue-700 px-3 py-1.5 rounded transition-colors">My-Rentals</Link>
            </li>
            <li>
              <Link to="/chatting" className="hover:bg-blue-700 px-3 py-1.5 rounded transition-colors">Chats</Link>
            </li>
              <li>
              <Link to="/profilePage" className=" px-3 py-1.5 rounded transition-colors">Profile Page</Link>
            </li>
            <li>
              <Link to="/notification" className=" px-3 py-1.5 rounded transition-colors">{renderBellIcon()}</Link>
            </li>
          </>
        )}

        {isLoggedIn && role === "purchaser" && (
          <>
            <li>
              <Link to="/carsForRent" className="hover:bg-blue-700 px-3 py-1.5 rounded transition-colors">Rent Cars</Link>
            </li>
            <li>
              <Link to="/carsForSell" className="hover:bg-blue-700 px-3 py-1.5 rounded transition-colors">Buy Cars</Link>
            </li>
            <li>
              <Link to="/chatting" className="hover:bg-blue-700 px-3 py-1.5 rounded transition-colors">Chats</Link>
            </li>
              <li>
              <Link to="/profilePage" className=" px-3 py-1.5 rounded transition-colors">Profile Page</Link>
            </li>
            <li>
              <Link to="/notification" className="  px-3 py-1.5  rounded transition-colors">{renderBellIcon()}</Link>
            </li>
          </>
        )}

        {/* Log Out button for all logged-in users */}
        {isLoggedIn && (
          <li>
            <button
              onClick={handleLogOut}
              className="bg-white text-blue-600 px-3 py-1.5 rounded hover:bg-blue-50 transition-colors text-sm font-medium"
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