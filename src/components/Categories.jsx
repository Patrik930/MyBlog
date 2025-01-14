import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useContext } from "react";
import { CategContext } from "../context/CategContext";

export const Categories = ({ selCateg, setSelCateg }) => {
  const { categories } = useContext(CategContext);

  const handleChange = (event) => {
    const { value, checked } = event.target;
    setSelCateg((prev) => (checked ? [...prev, value] : prev.filter((categ) => categ !== value)));
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center mt-16">
      {categories &&
        categories.map((obj) => (
          <div key={obj.id} className="flex items-center">
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleChange}
                  value={obj.name}
                  checked={selCateg.includes(obj.name)}
                />
              }
              label={obj.name}
            />
          </div>
        ))}
    </div>
  );
};
