import { create } from 'zustand'

export type Bills = {

}

type StoreProps = {
    bills: Array<Bills> | any,
    setBills:(installation: Array<Bills>) => void
}

export const useBills = create<StoreProps>((set) => ({
    bills: [],
    setBills: (bills:Array<Bills>) => {set({bills: bills})}
}));