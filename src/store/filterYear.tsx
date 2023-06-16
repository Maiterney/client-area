import { create } from 'zustand'

interface YearController {
    year: string,
    loading: boolean
}

type StoreProps = {
    yearController: YearController,
    setYear:(yearController: YearController) => void
}

let date = new Date()
let yearData = date.getFullYear()

export const useFilterYear = create<StoreProps>((set) => ({
    yearController: {
        year: String(yearData),
        loading: false
    },
    setYear: (yearController:YearController) => {set({yearController: yearController})}
}));