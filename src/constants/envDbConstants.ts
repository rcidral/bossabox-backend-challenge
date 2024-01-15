import * as dotenv from 'dotenv'
import { env } from '../infra/env'

dotenv.config()

export default class envDbConstants {
  static url: string | any =
    env.NODE_ENV === 'production' ? env.DATABASE_URL : env.LOCAL_DATABASE_URL
}
