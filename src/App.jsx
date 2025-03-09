import react from "react";
import Landingpage from "./VendorDashboard/Pages/Landingpage";
import {Routes,Route} from "react-router-dom";
import ErrorFile from "./VendorDashboard/Components/forms/ErrorFile";

import "./App.css";
const App=()=>{
  return(
    <div>
      <Routes>
        <Route path="/" element={<Landingpage/>}/>
        <Route path="/*" element={<ErrorFile/>}/>
      </Routes>
    </div>
  )
}
export default App;