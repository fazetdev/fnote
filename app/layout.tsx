import './globals.css'

export const metadata = {
  title: 'FNote',
  description: 'Your personal knowledge base',
  manifest: '/manifest.json',
  themeColor: '#0f2e1f',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'FNote',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-[#0f2e1f]">
        {children}
      </body>
    </html>
  )
}
