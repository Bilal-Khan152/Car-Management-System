import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const firebase = useFirebase();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    console.log("email", email, "password", password);
    setEmail("");
    setPassword("");
    try {
      const user = await firebase.signInUser(email, password);

      if (!user) {
        toast.warning("Login failed");
        return;
      }

      // 🔑 Get role from localStorage 
      const role = localStorage.getItem("userRole") ;

      if (!role) {
        toast.warning("User role not found in local storage.");
        return;
      }

      // ✅ Redirect based on role
      if (role === "admin") {
        navigate("/");
      } else if (role === "purchaser") {
        navigate("/");
      } else if (role === "renter") {
        navigate("/");
      } else {
        toast.warning("Access Denied: Unknown role.");
      }
 

    } catch (error) {
      console.log("Login error:", error);
      toast.error("An error occurred during login.");
    }
  };

  useEffect(()=>{
    setEmail("")
    setPassword("")
  },[])


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to Your Account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm
            email={email}
            password={password}
            handleOnSubmit={handleOnSubmit}
            setEmail={setEmail}
            setPassword={setPassword}
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
