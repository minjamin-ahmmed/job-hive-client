import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import SkeletonCard from "../../Components/Shared/SkeletonCard";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(
          `http://localhost:5000/job-applications?email=${user.email}`
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (user.email) {
      fetchData();
    }
  }, [user.email]);

  if (loading) {
    return (
      <div className="py-24 px-6 w-11/12 lg:w-1/2 mx-auto space-y-4">
        <h2 className="text-4xl lg:text-5xl text-center font-semibold text-[#244034]">
          My Applications
        </h2>
        <p className="text-[#244034]/70 text-center">
          Fetching your application data...
        </p>
        {[...Array(4)].map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );
  }

  if (error)
    return (
      <div className="text-center mt-20 text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <div className="py-24 px-4 md:px-10 w-11/12 mx-auto">
      <h3 className="text-4xl lg:text-5xl text-center font-bold mb-4 text-[#244034]">
        My Applications
      </h3>
      <p className="text-gray-600 mb-6 text-center">
        Here’s a summary of all the jobs you’ve applied for. Stay sharp and keep
        an eye out for updates!
      </p>

      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-[#244034] text-white">
              <tr>
                <th className="py-3 px-4 text-left">No</th>
                <th className="py-3 px-4 text-left">Position</th>
                <th className="py-3 px-4 text-left">Company</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">GitHub</th>
                <th className="py-3 px-4 text-left">LinkedIn</th>
                <th className="py-3 px-4 text-left">Resume</th>
              </tr>
            </thead>
            <tbody>
              {data.map((app, idx) => (
                <tr
                  key={app._id}
                  className="border-b hover:bg-[#f3f9f6] transition duration-200"
                >
                  <td className="py-3 px-4">{idx + 1}</td>
                  <td className="py-3 px-4 font-semibold">{app.title}</td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    {app.company_logo && (
                      <img
                        src={app.company_logo}
                        alt={app.company}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                    <span>{app.company}</span>
                  </td>
                  <td className="py-3 px-4">{app.location}</td>
                  <td className="py-3 px-4">
                    <a
                      href={app.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline font-medium"
                    >
                      GitHub
                    </a>
                  </td>
                  <td className="py-3 px-4">
                    <a
                      href={app.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline font-medium"
                    >
                      LinkedIn
                    </a>
                  </td>
                  <td className="py-3 px-4">
                    <a
                      href={app.resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline font-medium"
                    >
                      Resume
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No applications found.</p>
      )}
    </div>
  );
};

export default Dashboard;
