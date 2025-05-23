 import { useState, useEffect } from "react";
import Form from "../components/Form";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function SignUpPage() {
  const [userName , setUserName] = useState("") ;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const firebase = useFirebase();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password || !role || !userName) {
      toast.warning("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    await firebase.signUpUser(userName  ,email, password, role);
  };

  useEffect(() => {
    if (isSubmitting && firebase.role) {
      if (firebase.role === "renter") {
        navigate("/renter");
      } else if (firebase.role === "purchaser") {
        navigate("/newsPost");
      } else if (firebase.role === "admin") {
        navigate("/admin");
      }
    }
  }, [isSubmitting, firebase.role, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 ">
      <ToastContainer />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          User Registration
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form
          setUserName={setUserName}
          userName = {userName}
            email={email}
            password={password}
            role={role}
            handleOnSubmit={handleOnSubmit}
            setEmail={setEmail}
            setPassword={setPassword}
            setRole={setRole}
          />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
