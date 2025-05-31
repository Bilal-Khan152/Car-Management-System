function HomePage() {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col pt-16">
      {/* Content */}
      <div className="flex-1 flex items-center justify-center text-white px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-gradient">
            Welcome to Car Management System
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300">
            Track, Manage, and Explore All Vehicles Seamlessly
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;