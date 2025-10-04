export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface WorkspaceMember {
  id: string
  workspace_id: string
  user_id: string
  role: 'admin' | 'member' | 'guest'
  joined_at: string
  user?: User
}

export interface TeamMember {
  id: string
  team_id: string
  user_id: string
  role: 'maintainer' | 'member'
  joined_at: string
  user?: User
}