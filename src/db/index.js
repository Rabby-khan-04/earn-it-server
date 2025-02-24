import { MongoClient, ServerApiVersion } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const database = client.db("earn-it");

async function connectDB() {
  try {
    console.log("Successfully connected to MongoDB!");
  } catch (err) {
    console.log(`MONGODB Connection ERROR: ${err}`);
  }
}

export default connectDB;
