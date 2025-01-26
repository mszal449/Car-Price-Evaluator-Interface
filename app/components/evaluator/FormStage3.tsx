import { FormOptions } from '@/types'
import React, { useEffect, useState } from 'react'
import { InputActionMeta, MultiValue, StylesConfig } from 'react-select';
import Select from 'react-select';
import { MultiSelect } from "react-multi-select-component";

interface FeatureOption {
  value: string;
  label: string;
}

interface FormStage3Props {
    formState: any,
    formOptions: FormOptions | null,
    handleInputChange: (key: string, value: string | number | (string | number)[]) => void,    
    prevStage: () => void,
    error: string
}

const FormStage3 = (
  {
    formState,
    formOptions,
    handleInputChange,
    prevStage,
    error
}: FormStage3Props
) => {

  const featureOptions: FeatureOption[] = formOptions?.features.map((feature) => ({
    value: feature,
    label: feature,
  })) || [];
  
  const handleFeaturesChange = (selectedOptions: FeatureOption[]) => {
    handleInputChange(
      'features',
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };  

  return (
    <div className='flex flex-col gap-4 w-[400px] pb-[250px]'>
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
            <label htmlFor={id} className="block text-2xl font-medium">
              {label}
            </label>
            <select
              id={id}
              value={formState[id as keyof typeof formState]}
              onChange={(e) => handleInputChange(id, e.target.value)}
              className="bg-[#023952] border border-slate-600  mt-1 p-2 block w-full rounded-md shadow-sm"
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

      <label htmlFor="features" className="block text-sm font-medium">
        Features
      </label>
      <MultiSelect
        options={featureOptions}
        value={featureOptions.filter((option) =>
          formState.features.includes(option.value)
        )}
          onChange={handleFeaturesChange}
        labelledBy="Select"
        className='dark mulit-select'
      />

      {error && <div className="text-red-500 text-center">{error}</div>}

    <div className='flex justify-between pt-2'>
          <button type='button' onClick={prevStage} className="button-colors p-2 rounded-md">Back</button>
          <button type='submit' className="button-colors p-2 rounded-md">Submit</button>
        </div>
    </div>
  )
}

export default FormStage3