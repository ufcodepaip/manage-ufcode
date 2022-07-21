import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";

const Singleselect = ({ cname, values = [], ctrl, cselect, defaultList }) => {
  const op = values.map((value) => ({
    label: value.name,
    value: value.id
  }))

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
              defaultValue={defaultList[0]}
            />
          )
        }}
        rules={{ required: true }}
      />
    </div>
  );
};

export default Singleselect
