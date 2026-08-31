import { useMutation } from "@tanstack/react-query";
import { editNewlyCreatedProfile } from "../services/profileService";
export const useEditNewProfile = () => {
    return useMutation({
        mutationFn: editNewlyCreatedProfile
    })
}