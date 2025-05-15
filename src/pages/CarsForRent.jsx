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

  const images = [car1, car2, car3, car4, car5, car6];

  return (
    <div className="bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto text-center mb-10 ">
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
        {filteredCars.map((car, index) => (
          <CardCardAccepteFromAdmin
            key={car.id}
            carName={car.carName}
            desc={car.description}
            imageUrl={images[index % images.length]}
          />
        ))}
      </div>
    </div>
  );
}

export default CarsForRent ;
