import { AccountTrade } from "@/components/AccountTrade"
import { Header } from "@/components/Header"
import { Sidebar } from "@/components/Sidebar"
import { api } from "@/utils"
import { cookies } from "next/dist/client/components/headers"
import { redirect } from "next/navigation"

export default async function AdminLayout({ children, params }: { children: React.ReactNode, params:{installation:string} }) {
  const cookie = cookies()
  const token = cookie.get('nextAuth.token')?.value
  const previousRedirect = cookie.has('previous')
  let date = new Date();
  let currentMonth = date.getMonth() 
  let currentYear = date.getFullYear()
  // let bills;

  // console.log(params)

  api.defaults.headers['Authorization'] = `Bearer ${token}`
  async function userGroups(token:string) {
    const jwtData = token.split('.')[1];
    const decodedJwtData = atob(jwtData);
    const jwtPayload = JSON.parse(decodedJwtData);
  
    if (jwtPayload['cognito:groups']) {
      return jwtPayload;
    }
  
    return [];
  }

  // async function getBills(installation:string) {
  //   // console.log(installation)
  //   api.defaults.headers['Authorization'] = `Bearer ${token}`
  //   await api.get(`/user/bills?installation=${installation}`).then(res => { bills = res.data.data.bills }).catch(err => { console.log(err); bills = [] })
  // }

  const user = await api.get('/user/profile').then(res => { 
    return res.data 
  }).catch(err => { 
    console.log(err);  
    return [] 
  })
  const installations = await api.get('/user/installations').then(res => { 
    return res.data.installations.results 
  }).catch(err => { 
    console.log(err); return [] 
  })

  const data = await api.get(`/user/bills?installation=${params.installation}&year=${currentYear}`).then(res => { 
    // console.log('response data', res.data)
    return res.data.data 
  }).catch(err => { console.log(err); return [] })

  return (
    <main className="main mainDashboard">
      <Sidebar />
      <div className="contentDashboard">
        <Header myUser={user} myInstallations={installations} myBills={data.bills} myCharts={data.charts} references={data?.extras?.references} currentYear={currentYear} currentInstallation={params.installation} previousRedirect={previousRedirect}/>
        {children}
        <AccountTrade />
      </div>
    </main>
  )
}