export const chatKeys = {
  all: ["chat"] as const,

  messages: (conversationId?: string) =>
    [...chatKeys.all, "messages", conversationId] as const,
};