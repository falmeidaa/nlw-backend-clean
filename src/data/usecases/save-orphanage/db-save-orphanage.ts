import { OrphanageModel } from '../../../domain/models/orphanage'
import { SaveOrphanage, SaveOrphanageModel } from '../../../domain/usecases/save-orphanage'
import { SaveOrphanageRepository } from '../../protocols/save-orphanage-repository'

export class DbSaveOrphanage implements SaveOrphanage {
  constructor (private readonly saveOrphanage: SaveOrphanageRepository) {}
  async save (orphanage: SaveOrphanageModel): Promise<OrphanageModel> {
    const orphanageResult = await this.saveOrphanage.save(orphanage)
    return orphanageResult
  }
}
