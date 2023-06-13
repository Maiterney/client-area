'use client'
import { api } from "@/utils"
import { useRouter } from "next/navigation"

export default function Home() {
  const { back, push } = useRouter()
  api.get('/user/installations').then(res => { 
    console.log(res.data.installations.results) 
    push(`/${res.data.installations.results[0].number}/dashboard`)
  }).catch(err => { 
    console.log(err); 
    back()
  })
  
  return <></>
}
