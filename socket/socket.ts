
import {Socket, io} from "socket.io-client"
let socket: Socket  | null = null;
export const initializeSocket = (baseUrl: string,token: string) => {
    if(socket?.connected) socket
    socket = io(`${baseUrl}/chat`, {
        auth: {token},
        transports: ["websocket"], 
        autoConnect: false 
    }); 
    socket.connect(); 
    return socket; 
}

export const getSocket = (): Socket | null => socket;

export const disConnectSocket = () => {
    if(socket){
        socket.disconnect();
        socket = null;
    }
}