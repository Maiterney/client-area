import { InitPage } from "@/components/Init"
import { cookies } from "next/dist/client/components/headers"

export default function Home() {
  const cookie = cookies()
  const token = cookie.get('nextAuth.token')?.value
  
  return <InitPage token={token}/>
}
