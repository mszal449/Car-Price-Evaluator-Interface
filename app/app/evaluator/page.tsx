"use client";

import FormStage1 from "@/components/evaluator/FormStage1";
import FormStage2 from "@/components/evaluator/FormStage2";
import FormStage3 from "@/components/evaluator/FormStage3";
import { FormOptions } from "@/types";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface ApiInput {
  condition: string;
  brand: string;
  model: string;
  generation: string;
  year: number;
  mileage: number;
  power_hp: number;
  displacement: number;
  fuel_type: string;
  drive: string;
  transmission: string;
  type: string;
  doors_num: number;
  colour: string;
  first_owner: boolean;
  version: string;
  features: string[];
}

interface FormState {
  price: string;
  condition: string;
  productionYear: string;
  mileage: string;
  power: string;
  displacement: string;
  fuelType: string;
  drive: string;
  transmission: string;
  type: string;
  doors: string;
  colour: string;
  firstOwner: string;
  features: string[];
}


export default function DynamicForm() {
  // All avaiable form options
  const [formStage, setFormStage] = useState<number>(1);
  const [formOptions, setFormOptions] = useState<FormOptions | null>(null);
  const [error, setError] = useState<string>("");
  const router = useRouter()

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
    firstOwner: "Yes",
    features: [] as string[],
  });

  const nextStage = () => {
    if (formStage < 3) {
      setFormStage(formStage + 1);
    }
  }

  const prevStage = () => {
    if (formStage > 1) {
      setFormStage(formStage - 1);
    }
  }

  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedGeneration, setSelectedGeneration] = useState<string>("Unknown");
  const [selectedVersion, setSelectedVersion] = useState<string>("Unknown");
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

  // Update generations and versions when model changes
  useEffect(() => {
    if (selectedModel && formOptions) {
      const brandData = formOptions.vehicle_brand.find(
        (brand) => brand.name === selectedBrand
      );
      const modelData = brandData?.vehicle_model.find(
        (model) => model.vehicle_model === selectedModel
      );
      setGenerations(modelData?.vehicle_generation || []);
      setVersions(modelData?.vehicle_version || []);
      setSelectedGeneration("Unknown");
      setSelectedVersion("Unknown");
    }
  }, [selectedModel, selectedBrand, formOptions]);

  const handleInputChange = (
    field: string,
    value: string | number | (string | number)[]
  ) => {
    
    setFormState((prev) => ({ ...prev, [field]: value }));
    console.log(formState);
  };

  const validateStage3 = () => {
    const requiredStringFields: (keyof FormState)[] = [
      'fuelType',
      'drive',
      'transmission',
      'type',
      'colour',
      'firstOwner'
    ];
  
    const requiredNumberFields: (keyof FormState)[] = ['doors'];
  
    const hasEmptyStringField = requiredStringFields.some(
      field => !formState[field] || formState[field] === ""
    );
  
    const hasInvalidNumberField = requiredNumberFields.some(
      field => {
        const value = formState[field];
        if (Array.isArray(value)) return true;
        return !value || parseInt(value) <= 0;
      }
    );
  
    if (hasEmptyStringField || hasInvalidNumberField) {
      setError("All fields must be filled with valid values.");
      return false;
    }
  
    setError("");
    return true;
  };

  // Submit form to the API for prediction
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStage3()) {
      return
    }

    try {
      const data: ApiInput = {
        condition: formState.condition,
        brand: selectedBrand,
        model: selectedModel,
        generation: selectedGeneration,
        year: parseInt(formState.productionYear),
        mileage: parseInt(formState.mileage),
        power_hp: parseInt(formState.power),
        displacement: parseInt(formState.displacement),
        fuel_type: formState.fuelType,
        drive: formState.drive,
        transmission: formState.transmission,
        type: formState.type,
        doors_num: parseInt(formState.doors),
        colour: formState.colour,
        first_owner: formState.firstOwner === "Yes",
        version: selectedVersion,
        features: formState.features,
      }
    
      const res = await fetch("http://127.0.0.1:8000/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        console.log("error")
        return
      }

      const res_data = await res.json()
        const searchParams = new URLSearchParams();
        searchParams.append("estimated_price", res_data.estimated_price);
        searchParams.append("expected_price_1y", res_data.expected_price_1y);
        searchParams.append("expected_price_2y", res_data.expected_price_2y);
        searchParams.append("expected_price_3y", res_data.expected_price_3y);
        searchParams.append("expected_price_4y", res_data.expected_price_4y);

        router.push(`/results?${searchParams.toString()}`);
    } catch (error) {
      console.log(error)
    }
  }
  
  
  return (
    <div className="p-6 mt-10 flex flex-col items-center w-full">
      <h1 className="text-4xl font-bold mb-6">Enter vehicle information:</h1>
      <form className="space-y-4" onSubmit={submitForm}>
        {formStage == 1 ? 
          (<FormStage1 
          formOptions={formOptions} 
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          models={models}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          generations={generations}
          selectedGeneration={selectedGeneration}
          setSelectedGeneration={setSelectedGeneration}
          versions={versions}
          selectedVersion={selectedVersion}
          setSelectedVersion={setSelectedVersion}
          nextStage={nextStage}
          />)
        : formStage == 2 ? (
        <FormStage2
            formState={formState}
            formOptions={formOptions}
            handleInputChange={handleInputChange}
            nextStage={nextStage}
            prevStage={prevStage}
          />
          
        ) : (
          <FormStage3
          formState={formState}
            formOptions={formOptions}
            handleInputChange={handleInputChange}
            prevStage={prevStage}
            error={error}
          />
        )
      }
      {error && 
        <div className="text-center text-red-500 text-xl">{error}</div>
      }
      </form>
    </div>
  );
}
