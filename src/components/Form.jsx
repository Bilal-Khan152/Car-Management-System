import { useNavigate } from 'react-router-dom';

function Form({userName, setUserName, role, password, email, handleOnSubmit, setEmail, setPassword, setRole}) {
  const navigate = useNavigate();

  return (
    <form className="space-y-6" onSubmit={handleOnSubmit}>
      <div>
        <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
          User Name
        </label>
        <div className="mt-1">
          <input
            id="userName"
            name="userName"
            type="text"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out text-gray-900 placeholder-gray-400"
            placeholder="Enter your username"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out text-gray-900 placeholder-gray-400"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out text-gray-900 placeholder-gray-400"
            placeholder="Create a password"
          />
        </div>
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <select
          id="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out text-gray-900"
        >
          <option value="">Select your role</option>
          <option value="purchaser">Purchaser</option>
          <option value="renter">Renter</option>
        </select>
      </div>

      <div className="space-y-4">
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        >
          Create Account
        </button>
        <p className="text-center">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
          >
            Sign in
          </button>
        </p>
      </div>
    </form>
  );
}

export default Form;