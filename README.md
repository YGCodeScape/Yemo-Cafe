<p align="center">
  <img src="./public/icons/yemo-logo-bg.png" alt="yemo logo" width="80" style="border-radius: 20px;" />
  <br />
  <img src="./public/assets/onboarding-mascot-1.png" alt="yemo mascot" width="220" />
</p>

<h1 align="center">yemo° Café Customer App</h1>

<p align="center">
  <strong>A modern, sensory digital dining and ordering experience crafted for yemo° Café.</strong>
</p>

<p align="center">
  <a href="https://yemocafe.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live_Demo-Vercel-6B3F2A?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel Live Demo" />
  </a>
  <img src="https://img.shields.io/badge/Version-1.0.0_Beta-D4956A?style=for-the-badge" alt="Version" />
  <img src="https://img.shields.io/badge/Experience-Mobile--First-2C1A0E?style=for-the-badge" alt="Mobile First" />
</p>

<p align="center">
  🔗 <strong>Live Demo URL:</strong> <a href="https://yemocafe.vercel.app/">https://yemocafe.vercel.app/</a>
</p>

---

## ☕ About the Project

Welcome to the **yemo° Café** Customer Web App. 

> [!NOTE]
> **Beta Demo Version**: This application is a fully functional, self-contained client-side demo version. It comes pre-equipped with an independent local authentication engine, table allocation simulator, persistent cart and kitchen order state machine, and interactive rewards allowing anyone to explore, test, and experience the complete end-to-end customer journey directly in their browser without requiring backend database provisioning.

Designed with an artisan warm café aesthetic (`#FDFAF6` cream, `#6B3F2A` roasted espresso, and `#D4956A` warm caramel), the app simulates the real in-store ritual: arriving at the café, scanning a table, customizing artisan drinks, and tracking food preparation in real time.

---

## ✨ Key Interactive Systems

### 🔐 1. Self-Contained Local Authentication Engine
- **Client-Side SHA-256 Hashing**: Passwords are securely hashed with a zero-dependency pure JavaScript SHA-256 implementation that runs on all devices, LAN IPs, and webviews.
- **Persistent Local Dataset**: User profiles are securely registered and verified in `localStorage`.
- **Session & Middleware Sync**: Active sessions seamlessly sync with Next.js edge cookies for smooth route protection.
- **Guest Explorer Mode**: Jump right in with one tap as a guest to experience the app without creating an account.
- **Password Reset Flow**: Dedicated `/auth/forgot` view to update credentials anytime.

### 📷 2. Table Scan Priority System
- **Scan-First Ordering Policy**: Customers cannot place orders until their table is scanned. Attempting to place an order without a table automatically prompts the customer and guides them to the scanner.
- **Random Table Allocation**: Simulates scanning in-café QR stands by dynamically assigning an available table (`Table 01` through `Table 12`).
- **Cart Continuity**: Selected items remain safe in the cart while scanning; once confirmed, the cart drawer re-opens with the table assigned for instant checkout.
- **Active Table Session Manager**: Allows switching tables or releasing the table session upon leaving.

### 🍽️ 3. Sensory Menu & Ordering Experience
- **Interactive Dietary & Taste Filtering**: Bottom-sheet filter drawer supporting dietary preferences (Veg, Non-Veg, Vegan), drink temperatures (Hot, Iced, Room Temp), taste profiles (Rich, Sweet, Citrusy, Floral), and price ranges.
- **Customization Modal**: Select serving sizes (200ml, 350ml, 450ml), temperature options, and artisan add-ons (Oat Milk, Vanilla Bean Syrup, Extra Espresso Shot).
- **Sticky Mini Cart & Persistent Drawer**: Live subtotal calculations, tax breakdown, and quick item steppers that persist across page reloads.

### ⏱️ 4. Live Kitchen Tracker & Receipt History
- **Real-Time Order Lifecycle**: Orders progress through realistic kitchen preparation milestones:
  `Placed` ➔ `Barista Accepted` ➔ `Brewing & Handcrafting` ➔ `On the Way` ➔ `Served Fresh` ➔ `Completed`.
- **Sensory Mascot States**: Animated yemo° mascots reflect the current status of each dish and beverage.
- **Interactive Cup Rating**: 5-cup rating system with mood feedback and tag presets.
- **Past Order Archive**: Full historical receipt view with item breakdowns, pricing, and dates.

### 🪪 5. Digital Loyalty Club & Café Passport
- **Yemo Club Card**: Interactive digital membership card displaying loyalty points, tier badges, and scan-at-counter QR pass.
- **Coffee Passport**: Stamp collection system tracking artisan origins and roasts tasted.
- **Taste Preferences**: Customizable caffeine tolerance, roast favorites, and sweetness sliders.
- **Feedback & Google Review**: Integrated feedback cards and Google Maps review shortcut.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server & Client Components)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode, 100% type safety)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (Spring physics, layout transitions, gestures)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (with persistent storage middleware)
- **Icons**: [Lucide React](https://lucide.dev/)
- **QR Scanner**: [HTML5-QRCode](https://github.com/mebjas/html5-qrcode)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18.18+ or Node.js 20+
- npm, pnpm, or yarn

### 1. Clone the repository
```bash
git clone https://github.com/your-username/Y16-cafe.git
cd Y16-cafe
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. For mobile preview, press `F12` and switch to mobile device emulation (e.g., iPhone 14 / 15 Pro, 390px × 844px).

### 4. Build for production
```bash
npm run build
```

---

## 📱 Mobile-First Recommendations

yemo° Café is designed from the ground up as a mobile progressive web application. For the best viewing experience:
1. Open the [Live Demo](https://yemocafe.vercel.app/) on your smartphone or mobile browser.
2. Or on desktop, open developer tools (`F12` / `Ctrl+Shift+I`) and toggle device toolbar (`Ctrl+Shift+M`) set to any modern phone view (390px to 430px width).

---

<p align="center">
  Crafted with ☕ and passion for <strong>yemo° Café</strong>.
</p>
