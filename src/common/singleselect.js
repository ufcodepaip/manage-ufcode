import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";

const Singleselect = ({ cname, values = [], ctrl, cselect, defaultList, defaultOption }) => {
  const op = values.map((value) => ({
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
            <Select
              options={op}
              placeholder={cselect}
              onChange={(op) => {
                console.log(op.value)
                onChange(op.value)
              }
              }
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

export default Singleselect
