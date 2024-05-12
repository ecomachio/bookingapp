import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const HomeHero = () => {
  return (
    <>
      <div className="mt-2 sm:mt-8 text-center">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-600 from-sky-400">
            Effortless Booking,
          </span>{" "}
          Endless Adventures.
        </h1>
        <p className="text-sm font-normal text-gray-500 sm:text-lg md:text-xl dark:text-gray-400">
          Here you can find the best properties for your next vacation. Book now
          and enjoy your stay.
        </p>
      </div>

      <div className="flex justify-center mt-8 mb-12">
        <Link to="#listing">
          <Button color="blue" pill size="lg">
            Explore our options Explore our options
          </Button>
        </Link>
      </div>
    </>
  );
};

export default HomeHero;
