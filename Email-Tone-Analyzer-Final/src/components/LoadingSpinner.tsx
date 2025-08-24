import React from "react";
import { Loader2, Sparkles } from "lucide-react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center pt-16">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 mx-auto"></div>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center">
            <Loader2 className="h-6 w-6 mr-2 animate-spin text-blue-600" />
            Loading...
          </h2>
          <p className="text-gray-600">Preparing your experience</p>
        </div>

        {/* Animated dots */}
        <div className="flex justify-center space-x-2 mt-6">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
