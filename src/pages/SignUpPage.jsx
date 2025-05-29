import { useState, useEffect } from "react";
import Form from "../components/Form";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function SignUpPage() {
  const [userName, setUserName] = useState("");
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
    await firebase.signUpUser(userName, email, password, role);
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
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-white to-indigo-50 flex items-center justify-center pt-16">
      <ToastContainer />
      <div className="w-full max-w-md px-4 py-8 sm:px-0 mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Create Account
          </h2>
          <p className="mt-2 text-gray-600">
            Join us and start your journey
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8">
          <Form
            setUserName={setUserName}
            userName={userName}
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
