import { ICategory } from './category'
import { IClient } from './client'
import { IRestriction } from './restriction'
import { ITeam } from './team'

export interface ITournament {
  _id: string
  id: string
  name: string
  clubName: string
  address: string
  date: Date[]
  time: string[]
  image: string
  teams: ITeam[]
  categories: ICategory[]
  teamsTarget: number
  finalized: boolean
  matchTime: number
  courtNumber: number
  owner: IClient
  created: string
  restrictions: IRestriction[]
  openRegistrations: boolean
  publicTimetable: boolean
  updated: Date
  enabled: boolean
  sets: number
  scoring: {
    [key: string]: {
      winner: number
      loser: number
    }
  }
  pricing: {
    one: number
    two: number
  }
}
