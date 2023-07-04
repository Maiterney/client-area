import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import '@/styles/app.scss'
import { Inter, Kumbh_Sans } from 'next/font/google'
import { api } from '@/utils';
import { cookies } from 'next/dist/client/components/headers';
import { redirect } from 'next/navigation';

const kumbh = Kumbh_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'Portal Woltz',
  description: 'Portal Woltz',
}

export default async function RootLayout({ children, }: { children: React.ReactNode }) {
  const cookie = cookies()
  const token = cookie.get('nextAuth.token')?.value
  const refreshToken = cookie.get('nextAuth.refresh')?.value
  const expireToken = cookie.get('nextAuth.expire_token')?.value
  const userEmail = cookie.get('nextAuth.email')?.value
  if(token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
    
    await api.post('/authenticate/refresh-token', { email: userEmail, refresh_token: refreshToken }).then(res => {
      // console.log('success')
    }).catch(err => {
      // console.log('aqui')
      // redirect('http://localhost:3001')
      redirect(`${process.env.NEXT_PUBLIC_URL_LOGIN}`)
    })

    
  } else {
    // redirect('http://localhost:3001')
    redirect(`${process.env.NEXT_PUBLIC_URL_LOGIN}`)
  }
  return (
    <html lang="en">
      <body className={kumbh.className}>{children}</body>
    </html>
  )
}
