import { create } from 'zustand'

type StoreProps = {
    loaderPage: boolean,
    setLoaderPage:(toggle: boolean) => void
}

export const useLoaderPage = create<StoreProps>((set) => ({
    loaderPage: true,
    setLoaderPage: (toggle:boolean) => {
        set({
            loaderPage: toggle
        })
    }
}));