 import React from 'react';
import { useNavigate } from 'react-router-dom';

function Form({role, password, email, handleOnSubmit, setEmail, setPassword, setRole}) {
  const navigate = useNavigate();

  return (
    <form className="space-y-4 sm:space-y-6" onSubmit={handleOnSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700">
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm sm:text-base font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
          />
        </div>
      </div>

      <div>
        <label htmlFor="role" className="block text-sm sm:text-base font-medium text-gray-700">
          Role
        </label>
        <select
          id="role"
          name="role"
          value={role}
          onChange={(e)=>setRole(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select Role</option>
          <option value="purchaser">Purchaser</option>
          <option value="renter">Renter</option>
        </select>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
        <p className='text-sm sm:text-base font-semibold cursor-pointer mt-2 sm:mt-3 text-center' onClick={()=>navigate("/login")}>
          Have an account?
        </p>
      </div>
    </form>
  );
}

export default Form;