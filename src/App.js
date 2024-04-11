import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Components/signup/Signup";
import NotFound from "./Components/notfound/NotFound";
import Home from "./Components/home/Home";
import SetupProfile from "./Components/signup/setupProfile/SetupProfile";
import VerifyUser from "./Components/verifyUser/VerifyUser";
import { useEffect, useState } from "react";
import DescribeUser from "./Components/signup/describe/Describe";
function App() {
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')));
  return (
    <Routes>
      <Route path="/" element={<Home/>} >
        <Route path="/*" element={<NotFound />} />
      </Route>
      <Route path="/signup" element={<Signup />} >
      </Route>
      <Route path="/signup/setup-profile" element={<SetupProfile />} />
      <Route path="/signup/describe-user" element={<DescribeUser />} />
      <Route path="/signup/verify-user" element={<VerifyUser />} />
      <Route path="/signup/*" element={<NotFound/>}></Route>
    </Routes>
  );
}

export default App;
