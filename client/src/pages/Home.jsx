import React from "react";
import { motion } from "framer-motion";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

const Home = () => {
  const greenwashingSteps = [
    { emoji: "🏭", text: "Company pollutes environment" },
    { emoji: "📢", text: "Company runs green ads" },
    { emoji: "🌿", text: "Claims eco-friendly products" },
    { emoji: "💰", text: "Consumers buy into the lie" },
  ];

  const cases = [
    {
      year: "2010",
      company: "BP",
      event: "BP claimed 'Beyond Petroleum' while causing oil spills.",
    },
    {
      year: "2015",
      company: "Volkswagen",
      event: "VW faked 'clean diesel' emissions tests.",
    },
    {
      year: "2018",
      company: "H&M",
      event: "'Conscious Collection' lacked transparency.",
    },
    {
      year: "2021",
      company: "Coca-Cola",
      event: "Marketed as eco-friendly, but world's top plastic polluter.",
    },
    {
      year: "2019",
      company: "Nestlé",
      event: "Claimed sustainability while leading in plastic pollution.",
    },
    {
      year: "2020",
      company: "McDonald's",
      event: "Switched to paper straws that weren't recyclable.",
    },
    {
      year: "2022",
      company: "Shell",
      event: "Ran ads about clean energy while expanding fossil fuels.",
    },
  ];

  const companyComparison = [
    { name: "Tesla", type: "sustainable" },
    { name: "Patagonia", type: "sustainable" },
    { name: "Volkswagen", type: "greenwashing" },
    { name: "H&M", type: "greenwashing" },
    { name: "BP", type: "greenwashing" },
    { name: "McDonald's", type: "greenwashing" },
    { name: "Nestlé", type: "greenwashing" },
    { name: "Shell", type: "greenwashing" },
  ];

  return (
    <div className="flex-1 overflow-y-auto h-full bg-gray-100 p-6 w-full">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white text-center p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold">
          Exposing Greenwashing: Know the Truth!
        </h1>
        <p className="mt-3 text-lg">
          Unmask deceptive marketing tactics and learn how to spot real
          sustainability.
        </p>
      </div>

      {/* Greenwashing Awareness Section */}
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">🔄 How Greenwashing Works</h2>
        <div className="flex justify-center space-x-6">
          {greenwashingSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              className="p-4 bg-white shadow-md rounded-lg flex flex-col items-center"
            >
              <div className="text-4xl">{step.emoji}</div>
              <p className="text-gray-700 mt-2">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Greenwashing Cases - Full List */}
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          🕒 Famous Greenwashing Cases
        </h2>
        <div className="space-y-4">
          {cases.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="p-4 bg-white shadow-md rounded-lg border-l-4 border-red-500"
            >
              <h3 className="text-lg font-semibold">
                {item.year} - {item.company}
              </h3>
              <p className="text-gray-600">{item.event}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Company Comparison */}
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          📊 Green vs. Greenwashing Companies
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {companyComparison.map((company, index) => (
            <div
              key={index}
              className={`p-4 flex items-center rounded-lg shadow-md ${
                company.type === "sustainable" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {company.type === "sustainable" ? (
                <FaCheckCircle className="text-green-600 text-2xl mr-3" />
              ) : (
                <FaExclamationTriangle className="text-red-600 text-2xl mr-3" />
              )}
              <span className="text-lg font-semibold">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
