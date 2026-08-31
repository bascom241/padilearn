

export interface RegisterUser {
    fullName: string
    email: string
    password: string
}

export const Role = {
    Admin: "admin", 
    Instructor: "instructor", 
    Student: "student"
} as const 

export interface EditNewlyCreatedProfile {
    role?: string
    interests: string []
    bio: string

}




export type Role= typeof Role[ keyof typeof Role ] 