import React, { useEffect, useState } from "react";
import "../../index.css";
import { useFormik } from "formik";
import validate from "../../Validate";
import {Link,useNavigate} from "react-router-dom"
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

function Signup() {
  const navigate=useNavigate();
  const [loader,setLoader]=useState(false);
const [resp,setResp]=useState('');
  async function SubmitForm(data){
try {
  const res=await axios.post('https://dribble-signup-api.onrender.com/api/signup',data);
  return res?.data
} catch (error) {
  return error?.response?.data
}
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      acceptTerms:false
    },
    validate,
    onSubmit: (values) => {
      const {acceptTerms,...others}=values
const res=SubmitForm(others).then(data=>{
  setLoader(true);
  if(data==='Signed up successfully'){
    const obj={
      username:others?.username,
      email:others?.email,
      signupProgress:2
    }
    localStorage.setItem('user',JSON.stringify(obj));
navigate('/signup/setup-profile')
  }else{
    setLoader(false)
    setResp(data)
  }

})
  

    },
  });

  return (
    <div className="h-screen w-screen flex overflow-hidden ">
      <div className="hidden lg:flex lg:flex-col lg:h-full lg:w-2/5 bg-[#f3d187] relative ">

        <div className="h-72   w-full px-16 py-8 flex flex-col justify-evenly">
        <h1 className="font-cursive text-4xl text-[#aa883e] font-bold">dribble</h1>
          <h1 className=" text-4xl   text-[#957124] font-[800] overflow-hidden ">
            Discover the world's top Designers & Creatives.
          </h1>
        </div>
        <div className="w-full bg-sky-700 ">
          <img
            className="w-full object-contain "
            src="/assets/signup.jpeg"
          ></img>
        </div>
      </div>
      <div className="h-full w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="h-5 w-full flex justify-end pr-8 items-start"><h1 className="font-medium">Already a member?</h1>
        <Link to="/signin">
        <span className="text-violet-800 font-medium"> Sign in</span>
        </Link>
        </div>
        <form
          className="h-[650px] w-96  overflow-hidden lg:w-[500px] px-5 lg:px-10 py-5"
          onSubmit={formik.handleSubmit}
        >
          <div className="h-10 w-full">
            <h1 className="text-[2rem] font-[1000] tracking-tight">Sign up to dribble</h1>
          </div>
          <div className="h-20 w-full overflow-hidden">
          <div>
            {resp?<li className="text-red-600 font-medium">{resp}</li>:null}
              {formik.touched.name && formik.errors.name ? (
                <li className="text-red-600 font-medium">{formik.errors.name}</li>
              ) :null}

              {formik.touched.username && formik.errors.username ? (
                <li className="text-red-600 font-medium">{formik.errors.username}</li>
              ) : null}
              {formik.touched.email && formik.errors.email ? (
                <li className="text-red-600 font-medium">{formik.errors.email}</li>
              ) : null}
              {formik.touched.password && formik.errors.password ? (
                <li className="text-red-600 font-medium">{formik.errors.password}</li>
              ) : null}
                            {formik.touched.acceptTerms && formik.errors.acceptTerms ? (
                <li className="text-red-600 font-medium">{formik.errors.acceptTerms}</li>
              ) : null}
            </div>
          </div>
          <div className="h-20 w-full flex ">
            
            <div className="h-15 w-2/4   flex flex-col">
              
              <label className="font-[900] tracking-tighter">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                autoComplete="off"
                className="h-10 w-40 lg:w-48 rounded-md bg-gray-200 outline-none indent-3 hover:ring-2  transition-all ease-linear"
              ></input>
            </div>
            <div className="h-15 w-2/4  flex flex-col">
              <label className="font-[900] tracking-tighter">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                onBlur={formik.handleBlur}
                autoComplete="off"
                className="h-10 w-40 lg:w-48 rounded-md bg-gray-200 outline-none indent-3 hover:ring-2  transition-all ease-linear"
              ></input>
            </div>
          </div>
          <div className="h-15 w-[462px] flex flex-col mt-4 ">
            <label className="font-[900] tracking-tighter">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              autoComplete="off"
              className="h-10 w-[72%] lg:w-[87%] rounded-md bg-gray-200 outline-none indent-3 hover:ring-2  transition-all ease-linear"
            ></input>
          </div>
          <div className="h-15 w-[462px] flex flex-col mt-4">
            <label className="font-[900] tracking-tighter">Password</label>
            <input
              className="h-15 w-[72%] lg:w-[87%] rounded-md bg-gray-200 outline-none indent-3 hover:ring-2  transition-all ease-linear"
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="off"
              value={formik.values.password}
              placeholder="6+ characters"
            ></input>
          </div>
          <div className="h-15 w-full flex flex-row  mt-5 accent-violet-500">
            <input
              className="size-7 mr-2"
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"  checked={formik.values.acceptTerms} onChange={formik.handleChange}
            ></input>

            <label className=" w-full font-medium text-black/70 text-pretty">
              Creating an account means you're okay with our
              <Link to="/terms&conditions">
              <span className="cursor-pointer text-blue-600"> Terms of
              Service, Privacy Policy</span>
              </Link>
              , and our        
              <Link to="/terms&conditions">
              <span className="cursor-pointer text-blue-600">
               {"\t"} Notification Settings.
                </span>
                </Link>
            </label>
          </div>
          <div className="h-15 w-full">
            <button
              type="submit"
              className="h-12 w-52 bg-purple-500 rounded-lg font-semibold text-white"
            >
              {loader?<CircularProgress  color="inherit" size={30}/>:"Create Account"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Signup;
