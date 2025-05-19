/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react" ; 
import CardCardAccepteFromAdmin from "../components/CardCardAccepteFromAdmin" ;
import car1 from "../assets/car1.jpg" ;
import car2 from "../assets/car2.webp" ;
import car3 from "../assets/car3.jpg" ;
import car4 from "../assets/car4.jpg" ;
import car5 from "../assets/car5.jpg" ;
import car6 from "../assets/car6.jpg" ;
import { useFirebase } from "../context/Firebase" ;

function CarsForRent() {
  const [acceptCars, setAcceptsCars] = useState([]) ;
  const [filteredCars, setFilteresCars] = useState([]) ;
  const [searchName, setSearchName] = useState("") ;
  const [currentPage , setCurrentPage] = useState(1) ;

   const itemsPerPage = 6 ;
  const firebase = useFirebase() ;

  const fetchAccetedCars = async () => {
    try {
      // Fetch accepted renter cars
      const renterSnapshot = await firebase.getAcceptedRenterCards();
      const renterData = renterSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAcceptsCars(renterData);
      setFilteresCars(renterData);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  useEffect(() => {
    fetchAccetedCars();
  }, []);

  useEffect(() => {
    const filtered = acceptCars.filter((car) =>
      car.carName.toLowerCase().includes(searchName.toLocaleLowerCase())
    );

    setFilteresCars(filtered);
  }, [searchName, acceptCars]);

  const lastIndex = currentPage * itemsPerPage ;
  const firstIndex = lastIndex - itemsPerPage ;
  const currentcards = filteredCars.slice(firstIndex, lastIndex) ;
  const totalPages =  Math.ceil(filteredCars.length / itemsPerPage) ;
  const images = [car1, car2, car3, car4, car5, car6];

  return (
    <div className="bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto text-center mb-10 pt-4 ">
        <h1 className="text-4xl font-bold ">Available Cars for Rent</h1>
        <p className="mt-2 ">Select your car and enjoy your day .</p>
      </div>

      {/* search input  */}
      <div className="max-w-7xl mx-auto text-center mb-8">
        <input
          type="text"
          placeholder="Search by car name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="px-4 py-2 rounded text-white w-full max-w-md border-2 border-white placeholder:text-gray-500"
        />
      </div>

      {/* accepted cars data */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
         {currentcards.length > 0 ? (
  currentcards.map((car, index) => (
    <CardCardAccepteFromAdmin
      key={car.id}
      carName={car.carName}
      modal={car.carModal}
      id={car.id}
      imageUrl={images[index % images.length]}
    />
  ))
) : (
  <div className="col-span-full flex justify-center items-center h-96">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-200">No cars available for rent kindly check later.</h2>
    
    </div>
  </div>
)}

      </div>


      {totalPages > 1 && (
  <div className="flex justify-center mt-6   space-x-4">
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className={`px-5 py-2 rounded-full font-semibold transition duration-300 cursor-pointer shadow-md ${
        currentPage === 1
          ? "bg-gray-400 text-white cursor-not-allowed"
          : "bg-indigo-600 text-white hover:bg-indigo-700"
      }`}
    >
      Previous
    </button>

    <span className="px-5 py-2 bg-white text-gray-800 font-medium rounded-full shadow-sm">
      Page {currentPage} of {totalPages}
    </span>

    <button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      className={`px-5 py-2 rounded-full font-semibold transition duration-300  cursor-pointer shadow-md ${
        currentPage === totalPages
          ? "bg-gray-400 text-white cursor-not-allowed"
          : "bg-indigo-600 text-white hover:bg-indigo-700"
      }`}
    >
      Next
    </button>
  </div>
)}
    </div>
  );
}

export default CarsForRent ;
