import SearchPatient from "./SearchPatient";
import React from "react";

const patient = {
  id: "batman@NCG",
  display: "batman"
};

const options = {
  method: "POST",
  body: JSON.stringify(patient),
  headers: {
    "Content-Type": "application/json"
  }
};

const searchPatient = () => {
  fetch("https://reqres.in/api/users", options)
    .then(res => {
      return res.json();
    })
    .then(res => console.log(res));
};

const SearchPatientContainer = () => {
  return <SearchPatient onSearch={searchPatient} />;
};

export default SearchPatientContainer;
