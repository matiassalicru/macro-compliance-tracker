import { ObjectId } from 'mongodb'
import nextConnect from 'next-connect'
import middleware from '../../middleware/database'

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
  const { date } = req.query

  const dataModel = {
    _id: new ObjectId(),
    date: date,
    calories: { label: 'Calories', total: 0, target: 0, variant: 0 },
    carbs: { label: 'Carbs', total: 0, target: 0, variant: 0 },
    fat: { label: 'Fat', total: 0, target: 0, variant: 0 },
    protein: { label: 'Protein', total: 0, target: 0, variant: 0 },
  }

  let doc = {}

  if (date) {
    doc = await req.db.collection('Daily').findOne({ date: new Date(date) })
  } else {
    doc = await req.db.collection('Daily').findOne()
  }
  if (doc === null) {
    doc = dataModel
  }

  res.json(doc)
})

handler.post(async (req, res) => {
  let data = req.body
  data = JSON.parse(data)
  data.date = new Date(data.date)
  let doc = await req.db
    .collection('Daily')
    .updateOne({ date: new Date(data.date) }, { $set: data }, { upsert: true })

  console.log('new doc', doc)
  res.json({ message: 'ok' })
})

export default handler
