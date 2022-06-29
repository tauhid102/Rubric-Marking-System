import React, { useState } from "react";
import { useEffect } from "react";
import "../Style/Style.css";
const Marking = () => {
  const [mark, setMark] = useState({});
  const [criteria, setCriteria] = useState({});
  const [rubric, setRubric] = useState({});
  const [dependMark, setdependMark] = useState(false);
  const [dependCiteria, setdependCiteria] = useState(false);
  const [dependRubric, setdependRubric] = useState(false);
  const [markCollection, setMarkCollection] = useState([]);
  const [citeriaCollection, setciteriaCollection] = useState([]);
  const [rubricCollection, setRubricCollection] = useState([]);

  const handleMark = (e) => {
    setdependMark(false);
    const field = e.target.name;
    const value = e.target.value;
    const newAddData = { ...mark };
    newAddData[field] = value;
    setMark(newAddData);
  };
  const handleSaveMark = () => {
    fetch("https://infinite-citadel-70182.herokuapp.com/mark", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(mark),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged === true) {
          alert("Save Marks");
        }
      });
    setdependMark(true);
  };
  useEffect(() => {
    fetch("https://infinite-citadel-70182.herokuapp.com/mark")
      .then((res) => res.json())
      .then((data) => setMarkCollection(data));
  }, [dependMark]);
  const handleCriteria = (e) => {
    setdependCiteria(false);
    const field = e.target.name;
    const value = e.target.value;
    const newData = { ...criteria };
    newData[field] = value;
    setCriteria(newData);
  };
  const handleSaveCriteria = (e) => {
    e.preventDefault();
    fetch("https://infinite-citadel-70182.herokuapp.com/criteria", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(criteria),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged === true) {
          alert("Save Criteria");
        }
      });
    setdependCiteria(true);
  };
  useEffect(() => {
    fetch("https://infinite-citadel-70182.herokuapp.com/cieria")
      .then((res) => res.json())
      .then((data) => setciteriaCollection(data));
  }, [dependCiteria]);
  const selectMenu = (e) => {
    setdependRubric(false);
    const field = e.target.name;
    const value = e.target.value;
    const newData = { ...rubric };
    newData[field] = value;
    setRubric(newData);
  };
  const handleSaveRubic = (e) => {
    e.preventDefault();
    console.log(rubric);
    fetch("https://infinite-citadel-70182.herokuapp.com/rubric", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(rubric),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged === true) {
          alert("Save Rubric");
        }
      });
    setdependRubric(true);
  };
  useEffect(() => {
    fetch("https://infinite-citadel-70182.herokuapp.com/rubric")
      .then((res) => res.json())
      .then((data) => setRubricCollection(data));
  }, [dependRubric]);
  const getRubricObj = (cid, mid) => {
    var r = rubricCollection.filter(
      (a) => a.criteria2 === cid && a.mark2 === mid
    )[0];
    console.log(r);
    return r;
  };
  return (
    <div className="container">
      <div className="">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-8">
            <div className="row">
              <h6>Add Mark</h6>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  name="title"
                  aria-label="First name"
                  onBlur={handleMark}
                />
              </div>
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Marks"
                  name="mark"
                  aria-label="Last name"
                  onBlur={handleMark}
                />
              </div>
              <div className="col">
                <button className="btn btn-primary" onClick={handleSaveMark}>
                  Save
                </button>
              </div>
            </div>
          </div>
          <div className="col-3"></div>
          <hr className="mt-4" />
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          <div className="col-2 border-end">
            <h6>Add criteria</h6>
            <form action="" className="mt-2">
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Title"
                name="criteria"
                onBlur={handleCriteria}
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Description"
                name="description"
                onBlur={handleCriteria}
              />
              <button
                className="btn btn-primary mt-2"
                onClick={handleSaveCriteria}
              >
                Save
              </button>
            </form>
          </div>
          <div className="col-8 border-end">
            <h6>Rubric Table</h6>
            <div className="table-responsive">
              <table className="table table-bordered table-light">
                <thead>
                  <tr>
                    <th>#</th>
                    {markCollection?.map((marks) => (
                      <th key={marks._id}>{marks.title}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {citeriaCollection?.map((citeria) => (
                    <tr>
                      <td className="fw-bold">{citeria.criteria}</td>
                      {markCollection?.map((marks) => (
                        <td
                          key={marks._id}
                          className="detailsFont cursor-pointer"
                        >
                          {getRubricObj(citeria._id, marks._id) != null
                            ? getRubricObj(citeria._id, marks._id).description2
                            : ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-2">
            <h6>Add criteria</h6>
            <form action="">
              <label for="inputState" className="form-label">
                Criteria
              </label>
              <select
                onChange={selectMenu}
                name="criteria2"
                id="inputState"
                className="form-select"
              >
                <option selected>Choose...</option>
                {citeriaCollection?.map((citeria) => (
                  <option value={citeria._id}>{citeria.criteria}</option>
                ))}
              </select>
              <label for="inputState" className="form-label">
                Mark
              </label>
              <select
                onChange={selectMenu}
                name="mark2"
                id="inputState"
                className="form-select"
              >
                <option selected>Choose...</option>
                {markCollection?.map((marks) => (
                  <option value={marks._id}>{marks.title}</option>
                ))}
              </select>
              <label for="inputState" className="form-label">
                Description
              </label>
              <textarea
                onChange={selectMenu}
                name="description2"
                id=""
                cols="20"
                rows="2"
              ></textarea>
              <button onClick={handleSaveRubic} className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marking;
