import { OrphanageModel } from '../../domain/models/orphanage'
import { SaveOrphanage, SaveOrphanageModel } from '../../domain/usecases/save-orphanage'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest, ok, serverError } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http/http'

export class SaveOrphanageController {
  constructor (private readonly saveOrphanage: SaveOrphanage) {}

  async handle (httpRequest: HttpRequest<SaveOrphanageModel>): Promise<HttpResponse<OrphanageModel>> {
    try {
      const fields = [
        'name',
        'latitude',
        'longitude',
        'about',
        'instructions',
        'opening_hours',
        'open_on_weekends'
      ]
      for (const field of fields) {
        // eslint-disable-next-line no-prototype-builtins
        if (!httpRequest.body.hasOwnProperty(field)) {
          return (badRequest(new MissingParamError(field)))
        }
      }
      const orphanage = await this.saveOrphanage.save(httpRequest.body)
      return ok(orphanage)
    } catch (error) {
      return serverError(error)
    }
  }
}
