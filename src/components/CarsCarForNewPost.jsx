import React from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

function CarsCarForNewPost({ carName, desc, imageUrl, id ,  carModal , carPrice }) {
  const navigate = useNavigate() ;
  const firebase = useFirebase() ;

  const handleONCLick = () => {
    if (firebase.isLoggedIn) {
      navigate(`/viewCarDetail/${id}`) ;
    } else {
      alert("Please Login or Signup") ;
    }
  } ;

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]">
      <div className="relative overflow-hidden h-48">
        <img
          src={imageUrl}
          alt={carName}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      <div className="p-5">
        <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {carName}
        </h3>
        <p className="mb-3 font-bold text-gray-700"> 
          Car Modal : <span className="font-semibold italic"> {carModal} </span> </p>
  
       

        <button
          onClick={handleONCLick}
          className="cursor-pointer mt-3 mb-2 ms-3    bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default CarsCarForNewPost;
