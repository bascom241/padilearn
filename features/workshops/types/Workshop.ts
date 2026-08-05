export interface WorkshopHost {
  _id: string;
  fullName: string;
  email: string;
}

export interface Workshop {
  _id: string;
  title: string;
  description: string;
  host: WorkshopHost | string;
  coverImage?: string;
  roomName: string;
  status: "scheduled" | "live" | "ended" | "cancelled";
  scheduledAt?: string;
  startedAt?: string;
  endedAt?: string;
  maxParticipants?: number;
  createdAt: string;
}

export interface JoinWorkshopResult {
  token: string;
  roomName: string;
  isHost: boolean;
}
