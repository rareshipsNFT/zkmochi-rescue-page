import { Providers } from './providers'

export const metadata = {
  title: 'zkSync + wagmi + Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const globalStyles: React.CSSProperties = {   
    margin: 0,
    padding: 0,
    fontFamily: 'sans-serif',
    fontSize: '16px',
    // color: '#ffffff',
    lineHeight: '1',
    // backgroundColor: '#000000',
  }

  return (
    <html lang="en">
      <body style={globalStyles}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
