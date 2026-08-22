import { getSocket } from "@/socket/socket";
import { AiResponseMessage, SenderPayloadMessage, SocketAct } from "../../types/chat.types";

export const sendMessage = (payload: SenderPayloadMessage):Promise <AiResponseMessage> => {
    return new Promise((resolve, reject)=> {
        const socket = getSocket(); 


        if(!socket) {
            reject(new Error("socket is not initialized"))
            return
        }


        if(!socket.connected){
            reject(new Error("socket is not connected"))
            return
        }

        socket.emit("chat:send-message", payload, (response: SocketAct<AiResponseMessage>)=> {
            if(!response.success){
                reject(
                    new Error(response?.message || "failed to send message")
                );
                return 
            }
            resolve(response.data as AiResponseMessage)
        })
    })
}

export const subscribeToIncomingMessages = (
  callback: (message: AiResponseMessage) => void
) => {
  const socket = getSocket();

  if (!socket) {
    return () => {};
  }

  socket.on(
    "chat:recieve-message",
    callback
  );

  return () => {
    socket.off(
      "chat:recieve-message",
      callback
    );
  };
};

export const joinConversation = (conversationId: string) => {
  const socket = getSocket();
  
  if (!socket || !socket.connected) {
    console.warn("Socket not connected");
    return;
  }
  
  socket.emit("join:conversation", conversationId);
};

export const leaveConversation = (conversationId: string) => {
  const socket = getSocket();
  
  if (!socket || !socket.connected) {
    console.warn("Socket not connected");
    return;
  }
  
  socket.emit("leave:conversation", conversationId);
};

export const subscribeToConversationJoined = (
  callback: (data: { conversationId: string; message: string }) => void
) => {
  const socket = getSocket();

  if (!socket) {
    return () => {};
  }

  socket.on("conversation:joined", callback);

  return () => {
    socket.off("conversation:joined", callback);
  };
};