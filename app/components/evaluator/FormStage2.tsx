import { FormOptions } from '@/types'
import React from 'react'

interface FormStage2Props {
    formState: any,
    formOptions: FormOptions | null,
    handleInputChange: (key: string, value: string | number) => void,
    nextStage: () => void,
    prevStage: () => void
}
const FormStage2 = (
    {
        formState,
        formOptions,
        handleInputChange,
        nextStage,
        prevStage
    }: FormStage2Props
) => {
  const [error, setError] = React.useState("");
  
  function handleNext() {
    if (!formState.condition || formState.condition === "") {
      setError("Condition must be given.")
      return;
    }

    if (
      formState.productionYear > 0 &&
      formState.mileage > 0 &&
      formState.power > 0 &&
      formState.displacement > 0
    ) {
      setError("");
      nextStage();
    } else {
      setError("All numeric fields must have positive values.");
    }
  }

  return (
    <div className="flex flex-col gap-4 w-[400px]">
        <div>
          <label htmlFor="condition" className="block text-2xl font-medium">
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
        {/* Numeric Fields */}
        {[
          { id: "productionYear", label: "Production Year" },
          { id: "mileage", label: "Mileage (km)" },
          { id: "power", label: "Power (HP)" },
          { id: "displacement", label: "Displacement (cm³)" },
        ].map(({ id, label }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-2xl font-medium">
              {label}
            </label>
            <input
              type="number"
              id={id}
              value={formState[id] || ""}
              onChange={(e) =>{
                const value = parseFloat(e.target.value);
                  handleInputChange(id, value)
                }
              }
              className="form-input"
            />
          </div>
        ))}
        {error && <div className="text-red-500 text-center">{error}</div>}
        <div className='flex justify-between'>
          <button type='button' onClick={prevStage} className="button-colors p-2 rounded-md">Back</button>
          <button type='button' onClick={handleNext} className="button-colors p-2 rounded-md">Next</button>
        </div>

    </div>
  )
}

export default FormStage2