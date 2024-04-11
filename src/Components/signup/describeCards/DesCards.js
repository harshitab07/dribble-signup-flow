import React, { useEffect, useRef, useState } from "react";

function DesCards({img,heading}) {
  const [select, setSelect] = useState(false);
  const check=useRef();
useEffect(()=>{
check.current.checked=select
},[select])
  return (
    <div className={select?" h-20 w-full lg:size-60  rounded-2xl  flex flex-col items-center transition-all ease-linear outline outline-[#dd446f] ":" h-20 w-full lg:size-60  rounded-2xl outline outline-black/20  flex flex-col items-center transition-all ease-linear "} onClick={()=>{setSelect(!select)}}>
      <img
        src={img}
        className={
            select ? "hidden lg:block size-52 relative -top-20 transition-all ease-linear" : "hidden lg:block size-52 lg:relative -top-10 transition-all ease-linear"
        }
      ></img>
      <h1
        className={
            select
            ? "lg:relative -top-24 h-10 w-full text-center md:text-xl font-extrabold transition-all ease-linear"
            : "lg:relative pt-2 lg:pt-2 -top-11 lg:-top-16 h-10 w-full text-center md:text-xl font-extrabold  transition-all ease-linear"
        }
      >
{heading}
      </h1>
      <span
        className={select ? " md:text-base w-full text-center lg:relative -top-24 lg:-top-20 transition-all ease-linear" : "hidden transition-all ease-linear"}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </span>
      <div
        className={
            select
            ? " lg:relative  -top-20 -left-1 transition-all ease-in-out"
            : " lg:relative -top-8 -left-1 transition-all ease-in-out "
        }
      >
        <input
          type="checkbox"
          id="checkbox"
          ref={check}
          onChange={(e) => {
            if (e.target.checked) {
              setSelect(true);
            }else{
                setSelect(false)
            }
          }}
        />
      </div>
    </div>
  );
}
export default DesCards;
