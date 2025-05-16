import React from 'react'
import { ImCross } from "react-icons/im";
function ModalForRenter( { modal , setCarModal,  carName , description , price , setPrice , setDescription , setCarName ,  setIsModalOpen ,   isModalOpen ,  handleOnSubmit}) {
   return (
      <>
      
       {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <ImCross className="h-5 w-5 cursor-pointer" />
              </button>
  
              <h2 className="text-2xl font-bold text-gray-800 mb-6 ">Add New Car</h2>
              
              {/* Car Name Input */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Car Name
                </label>
                <input 
                  type="text"
                  className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    text-gray-700"
                  placeholder="Enter car name"
                  value={carName}
                  onChange={(e)=> setCarName(e.target.value)}
                />
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Car Price
                </label>
                <input 
                  type="text"
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    text-gray-700"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e)=> setPrice(e.target.value)}
                />
              </div>
  
               {/* Modal Name Input */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Car Modal
                </label>
                <input 
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    text-gray-700"
                  placeholder="Enter car name"
                  value={modal}
                  onChange={(e)=> setCarModal(e.target.value)}
                />
                
              </div>
              
  
              {/* Textarea */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Description
                </label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    text-gray-700"
                  rows="4"
                  placeholder="Enter car description..."
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}
                ></textarea>
              </div>
  
              {/* Save Button */}
              <button
              onClick={handleOnSubmit}
                className="w-full cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md
                  hover:bg-blue-600 transition duration-300 focus:outline-none
                  focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save Car
              </button>
            </div>
          </div>
        )}
      
      </>
    )
}

export default ModalForRenter  ;
