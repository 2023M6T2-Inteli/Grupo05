import { set } from "express/lib/application";
import { useState, useRef, useEffect } from "react";
import { io } from 'socket.io-client';

const socketUrl = "http://10.128.1.236:5000/";


const VideoStream = () => {

    const [ppm, setPpm] = useState(0);

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
          if (data.ppm) {
            setPpm(data.ppm);
            }
        }) 
        socket.emit("stream", {})
        return () => socket.disconnect()
    }, []);

    return (
        <>
        <img ref={videoRef} alt="Video Stream" />
        <p>gases:</p>
        <p>{ppm || "Dados de gases não recebidos!"}</p>
            </>
        
    )
    }

export default VideoStream;