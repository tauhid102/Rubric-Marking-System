import { Link } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "../Share/Navbar/Navbar";

const ManageMark = () => {
  const [marksCollection, setMarksCollection] = useState([]);
  useEffect(() => {
    fetch("https://rubric-marking.up.railway.app/mark")
      .then((res) => res.json())
      .then((data) => setMarksCollection(data));
  }, []);
  const handleDeleteMark = (id) => {
    const proceed = window.confirm("Are you sure, you want to delete?");
    if (proceed) {
      const url = `https://rubric-marking.up.railway.app/marks/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.deletedCount > 0) {
            alert("Cancel Successfully");
            const restFoods = marksCollection.filter((mark) => mark._id !== id);
            setMarksCollection(restFoods);
          }
        });
    }
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="container">
        <div className="table-responsive">
          <table className="table table-hover table-light">
            <thead>
              <tr>
                <th>#</th>
                <th>Mark Title</th>
                <th>Marks</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {marksCollection.map((mark) => (
                <tr key={mark._id}>
                  <td></td>
                  <td>{mark.title}</td>
                  <td>{mark.mark}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteMark(mark._id)}
                      className="btn btn-danger b-0"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                  <td>
                    <Link to={`/foods/${mark._id}`}>
                      <button className="btn btn-primary b-0">
                        <i class="far fa-edit"></i>
                      </button>
                    </Link>
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

export default ManageMark;
