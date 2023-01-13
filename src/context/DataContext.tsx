import { createContext, useContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

type ValueData = {
    value: any;
}

type DataContextType = {
    mouthAccount: number;
    setMouthAccount?: any;
}

interface DataProvider {
    children: JSX.Element;
}


export const DataContext = createContext({} as DataContextType)
    

function DataProvider({ children }:DataProvider) {
    const [ mouthAccount, setMouthAccount ] = useState(0)

    async function setMouthValue({value}:ValueData) {
        setMouthAccount(value)
        console.log('provider',value)
        Router.push('/accounts')
    }

    return (
        <DataContext.Provider value={{ mouthAccount, setMouthAccount}}>
            {children}
        </DataContext.Provider>
    )

}

const useDataContext = () => useContext(DataContext)

export { DataProvider, useDataContext}