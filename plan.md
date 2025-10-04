# Project Pro - Linear.app Clone Development Plan

## Project Overview

Project Pro will be an exact clone of Linear.app, a modern issue tracking and project management tool designed for software teams. The application will be built using Next.js, Supabase as the backend, and deployed to Vercel.

## Development Approach

We will start with a **Minimal Viable Product (MVP)** approach, focusing on core issue management features first, with GitHub integration as the primary external integration. Screenshots of Linear.app will be captured for UI/UX reference to ensure an identical aesthetic and user experience.

## Technology Stack

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Framer Motion** for animations
- **React Hook Form** for form management
- **Zustand** for state management
- **React Query** for server state management

### Backend
- **Supabase** for:
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - File storage
  - Edge functions

### Development Tools
- **Playwright** for E2E testing and screenshots
- **ESLint** and **Prettier** for code quality
- **TypeScript** for static type checking
- **GitHub** for version control
- **Vercel CLI** for deployment

## Linear.app Features Analysis

Based on research, Linear.app includes the following core features:

### Core Functionality
1. **Issue Management**
   - Create, edit, and delete issues
   - Issue status tracking (Todo, In Progress, Done, etc.)
   - Issue priorities (Urgent, High, Medium, Low)
   - Issue assignments to team members
   - Issue labels and categorization
   - Issue comments and activity history

2. **Project Management**
   - Create and manage projects
   - Project milestones
   - Project roadmaps
   - Project templates
   - Project progress tracking

3. **Team Management**
   - Team creation and management
   - Team member roles and permissions
   - Team settings and configurations

4. **Cycles (Sprints)**
   - Create and manage cycles
   - Cycle duration and dates
   - Cycle progress and burndown charts
   - Cycle issues assignment

5. **Integrations**
   - GitHub/GitLab integration
   - Slack integration
   - Jira sync
   - API access

6. **Advanced Features**
   - Command palette (Cmd+K)
   - Keyboard shortcuts
   - Advanced filtering and search
   - AI-powered filtering
   - Real-time updates
   - Notifications
   - Custom workflows
   - Issue templates
   - Project templates

## Database Schema Design

### Core Tables

#### Users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Workspaces
```sql
CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  logo_url TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Workspace Members
```sql
CREATE TABLE workspace_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL DEFAULT 'member', -- admin, member, guest
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(workspace_id, user_id)
);
```

#### Teams
```sql
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  key VARCHAR(10) NOT NULL, -- e.g., "ENG", "DES"
  description TEXT,
  color VARCHAR(7), -- hex color
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Team Members
```sql
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);
```

#### Projects
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'active', -- active, completed, archived
  start_date DATE,
  target_date DATE,
  lead_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Cycles
