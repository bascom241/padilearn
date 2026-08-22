import { apiClient } from "@/api/apiClient";
import type { SendMessagePayload, SendMessageResponseData, AiConversation, ChatMessage } from "../types/chat.types";

export const padiAiService = {
  async sendMessage(payload: SendMessagePayload): Promise<SendMessageResponseData> {
    const { data } = await apiClient.post("/padi-ai/chat", payload);
    return data.data;
  },

  async getConversations(): Promise<AiConversation[]> {
    const { data } = await apiClient.get("/padi-ai/conversations");
    return data.data;
  },

  async getMessages(conversationId: string): Promise<ChatMessage[]> {
    const { data } = await apiClient.get(`/padi-ai/conversations/${conversationId}/messages`);
    return data.data.map((msg: any) => ({
      id: msg._id || String(Math.random()),
      sender: msg.sender,
      content: msg.content,
      createdAt: msg.createdAt,
    }));
  },

  async deleteConversation(conversationId: string): Promise<void> {
    await apiClient.delete(`/padi-ai/conversations/${conversationId}`);
  },
};
