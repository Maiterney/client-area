import { Inicio } from "@/templates/Dashboard/Inicio";
import { api } from "@/utils";
import { cookies } from "next/dist/client/components/headers";

export default async function Dashboard({params}:{params:{installation:string}}) {
    const cookie = cookies()
    const token = cookie.get('nextAuth.token')?.value
    let date = new Date();
    let currentMonth = date.getMonth() 
    let currentYear = date.getFullYear()
    api.defaults.headers['Authorization'] = `Bearer ${token}`
    const bills = await api.get(`/user/bills?installation=${params?.installation}`).then(res => { return res.data.data.bills }).catch(err => { console.log(err); return [] })
    return <Inicio billsData={bills} currentMonth={Number(currentMonth + 1)}/>
}