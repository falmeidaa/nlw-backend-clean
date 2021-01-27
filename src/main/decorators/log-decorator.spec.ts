import { ok } from '../../presentation/helpers/http-helper'
import { Controller } from '../../presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '../../presentation/protocols/http'
import faker from 'faker'
import { LogControllerDecorator } from './log-decorator'

class ControllerSpy implements Controller {
  params: HttpRequest
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.params = httpRequest
    return Promise.resolve(ok(httpRequest.body))
  }
}

type SutTypes = {
  sut: LogControllerDecorator
  controllerSpy: ControllerSpy
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy()
  const sut = new LogControllerDecorator(controllerSpy)
  return {
    sut,
    controllerSpy
  }
}

describe('LogController Decorator', () => {
  test('Should call controller with correct values ', async () => {
    const { sut, controllerSpy } = makeSut()
    const httpRequest = {
      body: {
        name: faker.name.findName()
      }
    }
    await sut.handle(httpRequest)
    expect(controllerSpy.params).toEqual(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: faker.name.findName()
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok(httpRequest.body))
  })
})
