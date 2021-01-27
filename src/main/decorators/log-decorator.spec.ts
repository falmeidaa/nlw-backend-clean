import { ok, serverError } from '../../presentation/helpers/http-helper'
import { Controller } from '../../presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '../../presentation/protocols/http'
import faker from 'faker'
import { LogControllerDecorator } from './log-decorator'
import { LogErrorRepository } from '../../data/protocols/log-error-repository'

class ControllerSpy implements Controller {
  params: HttpRequest
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.params = httpRequest
    return Promise.resolve(ok(httpRequest.body))
  }
}

class LogErrorRepositorySpy implements LogErrorRepository {
  params: string
  async log (stack: string): Promise<void> {
    this.params = stack
    return Promise.resolve()
  }
}

type SutTypes = {
  sut: LogControllerDecorator
  controllerSpy: ControllerSpy
  logErrorRepositorySpy: LogErrorRepositorySpy
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy()
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
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

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()
    const httpRequest = {
      body: {
        name: faker.name.findName()
      }
    }
    const error = new Error()
    error.stack = faker.random.words()
    jest.spyOn(controllerSpy, 'handle').mockReturnValueOnce(Promise.resolve(serverError(error)))
    await sut.handle(httpRequest)
    expect(logErrorRepositorySpy.params).toEqual(error.stack)
  })
})
