import { OrphanageTypeORMRepository } from '../../infra/db/typeorm/repositories/orphanage-repository'
import { SaveOrphanageController } from '../../presentation/controllers/save-orphanage-controller'

export const makeSaveOrphanageController = (): SaveOrphanageController => {
  const dbSaveOrphanage = new OrphanageTypeORMRepository()
  return new SaveOrphanageController(dbSaveOrphanage)
}
