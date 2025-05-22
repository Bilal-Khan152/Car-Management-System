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
  <div className="bg-stone-900 text-white min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-6 pt-6 md:pt-8 lg:pt-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Available Cars for Rent</h1>
        <p className="mt-2 text-sm sm:text-base md:text-lg text-gray-300">
          Select your car and enjoy your day.
        </p>
      </div>

      {/* Search Input */}
      <div className="flex justify-center mb-6 md:mb-8">
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search by car name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="px-4 py-2 rounded-lg text-white w-full border-2 border-gray-600 bg-stone-800 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Cars Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
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
            <div className="col-span-full flex justify-center items-center py-16 sm:py-24">
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-200">
                  No cars available for rent, kindly check later.
                </h2>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 md:mt-8 pb-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-full font-medium sm:font-semibold text-sm sm:text-base transition duration-300 shadow ${
              currentPage === 1
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Previous
          </button>

          <span className="px-4 py-1.5 sm:px-5 sm:py-2 bg-white text-gray-800 font-medium rounded-full shadow-sm text-sm sm:text-base">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-full font-medium sm:font-semibold text-sm sm:text-base transition duration-300 shadow ${
              currentPage === totalPages
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  </div>
);
}

export default CarsForRent ;
