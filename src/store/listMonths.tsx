import { create } from 'zustand'

export type Months = {

}

type StoreProps = {
    listMonths: Array<Months> | any,
    setListMouths:(installation: Array<Months>) => void
}

export const useListMouths = create<StoreProps>((set) => ({
    listMonths: [
        {
            label: 'janeiro',
            month: 1
        }, 
        {
            label: 'Fevereiro',
            month: 2
        }, 
        {
            label: 'março',
            month: 3
        }, 
        {
            label: 'abril',
            month: 4
        }, 
        {
            label: 'maio',
            month: 5
        }, 
        {
            label: 'junho',
            month: 6
        }, 
        {
            label: 'julho',
            month: 7
        }, 
        {
            label: 'agosto',
            month: 8
        }, 
        {
            label: 'setembro',
            month: 9
        }, 
        {
            label: 'outubro',
            month: 10
        }, 
        {
            label: 'novembro',
            month: 11
        }, 
        {
            label: 'dezembro',
            month: 12
        }, 
    ],
    setListMouths: (listMonths:Array<Months>) => {set({listMonths: listMonths})}
}));