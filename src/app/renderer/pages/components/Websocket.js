import React, {useEffect} from 'react';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:5000');

function WebSocket() {
    useEffect(() => {
      socket.on('connect', () => {
        console.log('WebSocket connected');
      });
  
      socket.on('message', (data) => {
        console.log('Received message:', data);
      });
  
      return () => {
        socket.disconnect();
      };
    }, []);
  
    return (
      <div>
        {socket.connected ? (
            <div>WebSocket connected</div>
          ) : (
            <div>WebSocket disconnected</div>
          )}
      </div>
    );
  }
  
  export default WebSocket;