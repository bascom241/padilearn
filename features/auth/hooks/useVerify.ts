import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "../services/authService";


export const useVerify = () => {
    return useMutation({
        mutationFn: verifyEmail
    })
}