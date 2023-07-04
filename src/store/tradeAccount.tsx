import { create } from 'zustand'

type StoreProps = {
    tradeAccount: boolean,
    setTradeAccount:(toggle: boolean) => void
}

export const useTradeAccount = create<StoreProps>((set) => ({
    tradeAccount: false,
    setTradeAccount: (toggle:boolean) => {
        set({
            tradeAccount: toggle
        })
    }
}));