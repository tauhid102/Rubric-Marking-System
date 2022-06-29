import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <Link to='/home' class="navbar-brand" href="#">Marking System</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarScroll">
      <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
        <li class="nav-item">
          <Link to='/home' class="nav-link active" aria-current="page" href="#">Home</Link>
        </li>
        <li class="nav-item">
          <Link to='/manageRubric' class="nav-link" href="#">Manage Rubric</Link>
        </li>
        <li class="nav-item">
          <Link to='/manageMark' class="nav-link" href="#" tabindex="-1" aria-disabled="true">Manage Mark</Link>
        </li>
        <li class="nav-item">
          <Link to='/manageCiteria' class="nav-link" href="#" tabindex="-1" aria-disabled="true">Manage Criteria</Link>
        </li>
        <li class="nav-item">
          <Link to='/givenMarks' class="nav-link" href="#" tabindex="-1" aria-disabled="true">Mark Given</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
};

export default Navbar;
