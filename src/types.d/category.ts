import { ICategoryParent } from './categoryParent'
import { ITeam } from './team'

export interface ICategory {
  _id: string
  name?: string
  teams?: ITeam[]
  groups?: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tournament?: any
  matches?: string[]
  created?: Date
  teamsLimit?: number
  updated?: Date
  enabled?: boolean
  parent?: ICategoryParent
  editMode?: boolean
  new?: boolean
}
