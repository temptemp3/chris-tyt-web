import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ProviderRegistry } from '@/providers/provider-registry'
import { WalletProviderWrapper } from '@/providers/WalletProvider'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chris Thank You Tokens',
  description: 'A token of appreciation from Chris Swenor',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderRegistry>
          <WalletProviderWrapper>
            {children}
          </WalletProviderWrapper>
        </ProviderRegistry>
      </body>
    </html>
  )
}