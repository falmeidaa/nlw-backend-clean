import faker from 'faker'
import { HttpRequest } from '../protocols/http/http'
import { SaveOrphanageController } from './save-orphanage-controller'

const mockHttpRequest = (): HttpRequest => ({
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

describe('OrphanageController', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SaveOrphanageController()
    const httpRequest = mockHttpRequest()
    delete httpRequest.body.name
    const httResponse = sut.handle(httpRequest)
    expect(httResponse.statusCode).toBe(400)
  })

  test('Should return 400 if no latitude is provided', () => {
    const sut = new SaveOrphanageController()
    const httpRequest = mockHttpRequest()
    delete httpRequest.body.latitude
    const httResponse = sut.handle(httpRequest)
    expect(httResponse.statusCode).toBe(400)
  })

  test('Should return 400 if no longitude is provided', () => {
    const sut = new SaveOrphanageController()
    const httpRequest = mockHttpRequest()
    delete httpRequest.body.longitude
    const httResponse = sut.handle(httpRequest)
    expect(httResponse.statusCode).toBe(400)
  })

  test('Should return 400 if no about is provided', () => {
    const sut = new SaveOrphanageController()
    const httpRequest = mockHttpRequest()
    delete httpRequest.body.about
    const httResponse = sut.handle(httpRequest)
    expect(httResponse.statusCode).toBe(400)
  })

  test('Should return 400 if no instructions is provided', () => {
    const sut = new SaveOrphanageController()
    const httpRequest = mockHttpRequest()
    delete httpRequest.body.instructions
    const httResponse = sut.handle(httpRequest)
    expect(httResponse.statusCode).toBe(400)
  })

  test('Should return 400 if no opening_hours is provided', () => {
    const sut = new SaveOrphanageController()
    const httpRequest = mockHttpRequest()
    delete httpRequest.body.opening_hours
    const httResponse = sut.handle(httpRequest)
    expect(httResponse.statusCode).toBe(400)
  })

  test('Should return 400 if no open_on_weekends is provided', () => {
    const sut = new SaveOrphanageController()
    const httpRequest = mockHttpRequest()
    delete httpRequest.body.open_on_weekends
    const httResponse = sut.handle(httpRequest)
    expect(httResponse.statusCode).toBe(400)
  })
})
