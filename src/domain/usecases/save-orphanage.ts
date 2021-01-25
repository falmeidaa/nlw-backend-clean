import { OrphanageModel } from '../models/orphanage'

export type SaveOrphanageModel = {
  id?: number
  name: string
  latitude: number
  longitude: number
  about: string
  instructions: string
  opening_hours: string
  open_on_weekends: boolean
}

export interface SaveOrphanage{
  save(orphanage: SaveOrphanageModel): Promise<OrphanageModel>
}
