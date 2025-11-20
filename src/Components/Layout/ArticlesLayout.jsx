import React from "react";

export default function ArticlesLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Articles</h1>
        {children}
      </div>
    </div>
  );
}
