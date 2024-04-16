import { IClient } from './client'

export interface ICategoryParent {
  id?: string
  name: string
  owner?: IClient
  enabled?: boolean
}
