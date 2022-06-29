import React, { useEffect, useState } from "react";
import "../../Style/Style.css";

const Marks = () => {
  const [value, setValue] = useState([]);
  const [hide, setHide] = useState(false);
  const [button, setButton] = useState(false);
  const [button1, setButton1] = useState("");
  const [button2, setButton2] = useState("");
  const [button3, setButton3] = useState("");
  const [button4, setButton4] = useState("");
  const [button5, setButton5] = useState("");

  const handleButton1 = (e) => {
    e.preventDefault();
    setButton1(e.target.value);
  };
  const handleButton2 = (e) => {
    e.preventDefault();
    setButton2(e.target.value);
  };
  const handleButton3 = (e) => {
    e.preventDefault();
    setButton3(e.target.value);
  };
  const handleButton4 = (e) => {
    e.preventDefault();
    setButton4(e.target.value);
  };
  const handleButton5 = (e) => {
    e.preventDefault();
    setButton5(e.target.value);
  };
  const handleSubmit = (number) => {
    alert("Set Value");
    const marks = [...value, number];
    setValue(marks);
  };
  const handleButton = () => {
    setHide(false);
    setButton(true);
  };
  const handleInset=()=>{
    setHide(true);
    setButton(false);
  }
  return (
    <div className="container mt-5">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-2">
            <button
              onClick={handleInset}
              className="btn btn-primary insetButton"
            >
              Insert
            </button>
          </div>
          <div className="col-md-10">
            {hide && (
              <div className="col">
                <form
                  className="row g-3 w-100 inputFrom mt-2"
                  id="create-course-form"
                  onSubmit={handleButton}
                >
                  <div className="col-2">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="inputAddress"
                      placeholder="Button 1"
                      onBlur={handleButton1}
                    />
                  </div>
                  <div className="col-2">
                    <input
                      type="text"
                      name="price"
                      className="form-control"
                      id="inputEmail4"
                      placeholder="Button 2"
                      onBlur={handleButton2}
                    />
                  </div>
                  <div className="col-2">
                    <input
                      type="text"
                      name="author"
                      className="form-control"
                      id="inputEmail4"
                      placeholder="Button 3"
                      onBlur={handleButton3}
                    />
                  </div>
                  <div className="col-2">
                    <input
                      type="text"
                      name="edition"
                      className="form-control"
                      id="inputEmail4"
                      placeholder="Button 4"
                      onBlur={handleButton4}
                    />
                  </div>
                  <div className="col-2">
                    <input
                      type="text"
                      name="category"
                      className="form-control"
                      id="inputEmail4"
                      placeholder="Button 5"
                      onBlur={handleButton5}
                    />
                  </div>

                  <div className="col-2">
                    <button type="submit" className="btn btn-dark">
                      Add Button
                    </button>
                  </div>
                </form>
              </div>
            )}
            <div
              className="btn-group"
              role="group"
              aria-label="Basic outlined example"
            >
              {button && (
                <div>
                  <button
                    onClick={() => handleSubmit(button1)}
                    type="button"
                    value={button1}
                    className="btn btn-outline-primary myBtn m-2"
                  >
                    {button1}
                  </button>
                  <button
                    onClick={() => handleSubmit(button2)}
                    type="button"
                    value={4}
                    className="btn btn-outline-primary myBtn m-2"
                  >
                    {button2}
                  </button>
                  <button
                    onClick={() => handleSubmit(button3)}
                    type="button"
                    value={3}
                    className="btn btn-outline-primary myBtn m-2"
                  >
                    {button3}
                  </button>
                  <button
                    onClick={() => handleSubmit(button4)}
                    type="button"
                    value={2}
                    className="btn btn-outline-primary myBtn m-2"
                  >
                    {button4}
                  </button>
                  <button
                    onClick={() => handleSubmit(button5)}
                    type="button"
                    value={1}
                    className="btn btn-outline-primary myBtn m-2"
                  >
                    {button5}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="table-responsiive">
        <table className="table table-hover table-light">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Marks</th>
            </tr>
          </thead>
          <tbody>
            {value?.map((mark) => (
              <tr>
                <td>-</td>
                <td>{mark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Marks;
