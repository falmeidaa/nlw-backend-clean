import { LogErrorTypeORMRepository } from '../../infra/db/typeorm/repositories/log/log-error-repository'
import { OrphanageTypeORMRepository } from '../../infra/db/typeorm/repositories/orphanage/orphanage-repository'
import { SaveOrphanageController } from '../../presentation/controllers/save-orphanage-controller'
import { Controller } from '../../presentation/protocols/controller'
import { LogControllerDecorator } from '../decorators/log-decorator'

export const makeSaveOrphanageController = (): Controller => {
  const dbSaveOrphanage = new OrphanageTypeORMRepository()
  const logTypeORMRepository = new LogErrorTypeORMRepository()
  const saveOrphanageController = new SaveOrphanageController(dbSaveOrphanage)
  const logControllerDecorator = new LogControllerDecorator(saveOrphanageController, logTypeORMRepository)
  return logControllerDecorator
}
