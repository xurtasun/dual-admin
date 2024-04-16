import { ICategoryParent } from './categoryParent'
import { ITeam } from './team'
import { ITournament } from './tournament'

export interface ICategory {
  _id: string
  name?: string
  teams?: ITeam[]
  groups?: string[]
  tournament?: ITournament
  matches?: string[]
  created?: Date
  teamsLimit?: number
  updated?: Date
  enabled?: boolean
  parent?: ICategoryParent
  editMode?: boolean
  new?: boolean
}
