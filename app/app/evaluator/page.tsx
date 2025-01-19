"use client";

import { useState, useEffect } from "react";

type VehicleModel = {
  vehicle_model: string;
  vehicle_version: string[];
  vehicle_generation: string[];
};

type VehicleBrand = {
  name: string;
  vehicle_model: VehicleModel[];
};

type ResultJSON = {
  condition: string[];
  vehicle_brand: VehicleBrand[];
  fuel_type: string[];
  drive: string[];
  transmission: string[];
  type: string[];
  doors_number: number[];
  colour: string[];
  features: string[];
};

export default function DynamicForm() {
  const [data, setData] = useState<ResultJSON | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedGeneration, setSelectedGeneration] = useState<string>("");
  const [selectedVersion, setSelectedVersion] = useState<string>("");
  const [models, setModels] = useState<string[]>([]);
  const [generations, setGenerations] = useState<string[]>([]);
  const [versions, setVersions] = useState<string[]>([]);

  const [formState, setFormState] = useState({
    price: "",
    condition: "",
    productionYear: "",
    mileage: "",
    power: "",
    displacement: "",
    fuelType: "",
    drive: "",
    transmission: "",
    type: "",
    doors: "",
    colour: "",
    firstOwner: "",
    features: [] as string[],
  });

  // Fetch data from the JSON file or API
  useEffect(() => {
    fetch("/unique_values.json")
      .then((res) => res.json())
      .then((jsonData: ResultJSON) => setData(jsonData))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // Update models when brand changes
  useEffect(() => {
    if (selectedBrand && data) {
      const brandData = data.vehicle_brand.find(
        (brand) => brand.name === selectedBrand
      );
      setModels(
        brandData?.vehicle_model.map((model) => model.vehicle_model) || []
      );
      setSelectedModel("");
      setGenerations([]);
      setVersions([]);
    }
  }, [selectedBrand, data]);

  // Update generations when model changes
  useEffect(() => {
    if (selectedModel && data) {
      const brandData = data.vehicle_brand.find(
        (brand) => brand.name === selectedBrand
      );
      const modelData = brandData?.vehicle_model.find(
        (model) => model.vehicle_model === selectedModel
      );
      setGenerations(modelData?.vehicle_generation || []);
      setSelectedGeneration("");
      setVersions([]);
    }
  }, [selectedModel, selectedBrand, data]);

  // Update versions when generation changes
  useEffect(() => {
    if (selectedModel && data) {
      const brandData = data.vehicle_brand.find(
        (brand) => brand.name === selectedBrand
      );
      const modelData = brandData?.vehicle_model.find(
        (model) => model.vehicle_model === selectedModel
      );
      setVersions(modelData?.vehicle_version || []);
      setSelectedVersion("");
    }
  }, [selectedGeneration, selectedModel, selectedBrand, data]);

  const handleInputChange = (
    field: string,
    value: string | number | string[]
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 text-gray-500">
      <h1 className="text-xl font-bold mb-6">Vehicle Data Form</h1>
      <form className="space-y-4">
        {/* Condition */}
        <div>
          <label htmlFor="condition" className="block text-sm font-medium">
            Condition
          </label>
          <select
            id="condition"
            value={formState.condition}
            onChange={(e) => handleInputChange("condition", e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select</option>
            {data?.condition.map((cond) => (
              <option key={cond} value={cond}>
                {cond}
              </option>
            ))}
          </select>
        </div>

        {/* Dynamic Selects */}
        <div>
          <label htmlFor="brand" className="block text-sm font-medium">
            Brand
          </label>
          <select
            id="brand"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select</option>
            {data?.vehicle_brand.map((brand) => (
              <option key={brand.name} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="model" className="block text-sm font-medium">
            Model
          </label>
          <select
            id="model"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            disabled={!models.length}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select</option>
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="generation" className="block text-sm font-medium">
            Generation
          </label>
          <select
            id="generation"
            value={selectedGeneration}
            onChange={(e) => setSelectedGeneration(e.target.value)}
            disabled={!generations.length}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select</option>
            {generations.map((gen) => (
              <option key={gen} value={gen}>
                {gen}
              </option>
            ))}
          </select>
        </div>

        {/* Numeric Fields */}
        {[
          { id: "productionYear", label: "Production Year" },
          { id: "mileage", label: "Mileage (km)" },
          { id: "power", label: "Power (HP)" },
          { id: "displacement", label: "Displacement (cm³)" },
        ].map(({ id, label }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-sm font-medium">
              {label}
            </label>
            <input
              type="number"
              id={id}
              value={formState[id as keyof typeof formState]}
              onChange={(e) =>
                handleInputChange(id, parseFloat(e.target.value))
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
        ))}

        {/* Other Dropdowns */}
        {[
          { id: "fuelType", label: "Fuel Type", options: data?.fuel_type },
          { id: "drive", label: "Drive", options: data?.drive },
          {
            id: "transmission",
            label: "Transmission",
            options: data?.transmission,
          },
          { id: "type", label: "Type", options: data?.type },
          { id: "doors", label: "Doors Number", options: data?.doors_number },
          { id: "colour", label: "Colour", options: data?.colour },
          { id: "firstOwner", label: "First Owner", options: ["Yes", "No"] },
        ].map(({ id, label, options }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-sm font-medium">
              {label}
            </label>
            <select
              id={id}
              value={formState[id as keyof typeof formState]}
              onChange={(e) => handleInputChange(id, e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Select</option>
              {options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}

        {/* Features (Multiple Select) */}
        <div>
          <label htmlFor="features" className="block text-sm font-medium">
            Features
          </label>
          <select
            id="features"
            multiple
            value={formState.features}
            onChange={(e) =>
              handleInputChange(
                "features",
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            {data?.features.map((feature) => (
              <option key={feature} value={feature}>
                {feature}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}
