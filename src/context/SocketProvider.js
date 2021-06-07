import React, {useContext, createContext, useState, useEffect} from 'react';
import {io} from 'socket.io-client';
import {API_URL} from '@env';

const socketContext = createContext();

export function useSocket() {
  return useContext(socketContext);
}

export function SocketProvider({children}) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocketConnection = io(`${API_URL}`);
    setSocket(newSocketConnection);
    // console.log(newSocketConnection);
    return () => newSocketConnection.close();
  }, []);
  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
}
