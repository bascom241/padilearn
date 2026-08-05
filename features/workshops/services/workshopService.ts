import { apiClient } from "@/api/apiClient";
import type { JoinWorkshopResult, Workshop } from "../types/Workshop";

export const getWorkshops = async (params: { status?: string } = {}): Promise<Workshop[]> => {
  const response = await apiClient.get("/workshops", { params });
  return response.data.workshops;
};

export const getWorkshopById = async (workshopId: string): Promise<Workshop> => {
  const response = await apiClient.get(`/workshops/${workshopId}`);
  return response.data.data;
};

export const joinWorkshop = async (workshopId: string): Promise<JoinWorkshopResult> => {
  const response = await apiClient.post(`/workshops/${workshopId}/join`);
  return response.data.data;
};

export const createWorkshop = async (data: { title: string; description: string }): Promise<Workshop> => {
  const response = await apiClient.post('/workshops', data);
  return response.data.data;
};

export const startWorkshop = async (workshopId: string): Promise<Workshop> => {
  const response = await apiClient.post(`/workshops/${workshopId}/start`);
  return response.data.data;
};

export const endWorkshop = async (workshopId: string): Promise<Workshop> => {
  const response = await apiClient.post(`/workshops/${workshopId}/end`);
  return response.data.data;
};
