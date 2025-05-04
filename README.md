# Mai App - AI Chat Application Frontend

A modern chat application built with React and Tailwind CSS, featuring a responsive design with dark mode support.

## Tech Stack

- **Frontend Framework**: React 18 with Create React App
- **State management**: Redux Toolkit (with RTK Query for all API calls)
- **Styling**: TailwindCSS
- **Routing**: React Router v6
- **Theme Management**: Context API
- **Recharts**: For data visualization and charts.
- **Socket.IO Client**: For real-time communication.
- **Date-fns**: For date manipulation.

## Features

- 💬 Chat interface (integrates with mai-services backend)
- 🌓 Dark/Light theme support
- 📱 Responsive design
- 🎨 Modern UI with TailwindCSS
- 🛣️ Route-based navigation
- ♿ Accessibility support
- 🤯 Charts and Visualization with recharts
- 🔒 Secure authentication (JWT, username/password via mai-services)
- 📚 Knowledge base Q&A (via rag-service, secured by JWT)

## Architecture & Integration

```
[User]
   |
[mai-app (React)]
   |
   | REST/Socket.IO
   v
[mai-services (Spring Boot)] <--- JWT Auth ---> [rag-service (FastAPI)]
```

- All API data fetching/mutations use RTK Query hooks from `/features/api/` (see [frontend best practices](../README.master.md)).
- Auth tokens and user info are stored in localStorage after login.
- mai-app communicates with mai-services for authentication, user management, and chat.
- Knowledge base queries are routed to rag-service, authenticated with JWT from mai-services.

## Authentication

- Login with username/password (not email)
- Tokens (`accessToken`, `refreshToken`) and user object are returned from mai-services
- Tokens are stored in localStorage
- All API requests (including to rag-service) include `Authorization: Bearer <token>`
- Admin credentials for development: `admin` / `admin123`
## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/tuankiet2640/mai-app.git
cd mai-app
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm start
```
The application will be available at `http://localhost:3000`

- Ensure mai-services and rag-service are running (see [README.master.md](../README.master.md))
- Configure API base URLs in `.env.local` as needed.

## Design System

### Colors (considerations)
- Primary: Blue (Tailwind blue-600/700)
- Background: 
  - Light: White/Gray-50
  - Dark: Gray-800/900
- Text:
  - Light: Gray-900
  - Dark: White

### Components

#### Chat Interface
- **ChatWindow**: Main chat area with message history
- **InputArea**: Message input with send button
- **Message**: Individual message bubbles with timestamp
- **Sidebar**: Navigation and chat history
- **Header**: App navigation and theme toggle

### Accessibility

- ARIA labels for interactive elements
- Proper heading hierarchy
- Color contrast compliance

---

## API Data Layer: RTK Query

- All API endpoints and hooks are defined in `/features/api/`
- Use RTK Query hooks (e.g., `useLoginMutation`, `useGetUsersQuery`, `useChatQuery`)
- No legacy thunks/services/axios in components or slices

---

## Available Scripts

- `npm start`: Run development server
- `npm test`: Run tests
- `npm run build`: Create production build

