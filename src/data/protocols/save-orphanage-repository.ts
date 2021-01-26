import { OrphanageModel } from '../../domain/models/orphanage'
import { SaveOrphanageModel } from '../../domain/usecases/save-orphanage'

export interface SaveOrphanageRepository{
  save(orphanageData: SaveOrphanageModel): Promise<OrphanageModel>
}
