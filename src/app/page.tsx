import { InitPage } from "@/components/Init"
import { api } from "@/utils"
import { cookies } from "next/dist/client/components/headers"
import { redirect } from "next/navigation"

export default async function Home() {
  const cookie = cookies()
  const token = cookie.get('nextAuth.token')?.value
  await api.get('/user/installations').then(res => { 
    console.log(res?.data?.installations?.results) 
    redirect(`/${res.data.installations.results[0].number}/dashboard`)
  }).catch(err => { 
      console.log(err); 
      redirect('https://login.woltz.com.br')
  })
  
  return <InitPage token={token}/>
}
