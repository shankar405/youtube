import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useParams, useSearchParams } from "react-router-dom";
import { GOOGLE_API_KEY } from "../utils/constants";
import LiveChat from "./LiveChat";

const WatchPage = () => {
    const [video,setVideo]=useState(null)
  const [searchParams, setSearchParams] = useSearchParams();
 const videoQuery=searchParams.get("v");

 
 useEffect(()=>{
    getSingleVideo();
   },[])
 
   const getSingleVideo=async()=>{
     const data= await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoQuery}&key=${GOOGLE_API_KEY}`)
     const json  =await data.json();
     setVideo(json); 
   }

 

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenu());
  }, []);

 

  return (
    <div className="flex flex-col w-full">
    <div className="px-5 flex">
      <div >
      <iframe
        width="1200"
        height="600"
        src={`https://www.youtube.com/embed/${videoQuery}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      </div>
      <div className="w-full">
        <LiveChat/>
      </div>
    </div>
    <div>
   
        <h2 className="px-4 py-5 font-bold text-lg font-sans">{video?.items[0]?.snippet.title}</h2>
        
     
    </div>
    
    </div>
  );
};

export default WatchPage;
