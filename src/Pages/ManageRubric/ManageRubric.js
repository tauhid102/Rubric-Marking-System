import React, { useEffect, useState } from "react";
import Navbar from "../Share/Navbar/Navbar";

const ManageRubric = () => {
  const [rubricCollection, setRubricCollection] = useState([]);
  useEffect(() => {
    fetch("https://rubric-marking.up.railway.app/rubric")
      .then((res) => res.json())
      .then((data) => setRubricCollection(data));
  }, []);
  const handleDeleterubric = (id) => {
    const proceed = window.confirm("Are you sure, you want to delete?");
    if (proceed) {
      const url = `https://rubric-marking.up.railway.app/rubric/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.deletedCount > 0) {
            alert("Cancel Successfully");
            const restFoods = rubricCollection.filter((mark) => mark._id !== id);
            setRubricCollection(restFoods);
          }
        });
    }
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <div className="table-responsive">
          <table className="table table-hover table-light">
            <thead>
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {rubricCollection.map((rubric, i) => (
                <tr key={rubric._id}>
                  <td>{i + 1}</td>
                  <td>{rubric.description2}</td>
                  <td>
                    <button
                      onClick={() => handleDeleterubric(rubric._id)}
                      className="btn btn-danger b-0"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageRubric;
