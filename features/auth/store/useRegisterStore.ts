import {create} from "zustand"

interface RegisterStore {
    fullName: string
    email: string
    password: string
    role: string
    setField: (field: string, value: string) => void
    resetForm: () => void
}

export const useRegisterStore = create<RegisterStore>((set)=> ({
    fullName: "", 
    email: "", 
    password: "", 
    role: "student", 
    setField: (field, value) => set((state)=> ({...state, [field]:value})), 
    resetForm: () => set({fullName:"", email:"", password:"", role:""})
}))