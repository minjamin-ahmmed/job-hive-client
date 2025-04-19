import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

const MypostedJobs = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/jobs?email=${user.email}`
        );
        setData(response.data);
      } catch {
        console.log("Error fetching data");
      }
    };

    fetchData();
  }, [user.email]);

  return (
    <div className="pt-32 pb-24 w-11/12 lg:w-9/12 mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-[#244034]">
        My Posted Jobs ({data.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-separate border-spacing-y-4">
          <thead>
            <tr className="text-white bg-[#244034] rounded-lg">
              <th className="py-3 px-4 rounded-l-lg">Job Title</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Deadline</th>
              <th className="py-3 px-4">Salary</th>
              <th className="py-3 px-4">HR Info</th>
              <th className="py-3 px-4 rounded-r-lg">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((job) => (
              <tr
                key={job._id}
                className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg"
              >
                <td className="py-4 px-4 flex items-center gap-4">
                  <img
                    src={job.company_logo}
                    alt="Logo"
                    className="w-12 h-12 object-contain rounded-full border-2 border-[#D2F34C]"
                  />
                  <div>
                    <p className="font-semibold text-[#244034]">{job.title}</p>
                    <p className="text-sm text-gray-500">{job.company}</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 bg-[#D2F34C] text-[#244034] font-medium rounded-full text-sm">
                    {job.jobType}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-700">{job.location}</td>
                <td className="py-4 px-4 text-gray-700">
                  {new Date(job.applicationDeadline).toLocaleDateString()}
                </td>
                <td className="py-4 px-4 text-gray-700">
                  {job.salaryRange?.min} - {job.salaryRange?.max}{" "}
                  {job.salaryRange?.currency.toUpperCase()}
                </td>
                <td className="py-4 px-4">
                  <p className="text-[#244034] font-semibold">{job.hr_name}</p>
                  <p className="text-sm text-gray-500">{job.hr_email}</p>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                      job.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No jobs posted yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default MypostedJobs;
