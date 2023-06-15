import { Account } from "@/templates/Account";
import { api } from "@/utils";
import { cookies } from "next/dist/client/components/headers";

export default async function AccountPage({params}:{params: {accountMonth:string, accountYear:string, installation:string}}) {
    const cookie = cookies()
    const token = cookie.get('nextAuth.token')?.value
    const { installation, accountMonth, accountYear } = params
    api.defaults.headers['Authorization'] = `Bearer ${token}`
    const accountData = await api.get(`/user/bills?installation=${installation}&month=${accountMonth}&year=${accountYear}`).then(res => { 
        return res.data.data.bills[accountMonth]
    }).catch(err => { 
        console.log(err); return []
    })
    return <Account accountData={accountData}/>
}