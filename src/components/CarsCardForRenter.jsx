import React from 'react'

function CarsCardForRenter({imageUrl , carName , desc , price , onAccept}) {
   return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]">
      <div className="relative overflow-hidden h-48">
        <img
          src={imageUrl}
          alt={carName}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>
      
      <div className="p-5">
        <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {carName}
        </h3>
        <h3 className="mb-2 text-sm font-semibold tracking-tight text-gray-900">
          {price}
        </h3>
        <p className="mb-3 font-normal text-gray-700">
          {desc}
        </p>
        
       <button
        onClick={onAccept}
       className="mt-3 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
     >
      Accept the request
       </button>


    
      </div>
    </div>
  );
}

export default CarsCardForRenter ;
