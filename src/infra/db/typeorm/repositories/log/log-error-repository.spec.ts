import { LogErrorRepository } from '../../../../../data/protocols/log-error-repository'
import TypeOrmHelper from '../../helpers/typeorm-helper'
import { Error as ErrorEntity } from '../../../../../typeorm/entities/error'
import faker from 'faker'

class LogErrorTypeORMRepository implements LogErrorRepository {
  async log (stack: string): Promise<void> {
    const logErrorRepository = await TypeOrmHelper.getEntityRepository<ErrorEntity>(ErrorEntity)
    const error = await logErrorRepository.save({ date: new Date(), errorStack: stack, isResolved: false })
    console.log(error)
  }
}

describe('Typeorm LogError Repository', () => {
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
    const sut = new LogErrorTypeORMRepository()
    const stack = faker.random.words()
    await sut.log(stack)
    const logErrorRepository = await TypeOrmHelper.getEntityRepository<ErrorEntity>(ErrorEntity)
    const count = await logErrorRepository.count()
    expect(count).toBe(1)
  })
})
