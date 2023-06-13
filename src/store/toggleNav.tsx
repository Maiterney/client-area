import { create } from 'zustand'

type StoreProps = {
    toggleNav: boolean,
    setToggleNav:(toggle: boolean) => void
}

export const useToggleNav = create<StoreProps>((set) => ({
    toggleNav: true,
    setToggleNav: (toggle:boolean) => {
        set({
            toggleNav: toggle
        })
    }
}));