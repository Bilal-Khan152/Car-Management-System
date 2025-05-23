 function HomePage() {
  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] w-full bg-black overflow-hidden">
      {/* Content */}
      <div className="flex-1 flex items-center justify-center text-white px-2">
        <div className="text-center max-w-[95%] mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-4">
            Welcome to Car<br className="md:hidden" /> Management System
          </h1>
          <p className="text-sm sm:text-lg md:text-xl">
            Track, Manage, and Explore<br className="sm:hidden" /> All Vehicles Seamlessly
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;