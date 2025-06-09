# RealTime Polling Application

A modern, real-time polling application built with Next.js 14, TypeScript, and Socket.IO. Create interactive polls and get instant feedback with beautiful visualizations and live updates.

## ✨ Features

- **Real-time Updates**: See votes come in live with Socket.IO
- **Beautiful UI**: Modern design with Tailwind CSS and Framer Motion animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Accessibility**: WCAG AA compliant with keyboard navigation and screen reader support
- **Interactive Charts**: Visualize results with Recharts (bar and pie charts)
- **Admin Dashboard**: Comprehensive poll management with live statistics
- **Easy Sharing**: Simple poll codes for easy participant access

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://www.github.com/thefznkhan/realtime-polls
   cd realtime-polls
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                          # Next.js 14 App Router
│   ├── admin/
│   │   ├── create/              # Poll creation page
│   │   └── session/[code]/      # Admin dashboard
│   ├── join/                    # Join poll page
│   ├── session/[code]/          # User voting interface
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/
│   ├── charts/                  # Chart components
│   ├── layout/                  # Layout components
│   ├── providers/               # Context providers
│   └── ui/                      # Reusable UI components
├── hooks/                       # Custom React hooks
├── lib/                         # Utilities and types
└── public/                      # Static assets
```

## 🎯 Usage

### Creating a Poll (Admin)

1. Navigate to `/admin/create`
2. Enter your poll question
3. Add 2-6 answer options
4. Optionally set a duration
5. Click "Launch Poll"
6. Share the generated poll code with participants

### Joining a Poll (Participant)

1. Navigate to `/join`
2. Enter the 6-digit poll code
3. Vote on the poll question
4. View live results after voting

### Managing a Poll (Admin)

1. Use the admin dashboard at `/admin/session/[code]`
2. Monitor live vote counts and statistics
3. View real-time charts and analytics
4. End the poll when ready

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking

### Code Quality

This project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for pre-commit hooks
- **TypeScript** for type safety

Pre-commit hooks automatically run linting and type-checking to ensure code quality.

## 🎨 Customization

### Theme Colors

Update the color palette in `tailwind.config.js`:

```js
colors: {
  primary: {
    500: '#4F46E5', // Indigo
    // ... other shades
  },
  secondary: {
    500: '#F59E0B', // Amber
    // ... other shades
  }
}
```

### Animations

Customize animations in the Framer Motion components or add new ones in `globals.css`.

## 📱 Responsive Design

The application is built mobile-first with responsive breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Color contrast compliance (WCAG AA)
- Screen reader compatibility

## 🔧 Configuration

### Socket.IO Setup

The application expects a Socket.IO server running on the URL specified in `NEXT_PUBLIC_API_URL`. 

Key events:
- `join-poll` - Join a poll room
- `cast-vote` - Cast a vote
- `create-poll` - Create new poll
- `end-poll` - End a poll
- `poll-updated` - Receive poll updates
- `vote-cast` - Receive new votes

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Socket.IO server URL | `http://localhost:3001` |

## 📊 Performance

- **Server Components** for optimal performance
- **Code splitting** with Next.js App Router
- **Image optimization** with Next.js Image component
- **Lazy loading** for charts and heavy components
- **Optimized animations** with Framer Motion

## 🧪 Testing

Run tests with:
```bash
npm run test
```


## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

Build the application:
```bash
npm run build
```

The built application will be in the `.next` folder.


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request
