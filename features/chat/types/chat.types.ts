export interface SenderPayloadMessage {
    converstionId?: string
    message: string
}

export interface AiResponseMessage {
    message: string
    conversationId?: string
}

export interface SocketAct<T = unknown> {
    success: boolean
    data?: T; 
    message?:string
}

export interface SendMessagePayload {
    message: string;
    conversationId?: string;
}

export interface SendMessageResponseData {
    id: string;
    sender: "user" | "ai";
    content: string;
    createdAt?: string;
    type?: string;
        conversationId?: string;
}

export interface ChatMessage {
    id: string;
    sender: "user" | "ai";
    content: string;
    createdAt?: string;
    type?: string;
    conversationId?: string;
}

export interface AiConversation {
    _id: string;
    userId: string;
    title: string;
    model?: string;
    lastMessageAt?: string;
    updatedAt?: string;
    createdAt?: string;
}