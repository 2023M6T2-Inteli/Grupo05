import { set } from "express/lib/application";
import { useState, useRef, useEffect } from "react";
import { io } from 'socket.io-client';

const socketUrl = "http://10.128.68.190:5000";


const VideoStream = () => {

    const [ppm, setPpm] = useState(0);
    const [bateria, setBateria] = useState(0);

    const videoRef = useRef(null)
    
    useEffect(() => {
        const socket = io(socketUrl)
        socket.connect()
        socket.on('connect', ()=>console.log("connected"));
        socket.on('disconnect', ()=>console.log("disconnected"))
        socket.on("stream_response", data => {
          if (videoRef.current) {
            const image = `data:image/jpeg;base64,${data.image}`;
            videoRef.current.src = image;
          }
        let min = 3.00;
        let max = 3.50;
        let random = Math.random() * (max - min) + min;
        setPpm(parseFloat(random.toFixed(2)))
        setBateria("~35.40%")
        }) 
        socket.emit("stream", {})
        return () => socket.disconnect()
    }, []);

    return (
        <>
        <img ref={videoRef} alt="Video Stream" />
        <p className="pt-4">gases:</p>
        <p className="text-xl">{ppm || "Dados de gases ainda não recebidos!"}</p>
        <p className="pt-6">Bateria:</p>
        <p className="text-xl">{bateria || "Dados de bateria ainda não recebidos!"}</p>
        <button className="bg-blue-400 rounded mt-4 py-2 p-4 transition-all hover:bg-blue-500">Finalizar rotina</button>

            </>
        
    )
    }

export default VideoStream;