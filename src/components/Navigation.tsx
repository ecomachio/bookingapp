import { MoonIcon } from "./../icons/MoonIcon";
import { SunIcon } from "./../icons/SunIcon";
import { CustomFlowbiteTheme, Navbar } from "flowbite-react";
import React, { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

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
