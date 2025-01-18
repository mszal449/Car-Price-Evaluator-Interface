"use client";
import { ICarData } from "@/types";
import React, { useState } from "react";

const Evaluator = () => {
  const [carData, setCarData] = useState<ICarData | null>(null);

  const handleCarDataChange = (field: keyof ICarData, value: any) => {
    setCarData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Enter vehicle information</h1>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Car Model"
          value={carData?.Vehicle_model || ""}
          onChange={(e) => handleCarDataChange("Vehicle_model", e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Car Year"
          value={carData?.Production_year || ""}
          onChange={(e) =>
            handleCarDataChange("Production_year", e.target.value)
          }
          className="p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleEvaluate}
          className="button-colors px-4 py-2 rounded-md mt-4"
        >
          Evaluate
        </button>
      </div>
      {evaluation && (
        <div className="mt-8 p-4 bg-gray-100 border border-gray-300 rounded-md">
          {evaluation}
        </div>
      )}
    </div>
  );
};

export default Evaluator;
