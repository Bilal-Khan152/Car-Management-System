import React, { useState } from "react";
import { useFirebase } from "../context/Firebase";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const firebase = useFirebase();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    console.log("email", email, "password", password);

    try {
      const { user, role } = await firebase.signInUser(email, password);

      if (!user) {
        alert("Login failed");
        return;
      }

      if (!role) {
        alert("User does not exist in Firestore.");
        return;
      }

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "purchaser") {
        navigate("/newsPost");
      } else if (role === "renter") {
        navigate("/renter");
      } else {
        alert("Access Denied: You are not an admin.");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          User Registration
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
