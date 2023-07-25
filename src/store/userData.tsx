import { create } from 'zustand'

export interface UserData {
    name: string,
    profile_photo_url: string,
    email: string,
    phone: string,
    id: number,
    document: string
}

export type User = {
    user: UserData,
    roles: any
}
type StoreProps = {
    user: User | null,
    setUser:(user: User) => void
}

export const useUserData = create<StoreProps>((set) => ({
    user: null,
    setUser: (user:User) => {set({user: user})}
}));