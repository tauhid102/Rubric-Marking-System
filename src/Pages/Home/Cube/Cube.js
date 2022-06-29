import React, { useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import "./Cube.css";
import InputFields from "../Fields/InputFields";

const Cube = () => {
  const [inputFields, setInputField] = useState([{}]);
  const [inputDFields, setInputDField] = useState([]);

  const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputField(values);
  };

  const handleChange = (index, event) => {
    const values = [...inputDFields];
    values[index][event.target.name] = event.target.value;
    setInputDField(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
    console.log("InputFields", inputDFields);
  };

  const handleField = () => {
    if (inputFields.length === 5) {
      alert("Maximum Five");
      return;
    }
    setInputField([...inputFields, {}]);
  };

  const handleDownField = (e) => {
    setInputDField([...inputDFields, {}]);
  };

  return (
    <Container>
      <h1>Add Dynamic Fields</h1>
      <form action="" className="w-100">
        <div className="row">
          {inputFields.map((inputField, index) => (
            <div className="col-2" key={index}>
              <input
                type="text"
                name={`A${index}`}
                onChange={(event) => handleChangeInput(index, event)}
                class="form-control"
                id="inputEmail4"
              />
            </div>
          ))}
          <Button className="button" variant="contained" onClick={handleField}>
            Add
          </Button>
        </div>
        <Button
          className="button"
          variant="contained"
          onClick={handleDownField}
        >
          Add
        </Button>
      </form>

      <div>
        <Button
          className="mt-2"
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </Container>
  );
};

export default Cube;
