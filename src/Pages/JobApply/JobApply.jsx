import React, { useContext } from "react";
import { useForm } from "react-hook-form";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";

const JobApply = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Form Data: ", data);
    const jobApplication = {
      fullName: data.fullName,
      email: user?.email,
      phone: data.phone,
      resumeLink: data.resume,
      coverLetter: data.whyHire, // Why should we hire you (cover letter)
      jobId: id, // Assuming the job id is part of the URL
      position: data.position, // Position applied for
      github: data.github, // GitHub profile
      linkedin: data.linkedin, // LinkedIn profile
      termsAccepted: data.terms, // Terms and conditions checkbox
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/job-applications",
        jobApplication
      );

      console.log("Submitted Job Application:", response.data);

      toast.success("Job application submitted successfully!", {
        position: "top-center", // Position at the top-center of the screen
        theme: "colored",
        style: { backgroundColor: "#d2f34c", color: "#244034" }, // Custom color (green background with white text)
      });
      reset();
      navigate("/dashboard");
    } catch (error) {
      console.error("Submission error", error);

      toast.error("Something went wrong. Please try again.", {
        theme: "colored",
      });
    }
  };

  return (
    <div className="py-24 bg-[#f8f8f8] min-h-screen flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-[#244034] mb-8 text-center">
          Job Application Form
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-[#244034] mb-1">
              Full Name
            </label>
            <input
              type="text"
              {...register("fullName", { required: "Full name is required" })}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d2f34c]"
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#244034] mb-1">
                Email Address
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d2f34c]"
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-[#244034] mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                {...register("phone", {
                  required: "Phone number is required",
                })}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d2f34c]"
                placeholder="+1 234 567 8901"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium text-[#244034] mb-1">
              Position You're Applying For
            </label>
            <input
              type="text"
              {...register("position", { required: "Position is required" })}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d2f34c]"
              placeholder="Frontend Developer"
            />
            {errors.position && (
              <p className="text-red-500 text-sm mt-1">
                {errors.position.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* GitHub */}
            <div>
              <label className="block text-sm font-medium text-[#244034] mb-1">
                GitHub Profile Link
              </label>
              <input
                type="url"
                {...register("github", {
                  required: "GitHub link is required",
                  pattern: {
                    value:
                      /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+$/,
                    message: "Invalid GitHub URL",
                  },
                })}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d2f34c]"
                placeholder="https://github.com/username"
              />
              {errors.github && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.github.message}
                </p>
              )}
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-sm font-medium text-[#244034] mb-1">
                LinkedIn Profile Link
              </label>
              <input
                type="url"
                {...register("linkedin")} // No validation rules
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d2f34c]"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            {/* Resume Link */}
            <div>
              <label className="block text-sm font-medium text-[#244034] mb-1">
                Resume Link
              </label>
              <input
                type="url"
                {...register("resume", {
                  required: "Resume link is required",
                })}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d2f34c]"
                placeholder="https://drive.google.com/..."
              />
              {errors.resume && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.resume.message}
                </p>
              )}
            </div>
          </div>

          {/* Why Should We Hire You */}
          <div>
            <label className="block text-sm font-medium text-[#244034] mb-1">
              Why should we hire you?
            </label>
            <textarea
              rows={4}
              {...register("whyHire", {
                required: "Please explain why we should hire you",
              })}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d2f34c]"
              placeholder="Convince us why you’re the perfect fit..."
            ></textarea>
            {errors.whyHire && (
              <p className="text-red-500 text-sm mt-1">
                {errors.whyHire.message}
              </p>
            )}
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              {...register("terms", {
                required: "You must agree before submitting",
              })}
              className="mt-1 accent-[#244034]"
            />
            <label className="text-sm text-gray-700">
              I confirm that all the information provided is accurate and up to
              date.
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#244034] text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300 cursor-pointer"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApply;
