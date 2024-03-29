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

export async function POST(request, params ) {
  const { email, password } = await request.json();

  try {
    // Connect to the MongoDB server
    await client.connect();
    // console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection('users');

    if ( email === "" || password === "" ) {
        return Response.json({ status: 'error', message: 'Please fill all the fields!' });
    }

    // Find the user by email
    const user = await collection.findOne({ email: email });

    if (user) {
        // Check if the hashed passwords match
        const hashed_password = crypto.createHash('sha256').update(password).digest('base64');

        //if (user.password === hashed_password) {
        if (await verify(password, user.password)) {
            // Successful login
            return Response.json({ status: 'success', message: 'Login successful' });
        } else {
            // Password does not match
            return Response.json({ status: 'error', message: 'Invalid password' });
        }
    } else {
        // User not found
        return Response.json({ status: 'error', message: 'User not found' });
    }
  } catch (error) {
      // Handle any errors that occurred during the process
      console.error('An error occurred:', error);
      return Response.error({ status: 'error', message: 'An error occurred during login' });
  } finally {
      // Ensure the client is closed
      await client.close();
  }
}

async function verify(password, hash) {
    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(":")
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(key == derivedKey.toString('hex'))
        });
    })
}