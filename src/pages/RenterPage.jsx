
import  { useState , useEffect} from "react";
import ModalForRenter from "../components/ModalForRenter";
import { useFirebase } from "../context/Firebase";
import  RentalsCars from "../components/RentalsCars" ;
import { saveNotification } from "../utils/saveNotification";
import { toast } from "react-toastify";
import car1 from "../assets/car1.jpg";
import car2 from "../assets/car2.webp";
import car3 from "../assets/car3.jpg";
import car4 from "../assets/car4.jpg";
import car5 from "../assets/car5.jpg";
import car6 from "../assets/car6.jpg";

function RenterPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carsData , setCarsdata] = useState([]) ;
  const [carName, setCarName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [carModal, setCarModal] = useState("");

//  console.log(carsData)
  const firebase = useFirebase();

  // fetch car posts which is accepted from admin
   const fetchAccetedCars = async () => {
    try {
      // Fetch accepted renter cars
      const renterSnapshot = await firebase.getAcceptedRenterCards();
      const renterData = renterSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

     setCarsdata(renterData)
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  useEffect(() => {
    fetchAccetedCars();
  }, []);
  

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("submitting", carName, description);
      await firebase.storedRenterCarDetails(carName, description, price, carModal);
      toast.success("send request to admin for approval!");
      setCarName("");
      setDescription("");
      setPrice("");
      setCarModal("");
      setIsModalOpen(false);


      await saveNotification({
        message: `Renter submitted a new car for rent: ${carName}`,
        fromRole: "renter",
        toRoles: ["admin"],
        type: "request",



      });



    } catch (error) {
      console.error("Error adding car:", error);
      toast.warning("Failed to add car.");
    }
  };

 return (
  <div className="bg-slate-600 w-full min-h-screen flex flex-col items-center custom-Background">
    <div className="w-full flex justify-center pt-4 sm:pt-8 px-4">
      <button
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300 shadow-lg text-sm sm:text-base"
      >
        Add Post
      </button>
    </div>
    
    <div className="w-full px-4 sm:px-6 py-4">
      {carsData.length === 0 ? (
        <p className="text-center text-white text-lg sm:text-2xl font-semibold mt-4 sm:mt-8">
          There are no car accepted from Admin yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {carsData.map((car, index) => {
            const images = [car1, car2, car3, car4, car5, car6];
            return (
              <RentalsCars 
                key={car.id}
                carName={car.carName} 
                carModal={car.carModal} 
                description={car.description} 
                price={car.price} 
                imageUrl={images[index % images.length]}
              />
            );
          })}
        </div>
      )}
    </div>

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
