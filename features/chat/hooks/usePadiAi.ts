import { useState, useCallback, useEffect } from "react";
import { padiAiService } from "../services/padiAiService";
import type { ChatMessage, AiConversation, AiResponseMessage } from "../types/chat.types";

export const usePadiAi = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<AiConversation[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConversations = useCallback(async () => {
    try {
      const data = await padiAiService.getConversations();
      setConversations(data);
    } catch (err: any) {
      console.error("Failed to fetch conversations:", err?.response?.data || err.message);
    }
  }, []);

  const loadConversationMessages = useCallback(async (convId: string) => {
    setIsLoadingHistory(true);
    setError(null);
    try {
      const msgs = await padiAiService.getMessages(convId);
      setMessages(msgs);
      setConversationId(convId);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load messages");
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

 const sendMessage = useCallback(
  async (text: string) => {
    const trimmed = text.trim();

    if (!trimmed || isSending) return;

    setError(null);

    const tempUserMsgId = `temp-user-${Date.now()}`;

    const tempUserMsg: ChatMessage = {
      id: tempUserMsgId,
      sender: "user",
      content: trimmed,
      createdAt: new Date().toISOString(),
      type: "text",
      conversationId: conversationId || undefined,
    };

    setMessages((prev) => [...prev, tempUserMsg]);
    setIsSending(true);

    try {
      const responseData = await padiAiService.sendMessage({
        message: trimmed,
        conversationId: conversationId || undefined,
      });

      // Set conversation ID returned from backend
      if (responseData.conversationId) {
        setConversationId(responseData.conversationId);
      }

      // Backend now returns the AI message directly
      const aiMsg: ChatMessage = {
        id: responseData.id,
        sender: responseData.sender,
        content: responseData.content,
        createdAt:
          responseData.createdAt || new Date().toISOString(),
        type: responseData.type,
        conversationId: responseData.conversationId,
      };

      setMessages((prev) => {
        // Remove temporary user message
        const filtered = prev.filter(
          (m) => m.id !== tempUserMsgId
        );

        // Add the actual user message and AI response
        return [
          ...filtered,
          tempUserMsg,
          aiMsg,
        ];
      });

      fetchConversations();
    } catch (err: any) {
      console.error(
        "SendMessage error:",
        err?.response?.data || err.message
      );

      setError(
        err?.response?.data?.message ||
          "Failed to send message to Padi AI"
      );

      // Keep temporary user message on screen
    } finally {
      setIsSending(false);
    }
  },
  [conversationId, isSending, fetchConversations]
);


  const startNewChat = useCallback(() => {
    setMessages([]);
    setConversationId(null);
    setError(null);
  }, []);

  const deleteCurrentChat = useCallback(async () => {
    if (!conversationId) {
      startNewChat();
      return;
    }
    try {
      await padiAiService.deleteConversation(conversationId);
      startNewChat();
      fetchConversations();
    } catch (err: any) {
      console.error("Delete conversation error:", err);
      setError("Failed to delete chat session");
    }
  }, [conversationId, startNewChat, fetchConversations]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return {
    messages,
    conversationId,
    conversations,
    isSending,
    isLoadingHistory,
    error,
    sendMessage,
    loadConversationMessages,
    startNewChat,
    deleteCurrentChat,
    fetchConversations,
  };
};
