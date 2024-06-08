import { ICategory } from './category'
import { ITeam } from './team'
import { ITournament } from './tournament'

export interface IMatch {
  position: number
  _id: string
  courtName: string
  groupId: string
  datetime: Date
  category: ICategory
  teams: ITeam[]
  placeholders: string[]
  result: string[]
  type: string
  tournament: ITournament
  winner: string
  finalized: boolean
  created: Date
  updated: Date
  enabled: boolean
  playing: boolean
}
