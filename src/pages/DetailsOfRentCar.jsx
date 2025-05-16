import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

function DetailsOfRentCar() {
const [ data , setData ] = useState(null) ;

    const params = useParams() ;
    const firebase = useFirebase() ;  

   useEffect(()=>{
    firebase.getRenterCardsById(params.id).then((value)=>setData(value.data())) ;
   },[params.id  , firebase]) ;


     if (data == null) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl mt-10 hover:shadow-2xl transition-shadow duration-300">
  <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 pb-2 border-blue-500">
    {data.carName}
  </h2>

  <div className="mb-4">
    <p className="text-gray-600 text-lg  font-semibold">Car Model:</p>
    <p className="text-gray-800 text-xl italic">{data.carModal}</p>
  </div>

  <div className="mb-4">
    <p className="text-gray-600 text-lg font-semibold">Car Price:</p>
    <p className="text-gray-800 text-xl italic">{data.price}/Per-Day</p>
  </div>

  <div className="mb-4">
    <p className="text-gray-600 text-lg font-semibold">Description:</p>
    <p className="text-gray-800 text-base italic leading-relaxed">{data.description}</p>
    <p  className="text-gray-600 text-lg font-semibold ">Posted By Renter : <span className='font-semibold text-sm '>{data.createdAt?.toDate().toLocaleString()}</span></p> 
    
  </div>
</div>
  )
}

export default DetailsOfRentCar ;