import React, { useEffect, useState } from 'react';
import Navbar from '../Share/Navbar/Navbar';

const ManageCriteria = () => {
    const [marksCriteria, setCriteriaCollection] = useState([]);
  useEffect(() => {
    fetch("https://infinite-citadel-70182.herokuapp.com/cieria")
      .then((res) => res.json())
      .then((data) => setCriteriaCollection(data));
  }, []);
  console.log(marksCriteria);
  const handleDeleteCriteria = (id) => {
    const proceed = window.confirm("Are you sure, you want to delete?");
    if (proceed) {
      const url = `https://infinite-citadel-70182.herokuapp.com/criteria/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.deletedCount > 0) {
            alert("Cancel Successfully");
            const restFoods = marksCriteria.filter((criteria) => criteria._id !== id);
            setCriteriaCollection(restFoods);
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
                <th>Criteria Title</th>
                <th>Description</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {marksCriteria.map((criteria) => (
                <tr key={criteria._id}>
                  <td></td>
                  <td>{criteria.criteria}</td>
                  <td>{criteria.description}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteCriteria(criteria._id)}
                      className="btn btn-danger b-0"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                  <td>
                    {/* <Link to={`/foods/${mark._id}`}>
                      <button className="btn btn-primary b-0">
                        <i class="far fa-edit"></i>
                      </button>
                    </Link> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        </>
    );
};

export default ManageCriteria;