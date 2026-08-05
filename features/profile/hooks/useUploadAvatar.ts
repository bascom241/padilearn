import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadAvatar } from "../services/profileService";

export const useUploadAvatar = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: uploadAvatar,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });
};
