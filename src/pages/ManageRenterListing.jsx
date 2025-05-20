import React, { useEffect, useState } from "react";
import car1 from "../assets/car1.jpg";
import car2 from "../assets/car2.webp";
import car3 from "../assets/car3.jpg";
import car4 from "../assets/car4.jpg";
import car5 from "../assets/car5.jpg";
import car6 from "../assets/car6.jpg";
import CarsCardForRenter from "../components/CarsCardForRenter";

import { useFirebase } from "../context/Firebase";

function ManageRenterListing() {
  const [carsData, setCarsData] = useState([]);
  console.log(carsData)

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

  return (
    <>
      {carsData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 px-6">
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
      ) : (
        <p className="text-2xl text-center mt-20">There are no car posted from renter yet.</p>
      )}
    </>
  );
}

export default ManageRenterListing;
