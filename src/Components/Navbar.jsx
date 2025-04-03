import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/navbar-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = (menu) => {
    setDropdownOpen(menu);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(null);
  };

  const navItems = [
    { name: "Home", path: "/", dropdown: null },
    {
      name: "Job",
      path: "/job",
      dropdown: [
        { name: "Search Jobs", path: "/job/search" },
        { name: "Job Categories", path: "/job/categories" },
        { name: "Saved Jobs", path: "/job/saved" },
      ],
    },
    {
      name: "Explore",
      path: "/explore",
      dropdown: [
        { name: "Companies", path: "/explore/companies" },
        { name: "Industries", path: "/explore/industries" },
      ],
    },
    {
      name: "Blog",
      path: "/blog",
      dropdown: [
        { name: "Career Tips", path: "/blog/career-tips" },
        { name: "Industry News", path: "/blog/industry-news" },
      ],
    },
    { name: "Contact", path: "/contact", dropdown: null },
    { name: "Dashboard", path: "/dashboard", dropdown: null },
    { name: "Post Job", path: "/post-job", dropdown: null },
    { name: "Login", path: "/login", dropdown: null },
  ];

  // Split navItems into middle and end groups
  const middleItems = navItems.slice(0, 6); // Home, Job, Explore, Blog, Contact, Dashboard
  const endItems = navItems.slice(-2); // Post Job, Login

  return (
    <nav className="bg-primary text-white fixed top-0 left-0 w-full z-50">
      <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-16 h-16">
              <img className="w-full h-full" src={logo} alt="" />
            </div>
            <Link to="/">
              <span className="text-2xl font-bold">Job Hive</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Middle Items */}
            {middleItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={item.path}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary hover:text-primary transition"
                >
                  {item.name}
                </Link>
                {item.dropdown && dropdownOpen === item.name && (
                  <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* Spacer */}
            <div className="flex-grow" />
            {/* End Items */}
            {endItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={item.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    item.name === "Post Job"
                      ? "bg-secondary text-primary hover:bg-secondary-300"
                      : "border border-white hover:bg-white hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
                {item.dropdown && dropdownOpen === item.name && (
                  <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleDrawer}
              className="text-white focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed inset-0 bg-primary text-white z-20 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={toggleDrawer}
            className="text-white focus:outline-none"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <div className="flex flex-col items-center space-y-4 mt-10">
          {/* Middle Items */}
          {middleItems.map((item) => (
            <div key={item.name} className="w-full text-center">
              <Link
                to={item.path}
                onClick={toggleDrawer}
                className="block px-3 py-2 text-lg font-medium hover:bg-secondary hover:text-primary"
              >
                {item.name}
              </Link>
              {item.dropdown && (
                <div className="mt-2 space-y-2">
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.path}
                      onClick={toggleDrawer}
                      className="block px-6 py-1 text-sm hover:bg-secondary hover:text-primary"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {/* Divider or Spacer */}
          <div className="w-1/2 h-px bg-white my-4" />
          {/* End Items */}
          {endItems.map((item) => (
            <div key={item.name} className="w-full text-center">
              <Link
                to={item.path}
                onClick={toggleDrawer}
                className="block px-3 py-2 text-lg font-medium hover:bg-secondary hover:text-primary"
              >
                {item.name}
              </Link>
              {item.dropdown && (
                <div className="mt-2 space-y-2">
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.path}
                      onClick={toggleDrawer}
                      className="block px-6 py-1 text-sm hover:bg-secondary hover:text-primary"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
