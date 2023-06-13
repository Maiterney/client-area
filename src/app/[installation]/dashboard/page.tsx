import { Inicio } from "@/templates/Dashboard/Inicio";
import { api } from "@/utils";

export default async function Dashboard({params}:{params:{installation:string}}) {
    console.log(params.installation)
    const bills = await api.get(`/user/bills?installation=${params.installation}`).then(res => { return res.data.bills.results }).catch(err => { console.log(err); return [] })
    return <Inicio billsData={bills}/>
}