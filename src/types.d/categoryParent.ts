import { IClient } from './client'

export interface ICategoryParent {
  id?: string
  _id?: string
  name: string
  owner?: IClient
  enabled?: boolean
}
