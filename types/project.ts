import { User } from './user'

export interface Project {
  id: string
  workspace_id: string
  team_id: string
  name: string
  description?: string
  status: ProjectStatus
  start_date?: string
  target_date?: string
  lead_id?: string
  created_at: string
  updated_at: string
  lead?: User
  team?: Team
  _count?: {
    issues: number
  }
}

export interface Team {
  id: string
  workspace_id: string
  name: string
  key: string
  description?: string
  color: string
  created_at: string
  updated_at: string
  _count?: {
    members: number
    issues: number
  }
}

export interface Workspace {
  id: string
  name: string
  slug: string
  logo_url?: string
  created_by: string
  created_at: string
  updated_at: string
  _count?: {
    members: number
    teams: number
  }
}

export type ProjectStatus = 
  | 'active'
  | 'completed'
  | 'archived'
  | 'on hold'