```sql
CREATE TABLE cycles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  number INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'planned', -- planned, active, completed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Issues
```sql
CREATE TABLE issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier VARCHAR(20) NOT NULL, -- e.g., "ENG-123"
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  cycle_id UUID REFERENCES cycles(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'todo',
  priority VARCHAR(20) NOT NULL DEFAULT 'medium', -- urgent, high, medium, low
  assignee_id UUID REFERENCES users(id) ON DELETE SET NULL,
  creator_id UUID REFERENCES users(id) NOT NULL,
  estimate INTEGER, -- story points or time estimate
  due_date TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(workspace_id, identifier)
);
```

#### Issue Labels
```sql
CREATE TABLE labels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  color VARCHAR(7) NOT NULL, -- hex color
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(workspace_id, name)
);
```

#### Issue Label Relations
```sql
CREATE TABLE issue_labels (
  issue_id UUID REFERENCES issues(id) ON DELETE CASCADE,
  label_id UUID REFERENCES labels(id) ON DELETE CASCADE,
  PRIMARY KEY (issue_id, label_id)
);
```

#### Issue Comments
```sql
CREATE TABLE issue_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID REFERENCES issues(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Issue History
```sql
CREATE TABLE issue_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID REFERENCES issues(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  action VARCHAR(50) NOT NULL, -- created, updated, assigned, etc.
  field_changed VARCHAR(100),
  old_value TEXT,
  new_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Project Structure

```
project-pro/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── .vscode/
│   └── settings.json
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── modal.tsx
│   │   └── ...
│   ├── issue/                 # Issue-related components
│   │   ├── issue-card.tsx
│   │   ├── issue-form.tsx
│   │   ├── issue-list.tsx
│   │   └── ...
│   ├── project/               # Project-related components
│   │   ├── project-card.tsx
│   │   ├── project-form.tsx
│   │   └── ...
│   └── team/                  # Team-related components
│       ├── team-card.tsx
│       └── ...
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── issues/
│   │   ├── projects/
│   │   ├── teams/
│   │   ├── cycles/
│   │   └── settings/
│   ├── api/
│   │   ├── auth/
│   │   ├── issues/
│   │   ├── projects/
│   │   └── ...
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── schema.ts
│   ├── utils/
│   ├── hooks/
│   └── stores/
├── types/
│   ├── issue.ts
│   ├── project.ts
│   ├── team.ts
│   └── user.ts
├── public/
│   └── icons/
├── tests/
│   ├── e2e/
│   └── __screenshots__/       # Linear.app screenshots
├── .env.local
├── .env.example
├── .gitignore
├── next.config.js
├── package.json
├── playwright.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Implementation Plan (MVP Focus)

### Phase 1: Project Setup and Infrastructure
1. Initialize Next.js project with TypeScript
2. Set up Supabase project and configure database
3. Set up GitHub repository
4. Configure Vercel deployment
5. Set up development environment and tooling
6. **Capture Linear.app screenshots for UI reference**

### Phase 2: Authentication and User Management
1. Implement Supabase authentication
2. Create login/signup pages
3. Set up user profile management
4. Implement workspace creation and joining
5. Set up team management

### Phase 3: Core Issue Management (MVP Priority)
1. Create issue CRUD operations
2. Implement issue status and priority management
3. Add issue assignments and comments
4. Create issue list and board views
5. Implement basic issue filtering and search

### Phase 4: Basic Project and Team Management
1. Implement basic project CRUD operations
2. Add team management features
3. Implement team member roles and permissions

### Phase 5: GitHub Integration (MVP Priority)
1. Implement GitHub authentication
2. Connect issues to GitHub repositories
3. Sync issue status with GitHub commits/PRs
4. Display GitHub information in issue details

### Phase 6: Basic Real-time Features
1. Implement real-time issue updates
2. Add real-time comments
3. Create basic notification system

### Phase 7: UI/UX Polish (Based on Linear.app Screenshots)
1. Implement Linear.app matching UI components
2. Add animations and transitions
3. Optimize responsive design
4. Implement accessibility features

### Phase 8: Testing and Deployment
1. Write comprehensive E2E tests
2. Performance optimization
3. Security audit
4. Production deployment

### Future Phases (Post-MVP)
- Cycles (sprints) implementation
- Command palette functionality
- Keyboard shortcuts
- Advanced filtering and search
- Slack integration
- Project roadmaps and milestones
- Advanced team management features

## UI/UX Design Considerations

### Design System
- Color palette matching Linear.app
- Typography system
- Component library with consistent styling
- Icon system
- Spacing and layout guidelines

### Key UI Components
1. **Sidebar Navigation**
   - Team switcher
   - Navigation menu
   - Quick filters
   - User profile

2. **Issue Views**
   - List view
   - Board view (Kanban)
   - Timeline view
   - Calendar view

3. **Command Palette**
   - Quick issue creation
   - Navigation shortcuts
   - Search functionality

4. **Issue Detail Modal**
   - Issue information
   - Comments section
   - Activity history
   - Related issues

## Real-time Features Implementation

### Supabase Real-time Subscriptions
- Issue status updates
- New comments
- Assignment changes
- Project updates
- Team member activities

### Real-time Events
- Issue creation and updates
- Comment additions
- Status changes
- Assignment notifications

## Authentication Strategy

### Supabase Auth Features
- Email/password authentication
- Social login options (Google, GitHub)
- Magic link authentication
- Session management
- Row-level security (RLS)

### Permission System
- Workspace roles (admin, member, guest)
- Team roles (maintainer, member)
- Project permissions
- Issue access controls

## Deployment Strategy

### Vercel Deployment
- Automatic deployments from main branch
- Preview deployments for PRs
- Environment variable management
- Custom domain configuration

### Environment Management
- Development environment
- Staging environment
- Production environment

## Testing Strategy

### E2E Testing with Playwright
- Critical user flows
- Cross-browser testing
- Visual regression testing
- Performance testing

### Testing Scenarios
1. User authentication flows
2. Issue creation and management
3. Project management
4. Team collaboration
5. Real-time updates

## Performance Considerations

### Optimization Strategies
- Code splitting and lazy loading
- Image optimization
- Database query optimization
- Caching strategies
- Bundle size optimization

### Monitoring
- Performance metrics
- Error tracking
- User analytics
- API response times

## Security Considerations

### Data Protection
- Row-level security (RLS)
- Input validation and sanitization
- XSS protection
- CSRF protection
- Secure API endpoints

### Access Control
- Authentication middleware
- Authorization checks
- API rate limiting
- Audit logging

## Next Steps

1. Set up development environment
2. Create GitHub repository
3. Initialize Supabase project
4. Set up Vercel deployment
5. Begin Phase 1 implementation

## Resources and References

- [Linear.app Documentation](https://linear.app/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Playwright Testing Guide](https://playwright.dev/docs)

---

*This plan will be updated regularly as the project progresses and new requirements are identified.*