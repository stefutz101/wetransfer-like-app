const { MongoClient, ServerApiVersion } = require('mongodb');
//const multer = require('multer');
const crypto = require('crypto');
var dotenv = require('dotenv');
var dotenvExpand = require('dotenv-expand');

/* .env init */
var myEnv = dotenv.config()
dotenvExpand.expand(myEnv)

/* Create a MongoClient with a MongoClientOptions object to set the Stable API version */
const client = new MongoClient(process.env.MONGO_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

const dbName = process.env.dbName; // Replace with your database name

export async function GET(request, params ) {
  const { id } = await params.json();

  try {
    // Connect to the MongoDB server
    await client.connect();
    // console.log('Connected successfully to server');

    console.log(id);
    const db = client.db(dbName);
    const uploads = db.collection('users');

    const user = await uploads.findOne({ url: id });

    
  } catch (error) {
      // Handle any errors that occurred during the process
      console.error('An error occurred:', error);
      return Response.error({ status: 'error', message: 'An error occurred during login' });
  } finally {
      // Ensure the client is closed
      await client.close();
  }
}