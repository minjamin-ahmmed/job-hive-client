import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import SkeletonLoader from "../../Components/Shared/SkeletonLoader";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectOption = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchHotJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/jobs");
        setJobs(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotJobs();
  }, []);

  if (loading)
    return (
      <div className="bg-lime-100 py-16 px-4 lg:px-0">
        <div className="w-11/12 lg:w-9/12 mx-auto">
          <h2 className="text-4xl lg:text-6xl font-semibold text-primary text-center mb-2">
            <SkeletonLoader type="text" count={1} />
          </h2>
          <p className="text-lg text-primary text-center mb-8">
            <SkeletonLoader type="text" count={1} />
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkeletonLoader type="card" count={6} />
          </div>
        </div>
      </div>
    );
  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="w-11/12 lg:w-9/12 mx-auto py-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <h2 className="text-4xl font-bold text-gray-900">Filter By</h2>
        </div>

        <div className="md:col-span-8 ">
          <div className="flex items-center justify-between mb-12">
            <p className="text-xl text-gray-500">
              All {jobs.length} jobs Found
            </p>
            <div className="flex items-center gap-4">
              <p className="text-xl font-semibold text-gray-900">Short:</p>
              <div className="relative inline-block text-left">
                {/* Price Sort Button */}
                <button
                  onClick={toggleDropdown}
                  className="flex items-center bg-lime-100 px-4 py-2 rounded-full shadow-sm text-gray-900 hover:bg-secondary transition"
                >
                  <span className="mr-2">Salaray Range:</span>
                  <MdOutlineKeyboardArrowDown
                    className={`w-5 h-5 transform transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-lime-100 shadow-lg rounded-lg z-10">
                    <ul className="py-1 text-gray-900">
                      <li
                        onClick={() => handleSelectOption("Low to High")}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Low to High
                      </li>
                      <li
                        onClick={() => handleSelectOption("High to Low")}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        High to Low
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {jobs.length === 0 ? (
              <div className="flex items-center justify-center text-red-500">
                No jobs available
              </div>
            ) : (
              jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white shadow rounded-2xl p-6 flex flex-col justify-between transition-transform hover:-translate-y-2 hover:shadow-md duration-300 group"
                >
                  {/* Top Section */}
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={job.company_logo}
                      alt={`${job.company} logo`}
                      className="w-12 h-12 rounded-full object-cover border p-2"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-primary group-hover:text-primary transition">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-500">{job.company}</p>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="text-sm text-gray-500 space-y-1 mb-4">
                    <p>
                      <span className="font-medium text-gray-700">
                        Location:
                      </span>{" "}
                      {job.location}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Type:</span>{" "}
                      {job.jobType}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">
                        Category:
                      </span>{" "}
                      {job.category}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">
                        Deadline:
                      </span>{" "}
                      {job.applicationDeadline}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                    <span className="text-green-600 font-semibold">
                      ৳ {job.salaryRange?.min?.toLocaleString() || "N/A"} -{" "}
                      {job.salaryRange?.max?.toLocaleString() || "N/A"}
                    </span>

                    <Link to={`/jobs/${job._id}`} className="group">
                      <button className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition duration-300">
                        Apply Now
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
