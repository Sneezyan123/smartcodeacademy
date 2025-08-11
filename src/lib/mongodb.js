import { MongoClient } from 'mongodb'

let cachedClient = globalThis._smartcode_mongo_client || null
let cachedDb = globalThis._smartcode_mongo_db || null

async function connectToMongo() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const mongoUri = process.env.MONGODB_URI
  const databaseName = process.env.MONGODB_DB || 'SmartCdeLogs'

  if (!mongoUri) {
    throw new Error('Missing MONGODB_URI environment variable')
  }

  const client = new MongoClient(mongoUri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  })

  await client.connect()
  const db = client.db(databaseName)

  // Cache for hot-reload in dev
  globalThis._smartcode_mongo_client = client
  globalThis._smartcode_mongo_db = db
  cachedClient = client
  cachedDb = db

  return { client, db }
}

export async function getDb() {
  const { db } = await connectToMongo()
  return db
}

export async function getCollection(collectionName) {
  const db = await getDb()
  return db.collection(collectionName)
}


