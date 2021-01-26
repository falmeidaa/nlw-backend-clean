
import { SaveOrphanageModel } from '../../../../domain/usecases/save-orphanage'
import TypeOrmHelper from '../helpers/typeorm-helper'
import { OrphanageTypeORMRepository } from './orphanage-repository'
import faker from 'faker'

const mockOrphanage = (): SaveOrphanageModel => ({
  name: faker.name.findName(),
  latitude: faker.random.number(),
  longitude: faker.random.number(),
  about: faker.random.words(),
  instructions: faker.random.words(),
  opening_hours: faker.random.words(),
  open_on_weekends: faker.random.boolean()
})

describe('Typeorm Orphanage Repository', () => {
  beforeAll(async () => {
    await TypeOrmHelper.connect('test')
  })

  beforeEach(() => {
    TypeOrmHelper.clear()
  })

  afterAll(async () => {
    await TypeOrmHelper.close()
  })

  test('Should return an orphange on success', async () => {
    const sut = new OrphanageTypeORMRepository()
    const orphanageData = mockOrphanage()
    const orphanage = await sut.save(orphanageData)
    expect(orphanage).toBeTruthy()
    expect(orphanage.id).toBeTruthy()
    expect(orphanage.about).toBe(orphanageData.about)
    expect(orphanage.instructions).toBe(orphanageData.instructions)
    expect(orphanage.latitude).toBe(orphanageData.latitude)
    expect(orphanage.longitude).toBe(orphanageData.longitude)
    expect(orphanage.name).toBe(orphanageData.name)
    expect(orphanage.open_on_weekends).toBe(orphanageData.open_on_weekends)
    expect(orphanage.opening_hours).toBe(orphanageData.opening_hours)
  })
})
