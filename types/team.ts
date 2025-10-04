import { User } from './user'

export interface Team {
  id: string
  workspace_id: string
  name: string
  key: string
  description?: string
  color: string
  created_at: string
  updated_at: string
  members?: TeamMember[]
  _count?: {
    members: number
    issues: number
    projects: number
  }
}

export interface TeamMember {
  id: string
  team_id: string
  user_id: string
  role: TeamRole
  joined_at: string
  user?: User
}

export type TeamRole = 
  | 'maintainer'
  | 'member'
  | 'guest'

export interface Cycle {
  id: string
  workspace_id: string
  team_id: string
  name: string
  number: number
  start_date: string
  end_date: string
  status: CycleStatus
  created_at: string
  updated_at: string
  team?: Team
  _count?: {
    issues: number
    completed_issues: number
  }
}

export type CycleStatus = 
  | 'planned'
  | 'active'
  | 'completed'
  | 'archived'