import { MongoClient } from 'mongodb'
import nextConnect from 'next-connect'

const client = new MongoClient(
  'mongodb+srv://matiassalicru:salm1594@freeclusterblog.gh05o.mongodb.net/test',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

async function database(req, res, next) {
  await client.connect()
  req.dbClient = client
  req.db = client.db('MCT')
  return next()
}

const middleware = nextConnect()

middleware.use(database)

export default middleware
