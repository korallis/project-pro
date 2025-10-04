import { User } from './user'

export interface Issue {
  id: string
  identifier: string
  workspace_id: string
  team_id: string
  project_id?: string
  cycle_id?: string
  title: string
  description?: string
  status: IssueStatus
  priority: IssuePriority
  assignee_id?: string
  creator_id: string
  estimate?: number
  due_date?: string
  completed_at?: string
  created_at: string
  updated_at: string
  assignee?: User
  creator?: User
  project?: Project
  cycle?: Cycle
  labels?: Label[]
  comments?: IssueComment[]
  _count?: {
    comments: number
  }
}

export interface IssueComment {
  id: string
  issue_id: string
  user_id: string
  content: string
  created_at: string
  updated_at: string
  user?: User
}

export interface IssueHistory {
  id: string
  issue_id: string
  user_id: string
  action: string
  field_changed?: string
  old_value?: string
  new_value?: string
  created_at: string
  user?: User
}

export interface Label {
  id: string
  workspace_id: string
  name: string
  color: string
  created_at: string
}

export type IssueStatus = 
  | 'todo'
  | 'backlog'
  | 'unstarted'
  | 'started'
  | 'in progress'
  | 'done'
  | 'canceled'
  | 'duplicate'

export type IssuePriority = 
  | 'urgent'
  | 'high'
  | 'medium'
  | 'low'

// Import other types to avoid circular dependencies
interface Project {
  id: string
  name: string
}

interface Cycle {
  id: string
  name: string
}