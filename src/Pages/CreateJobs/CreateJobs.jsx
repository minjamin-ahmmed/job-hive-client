import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateJobs = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      location: "",
      jobType: "Onsite",
      category: "",
      applicationDeadline: "",
      salaryRange: {
        min: "",
        max: "",
        currency: "bdt",
      },
      description: "",
      requirements: [""],
      responsibilities: [""],
      company: "",
      hr_email: "",
      hr_name: "",
      company_logo: "",
      status: "active",
    },
  });

  const { fields: reqFields, append: appendReq } = useFieldArray({
    control,
    name: "requirements",
  });

  const { fields: resFields, append: appendRes } = useFieldArray({
    control,
    name: "responsibilities",
  });

  // const apiUrl = import.meta.env.VITE_API_URL;

  const onSubmit = async (data) => {
    try {
      await axios.post(`http://localhost:5000/jobs`, data);
      toast.success("Job posted successfully!");
      reset();
      navigate("/my-posted-jobs");
    } catch (error) {
      alert("Error posting job.");
      toast.error("Error posting job.", error);
    }
  };

  return (
    <div className="py-20 px-6 md:px-12 lg:px-32 min-h-screen bg-primary">
      <div className="bg-primary text-white shadow-xl rounded-2xl p-8 md:p-12 border border-secondary">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">
          Create a Job Post
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Group 1 */}
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              {...register("title", { required: "Job title is required" })}
              placeholder="Job Title"
              error={errors.title}
            />
            <Input
              {...register("location", { required: "Location is required" })}
              placeholder="Location"
              error={errors.location}
            />
            <Select
              {...register("jobType")}
              options={["Onsite", "Remote", "Hybrid"]}
            />
            <Input {...register("category")} placeholder="Category" />
            <Input
              type="date"
              {...register("applicationDeadline")}
              placeholder="Application Deadline"
            />
            <Input {...register("company")} placeholder="Company Name" />
            <Input
              {...register("company_logo")}
              placeholder="Company Logo URL"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Salary Range
            </label>
            <div className="grid md:grid-cols-3 gap-4">
              <Input
                {...register("salaryRange.min")}
                placeholder="Min Salary"
              />
              <Input
                {...register("salaryRange.max")}
                placeholder="Max Salary"
              />
              <Select
                {...register("salaryRange.currency")}
                options={["bdt", "usd", "eur"]}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Job Description
            </label>
            <textarea
              {...register("description")}
              rows="4"
              className="w-full rounded-xl text-primary border border-gray-300 p-3 focus:ring-[#d2f34c] focus:border-[#d2f34c] bg-white"
              placeholder="Write job description..."
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Requirements
            </label>
            {reqFields.map((item, index) => (
              <input
                key={item.id}
                {...register(`requirements.${index}`)}
                placeholder={`Requirement #${index + 1}`}
                className="w-full rounded-full border border-gray-300 p-3 mb-2 focus:ring-[#d2f34c] focus:border-[#d2f34c] bg-white text-primary"
              />
            ))}
            <button
              type="button"
              onClick={() => appendReq("")}
              className="text-white text-sm font-medium hover:underline"
            >
              + Add More
            </button>
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Responsibilities
            </label>
            {resFields.map((item, index) => (
              <input
                key={item.id}
                {...register(`responsibilities.${index}`)}
                placeholder={`Responsibility #${index + 1}`}
                className="w-full rounded-full border border-gray-300 p-3 mb-2 focus:ring-[#d2f34c] focus:border-[#d2f34c] bg-white text-primary"
              />
            ))}
            <button
              type="button"
              onClick={() => appendRes("")}
              className="text-white text-sm font-medium hover:underline"
            >
              + Add More
            </button>
          </div>

          {/* HR Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <Input {...register("hr_name")} placeholder="HR Name" />
            <Input
              {...register("hr_email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email",
                },
              })}
              placeholder="HR Email"
              error={errors.hr_email}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-secondary hover:bg-secondary/90 text-primary px-8 py-3 rounded-xl text-lg font-medium transition duration-200"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Input Component
const Input = React.forwardRef(
  ({ placeholder, type = "text", error, ...rest }, ref) => (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        ref={ref}
        {...rest}
        className={`w-full bg-white text-sm text-gray-950 rounded-full border px-4 py-3 shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#d2f34c] focus:border-[#d2f34c] ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  )
);

// Reusable Select Component
const Select = React.forwardRef(({ options = [], error, ...rest }, ref) => (
  <div className="w-full">
    <select
      ref={ref}
      {...rest}
      className={`w-full bg-white text-sm text-gray-950 rounded-full border px-4 py-3 shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#d2f34c] focus:border-[#d2f34c] ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
));

export default CreateJobs;
