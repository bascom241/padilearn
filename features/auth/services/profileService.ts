import { apiClient } from "@/api/apiClient";
import { EditNewlyCreatedProfile } from "../types/RegisterationRequestDto";



export const editNewlyCreatedProfile = async (data: EditNewlyCreatedProfile) => {
    const res = await apiClient.patch("/profile/new", data);
    return res.data
}