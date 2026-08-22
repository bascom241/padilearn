import { useMutation } from "@tanstack/react-query"
import { sendMessage } from "../services/socket/chat.socket"
import { SenderPayloadMessage } from "../types/chat.types"
export const useSendChatMessage = () => {
    return useMutation({
        mutationFn: (payload: SenderPayloadMessage) => sendMessage(payload)
    })
}