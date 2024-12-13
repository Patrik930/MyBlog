import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { useContext } from "react";
import { CategContext } from "../context/CategContext";

export const Categories = ({categ,selCateg,setSelCateg}) => {

    const {categories} = useContext(CategContext)


    const handleChange =(event)=>{
       const {value,checked} = event.target
       
       
       setSelCateg(prev=>checked ? [...prev,value] : prev.filter(categ=>categ!=value))
    }


  return (
    <div>
          {categories && categories.map((obj) => (   
    <div className="mt-40">
      <FormGroup 
      key={obj.id}>
        <FormControlLabel control={<Checkbox onChange={handleChange} value={obj.name} checked={selCateg.includes(obj.name)}  />} label={obj.name} />
      </FormGroup>
    </div>
)   )}
    </div>
   
  );
};
