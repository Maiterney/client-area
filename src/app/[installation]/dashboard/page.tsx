import { Inicio } from "@/templates/Dashboard/Inicio";
import { api } from "@/utils";
import { cookies } from "next/dist/client/components/headers";

export default async function Dashboard({params}:{params:{installation:string}}) {
    const cookie = cookies()
    const token = cookie.get('nextAuth.token')?.value
    api.defaults.headers['Authorization'] = `Bearer ${token}`
    const bills = await api.get(`/user/bills?installation=${params?.installation}`).then(res => { return res.data.bills.results }).catch(err => { console.log(err); return [] })
    return <Inicio billsData={bills}/>
}