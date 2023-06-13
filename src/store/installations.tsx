import { create } from 'zustand'

export type Installations = {
    address: string,
    address_number: string,
    agent: number,
    agent_discount: string,
    aggregate_bill_values: boolean,
    apportionment_profile: string,
    apportionment_status: string,
    city: string,
    complement: string,
    contracted_kwh: string,
    distributor: string,
    district: string,
    energy_fare_based_discount: string,
    generator: string,
    installation_class: string,
    main_document: string,
    number: string,
    owner: string,
    refund_pis_cofins: boolean
    signature_date: string | null,
    state: string,
    zip_code: string,
}

type StoreProps = {
    installations: Array<Installations> | any,
    setInstallations:(installation: Array<Installations>) => void
}

export const useInstallations = create<StoreProps>((set) => ({
    installations: [],
    setInstallations: (installations:Array<Installations>) => {set({installations: installations})}
}));