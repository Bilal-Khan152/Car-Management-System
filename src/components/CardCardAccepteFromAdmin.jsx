import React from 'react'
import { useFirebase } from '../context/Firebase'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function CardCardAccepteFromAdmin({ imageUrl, carName,   modal, id }) {

  const firebase = useFirebase();
  const navigate = useNavigate();




  const handleOnClick = () => {
    if (firebase.isLoggedIn) {
      navigate(`/viewRentCarDetail/${id}`)
    }
    else {
      toast.warning("Please login or sign up")
    }

  }

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
        <p className="mb-3 font-semibold text-gray-700">
          Car Modal : <span className='font-bold italic'>{modal}</span>
        </p>

       

      </div>

      <button onClick={handleOnClick} className=" cursor-pointer mt-3 mb-2 ms-3    bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        View Details
      </button>


    </div>)
}

export default CardCardAccepteFromAdmin
