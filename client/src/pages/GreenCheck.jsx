import React, { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const GreenCheck = () => {
  const [formData, setFormData] = useState({
    productName: "",
    companyName: "",
    reason: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "https://2471-35-227-76-214.ngrok-free.app/analyze";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); // Show success message immediately
    setError("");

    const requestData = {
      product_name: formData.productName,
      email: "727723eucs051@skcet.ac.in", // Default email
    };

    // Send request in background
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    }).catch((err) => {
      setError("Failed to submit report. Please try again.");
      console.error("Error:", err);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full border border-gray-200">
        {!submitted ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              📢 GreenCheck Report
            </h1>
            <p className="text-gray-600 text-center mb-6">
              Submit a product you suspect of{" "}
              <span className="text-blue-600 font-medium">greenwashing</span> for verification.
            </p>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-500 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="Enter product name..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-500 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="Enter company name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Doubt on Greenwashing
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-500 focus:ring-blue-400 focus:border-blue-400"
                  placeholder="Explain why you suspect greenwashing..."
                  rows="4"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-400 transition duration-200"
              >
                Submit Report
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center text-center">
            <CheckCircleIcon className="w-16 h-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">✅ Request Submitted Successfully!</h2>
            <p className="text-gray-600 mt-2">
              Your report has been submitted and will be{" "}
              <span className="text-blue-600 font-medium">analyzed</span> shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GreenCheck;
