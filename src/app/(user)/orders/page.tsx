import { Metadata } from 'next'
import OrdersClient from '@/components/orders/OrdersClient'

export const metadata: Metadata = {
  title: 'Orders | Yemo Café',
  description: 'Live order tracking and your café history at Yemo Café.',
}

export default function OrdersPage() {
  return <OrdersClient />
}
