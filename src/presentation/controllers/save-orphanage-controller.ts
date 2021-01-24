import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../protocols/helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http/http'

export class SaveOrphanageController {
  handle (httpRequest: HttpRequest): HttpResponse {
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
      if (!httpRequest.body[field]) {
        return (badRequest(new MissingParamError(field)))
      }
    }
  }
}
