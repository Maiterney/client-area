import { create } from 'zustand'

type StoreProps = {
    alertAccount: boolean,
    setAlertAccount:(toggle: boolean) => void
}

export const useAlertAccount = create<StoreProps>((set) => ({
    alertAccount: false,
    setAlertAccount: (toggle:boolean) => {
        set({
            alertAccount: toggle
        })
    }
}));