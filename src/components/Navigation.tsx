import { CustomFlowbiteTheme, Navbar } from "flowbite-react";
import React, { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const SunIcon = () => (
  <svg
    className="w-[20px] h-[20px] text-gray-800 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.5"
      d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    className="w-[20px] h-[20px] text-gray-800 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.5"
      d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z"
    />
  </svg>
);

const customTheme: CustomFlowbiteTheme["navbar"] = {
  link: {
    base: "block py-2 pl-3 pr-4 md:p-0",
    active: {
      on: "bg-blue-700 text-white dark:text-white md:bg-transparent md:text-blue-700",
      off: "border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white",
    },
    disabled: {
      on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
      off: "",
    },
  },
};

const Navigation: React.FC = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const location = useLocation();

  return (
    <Navbar
      theme={customTheme}
      fluid
      rounded
      className="dark:bg-gray-950 fixed w-full z-50"
    >
      <Link to="/">
        <Navbar.Brand color="blue" href="#">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Booking App
          </span>
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Link to="/">
          <Navbar.Link color="blue" active={location.pathname === "/"}>
            Home
          </Navbar.Link>
        </Link>
        <Link to="/bookings">
          <Navbar.Link color="blue" active={location.pathname === "/bookings"}>
            My bookings
          </Navbar.Link>
        </Link>
        <div className="flex-grow">
          <Navbar.Brand
            onClick={toggleDarkMode}
            className="block py-2 pl-3 pr-4 md:p-0 border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
          >
            <div className="flex items-stretch w-full justify-between">
              {isMobile ? "Appearance" : null}{" "}
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </div>
          </Navbar.Brand>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
