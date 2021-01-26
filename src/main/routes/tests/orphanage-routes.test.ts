import TypeOrmHelper from '@/infra/db/typeorm/helpers/typeorm-helper'
import app from '@/main/config/app'
import request from 'supertest'
import faker from 'faker'

const orphanage = {
  name: faker.name.findName(),
  latitude: faker.random.number(),
  longitude: faker.random.number(),
  about: faker.random.words(),
  instructions: faker.random.words(),
  opening_hours: faker.random.words(),
  open_on_weekends: faker.random.boolean()
}

describe('Orphanage Routes', () => {
  beforeAll(async () => {
    await TypeOrmHelper.connect('test')
  })

  beforeEach(() => {
    TypeOrmHelper.clear()
  })

  afterAll(async () => {
    await TypeOrmHelper.close()
  })
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/Orphanage')
      .send(orphanage)
      .expect(200)
  })
})
