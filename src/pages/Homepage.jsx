import React, { useContext } from "react";
import { CategContext } from "../context/CategContext";
import { NavLink } from "react-router-dom";



export const Homepage = () => {
  const { categories } = useContext(CategContext);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-6 bg-gray-100">
      <div className="flex flex-wrap justify-center gap-6">
        {categories && categories.map((obj) => (
          <div key={obj.id} className="w-80 bg-white rounded-lg shadow-2xl p-6 flex flex-col">
            
            <img
              src={obj.photoUrl}
              alt={obj.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              
              <h2 className="font-bold text-xl text-orange-700 mb-2">{obj.name}</h2>
             
              <NavLink
              to={'/posts?ctg='+obj.name}
              >
              <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800">Tudj meg többet</button>
              </NavLink>
           
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
