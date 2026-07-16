import { apiClient } from "@/api/apiClient";
import { RegisterUser } from "../types/RegisterationRequestDto";
import { LoginUser } from "../types/LoginUser";


export const registerUser = async (data: RegisterUser) => {
    const response = await apiClient.post("/auth/register", data);
    return response.data; 
}

export const verifyEmail = async (code: string ) => {
    console.log("Sending payload:", { code });
    const response = await apiClient.post("/auth/verify", {code });
    return response.data;
}

export const loginUser = async (data: LoginUser) => {
    const response = await apiClient.post("/auth/login", data);
    return response.data;
}