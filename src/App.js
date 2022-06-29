import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home/Home';
import ManageCriteria from './Pages/ManageCriteria/ManageCriteria';
import ManageMark from './Pages/ManageMark/ManageMark';
import ManageRubric from './Pages/ManageRubric/ManageRubric';
import MarksGiven from './Pages/MarksGiven/MarksGiven';
function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/home' element={<Home></Home>}></Route>
          <Route path='/manageRubric' element={<ManageRubric></ManageRubric>}></Route>
          <Route path='/manageMark' element={<ManageMark></ManageMark>}></Route>
          <Route path='/manageCiteria' element={<ManageCriteria></ManageCriteria>}></Route>
          <Route path='/givenMarks' element={<MarksGiven></MarksGiven>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
