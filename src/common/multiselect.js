import React, { useState, useEffect } from "react";
import ReactSelect from "react-select";
import { Controller } from "react-hook-form";

const Multiselect = ({ cname, values = [], ctrl, cselect, defaultList }) => {

  const options = values.map((value) => ({
    label: value.name,
    value: value.id
  }))

  const [interator, setInterator] = useState(-1)

  return (
    <div>
      <Controller
        name={cname}
        control={ctrl}
        render={({ field }) => {
          return (
            <ReactSelect
              {...field}
              options={options}
              placeholder={cselect}
              isMulti={true}
            />
          )
        }}
        rules={{ required: true }}
      />
    </div>
  );
};

export default Multiselect
