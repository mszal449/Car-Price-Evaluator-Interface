"use client";
import { FormOptions } from '@/types'
import React, { useState } from 'react'

interface FormStage1Props {
  formOptions: FormOptions | null,
  nextStage: () => void,
  selectedBrand: string,
  setSelectedBrand: React.Dispatch<React.SetStateAction<string>>,
  models: string[],
  selectedModel: string,
  setSelectedModel: React.Dispatch<React.SetStateAction<string>>,
  generations: string[],
  selectedGeneration: string,
  setSelectedGeneration: React.Dispatch<React.SetStateAction<string>>,
  versions: string[],
  selectedVersion: string,
  setSelectedVersion: React.Dispatch<React.SetStateAction<string>>,
}

const FormStage1 = ({
  formOptions, 
  nextStage,
  selectedBrand,
  setSelectedBrand,
  models,
  selectedModel,
  setSelectedModel,
  generations,
  selectedGeneration,
  setSelectedGeneration,
  versions,
  selectedVersion,
  setSelectedVersion,
} : FormStage1Props) => {
  const [error, setError] = useState<string>("");

  function handleNext() {
    console.log({
      selectedBrand,
      selectedModel,
      selectedGeneration,
      selectedVersion,
    });
    if (
      selectedBrand && 
      selectedModel && 
      (selectedGeneration === "Unknown" || selectedGeneration) && 
      (selectedVersion === "Unknown" || selectedVersion)
    ) {
      setError("");
      nextStage();
    } else {
      setError("Brand and model values must be given.");
    }
  }

  return (
    <div className='flex flex-col gap-4 w-[400px]'>
      <div>
          <label htmlFor="brand" className="block text-2xl font-medium">
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
          <label htmlFor="model" className="block text-2xl font-medium">
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
          <label htmlFor="generation" className="block text-2xl font-medium">
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
              .filter((gen) => gen !== "Unknown" && gen !== "")
              .map((gen) => (
                <option key={gen} value={gen}>
                  {gen}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="version" className="block text-2xl font-medium">
            Version
          </label>
          <select
            id="version"
            value={selectedVersion}
            onChange={(e) => setSelectedVersion(e.target.value)}
            disabled={!versions.length}
            className="form-input"
          >
            <option value="Unknown">Unknown</option>
            {versions
              .filter((ver) => ver !== "Unknown" && ver !== "")
              .map((ver) => (
                <option key={ver} value={ver}>
                  {ver}
                </option>
              ))}
          </select>
        </div>
        {error && 
          <div className='text-red-500 text-center'>{error}</div>
        }
        <div className='flex justify-end'>
          <button type="button" onClick={handleNext} className="button-colors p-2 rounded-md">Next</button>
        </div>
    </div>

    
  )
}

export default FormStage1