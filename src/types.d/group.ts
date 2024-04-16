import { ICategory } from './category'
import { IMatch } from './match'
import { ITeam } from './team'
import { ITournament } from './tournament'

export interface IGroup {
  _id: string
  name: string
  teams: ITeam[]
  matches: IMatch[]
  tournament: ITournament
  category: ICategory
  created: Date
  updated: Date
}
