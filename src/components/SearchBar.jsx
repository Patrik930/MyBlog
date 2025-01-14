import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

export const SearchBox = ({ items }) => {
  const navigate = useNavigate();

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item) => {
    console.log(item);
    navigate(`/detail/${item.id}`);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  return (
    <div>
      <div style={{ width: 400, color: "black !important" }}>
        <ReactSearchAutocomplete
          items={items}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          autoFocus
          styling={{
            zIndex: 100,
            color: "black",
            fontSize: "16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>
    </div>
  );
};
