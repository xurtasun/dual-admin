import { ICategory } from './category'
import { IPlayer } from './player'
import { IRestriction } from './restriction'
import { ITournament } from './tournament'

export interface ITeam {
  _id: string
  players: IPlayer[]
  matches: string[]
  tournament: ITournament
  payed: string[]
  category: ICategory
  created: Date
  restrictions: IRestriction[]
  scoring: number
  updated: Date
  espera: boolean
  enabled: boolean
  result: {
    type: string
    score: number
  }
}
