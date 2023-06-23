import { useState, useEffect } from "react";
import { io } from 'socket.io-client';
import VideoStream from "./VideoStream";

const VideoPage = () => {

    const [routineRunning, setRoutineRunning] = useState(false);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {

        if (routineRunning) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 5000);
        }

    }, [routineRunning]);

    return (
        <>
        {
        routineRunning ? 
        <VideoStream/>
        :
        <div className="bg-gray-900 h-full w-full flex flex-col content-center items-center">

        <h1 className="text-4xl pt-4 ">Robô selecionado:</h1>

        <p className="text-6xl pt-10 bold italic">Gerbros_testing</p>

        <p className="text-xl text-gray-300 italic pt-2">Robotis Turtlebot3 Burguer</p>
        <button className="bg-blue-400 rounded mt-2 py-2 p-4 transition-all hover:bg-blue-500">Alterar robô</button>

        <button onClick={()=>setRoutineRunning(true)} className="bg-blue-400 rounded-xl text-xl mt-16 py-8 px-16 transition-all hover:bg-blue-500">Iniciar Rotina</button>
        
        </div>
         }
         {isLoading ?
          <div className="text-4 xl font-bold">loading...</div>
          : null}
        </>
    )
    }

export default VideoPage;