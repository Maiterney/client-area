import { create } from 'zustand'

type StoreProps = {
    tabNumberIndex: number,
    setTabNumber:(tabNumber: number) => void
}

export const useTabNumber = create<StoreProps>((set) => ({
    tabNumberIndex: 0,
    setTabNumber: (tabNumber:number) => {set({tabNumberIndex: tabNumber})}
}));