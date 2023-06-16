import { create } from 'zustand'

export type Charts = {
    datasets:Array<object>,
    labels: Array<string>
}

type StoreProps = {
    charts: Charts | null,
    setCharts:(charts: Charts | null) => void
}

export const useCharts = create<StoreProps>((set) => ({
    charts: null,
    setCharts: (charts:Charts | null) => {set({charts: charts})}
}));