import React from "react";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import illustrator from "../../public/illustrator.json"; // Lottie animation JSON

const ErrorPage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true, // Animation will play automatically
    animationData: illustrator, // The Lottie JSON file
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-500 p-6">
      {/* Lottie Animation Section */}
      <div className="w-full mb-10 md:mb-0 flex justify-center">
        <Lottie options={defaultOptions} height={500} width={500} />
      </div>

      {/* Text Content */}
      <div className="w-full md:w-1/2 text-center">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-4xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn't find the page you're looking for. It might have
          been removed or never existed.
        </p>
        <Link
          to="/"
          className="inline-block bg-secondary text-primary px-6 py-3 rounded-xl font-medium hover:bg-secondary/90 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
