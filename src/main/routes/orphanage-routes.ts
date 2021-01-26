import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeSaveOrphanageController } from '../factoires/save-orphanage-factory'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/orphanage', adaptRoute(makeSaveOrphanageController()))
}
