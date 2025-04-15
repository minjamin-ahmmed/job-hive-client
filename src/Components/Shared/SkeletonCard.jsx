import React from "react";

const SkeletonCard = () => {
  return (
    <div className="animate-pulse flex gap-4 items-center p-4 rounded-lg shadow-sm">
      <div className="h-16 w-16 bg-gray-500 rounded-full"></div>
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
