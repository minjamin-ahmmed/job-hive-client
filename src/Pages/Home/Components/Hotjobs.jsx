import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SkeletonLoader from "../../../Components/Shared/SkeletonLoader";

const Hotjobs = () => {
  const [hotJobs, setHotJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/jobs");
        setHotJobs(response.data);
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
    <div className="bg-lime-100 py-16 px-4 lg:px-0">
      <div className="w-11/12 lg:w-9/12 mx-auto">
        <h2 className="text-4xl lg:text-6xl font-semibold text-primary text-center mb-2">
          Hot Jobs
        </h2>
        <p className="text-lg text-primary text-center mb-8">
          Your next big opportunity is just one click away.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotJobs.slice(0, 6).map((job) => (
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

              {/* Description */}
              {/* <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {job.description}
              </p> */}

              {/* Meta Info */}
              <div className="text-sm text-gray-500 space-y-1 mb-4">
                <p>
                  <span className="font-medium text-gray-700">Location:</span>{" "}
                  {job.location}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Type:</span>{" "}
                  {job.jobType}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Category:</span>{" "}
                  {job.category}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Deadline:</span>{" "}
                  {job.applicationDeadline}
                </p>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {job.requirements.map((skill) => (
                  <span
                    key={skill}
                    className="bg-lime-200 text-gray-700 text-xs py-1 px-2 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div
                className={`flex items-center justify-between mt-auto pt-4 border-t border-gray-200`}
              >
                <span className="text-green-600 font-semibold">
                  ৳ {job.salaryRange.min.toLocaleString()} -{" "}
                  {job.salaryRange.max.toLocaleString()}
                </span>
                <Link to={`/jobs/${job._id}`} className="group">
                  <button className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition duration-300">
                    Job Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Show All Button */}
        {hotJobs.length > 6 && (
          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/jobs")}
              className="bg-primary text-white py-3 px-6 rounded-full hover:bg-primary/90 transition duration-300"
            >
              Show All Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotjobs;
