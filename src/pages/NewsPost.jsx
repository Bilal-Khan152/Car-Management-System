/* eslint-disable react-hooks/exhaustive-deps */
 import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/Firebase';
import CarsCardForNewPost from '../components/CarsCarForNewPost';
import car1 from '../assets/car1.jpg';
import car2 from '../assets/car2.webp';
import car3 from '../assets/car3.jpg';
import car4 from '../assets/car4.jpg';
import car5 from '../assets/car5.jpg';
import car6 from '../assets/car6.jpg';
import CardCardAccepteFromAdmin from '../components/CardCardAccepteFromAdmin';

function NewsPost() {
  const [carsData, setCarsData] = useState([]) ;
  const [acceptCars , setAcceptsCars] = useState([]) ;


  const firebase = useFirebase();

 const fetchCars = async () => {
  try {
    // Fetch admin cars
    const carsSnapshot = await firebase.getCarCardData();
    const carsData = carsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

   
 
    setCarsData(carsData);
  } catch (error) {
    console.error("Error fetching car data:", error);
  }
};

const fetchAccetedCars = async () => {
  try {
     // Fetch accepted renter cars
    const renterSnapshot = await firebase.getAcceptedRenterCards();
    const renterData = renterSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

   setAcceptsCars(renterData)


  } catch (error) {
     console.error("Error fetching car data:", error);
  }
}

useEffect(()=>{
  fetchCars()
   fetchAccetedCars()
},[])

  const images = [car1, car2, car3, car4, car5, car6];

  return (
    <div className="min-h-screen bg-stone-900 text-white py-10 px-4">
      {/* Title */}
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold ">Available Cars for Purchase</h1>
        <p className="mt-2 ">Select your dream car and proceed with your purchase.</p>
      </div>
   
     
      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-3.5">
        {carsData.map((car, index) => (
          <CarsCardForNewPost
            key={car.id}
            carName={car.carName}
            desc={car.description}
            imageUrl={images[index % images.length]}
          />
        ))}
      </div>


    <p className='text-4xl font-bold'>Cars For Rent : </p>

    {/* accepted cars data */}
     <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {acceptCars.map((car, index) => (
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

export default NewsPost;
