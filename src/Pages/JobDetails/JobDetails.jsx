import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";
import Header from "./Components/Header";

const JobDetails = () => {
  const {
    _id,
    title,
    location,
    jobType,

    applicationDeadline,
    salaryRange: { min, max, currency },
    description,
    company,
    requirements,
    responsibilities,
    hr_email,
    hr_name,
    company_logo,
  } = useLoaderData();

  const formattedSalary = `${min.toLocaleString()} - ${max.toLocaleString()} ${currency.toUpperCase()}`;

  return (
    <div>
      <Header />

      <div className="bg-lime-100">
        <div className="py-16 px-4 md:px-10 max-w-7xl mx-auto">
          <div className="bg-lime-50 rounded-2xl p-6 md:p-10 border border-gray-200">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={company_logo}
                alt={`${company} Logo`}
                className="w-24 h-24 object-contain rounded-xl"
              />
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-primary">{title}</h1>
                <p className="text-gray-700 text-lg">{company}</p>
                <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-700">
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt /> {location}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaBriefcase /> {jobType}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt /> Deadline: {applicationDeadline}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaMoneyBillWave /> {formattedSalary}
                  </span>
                </div>
              </div>
            </div>

            {/* Body */}
            <hr className="my-8 border-gray-200" />

            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Job Description
                </h2>
                <p className="leading-relaxed">{description}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Responsibilities
                </h2>
                <ul className="list-disc list-inside space-y-1">
                  {responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Requirements
                </h2>
                <ul className="list-disc list-inside space-y-1">
                  {requirements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              {/* HR Contact */}
              <section className="bg-lime-100 p-4 rounded-xl">
                <h2 className="text-xl font-semibold text-primary mb-2">
                  HR Contact Info
                </h2>
                <p className="flex items-center gap-2">
                  <FaUser /> {hr_name}
                </p>
                <p className="flex items-center gap-2">
                  <FaEnvelope /> {hr_email}
                </p>
              </section>

              {/* Apply Now */}
              <section className="bg-lime-100 p-4 rounded-xl">
                <h2 className="text-xl font-semibold text-primary mb-2">
                  Apply Now
                </h2>
                <p className="text-gray-700">
                  To apply for this job, please send your resume and cover
                  letter to the following email address:
                </p>
                <p className="text-gray-700">{hr_email}</p>

                <div className="mt-8 flex items-center justify-center">
                  <Link to={`/job-apply/${_id}`}>
                    <button className="btn bg-secondary text-gray-900 px-16 rounded-full hover:bg-secondary/70">
                      Apply Now
                    </button>
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
