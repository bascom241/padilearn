import { apiClient } from "@/api/apiClient";
import { ProfileResponse } from "../types/ProfileResponse";



export const getProfile = async ():Promise<ProfileResponse> => {
    const response = await apiClient.get("/auth/profile");
    return response.data;
}



