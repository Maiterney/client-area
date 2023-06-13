import { Header } from "@/components/Header"
import { Sidebar } from "@/components/Sidebar"
import { api } from "@/utils"
import { cookies } from "next/dist/client/components/headers"

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function AdminLayout({ children, params }: { children: React.ReactNode, params:{installations:string} }) {
  const cookie = cookies()
  const token = cookie.get('nextAuth.token')?.value
  let bills;

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

  async function getBills(installation:string) {
    console.log(installation)
    api.defaults.headers['Authorization'] = `Bearer ${token}`
    await api.get(`/user/bills?installation=${installation}`).then(res => { bills = res.data.bills.results }).catch(err => { console.log(err); bills = [] })
  }

  const user = await api.get('/user/profile').then(res => { 
    return res.data 
  }).catch(err => { 
    console.log(err); 
    return [] 
  })
  const installations = await api.get('/user/installations').then(res => { 
    getBills(res.data.installations.results[0].number)
    return res.data.installations.results 
  }).catch(err => { 
    console.log(err); return [] 
  })

  return (
    <main className="main mainDashboard">
      <Sidebar />
      <div className="contentDashboard">
        <Header myUser={user} myInstallations={installations} myBills={bills}/>
        {children}
      </div>
    </main>
  )
}