import TypeOrmHelper from '../infra/db/typeorm/helpers/typeorm-helper'
import env from './config/env'

TypeOrmHelper.connect(env.databaseName)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  })
  .catch(error => console.log(error))
