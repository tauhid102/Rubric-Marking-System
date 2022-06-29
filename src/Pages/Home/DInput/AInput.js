import React, { useState } from "react";
import "../../Style/Style.css";
const AInput = () => {
  const [inputFields, setInputFields] = useState([{_id: "", title:"marks", A: "", B: "" }]);
  const [rowValues,setRowValues]=useState(false);
  const [dataValues,setDataValues]=useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
    const marks = [...inputFields];

    fetch("https://infinite-citadel-70182.herokuapp.com/marks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(marks),
    });
  };
  const handleUpdate =(id)=>{
    const ids = { id };
            const url = `https://infinite-citadel-70182.herokuapp.com/marks`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(ids)
            })
                .then(res => res.json())
                .then(result => {
                    if (result.modifiedCount > 0) {
                        alert('Active Successfully');
                    }
                })
  }
  const handleLoadData = () => {
    setDataValues(true);
    setRowValues(false)
    fetch("https://infinite-citadel-70182.herokuapp.com/load")
      .then((res) => res.json())
      .then((data) => setInputFields(data));
  };
  const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  const handleAddFields = (e) => {
    e.preventDefault();
    setRowValues(true);
    setInputFields([...inputFields, {title:"marks", A: "", B: "" }]);
  };

  const handleRemoveFields = (id) => {
    // let values = [...inputFields];
    // const index = values.indexOf(id);
    // console.log(index);
    // values.splice(index, 1);
    // setInputFields(values);
    const uri = `https://infinite-citadel-70182.herokuapp.com/marks/${id}`;
    fetch(uri, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.deletedCount > 0) {
          alert("Cancel Successfully");
          const restMarks = inputFields.filter((mark) => mark._id !== id);
          setInputFields(restMarks);
        }
      });
    console.log(id);
  };
  const handleRowRemove=()=>{
    let values = [...inputFields];
    const index = values.indexOf();
    console.log(index);
    values.splice(index, 1);
    setInputFields(values);
  }
  return (
    <div>
      <div className="container">
        <h1>Dynamic From</h1>
        <>
          {inputFields.map((inputField, index) => (
            <div key={index} className="mb-1 inputFields">
              <span>{inputField._id}</span>
              <input
                className="me-1"
                type="text"
                name="A"
                label="A"
                variant="filled"
                value={inputField.A}
                onChange={(event) => handleChangeInput(index, event)}
              />
              <input
                className="me-1"
                type="text"
                name="B"
                label="B"
                variant="filled"
                value={inputField.B}
                onChange={(event) => handleChangeInput(index, event)}
              />
              <button
                className="me-1 btn btn-danger"
                disabled={ rowValues===true}
                onClick={() => handleRemoveFields(inputField._id)}
              >
                <i className="far fa-trash-alt"></i>
              </button>
              <button className="btn btn-primary" onClick={handleAddFields}
              // disabled={dataValues===true}
              >
                Add
              </button>
            </div>
          ))}
        </>
        <button
          className="me-1 btn btn-danger"
          disabled={dataValues===true}
          onClick={() => handleRowRemove()}
        >
          Row Remove
        </button>
        <button
          className="btn btn-warning"
          type="submit"
          onClick={handleSubmit}
        >
          Send
        </button>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={handleUpdate}
        >
          Update
        </button>
        <button className="btn btn-info" type="submit" onClick={handleLoadData}
        // disabled={rowValues===true}
        >
          Load
        </button>
      </div>
    </div>
  );
};

export default AInput;
