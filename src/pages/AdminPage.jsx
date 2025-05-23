import { saveNotification } from "../utils/saveNotification";
import { useFirebase } from "../context/Firebase";
import CarsCard from "../components/CarsCard";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import car1 from "../assets/car1.jpg";
import car2 from "../assets/car2.webp";
import car3 from "../assets/car3.jpg";
import car4 from "../assets/car4.jpg";
import car5 from "../assets/car5.jpg";
import car6 from "../assets/car6.jpg";



function AdminPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carsData, setCarsData] = useState([]);
  const [carName, setCarName] = useState("");
  const [description, setDescription] = useState("");
  const [carModal, setCarModal] = useState("");
  const [price, setPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);


  const itemsPerPage = 6;
  const firebase = useFirebase();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("submitting", carName, description, carModal);
      await firebase.storedCarDetail(carName, description, carModal, price);
      toast.success("Car added successfully!");
      setCarName("");
      setDescription("");
      setCarModal("");
      setIsModalOpen(false);

      await saveNotification({
        message: `A new car ${carName} has been added`,
        fromRole: "admin",
        toRoles: ["renter", "purchaser"],
        type: "new-car",
      });
    } catch (error) {
      console.error("Error adding car:", error);
      toast.warning("Failed to add car.");
    }
  };

  const fetchCars = async () => {
    const querySnapshot = await firebase.getCarCardData();
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

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentCards = carsData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(carsData.length / itemsPerPage);

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

      <div className="text-center text-white text-2xl font-semibold mt-8">
        {carsData.length === 0
          ? "There is no car for sell at the moment."
          : "Available Cars"}
      </div>

      {/* Modal/Popup */}
      <Modal
        isModalOpen={isModalOpen}
        carName={carName}
        setCarName={setCarName}
        setDescription={setDescription}
        description={description}
        setIsModalOpen={setIsModalOpen}
        handleOnSubmit={handleOnSubmit}
        carModal={carModal}
        setCarModal={setCarModal}
        price={price}
        setPrice={setPrice}
      />

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 px-6">
        {currentCards.map((car, index) => {
          const images = [car1, car2, car3, car4, car5, car6];

          return (
            <CarsCard
              key={car.id}
              carName={car.carName}
              desc={car.description}
              modal={car.carModal}
              price={car.price}
              imageUrl={images[index % images.length]}
            />
          );
        })}
      </div>
       {totalPages > 1 && (
  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 mb-6">
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-full font-semibold text-sm sm:text-base transition duration-300 cursor-pointer shadow-md ${
        currentPage === 1
          ? "bg-gray-400 text-white cursor-not-allowed"
          : "bg-indigo-600 text-white hover:bg-indigo-700"
      }`}
    >
      Previous
    </button>

    <span className="px-4 py-1.5 sm:px-5 sm:py-2 bg-white text-gray-800 font-medium text-sm sm:text-base rounded-full shadow-sm">
      Page {currentPage} of {totalPages}
    </span>

    <button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-full font-semibold text-sm sm:text-base transition duration-300 cursor-pointer shadow-md ${
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

export default AdminPage;
