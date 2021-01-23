import faker from 'faker'

class OrphanageController {
  handle (httpRequest: any): any {
    return ({
      statusCode: 400
    })
  }
}

describe('OrphanageController', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new OrphanageController()
    const httResponse = sut.handle(faker.random.objectElement())
    expect(httResponse.statusCode).toBe(400)
  })
})
