import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import axios from "axios";
function VerifyUser() {
  const navigate = useNavigate();
  const [check,setCheck]=useState(false)
  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.signupProgress !== 4) {
      navigate("/signup");
    } else {
      setUser(user);
    }
  }, []);

  async function handleEmailCall() {
    const users = JSON.parse(localStorage.getItem("user"));
    await axios.post("https://dribble-signup-api.onrender.com/api/signup/email-send/", {
      email: users?.email,
      name: users?.username,
    });
    setCheck(true)

  }
  return (
    <div className="h-screen w-screen flex flex-col items-center">
      <div className="h-16 w-full bg-gray-200 flex justify-between px-5  md:px-10 py-5 items-center">
        <h1 className="font-cursive text-4xl text-[#dd446f] font-bold cursor-pointer">
          dribble
        </h1>
        <div className="size-10 bg-slate-400 rounded-full overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={user?.pfp ? user?.pfp : "/assets/noAvatar.png"}
          ></img>
        </div>
      </div>
      <div className="mt-20 h-[60%] w-[60%] flex flex-col item-center text-center">
        <h1 className="w-full  text-4xl font-extrabold">
          Please verify your email...
        </h1>
        <div className="w-full flex justify-center items-center mt-5">
          <img className="size-24" src="/assets/verifyMail.png"></img>
        </div>
        <div className="mt-10">
          <h1 className="font-semibold text-black/70">
            Please verify your email address. We've sent a confirmation email
            to:
          </h1>
          <h1 className="text-2xl font-extrabold mt-5">{user?.email}</h1>
          <h1 className="text-lg font-semibold text-black/70 mt-5">
            Didn't received any email?{" "}
            <span
              onClick={handleEmailCall}
              className="text-[#dd446f] cursor-pointer"
            >
              Resend mail
            </span>
          </h1>{
check&&
              <h1 className="text-xl  text-[#dd446f] font-extrabold mt-5 animate-pulse">Check Now</h1>
          }
        </div>
      </div>
    </div>
  );
}

export default VerifyUser;
