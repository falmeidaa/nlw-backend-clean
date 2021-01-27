import { Error as ErrorEntity } from '../../../../../typeorm/entities/error'
import TypeOrmHelper from '../../helpers/typeorm-helper'
import { LogErrorTypeORMRepository } from './log-error-repository'
import faker from 'faker'

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
