 import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

function Navbar() {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleLogOut = () => {
    firebase.signOutUser();
    alert("Logged out successfully!");
    navigate("/login");
  };

  const { role, isLoggedIn } = firebase;

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between shadow-md">
      {/* Left Logo / Brand */}
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
              <Link to="/notification" className="hover:bg-blue-700 px-3 py-1 rounded">Notifications</Link>
            </li>
            <li>
              <Link to="/manageRenterListing" className="hover:bg-blue-700 px-3 py-1 rounded">Manage Listings</Link>
            </li>
          </>
        )}

        {isLoggedIn && role === "renter" && (
          <>
            <li>
              <Link to="/renter" className="hover:bg-blue-700 px-3 py-1 rounded">Renter</Link>
            </li>
            <li>
              <Link to="/notification" className="hover:bg-blue-700 px-3 py-1 rounded">Notifications</Link>
            </li>
          </>
        )}

        {isLoggedIn && role === "purchaser" && (
          <>
            <li>
              <Link to="/notification" className="hover:bg-blue-700 px-3 py-1 rounded">Notifications</Link>
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
