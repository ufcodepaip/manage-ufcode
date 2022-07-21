import React, { useState, useEffect } from "react";
import SelectMultiple from "react-select";
import { Controller } from "react-hook-form";

const Multiselect = ({ cname, values = [], ctrl, cselect, defaultList, defaultOption}) => {
  const options = values.map((value) => ({
    label: value.name,
    value: value.id
  }))


  const [df, setDf] = useState()

  useEffect(()=>{
    setDf(defaultList)
  },[])

  return (
    <div>
      <Controller
        name={cname}
        control={ctrl}
        render={({ field: { value, onChange } }) => {
          return (
            <SelectMultiple
              options={options}
              placeholder={cselect}
              isMulti={true}
              onChange={(options) =>
                onChange(options?.map((option) => option.value))
              }
              value={options.filter((option) => value?.includes(option.value))}
              defaultValue={defaultOption}
              value={df}
            />
          )
        }}
        rules={{ required: true }}
      />
    </div>
  );
};

export default Multiselect
