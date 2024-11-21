import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DocuTON - Decentralized Document Verification',
  description: 'A decentralized platform for secure and immutable document verification using the TON blockchain.',
  icons: {
    icon: '/DocuTON.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-black text-white`}>{children}</body>
    </html>
  )
}