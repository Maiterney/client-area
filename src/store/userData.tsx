import { create } from 'zustand'

export type User = {
    name: string,
    profile_photo_url: string
}

type StoreProps = {
    user: User | null,
    setUser:(user: User) => void
}

export const useUserData = create<StoreProps>((set) => ({
    user: null,
    setUser: (user:User) => {set({user: user})}
}));