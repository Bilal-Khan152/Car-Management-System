 import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

// Load all images from src/assets using Vite's import.meta.glob
const imageModules = import.meta.glob('../assets/*.{jpg,webp}', { eager: true });

function DetailsOfSellCar() {
  const [data, setData] = useState(null);
  const params = useParams();
  const firebase = useFirebase();

  useEffect(() => {
    firebase.getCarsCardDataById(params.id).then((value) => setData(value.data()));
  }, [params.id, firebase]);

  if (data == null) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Get image path from imageModules
  const imagePath = Object.entries(imageModules).find(([path]) =>
    path.includes(`/assets/${data.image}`)
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2">{data.carName}</h2>
      <p className="text-gray-700 mb-4">{data.description}</p>

      {imagePath ? (
        <img
          src={imagePath[1].default}
          alt={data.carName}
          className="w-full max-w-lg rounded-lg shadow-md"
        />
      ) : (
        <p className="text-red-500">Image not found</p>
      )}
    </div>
  );
}

export default DetailsOfSellCar;
