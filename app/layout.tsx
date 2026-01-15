import './globals.css'
import ServiceWorkerRegistration from './components/ServiceWorkerRegistration'
import OfflineIndicator from './components/OfflineIndicator'
import SyncStatus from './components/SyncStatus'
import InstallPrompt from './components/InstallPrompt'

export const metadata = {
  title: 'FNote',
  description: 'Your personal knowledge base - Works offline',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="FNote" />
        <link rel="apple-touch-icon" href="/icon-192.svg" />
      </head>
      <body>
        {children}
        <OfflineIndicator />
        <SyncStatus />
        <InstallPrompt />
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}
