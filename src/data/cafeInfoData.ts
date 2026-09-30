export type Amenity = {
  id: string
  label: string
  icon: 'Armchair' | 'Wifi' | 'Car' | 'PawPrint'
}

export type CafeTiming = {
  days: string
  hours: string
}

export type CafeInfoData = {
  rewards: {
    title: string
    subtitle: string
    points: number
    pointsToFreeDrink: number
    progressPercent: number
    image: string
    link: string
  }
  cafe: {
    name: string
    tagline: string
    image: string
    address: string
    googleMapsUrl: string
  }
  status: {
    isOpen: boolean
    statusText: string
    closingInfo: string
    timings: CafeTiming[]
  }
  contact: {
    phone: string
    email: string
  }
  amenitiesSection: {
    title: string
    subtitle: string
    amenities: Amenity[]
  }
  sweetNote: {
    text: string
  }
}

export const CAFE_INFO_DATA: CafeInfoData = {
  rewards: {
    title: 'Yemo Rewards',
    subtitle: 'Good food tastes even better with rewards!',
    points: 120,
    pointsToFreeDrink: 80,
    progressPercent: 60,
    image: '/assets/rewards_latte_cup.jpg',
    link: '/profile',
  },
  cafe: {
    name: 'Yemo Café',
    tagline: 'Good food. Great company.',
    image: '/assets/cafe_storefront.jpg',
    address: '123, Green Park Road, Navi Mumbai, 400701',
    googleMapsUrl: 'https://maps.google.com/?q=Yemo+Cafe+navi+mumbai',
  },
  status: {
    isOpen: true,
    statusText: 'Open Now',
    closingInfo: 'Closes at 11:00 PM',
    timings: [
      { days: 'Mon – Fri', hours: '8:00 AM – 11:00 PM' },
      { days: 'Sat – Sun', hours: '9:00 AM – 11:30 PM' },
    ],
  },
  contact: {
    phone: 'tel:+919876543210',
    email: 'mailto:hello@yemocafe.com',
  },
  amenitiesSection: {
    title: 'Our Café',
    subtitle: 'Good food. Great company.',
    amenities: [
      { id: 'ambience', label: 'Cozy Ambience', icon: 'Armchair' },
      { id: 'wifi', label: 'Free Wi-Fi', icon: 'Wifi' },
      { id: 'parking', label: 'Parking Available', icon: 'Car' },
      { id: 'pet', label: 'Pet Friendly', icon: 'PawPrint' },
    ],
  },
  sweetNote: {
    text: 'See you at Yemo ♡',
  },
}
