import React from "react";
import { useNavigate  } from "react-router-dom";

function Home(){
    const navigate = useNavigate ();
    const handleClick = () => {
        navigate('/signup');
    }
    return(
<div className="h-screen w-screen flex flex-col justify-center items-center p-5">
    <h1 className="text-3xl md:text-4xl font-bold"> Welcome! explore the universe of top Designers & Creatives</h1>
    <button
              type="submit"
              onClick={handleClick}
              className="h-12 w-52 mt-4 bg-purple-500 rounded-lg font-semibold text-white"
            >
              Signup
            </button>
</div>
    )
}

export default Home;