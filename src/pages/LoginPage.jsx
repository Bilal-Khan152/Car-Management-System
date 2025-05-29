import React, { useEffect, useState } from "react" ;
import { useFirebase } from "../context/Firebase" ;
import LoginForm from "../components/LoginForm" ;
import { useNavigate } from "react-router-dom" ;
import { toast } from "react-toastify" ;

function LoginPage() {
  const [email, setEmail] = useState("") ;
  const [password, setPassword] = useState("") ;

  const navigate = useNavigate() ;
  const firebase = useFirebase() ;

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

      //  Get role from localStorage 
      const role = localStorage.getItem("userRole") ;

      if (!role) {
        toast.warning("User role not found in local storage.");
        return;
      }

      //  Redirect based on role
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
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-white to-indigo-50 flex items-center justify-center pt-16">
      <div className="w-full max-w-md px-4 py-8 sm:px-0 mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-gray-600">
            Please sign in to your account
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8">
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
