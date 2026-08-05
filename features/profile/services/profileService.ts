import { apiClient } from "@/api/apiClient";
import { ProfileResponse } from "../types/ProfileResponse";

export const getProfile = async (): Promise<ProfileResponse> => {
    const response = await apiClient.get("/profile");
    return response.data.data;
}

export const updateProfile = async (data: { fullName?: string; bio?: string }): Promise<ProfileResponse> => {
    const response = await apiClient.patch("/profile", data);
    return response.data.data;
}

export const uploadAvatar = async (uri: string): Promise<ProfileResponse> => {
    const formData = new FormData();
    const fileName = uri.split("/").pop() ?? "avatar.jpg";
    const fileType = fileName.split(".").pop();

    formData.append("avatar", {
        uri,
        name: fileName,
        type: `image/${fileType === "jpg" ? "jpeg" : fileType}`,
    } as unknown as Blob);

    const response = await apiClient.post("/profile/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
}
