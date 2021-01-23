import faker from 'faker'

type HttpResponse = {
  statusCode: number
  body: any
}

type HttpRequest = {
  body?: any
}

class OrphanageController {
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
        return ({
          statusCode: 400,
          body: httpRequest.body
        })
      }
    }
  }
}

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
    const sut = new OrphanageController()
    const httpRequest = mockHttpRequest()
    delete httpRequest.body.name
    const httResponse = sut.handle(httpRequest)
    expect(httResponse.statusCode).toBe(400)
  })

  test('Should return 400 if no latitude is provided', () => {
    const sut = new OrphanageController()
    const httpRequest = mockHttpRequest()
    delete httpRequest.body.latitude
    const httResponse = sut.handle(httpRequest)
    expect(httResponse.statusCode).toBe(400)
  })

  test('Should return 400 if no longitude is provided', () => {
    const sut = new OrphanageController()
    const httpRequest = mockHttpRequest()
    delete httpRequest.body.longitude
    const httResponse = sut.handle(httpRequest)
    expect(httResponse.statusCode).toBe(400)
  })

  test('Should return 400 if no about is provided', () => {
    const sut = new OrphanageController()
    const httpRequest = mockHttpRequest()
    delete httpRequest.body.about
    const httResponse = sut.handle(httpRequest)
    expect(httResponse.statusCode).toBe(400)
  })

  test('Should return 400 if no instructions is provided', () => {
    const sut = new OrphanageController()
    const httpRequest = mockHttpRequest()
    delete httpRequest.body.instructions
    const httResponse = sut.handle(httpRequest)
    expect(httResponse.statusCode).toBe(400)
  })

  test('Should return 400 if no opening_hours is provided', () => {
    const sut = new OrphanageController()
    const httpRequest = mockHttpRequest()
    delete httpRequest.body.opening_hours
    const httResponse = sut.handle(httpRequest)
    expect(httResponse.statusCode).toBe(400)
  })

  test('Should return 400 if no open_on_weekends is provided', () => {
    const sut = new OrphanageController()
    const httpRequest = mockHttpRequest()
    delete httpRequest.body.open_on_weekends
    const httResponse = sut.handle(httpRequest)
    expect(httResponse.statusCode).toBe(400)
  })
})
