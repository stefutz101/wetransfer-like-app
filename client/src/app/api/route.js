const { MongoClient, ServerApiVersion } = require('mongodb');
const crypto = require('crypto');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const { writeFile } = require('fs/promises');
const fs = require('fs');

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

export async function POST(request) {
  const data = await request.formData();

  const file = data.get('file');
  const title = data.get('title');
  const description = data.get('description');

  try {
    // Connect to the MongoDB server
    await client.connect();
    // console.log('Connected successfully to server');

    const db = client.db(dbName);
    const users = db.collection('users');
    const uploads = db.collection('uploads');

    if (file.name === '') {
        return Response.json({ status: 'error', message: 'No file selected!' });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uniqueId = crypto.randomBytes(16).toString('hex'); // Generate a unique ID
    const fileName = `${uniqueId}_${file.name}`; // Final filename
    const path = `uploads\\${fileName}`;
    await writeFile(path, buffer);

    const res = await uploads.insertOne({
        url: uniqueId,
        filename: fileName,
        type: file.type,
        name: file.name,
        title: title,
        description: description,
        downloads: 0,
        uploaded_by: null,
        until_delete: null,
        created_at: null,
    });

    if (res) {
        //var download_url = request.url.protocol + '://' + request.url.host + '/download?id=' +  uniqueId;
        var download_url = 'http://localhost:3000/download?id=' +  uniqueId;
        return Response.json({ status: 'success', url: download_url });
    }

    // Find the user by email
    /*
    const user = await users.findOne({ email: '' });

    if (user) {
        
    } else {
        // User not found
        return Response.json({ status: 'error', message: 'User not found' });
    }*/
  } catch (error) {
      // Handle any errors that occurred during the process
      console.error('An error occurred:', error);
      return Response.error({ status: 'error', message: 'An error occurred during login' });
  } finally {
      // Ensure the client is closed
      await client.close();
  }
}