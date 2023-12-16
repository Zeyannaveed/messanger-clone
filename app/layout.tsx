import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ActiveStatus from './components/Activestatus'
import AuthContext from './context/authcontext'
import ToasterContext from './context/Toastercontext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Messenger Clone',
  description: 'My Messenger Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
        <ToasterContext/>
        <ActiveStatus />
        {children}
        </AuthContext>
        </body>
    </html>
  )
}
