import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';


function SetupProfile() {
  const [user, setUser] = useState(null);
  const [pfp,setPfp]=useState(null);
  const [file, setFile] = useState(null);
  const [loc, setLoc] = useState("");
  const navigate = useNavigate();
  const [loader,setLoader]=useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    if (user?.signupProgress !== 2) {
      navigate("/signup");
    }
  }, []);
  useEffect(()=>{
if(file!==undefined){
  setPfp(file)
}
  },[file])
  async function handleSubmit() {
            setLoader(true);
    const user = JSON.parse(localStorage.getItem("user"));
    let data = new FormData();
    if (pfp) {
      data.append("file", pfp);
    }
    if (loc) {
      data.append("loc", loc);
    }

    data.append("email", user.email);

    const usersData = JSON.parse(localStorage.getItem("user"));
    if (loc&& pfp) {
      await axios
      .post("https://dribble-signup-api.onrender.com/api/signup/setup-profile/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {

          if (res?.data?.pfp && res?.data?.loc) {
            usersData.pfp = res?.data?.pfp;
            usersData.loc = res?.data?.loc;
            console.log(usersData.loc);
          } 
          localStorage.setItem("user", JSON.stringify(usersData));
        }).catch(err=>alert("Internal Server Error"))
    }
    else if(pfp){
      await axios
      .post("https://dribble-signup-api.onrender.com/api/signup/setup-profile/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      }) .then((res) => {

        if (res?.data?.pfp ) {
          usersData.pfp = res?.data?.pfp;
          localStorage.setItem("user", JSON.stringify(usersData));
        }
      }).catch(err=>alert("Internal Server Error"))
    }
    else if(loc){
      await axios
      .post("https://dribble-signup-api.onrender.com/api/signup/setup-profile/", data)
      .then((res) => {


        if (res?.data?.loc) {
          usersData.loc = res?.data?.loc;
        } 
    
      }).catch(err=>alert("Internal Server Error"))
    }

    usersData.signupProgress = 3;
    localStorage.setItem("user", JSON.stringify(usersData));
    navigate("/signup/describe-user");
  }


  return (
    <div className="h-screen w-screen flex flex-col  items-center">
      <div className="h-[10%] w-full p-10">
        <h1 className="font-cursive text-4xl text-[#dd446f] font-bold cursor-pointer">
          dribble
        </h1>
      </div>
      <div className="h-[90%] w-full  flex justify-center pt-12 ">
        <div className="h-[90%] w-[85%] md:w-[60%] lg:w-[50%]">
          <div className="h-[15%] w-full   py-4 lg:py-2  flex flex-col justify-between">
            <h1 className="text-2xl lg:text-3xl font-extrabold">
              Welcome! Let's create your profile
            </h1>
            <h4 className="text-sm">
              Let others get to know you better! You can do this later
            </h4>
          </div>
          <div className="h-[30%] md:h-[50%]  w-full md:flex mt-4 md:mt-0">
            <div className="h-[70%] md:h-full md:w-[35%]  overflow-hidden ">
              <h1 className="h-[20%] w-full font-extrabold  lg:text-xl">
                Add an avatar
              </h1>
              <div className="md:h-[80%] lg:h-[80%] w-full  md:pt-2 pl-1 ">
                <div
                  className={
                    file || user?.pfp
                      ? "size-24 md:size-32 lg:size-40 rounded-full flex justify-center items-center overflow-hidden outline-2 "
                      : " size-24 md:size-36 lg:size-40 rounded-full flex justify-center items-center overflow-hidden outline-2 outline-dashed outline-black/30 text-center "
                  }
                >
                  <input
                    className="hidden"
                    type="file"
                    id="file"
                    accept=".jpeg,.png,.jpg"
                    onChange={(e) => setFile(e.target.files[0])}
                  ></input>
                  {pfp || user?.pfp ? null : (
                    <label htmlFor="file" className="cursor-pointer">
                      <AddAPhotoIcon style={{ color: "gray", scale: "1.2" }} />
                    </label>
                  )}
                                
                  { pfp||user?.pfp?
                   <img
                      src={pfp?URL.createObjectURL(pfp):user?.pfp}
                      className="h-full w-full object-cover"
                      alt="User profile picture"
                    />:""
                 }
                </div>
              </div>
            </div>
            <div className="mt-2 md:mt-0 h-[50%]  overflow-hidden md:h-full md:w-[75%]  justify-start py-2 md:py-20 ">
              <label
                htmlFor="file"
                className=" h-8 w-28 rounded-md outline cursor-pointer px-2   md:px-4 py-2  outline-black/10 text-sm tracking-tight font-bold ml-1"
              >
                Choose image
              </label>
            </div>
          </div>
          <div className="h-[30%] md:h-[35%] w-full flex flex-col mt-4 md:mt-0">
            <h1 className="text-xl font-extrabold">Add your location</h1>
            <input
              className="h-8 w-[60%] mt-4 indent-2 border-b-2 border-black/10 outline-none"
              placeholder="Enter a location" defaultValue={user?.loc?user?.loc:""}
              onChange={(e) => setLoc(e.target.value)}
            ></input>
            <div className="w-[20%] md:w-[30%] flex flex-col justify-center text-center">
              <button
                className="bg-[#dd446f]  h-8 md:h-10 w-full text-white font-semibold px-4 rounded-md mt-8 mb:mt-14"
                onClick={handleSubmit}
              >
               {loader?<CircularProgress color="inherit" size={30} />:"Next"}
              </button>
              <span className="hidden md:block text-sm mt-2 font-semibold text-black/50">
                or Press Enter
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetupProfile;
