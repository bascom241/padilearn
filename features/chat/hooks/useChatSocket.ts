import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { initializeSocket, disConnectSocket } from "@/socket/socket";


import { subscribeToIncomingMessages } from "../services/socket/chat.socket";

import { chatKeys } from "./chat.keys";

import { AiResponseMessage } from "../types/chat.types";

interface UseChatSocketProps {
  baseUrl: string;
  token: string;
}

export const useChatSocket = ({
  baseUrl,
  token,
}: UseChatSocketProps): void => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!token || token.trim() === "") {
      console.log("No token provided, skipping socket initialization");
      return;
    }

    try {
      const socket = initializeSocket(
        baseUrl,
        token
      );

      const handleConnect = () => {
        console.log(
          "Chat socket connected:",
          socket.id
        );
      };

      const handleDisconnect = () => {
        console.log("Chat socket disconnected");
      };

      socket.on("connect", handleConnect);
      socket.on("disconnect", handleDisconnect);

      const unsubscribe =
        subscribeToIncomingMessages(
          (message: AiResponseMessage) => {
            console.log(
              "Incoming chat message:",
              message
            );

            if (!message.conversationId) {
              return;
            }

            queryClient.setQueryData<AiResponseMessage[]>(
              chatKeys.messages(
                message.conversationId
              ),
              (oldMessages = []) => {
                return [
                  ...oldMessages,
                  message,
                ];
              }
            );
          }
        );

      return () => {
        socket.off(
          "connect",
          handleConnect
        );

        socket.off(
          "disconnect",
          handleDisconnect
        );

        unsubscribe();

        disConnectSocket();
      };
    } catch (error) {
      console.error("Failed to initialize chat socket:", error);
    }
  }, [
    baseUrl,
    token,
    queryClient,
  ]);
};