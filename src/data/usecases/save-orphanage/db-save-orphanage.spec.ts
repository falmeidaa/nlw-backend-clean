import { OrphanageModel } from '@/domain/models/orphanage'
import { SaveOrphanageModel } from '@/domain/usecases/save-orphanage'
import { SaveOrphanageRepository } from '@/data/protocols/save-orphanage-repository'
import { HttpRequest } from '@/presentation/protocols/http/http'
import { DbSaveOrphanage } from './db-save-orphanage'
import faker from 'faker'

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

class SaveOrphanageSpy implements SaveOrphanageRepository {
  params: SaveOrphanageModel
  async save (orphanageData: SaveOrphanageModel): Promise<OrphanageModel> {
    this.params = orphanageData
    return Promise.resolve(null)
  }
}

type SutTypes = {
  saveOrphanageSpy: SaveOrphanageSpy
  sut: DbSaveOrphanage
}

const makeSut = (): SutTypes => {
  const saveOrphanageSpy = new SaveOrphanageSpy()
  const sut = new DbSaveOrphanage(saveOrphanageSpy)
  return {
    sut,
    saveOrphanageSpy
  }
}

describe('DbSaveOrphanage Usecase', () => {
  test('Should call SaveOrphanageRepository with correct values', async () => {
    const { sut, saveOrphanageSpy } = makeSut()
    const httpRequest = mockHttpRequest()
    await sut.save(httpRequest.body)
    expect(saveOrphanageSpy.params).toEqual(httpRequest.body)
  })
})
