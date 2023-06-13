import { Account } from "@/templates/Account";
import { api } from "@/utils";

export default async function AccountPage({params}:{params: {accountMonth:string, accountYear:string, installation:string}}) {
    const { installation, accountMonth, accountYear } = params
    console.log(params)
    const accountData = await api.get(`/user/bills?installation=${installation}&month=${accountMonth}&year=${accountYear}`).then(res => { 
        return res.data.bills.results[0]
    }).catch(err => { 
        console.log(err); return []
    })
    return <Account accountData={accountData}/>
}