export type Profile = {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  phone?: string
  created_at: string
}

export type Category = {
  id: string
  name: string
  slug: string
  icon: string
  sort_order: number
}

export type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  category_id: string
  category?: Category
  image_url?: string
  tags: string[]
  is_available: boolean
  is_featured: boolean
  volume_ml?: number
  temperature_options: string[]
  milk_options: string[]
  created_at: string
}

export type Table = {
  id: string
  number: number
  qr_token: string
  capacity: number
  is_active: boolean
}

export type OrderStatus = 'pending' | 'approved' | 'preparing' | 'ready' | 'completed' | 'cancelled'

export type Order = {
  id: string
  user_id: string
  table_id: string
  table?: Table
  status: OrderStatus
  total: number
  note?: string
  created_at: string
  updated_at: string
  items?: OrderItem[]
}

export type OrderItem = {
  id: string
  order_id: string
  menu_item_id: string
  menu_item?: MenuItem
  quantity: number
  unit_price: number
  customizations: {
    temperature?: string
    milk?: string
    size?: string
  }
}

export type CartItem = {
  menuItem: MenuItem
  quantity: number
  customizations: {
    temperature?: string
    milk?: string
    size?: string
  }
}
