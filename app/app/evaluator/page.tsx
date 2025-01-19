"use client";
import React, { useState } from "react";
import { IUserInputOptions } from "@/types";

// Example arrays from const.ts (replace these with your own)
const conditionOptions = ["New", "Used", "Certified Pre-Owned"];
const brandOptions = ["Audi", "BMW", "Mercedes"];
const modelOptions = ["A4", "3 Series", "C-Class"];
const generationOptions = ["Gen1", "Gen2", "Gen3"];
const fuelTypeOptions = ["Petrol", "Diesel", "Electric"];
const driveOptions = ["FWD", "RWD", "AWD"];
const transmissionOptions = ["Manual", "Automatic"];
const typeOptions = ["Sedan", "SUV", "Hatchback"];
const doorsNumberOptions = ["2", "3", "4", "5"];
const colourOptions = ["Red", "Blue", "Black"];
const firstOwnerOptions = ["Yes", "No"];
const modelVersionOptions = ["Base", "Premium", "Sport"];
const featuresOptions = ["Sunroof", "Leather Seats", "Navigation"];

export default function Evaluator() {
  const [carData, setCarData] = useState<IUserInputOptions>({
    Condition: { options: conditionOptions },
    Vehicle_brand: { options: brandOptions },
    Vehicle_model: { options: modelOptions, relatedTo: "" },
    Vehicle_generation: { options: generationOptions, relatedTo: "" },
    Production_year: { value: 2021 },
    Mileage_km: { value: 0 },
    Power_HP: { value: 0 },
    Displacement_cm3: { value: 0 },
    Fuel_type: { options: fuelTypeOptions },
    Drive: { options: driveOptions },
    Transmission: { options: transmissionOptions },
    Type: { options: typeOptions },
    Doors_number: { options: doorsNumberOptions },
    Colour: { options: colourOptions },
    First_owner: { options: firstOwnerOptions },
    Model_version: { options: modelVersionOptions },
    Features: { options: featuresOptions },
  });

  const handleSelectChange = (
    field: keyof IUserInputOptions,
    value: string
  ) => {
    setCarData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        // Store selected in a new property or just ignore if you prefer
        selected: value,
      },
    }));
  };

  const handleInputChange = (field: keyof IUserInputOptions, value: string) => {
    setCarData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value: parseInt(value, 10),
      },
    }));
  };

  return (
    <div className="p-4 text-gray-600">
      <h1>Car Evaluator</h1>
      <div>
        <label>Condition</label>
        <select
          onChange={(e) => handleSelectChange("Condition", e.target.value)}
        >
          {carData.Condition.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Vehicle Brand</label>
        <select
          onChange={(e) => handleSelectChange("Vehicle_brand", e.target.value)}
        >
          {carData.Vehicle_brand.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Vehicle Model</label>
        <select
          onChange={(e) => handleSelectChange("Vehicle_model", e.target.value)}
        >
          {carData.Vehicle_model.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Vehicle Generation</label>
        <select
          onChange={(e) =>
            handleSelectChange("Vehicle_generation", e.target.value)
          }
        >
          {carData.Vehicle_generation.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Production Year</label>
        <input
          type="number"
          value={carData.Production_year.value?.toString() || ""}
          onChange={(e) => handleInputChange("Production_year", e.target.value)}
        />
      </div>

      <div>
        <label>Mileage (km)</label>
        <input
          type="number"
          value={carData.Mileage_km.value?.toString() || ""}
          onChange={(e) => handleInputChange("Mileage_km", e.target.value)}
        />
      </div>

      <div>
        <label>Power (HP)</label>
        <input
          type="number"
          value={carData.Power_HP.value?.toString() || ""}
          onChange={(e) => handleInputChange("Power_HP", e.target.value)}
        />
      </div>

      <div>
        <label>Displacement (cm3)</label>
        <input
          type="number"
          value={carData.Displacement_cm3.value?.toString() || ""}
          onChange={(e) =>
            handleInputChange("Displacement_cm3", e.target.value)
          }
        />
      </div>

      <div>
        <label>Fuel Type</label>
        <select
          onChange={(e) => handleSelectChange("Fuel_type", e.target.value)}
        >
          {carData.Fuel_type.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Drive</label>
        <select onChange={(e) => handleSelectChange("Drive", e.target.value)}>
          {carData.Drive.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Transmission</label>
        <select
          onChange={(e) => handleSelectChange("Transmission", e.target.value)}
        >
          {carData.Transmission.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Type</label>
        <select onChange={(e) => handleSelectChange("Type", e.target.value)}>
          {carData.Type.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Doors Number</label>
        <select
          onChange={(e) => handleSelectChange("Doors_number", e.target.value)}
        >
          {carData.Doors_number.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Colour</label>
        <select onChange={(e) => handleSelectChange("Colour", e.target.value)}>
          {carData.Colour.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>First Owner</label>
        <select
          onChange={(e) => handleSelectChange("First_owner", e.target.value)}
        >
          {carData.First_owner.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Model Version</label>
        <select
          onChange={(e) => handleSelectChange("Model_version", e.target.value)}
        >
          {carData.Model_version.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Features</label>
        <select
          onChange={(e) => handleSelectChange("Features", e.target.value)}
        >
          {carData.Features.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <button className="button-colors text-white rounded-md p-1">
        Evaluate car price
      </button>
    </div>
  );
}
