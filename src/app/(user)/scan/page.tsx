import ScanClient from '@/components/scan/ScanClient'

export const metadata = {
  title: 'Scan Table | yemo° Café',
  description: 'Scan your table QR code to start ordering directly to your table.',
}

export default function ScanPage() {
  return <ScanClient />
}
