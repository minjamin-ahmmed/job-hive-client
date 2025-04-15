// SkeletonLoader.js
import React from "react";

const SkeletonLoader = ({ type = "card", count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return (
          <div className="bg-white shadow rounded-2xl p-6 flex flex-col justify-between transition-transform hover:-translate-y-2 hover:shadow-md duration-300 group">
            <div className="flex items-center gap-4 mb-4">
              <div className="skeleton w-12 h-12 rounded-full"></div>
              <div>
                <div className="skeleton w-32 h-6 rounded mb-2"></div>
                <div className="skeleton w-24 h-4 rounded"></div>
              </div>
            </div>
            <div className="text-sm text-gray-500 space-y-1 mb-4">
              <div className="skeleton w-32 h-4 rounded"></div>
              <div className="skeleton w-24 h-4 rounded"></div>
              <div className="skeleton w-28 h-4 rounded"></div>
              <div className="skeleton w-32 h-4 rounded"></div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="skeleton w-16 h-6 rounded"></div>
              <div className="skeleton w-16 h-6 rounded"></div>
            </div>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
              <div className="skeleton w-24 h-4 rounded"></div>
              <div className="skeleton w-32 h-10 rounded"></div>
            </div>
          </div>
        );
      case "text":
        return <div className="skeleton w-full h-4 rounded mb-2"></div>;
      case "avatar":
        return <div className="skeleton w-12 h-12 rounded-full"></div>;
      default:
        return null;
    }
  };

  const skeletons = [];
  for (let i = 0; i < count; i++) {
    skeletons.push(<div key={i}>{renderSkeleton()}</div>);
  }

  return <>{skeletons}</>;
};

export default SkeletonLoader;
