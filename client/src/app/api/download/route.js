const { MongoClient, ServerApiVersion } = require('mongodb');
var dotenv = require('dotenv');
var dotenvExpand = require('dotenv-expand');
import { readFile } from 'fs/promises';
import path from 'path';

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

export async function POST(request, params ) {
  const { download } = await request.json();

  try {
    // Connect to the MongoDB server
    await client.connect();

    const db = client.db(dbName);
    const uploads = db.collection('uploads');

    const upload = await uploads.findOne({ url: download });

    const filePath = upload.filename;

    const buffer = await readFile(path.join(process.cwd(), '\\uploads', filePath));

    const headers = new Headers();
    headers.append('Content-Disposition', `attachment; filename="${filePath}"`);
    headers.append('Content-Type', upload.type);

    return new Response(buffer, {
      headers,
    });
  } catch (error) {
      // Handle any errors that occurred during the process
      console.error('An error occurred:', error);
      return Response.error({ status: 'error', message: 'An error occurred during login' });
  } finally {
      // Ensure the client is closed
      await client.close();
  }
}