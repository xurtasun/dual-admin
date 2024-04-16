export interface IQuery {
  page?: number
  pageSize?: number
  sort?: {
    field: string
    sort: string
  }
  filter?: any
}
