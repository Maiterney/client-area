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
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children, }: { children: React.ReactNode }) {
  const cookie = cookies()
  const token = cookie.get('nextAuth.token')?.value
  const refreshToken = cookie.get('nextAuth.refresh')?.value
  const expireToken = cookie.get('nextAuth.expire_token')?.value
  const userEmail = cookie.get('nextAuth.email')?.value
  if(token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`

    api.get('/user/installations').then(res => { 
      console.log(res?.data?.installations?.results) 
      redirect(`/${res.data.installations.results[0].number}/dashboard`)
    }).catch(err => { 
        console.log(err); 
        redirect('https://login.woltz.com.br')
    })
    
    /* await api.post('/authenticate/refresh-token', { email: userEmail, refresh_token: refreshToken }).then(res => {
      console.log('success')
    }).catch(err => {
      console.log('aqui')
      redirect('http://localhost:3001')
      // redirect('https://login.woltz.com.br')
    }) */
    
  } else {
    // redirect('http://localhost:3001')
    redirect('https://login.woltz.com.br')
  }
  return (
    <html lang="en">
      <body className={kumbh.className}>{children}</body>
    </html>
  )
}
