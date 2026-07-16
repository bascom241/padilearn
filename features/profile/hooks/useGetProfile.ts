import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/profileService";

export const useGetProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: getProfile // Invalidated during profile update, account suspension and deletion
    })
}

