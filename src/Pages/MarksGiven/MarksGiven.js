import React, { useEffect, useState } from "react";
import Navbar from "../Share/Navbar/Navbar";

const MarksGiven = () => {
  const [students, setSudents] = useState([]);
  const [studentsdetails, setSudentsDetails] = useState({});
  const [mark, setMark] = useState([]);
  const [markCollection, setMarkCollection] = useState([]);
  const [citeriaCollection, setciteriaCollection] = useState([]);
  const [rubricCollection, setRubricCollection] = useState([]);
  const [studentsMarksCollection, setstudentsMarksCollection] = useState([]);
  const [markDependence, setMarkDependence] = useState(false);
  //students
  useEffect(() => {
    fetch("https://rubric-marking.up.railway.app/students")
      .then((res) => res.json())
      .then((data) => setSudents(data));
  }, []);
  //marks
  useEffect(() => {
    fetch("https://rubric-marking.up.railway.app/mark")
      .then((res) => res.json())
      .then((data) => setMarkCollection(data));
  }, []);
  //citeria
  useEffect(() => {
    fetch("https://rubric-marking.up.railway.app/cieria")
      .then((res) => res.json())
      .then((data) => setciteriaCollection(data));
  }, []);
  //rubric
  useEffect(() => {
    fetch("https://rubric-marking.up.railway.app/rubric")
      .then((res) => res.json())
      .then((data) => setRubricCollection(data));
  }, []);
  //students marks collection
  useEffect(() => {
    fetch("https://rubric-marking.up.railway.app/studentsMarks")
      .then((res) => res.json())
      .then((data) => setstudentsMarksCollection(data));
  }, [markDependence]);

  const getRubricObj = (cid, mid) => {
    return rubricCollection.filter(
      (a) => a.criteria2 === cid && a.mark2 === mid
    )[0];
  };
  const selectMenu = (e) => {
    setMark([]);
    setMarkDependence(false);
    const value = e.target.value;
    var student = students.filter((s) => s._id === value);
    console.log(student);
    setSudentsDetails(student);
  };
  const getMark = (m, t, c) => {
    setMarkDependence(false);
    let availableMark = mark.filter((item) => item.criteria !== c);
    if (availableMark.length < mark.length) {
      let newObject = {
        studentId: studentsdetails[0].id,
        marks: m,
        title: t,
        criteria: c,
      };
      setMark([...availableMark, newObject]);
    } else {
      let newObject = {
        studentId: studentsdetails[0].id,
        marks: m,
        title: t,
        criteria: c,
      };
      setMark([...mark, newObject]);
    }
  };
  //save
  const handleSaveMarks = () => {
    let object = { ...mark };
    fetch("https://rubric-marking.up.railway.app/studentMarks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(object),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged === true) {
          setMarkDependence(true);
          alert("Save Students Marks");
        }
      });
  };
  const handleStudentMarks = (id) => {
    const proceed = window.confirm("Are you sure, you want to delete?");
    if (proceed) {
      const url = `https://rubric-marking.up.railway.app/studentMarks/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.deletedCount > 0) {
            alert("Cancel Successfully");
            const restMarks = studentsMarksCollection.filter(
              (mark) => mark._id !== id
            );
            setstudentsMarksCollection(restMarks);
          }
        });
    }
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="container">
        <div className="w-25 mt-4">
          <select
            onChange={selectMenu}
            name="_id"
            id="inputState"
            className="form-select w-50"
          >
            <option selected>Choose...</option>
            {students?.map((citeria) => (
              <option value={citeria._id}>{citeria.id}</option>
            ))}
          </select>
        </div>
        <div className="mt-2">
          {studentsdetails[0]?.name ? (
            <table class="table table-success table-striped">
              <thead>
                <tr>
                  <th>Name: {studentsdetails[0]?.name}</th>
                  {mark.map((item) => (
                    <th>{item.criteria}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{studentsdetails[0]?.id}</td>
                  {mark.map((item) => (
                    <td>{item.marks}</td>
                  ))}
                </tr>
                <button onClick={handleSaveMarks} className="btn btn-info mt-2">
                  Save
                </button>
              </tbody>
            </table>
          ) : (
            ""
          )}
        </div>
        <div className="mt-5">
          <h6>Marking Table</h6>
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
                  <tr key={citeria._id}>
                    <td className="fw-bold">{citeria.criteria}</td>
                    {markCollection?.map((marks) => (
                      <td
                        key={marks._id}
                        onClick={() =>
                          getMark(marks?.mark, marks?.title, citeria?.criteria)
                        }
                        className="detailsFont"
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
        <div className="mt-5">
          <h4>Stdents Marks Table</h4>
          <table className="table table-bordered table-light">
            <thead>
              <tr>
                <th>Id</th>
                <th>Marks</th>
                <th>Title</th>
                <th>Criteria</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {studentsMarksCollection.map((item) => (
                <tr>
                  <td>{item[0].studentId}</td>
                  <td>
                    <tr>{item[0].marks}</tr>
                    <tr>{item[1].marks}</tr>
                    <tr>{item[2].marks}</tr>
                    <tr>{item[3].marks}</tr>
                    <tr>{item[4].marks}</tr>
                    <tr>{item[5].marks}</tr>
                  </td>
                  <td>
                    <tr>{item[0].title}</tr>
                    <tr>{item[1].title}</tr>
                    <tr>{item[2].title}</tr>
                    <tr>{item[3].title}</tr>
                    <tr>{item[4].title}</tr>
                    <tr>{item[5].title}</tr>
                  </td>
                  <td>
                    <tr>{item[0].criteria}</tr>
                    <tr>{item[1].criteria}</tr>
                    <tr>{item[2].criteria}</tr>
                    <tr>{item[3].criteria}</tr>
                    <tr>{item[4].criteria}</tr>
                    <tr>{item[5].criteria}</tr>
                  </td>
                  <td>
                    <button className="btn btn-danger b-0" onClick={() => handleStudentMarks(item._id)}>
                    <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarksGiven;
