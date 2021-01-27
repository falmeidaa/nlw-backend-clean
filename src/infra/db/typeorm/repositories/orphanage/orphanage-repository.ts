
import { OrphanageModel } from '../../../../../domain/models/orphanage'
import { SaveOrphanageModel } from '../../../../../domain/usecases/save-orphanage'
import { SaveOrphanageRepository } from '../../../../../data/protocols/save-orphanage-repository'
import { Orphanage } from '../../../../../typeorm/entities/orphanage'
import TypeOrmHelper from '../../helpers/typeorm-helper'

export class OrphanageTypeORMRepository implements SaveOrphanageRepository {
  async save (orphanageData: SaveOrphanageModel): Promise<OrphanageModel> {
    const orphanageRepository = await TypeOrmHelper.getEntityRepository(Orphanage)
    const orphanage = await orphanageRepository.save(orphanageData)
    return orphanage
  }
}
