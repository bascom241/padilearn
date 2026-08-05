export interface ProfileStats {
    coursesEnrolled: number;
    coursesCompleted: number;
    learningHoursLogged: number;
}

export interface ProfileResponse {
    fullName: string
    email: string
    role: string
    isEmailSent: boolean
    bio?: string
    avatarUrl?: string
    stats?: ProfileStats
}
