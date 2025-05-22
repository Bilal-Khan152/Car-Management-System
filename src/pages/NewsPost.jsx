/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import CarsCardForNewPost from "../components/CarsCarForNewPost";
import car1 from "../assets/car1.jpg";
import car2 from "../assets/car2.webp";
import car3 from "../assets/car3.jpg";
import car4 from "../assets/car4.jpg";
import car5 from "../assets/car5.jpg";
import car6 from "../assets/car6.jpg";

function NewsPost() {
  const [carsData, setCarsData] = useState([]) ;
  const [filteredCars, setFilteresCars] = useState([]) ;
  const [searchName, setSearchName] = useState("") ;
  const [currentPage , setCurrentPage] = useState(1) ; 

  const itemsPerPage = 6 ; 
  


  const firebase = useFirebase();

  const fetchCars = async () => {
    try {
      // Fetch admin cars
      const carsSnapshot = await firebase.getCarCardData();
      const carsData = carsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCarsData(carsData);
      setFilteresCars(carsData);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  useEffect(() => {
    fetchCars()
  }, []) ;

  useEffect(() => {
    const filtered = carsData.filter((car) =>
      car.carName.toLowerCase().includes(searchName.toLocaleLowerCase())
    ) ;
    setFilteresCars(filtered) ;
  }, [searchName, carsData]) ;

const  lastIndex   = currentPage * itemsPerPage ; 
const  firstIndex  = lastIndex - itemsPerPage  ;
const currentCards = filteredCars.slice(firstIndex , lastIndex) ; 
const  totalPages = Math.ceil(filteredCars.length / itemsPerPage) ; 
  
 


  const images = [car1, car2, car3, car4, car5, car6] ;

   return (
  <div className="min-h-screen bg-stone-900 text-white py-6 sm:py-10 px-4 sm:px-6">
    {/* Title Section */}
    <div className="max-w-7xl mx-auto text-center mb-6 sm:mb-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
        Available Cars for Purchase
      </h1>
      <p className="mt-2 text-sm sm:text-base text-gray-300">
        Select your dream car and proceed with your purchase.
      </p>
    </div>

    {/* Search Input */}
    <div className="max-w-7xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
      <div className="relative max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by car name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-full px-4 py-2 sm:py-3 rounded-lg bg-stone-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <svg
          className="absolute right-3 top-2.5 sm:top-3 h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>

    {/* Cards Grid */}
    <div className="max-w-7xl mx-auto">
      {currentCards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {currentCards.map((car, index) => (
            <CarsCardForNewPost
              key={car.id}
              carName={car.carName}
              carModal={car.carModal}
              desc={car.description}
              imageUrl={images[index % images.length]}
              carPrice={car.price}
              id={car.id}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg sm:text-xl text-gray-300">
            No cars available matching your search.
          </p>
        </div>
      )}
    </div>

    {/* Pagination */}
    {totalPages > 1 && (
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 pb-6 sm:pb-10">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-sm sm:text-base font-medium transition duration-300 shadow ${
            currentPage === 1
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
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
          className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-sm sm:text-base font-medium transition duration-300 shadow ${
            currentPage === totalPages
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
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

export default NewsPost;
