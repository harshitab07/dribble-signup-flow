import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DesCards from "../describeCards/DesCards";
import axios  from "axios";
function DescribeUser() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.signupProgress !== 3) {
      navigate("/signup");
    }
  }, []);

  const IconStyle = {
    width: 15,
    height: 15,
  };

  const handleBack = () => {
    const users = JSON.parse(localStorage.getItem("user"));
    users.signupProgress = 2;
    localStorage.setItem("user", JSON.stringify(users));
    window.history.back();
  };
  const arr = [
    {
      img: "/assets/looking1.jpeg",
      heading: "I'm a designer wanna share my Designs",
    },
    { img: "/assets/looking2.jpeg", heading: "I'm looking to hire a designer" },
    { img: "/assets/looking3.jpeg", heading: "I'm looking for design inspiration" },
  ];
async function SubmitHandler(){
  const users = JSON.parse(localStorage.getItem("user"));
  users.signupProgress=4;
  localStorage.setItem("user", JSON.stringify(users)); 
  await axios.post("https://dribble-signup-api.onrender.com/api/signup/email-send/",{"email":users.email,name:users.username});
  navigate('/signup/verify-user');
}
  return (
    <div className="h-screen w-screen flex flex-col  items-center">
      <div className="h-[10%] w-full p-10 flex">
        <h1 className="font-cursive text-4xl text-[#dd446f] font-bold cursor-pointer">
          dribble
        </h1>
        <span
          onClick={handleBack}
          className="ml-40 size-10 cursor-pointer rounded-md md:ml-14 flex justify-center items-center bg-gray-300 hover:scale-105 transition-transform pl-1"
        >
          <ArrowBackIosIcon style={IconStyle} />
        </span>
      </div>
      <div className="h-[80%] mt-5 w-[20rem] md:w-[30rem] lg:w-[50rem]  ">
        <div className="h-[20%] w-full flex flex-col items-center justify-evenly ">
          <h1 className="text-2xl md:text-3xl font-extrabold ">
            What brings you to dribble?
          </h1>
          <h1 className="text-sm font-medium text-black/60">
            Select the options that best describe you. Don't worry you can
            explore other options later.
          </h1>
        </div>
        <div className="h-[60%] w-full flex flex-col items-center lg:flex-row  justify-evenly lg:pt-20 ">
          {arr.map((item,index) => (
            <DesCards key={index}  {...arr[index]} />
          ))}
        </div>
        <div className="h-[20%] w-full  flex flex-col items-center">
          <h1 className="font-semibold mt-6">
            Anything else? You can select multiple
          </h1>
          <button className="bg-[#dd446f]  h-8 md:h-10 w-40 text-white font-semibold px-4 rounded-md mt-3" onClick={SubmitHandler}>
            Finish
          </button>
          <span className="hidden md:block text-sm mt-2 font-semibold text-black/50">
            or Press Enter
          </span>
        </div>
      </div>
    </div>
  );
}

export default DescribeUser;
