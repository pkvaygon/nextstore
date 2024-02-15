// mongo.js
import { MongoClient } from 'mongodb';

let cachedDb = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const uri = "mongodb+srv://tommymmccormick:A17914859120daemongo@crmdb.dsholo8.mongodb.net/?retryWrites=true&w=majority";
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const client = new MongoClient(uri, options);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    cachedDb = client.db('nextstore');
    const coll = cachedDb.collection('shoes')
    console.log(coll)
    return coll;
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    throw error;
  }
}
