 
import React, { useState } from "react";
import ModalForRenter from "../components/ModalForRenter";

import { useFirebase } from "../context/Firebase";
import CarsCardForRenter from "../components/CarsCardForRenter";
import { saveNotification } from "../utils/saveNotification";
import { toast } from "react-toastify";

function RenterPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const [carName, setCarName] = useState("") ;
  const [description, setDescription] = useState("") ;
  const [price, setPrice] = useState("") ;
  const [carModal , setCarModal] = useState("") ;
   

  const firebase = useFirebase();

  const handleOnSubmit = async (e) => {
    e.preventDefault() ;
    try {
      console.log("submitting", carName, description) ;
      await firebase.storedRenterCarDetails(carName, description, price , carModal) ;
      toast.success("send request to admin for approval!") ;
      setCarName("") ;
      setDescription("") ;
      setPrice("") ;
      setCarModal("") ;
      setIsModalOpen(false) ; 


  await saveNotification({
  message : `Renter submitted a new car for rent: ${carName}` , 
  fromRole : "renter" , 
  toRoles : ["admin"]  ,
  type : "request"  ,
  


  }) ;

  

    } catch (error) {
      console.error("Error adding car:", error);
      toast.warning("Failed to add car.");
    }
  };


  return (
    <div className="bg-slate-600 w-full min-h-screen flex flex-col items-center custom-Background">
      <div className="w-full flex justify-center pt-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300 shadow-lg"
        >
          Add Post
        </button>
      </div>
{/* 
      <div className="text-center text-white text-2xl font-semibold mt-8">
        {carsData.length === 0
          ? "There is no car for sell at the moment."
          : "Available Cars"}
      </div> */}

      {/* Modal/Popup */}
      <ModalForRenter
        isModalOpen={isModalOpen}
        carName={carName}
        setCarName={setCarName}
        setDescription={setDescription}
        description={description}
        price={price}
        setPrice={setPrice}
        setIsModalOpen={setIsModalOpen}
        handleOnSubmit={handleOnSubmit}
        modal={carModal}
        setCarModal={setCarModal}
      />

   
    </div>
  );
}

export default RenterPage;
