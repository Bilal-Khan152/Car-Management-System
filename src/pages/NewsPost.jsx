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
    <div className="min-h-screen bg-stone-900 text-white py-10 px-4">
      {/* Title */}
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold ">Available Cars for Purchase</h1>
        <p className="mt-2 ">
          Select your dream car and proceed with your purchase.
        </p>
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




      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-3.5">
        {currentCards.map((car, index) => (
          <CarsCardForNewPost
            key={car.id}
            carName={car.carName}
            carModal = {car.carModal}
            desc={car.description}
            imageUrl={images[index % images.length]}
            carPrice = {car.price}
            id={car.id}
          />
        ))}
      </div>   

        {totalPages > 1 && (
  <div className="flex justify-center mt-6 mb-6 space-x-4">
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

export default NewsPost;
