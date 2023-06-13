import { InitPage } from "@/components/Init"
import { api } from "@/utils"
import { cookies } from "next/dist/client/components/headers"
import { redirect } from "next/navigation"

export default function Home() {
  const cookie = cookies()
  const token = cookie.get('nextAuth.token')?.value
  
  return <InitPage token={token}/>
}
