"use client";

import { useState, useEffect } from "react";
import Select, { StylesConfig } from "react-select";
import { MultiValue } from 'react-select';

type VehicleModel = {
  vehicle_model: string;
  vehicle_version: string[];
  vehicle_generation: string[];
};

type VehicleBrand = {
  name: string;
  vehicle_model: VehicleModel[];
};

type FormOptions = {
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


interface FeatureOption {
  value: string;
  label: string;
}


export default function DynamicForm() {
  // All avaiable form options
  const [formOptions, setFormOptions] = useState<FormOptions | null>(null);

  // Current form state values
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


  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedGeneration, setSelectedGeneration] = useState<string>("Unknown");
  const [selectedVersion, setSelectedVersion] = useState<string>("");
  const [models, setModels] = useState<string[]>([]);
  const [generations, setGenerations] = useState<string[]>([]);
  const [versions, setVersions] = useState<string[]>([]);
  
  
  // Fetch data from the JSON file or API
  useEffect(() => {
    fetch("/unique_values.json")
      .then((res) => res.json())
      .then((jsonData: FormOptions) => setFormOptions(jsonData))
      .catch((err) => console.error("Error fetching data:", err))
  }, []);

  // Update models when brand changes
  useEffect(() => {
    if (selectedBrand && formOptions) {
      const brandData = formOptions.vehicle_brand.find(
        (brand) => brand.name === selectedBrand
      );
      setModels(
        brandData?.vehicle_model.map((model) => model.vehicle_model) || []
      );
      setSelectedModel("");
      setGenerations([]);
      setVersions([]);
    }
  }, [selectedBrand, formOptions]);

  // Update generations when model changes
  useEffect(() => {
    if (selectedModel && formOptions) {
      const brandData = formOptions.vehicle_brand.find(
        (brand) => brand.name === selectedBrand
      );
      const modelData = brandData?.vehicle_model.find(
        (model) => model.vehicle_model === selectedModel
      );
      setGenerations(modelData?.vehicle_generation || []);
      setSelectedGeneration("");
      setVersions([]);
    }
  }, [selectedModel, selectedBrand, formOptions]);

  // Update versions when generation changes
  useEffect(() => {
    if (selectedModel && formOptions) {
      const brandData = formOptions.vehicle_brand.find(
        (brand) => brand.name === selectedBrand
      );
      const modelData = brandData?.vehicle_model.find(
        (model) => model.vehicle_model === selectedModel
      );
      setVersions(modelData?.vehicle_version || []);
      setSelectedVersion("");
    }
  }, [selectedGeneration, selectedModel, selectedBrand, formOptions]);

  const handleInputChange = (
    field: string,
    value: string | number | string[]
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    console.log(formState);
  };

  const featureOptions: FeatureOption[] = formOptions?.features.map((feature) => ({
    value: feature,
    label: feature,
  })) || [];

  const handleFeaturesChange = (selectedOptions: MultiValue<FeatureOption>) => {
    handleInputChange(
      "features",
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  const customStyles: StylesConfig<FeatureOption, true> = {
    control: (provided) => ({
      ...provided,
      color: 'white',
      backgroundColor: '#001e2b',
      borderColor: 'gray-300',
      borderRadius: '0.375rem',
      padding: '0.5rem',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      '&:hover': {
        borderColor: 'gray-500',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'gray',
      borderRadius: '0.375rem',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: 'gray',
      borderRadius: '0.375rem',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      backgroundColor: '001e2b',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'white',
      '&:hover': {
        backgroundColor: 'gray-300',
        color: 'gray-700',
      },
    }),
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState);
  }
  
  
  return (
    <div className="p-6 flex flex-col items-center w-full">
      <h1 className="text-xl font-bold mb-6">Vehicle Data Form</h1>
      <form className="space-y-4" onSubmit={submitForm}>
        {/* Condition */}
        <button type='submit'>Submit form</button>
        <div>
          <label htmlFor="condition" className="block text-sm font-medium">
            Condition
          </label>
          <select
            id="condition"
            value={formState.condition}
            onChange={(e) => handleInputChange("condition", e.target.value)}
            className="form-input"
          >
            <option value="">Select</option>
            {formOptions?.condition.map((cond) => (
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
            className="form-input"
          >
            <option value="">Select</option>
            {formOptions?.vehicle_brand.map((brand) => (
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
            className="form-input"
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
    className="form-input"
  >
    <option value="Unknown">Unknown</option>
    {generations
      .filter((gen) => gen !== "Unknown")
      .map((gen) => (
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
              className="form-input"
            />
          </div>
        ))}

        {/* Other Dropdowns */}
        {[
          { id: "fuelType", label: "Fuel Type", options: formOptions?.fuel_type },
          { id: "drive", label: "Drive", options: formOptions?.drive },
          {
            id: "transmission",
            label: "Transmission",
            options: formOptions?.transmission,
          },
          { id: "type", label: "Type", options: formOptions?.type },
          { id: "doors", label: "Doors Number", options: formOptions?.doors_number },
          { id: "colour", label: "Colour", options: formOptions?.colour },
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
              className="form-input"
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
          <Select
            id="features"
            isMulti
            options={featureOptions}
            value={formState.features.map((feature) => ({
              value: feature,
              label: feature,
            }))}
            styles={customStyles}
            onChange={handleFeaturesChange}
            className="form-input"
          />
        </div>
        <button type='submit'>Submit form</button>

      </form>
    </div>
  );
}
