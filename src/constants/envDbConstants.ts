import * as dotenv from 'dotenv'
dotenv.config()

export default class envDbConstants {
  static url: string | any = process.env.DATABASE_URL
}
