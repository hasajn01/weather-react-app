import "./form.css";

import React, { useState } from "react";

function Form({ addCity }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    addCity(value);
    setValue("");
  };

  return (
    <form onSubmit={handleChange} className="form">
      <input
        className="input"
        type="text"
        placeholder="Search for a city"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="button"></button>
    </form>
  );
}
export default Form;
