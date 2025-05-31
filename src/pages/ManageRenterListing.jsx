import React, { useEffect, useState } from "react";
import car1 from "../assets/car1.jpg";
import car2 from "../assets/car2.webp";
import car3 from "../assets/car3.jpg";
import car4 from "../assets/car4.jpg";
import car5 from "../assets/car5.jpg";
import car6 from "../assets/car6.jpg";
import CarsCardForRenter from "../components/CarsCardForRenter";
import { useFirebase } from "../context/Firebase";
import { FaCarSide } from "react-icons/fa";

function ManageRenterListing() {
  const [carsData, setCarsData] = useState([]);
  const firebase = useFirebase();

  const fetchCars = async () => {
    const querySnapshot = await firebase.getRenterCards();
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCarsData(data);
  };

  useEffect(() => {
    fetchCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAccept = async (createdAtDate) => {
    try {
      await firebase.acceptRenterRequest(createdAtDate);
      alert("Request accepted.");
      fetchCars();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to accept request.");
    }
  };

  if (carsData.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="flex justify-center">
            <FaCarSide className="text-6xl text-gray-300 mb-4" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            No Cars Available
          </h2>
          <p className="text-gray-500 max-w-md">
            There are no car listings from renters yet. Check back later for new listings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {carsData.map((car, index) => {
          const images = [car1, car2, car3, car4, car5, car6];

          return (
            <CarsCardForRenter
              key={car.id}
              carName={car.carName}
              desc={car.description}
              imageUrl={images[index % images.length]}
              price={car.price}
              createdAt={car.createdAt?.toDate?.()}
              onAccept={() => handleAccept(car.createdAt?.toDate?.())}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ManageRenterListing;
