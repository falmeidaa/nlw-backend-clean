import faker from 'faker'
import { OrphanageModel } from '@/domain/models/orphanage'
import { SaveOrphanage, SaveOrphanageModel } from '@/domain/usecases/save-orphanage'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest, ok, serverError } from '@/presentation/helpers/http-helper'
import { HttpRequest } from '@/presentation/protocols/http/http'
import { SaveOrphanageController } from './save-orphanage-controller'

const mockHttpRequest = (): HttpRequest<SaveOrphanageModel> => ({
  body: {
    name: faker.name.findName(),
    latitude: faker.random.number(),
    longitude: faker.random.number(),
    about: faker.random.words(),
    instructions: faker.random.words(),
    opening_hours: faker.random.words(),
    open_on_weekends: faker.random.boolean()
  }
})

class SaveOrphanageSpy implements SaveOrphanage {
  params: SaveOrphanageModel
  async save (orphanage: SaveOrphanageModel): Promise<OrphanageModel> {
    this.params = orphanage
    const orphanageModel = Object.assign(orphanage, {}, { id: 'any_id' })
    return Promise.resolve(orphanageModel)
  }
}

type SutTypes = {
  sut: SaveOrphanageController
  saveOrphanageSpy: SaveOrphanageSpy
}

const makeSut = (): SutTypes => {
  const saveOrphanageSpy = new SaveOrphanageSpy()
  const sut = new SaveOrphanageController(saveOrphanageSpy)
  return {
    sut,
    saveOrphanageSpy
  }
}

describe('OrphanageController', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = mockHttpRequest()
    delete httpRequest.body.name
    const httResponse = await sut.handle(httpRequest)
    expect(httResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should return 400 if no latitude is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = mockHttpRequest()
    delete httpRequest.body.latitude
    const httResponse = await sut.handle(httpRequest)
    expect(httResponse).toEqual(badRequest(new MissingParamError('latitude')))
  })

  test('Should return 400 if no longitude is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = mockHttpRequest()
    delete httpRequest.body.longitude
    const httResponse = await sut.handle(httpRequest)
    expect(httResponse).toEqual(badRequest(new MissingParamError('longitude')))
  })

  test('Should return 400 if no about is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = mockHttpRequest()
    delete httpRequest.body.about
    const httResponse = await sut.handle(httpRequest)
    expect(httResponse).toEqual(badRequest(new MissingParamError('about')))
  })

  test('Should return 400 if no instructions is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = mockHttpRequest()
    delete httpRequest.body.instructions
    const httResponse = await sut.handle(httpRequest)
    expect(httResponse).toEqual(badRequest(new MissingParamError('instructions')))
  })

  test('Should return 400 if no opening_hours is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = mockHttpRequest()
    delete httpRequest.body.opening_hours
    const httResponse = await sut.handle(httpRequest)
    expect(httResponse).toEqual(badRequest(new MissingParamError('opening_hours')))
  })

  test('Should return 400 if no open_on_weekends is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = mockHttpRequest()
    delete httpRequest.body.open_on_weekends
    const httResponse = await sut.handle(httpRequest)
    expect(httResponse).toEqual(badRequest(new MissingParamError('open_on_weekends')))
  })

  test('Should call SaveOrphanage with correct values', async () => {
    const { sut, saveOrphanageSpy } = makeSut()
    const httpRequest = mockHttpRequest()
    await sut.handle(httpRequest)
    expect(saveOrphanageSpy.params).toEqual(httpRequest.body)
  })

  test('Should throws if SaveOrphanage throws', async () => {
    const { sut, saveOrphanageSpy } = makeSut()
    jest.spyOn(saveOrphanageSpy, 'save').mockImplementationOnce(async () => Promise.reject(new Error()))
    const httpResponse = await sut.handle(mockHttpRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return a 200 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = mockHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok(Object.assign(httpRequest.body, {}, { id: 'any_id' })))
  })
})
