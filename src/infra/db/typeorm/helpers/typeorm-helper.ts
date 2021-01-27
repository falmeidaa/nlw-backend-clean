import { Connection, createConnection, Repository } from 'typeorm'

const TypeOrmHelper = {
  connection: null as Connection,
  async connect (name: string) {
    this.connection = await createConnection(name)
  },
  async close () {
    await this.connection.close()
  },
  clear () {
    const entities = this.connection.entityMetadatas
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    entities.forEach(async (entity) => {
      const repository = this.connection.getRepository(entity.name)
      await repository.query(`DELETE FROM ${entity.tableName}`)
    })
  },
  async getEntityRepository<T> (entity): Promise<Repository<T>> {
    const repository = await this.connection.getRepository(entity)
    return repository
  }
}

export default TypeOrmHelper
