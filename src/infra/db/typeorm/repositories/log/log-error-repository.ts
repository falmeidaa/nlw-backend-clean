import { Error as ErrorEntity } from '../../../../../typeorm/entities/error'
import { LogErrorRepository } from '../../../../../data/protocols/log-error-repository'
import TypeOrmHelper from '../../helpers/typeorm-helper'

export class LogErrorTypeORMRepository implements LogErrorRepository {
  async log (stack: string): Promise<void> {
    const logErrorRepository = await TypeOrmHelper.getEntityRepository<ErrorEntity>(ErrorEntity)
    await logErrorRepository.save({ date: new Date(), errorStack: stack, isResolved: false })
  }
}
