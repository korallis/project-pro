# Project Pro

A Linear.app clone built with Next.js, Supabase, and Vercel.

## Overview

Project Pro is a modern issue tracking and project management tool designed for software teams. It provides a clean, intuitive interface for managing issues, projects, and teams with real-time collaboration features.

## Features

- **User Authentication**: Secure login/signup with Supabase Auth
- **Dashboard**: Overview of issues, projects, and teams
- **Issue Management**: Create, track, and manage issues
- **Project Management**: Organize issues into projects
- **Team Collaboration**: Work together with your team
- **Real-time Updates**: Stay synchronized with real-time data
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Deployment**: Vercel
- **UI Components**: Radix UI, Tailwind CSS
- **State Management**: Zustand, React Query
- **Testing**: Playwright for E2E testing

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/korallis/project-pro.git
   cd project-pro
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Configure your Supabase project:
   - Follow the instructions in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
   - Add your Supabase credentials to `.env.local`

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# GitHub Integration (Optional)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

## Project Structure

```
project-pro/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components
│   ├── issue/          # Issue-related components
│   ├── project/        # Project-related components
│   └── team/           # Team-related components
├── lib/                # Utility functions and configurations
│   ├── supabase/       # Supabase client configuration
│   ├── utils/          # Utility functions
│   ├── hooks/          # Custom React hooks
│   └── stores/         # State management stores
├── src/app/            # Next.js app router pages
│   ├── (auth)/         # Authentication pages
│   ├── (dashboard)/    # Dashboard pages
│   └── api/            # API routes
├── types/              # TypeScript type definitions
├── tests/              # Test files
└── public/             # Static assets
```

## Development

### Running Tests

```bash
# Run E2E tests
npm run test:e2e

# Run tests with UI
npm run test:e2e:ui

# Capture Linear.app screenshots
npm run test:screenshots
```

### Building for Production

```bash
npm run build
npm start
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel
4. Deploy

For detailed instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md).

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Linear.app](https://linear.app) for the inspiration
- [Supabase](https://supabase.com) for the backend services
- [Next.js](https://nextjs.org) for the frontend framework
- [Vercel](https://vercel.com) for the hosting platform
