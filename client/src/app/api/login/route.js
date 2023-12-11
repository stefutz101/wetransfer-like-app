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

const dbName = 'WeMove'; // Replace with your database name

/*
async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
}
run().catch(console.dir);
*/
/*
export async function POST(req) {
  const { email, password } = req.body;

  const collection = db.collection('users');
  const user = collection.findOne({ email: email }).toArray();

  console.log(user);

  if (user.length == 1) {
    const hashed_password = crypto.createHash('sha256').update(password).digest('hex');
    if (user.password == 'stef@wemove.com') {
        // Successful login
        return Response.json({ message: 'Login successful' })
    }
  } else {
      // Failed login
      return Response.json({ message: 'Login successful' })
  }
}*/
export async function POST(request, params ) {
  const { email, password } = await request.json();

  try {
    // Connect to the MongoDB server
    await client.connect();
    // console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection('users');

    // Find the user by email
    const user = await collection.findOne({ email: email });

    if (user) {
        // Check if the hashed passwords match
        const hashed_password = crypto.createHash('sha256').update(password).digest('hex');

        if (user.password === hashed_password) {
            // Successful login
            return Response.json({ message: 'Login successful' });
        } else {
            // Password does not match
            return Response.json({ message: 'Invalid password' });
        }
    } else {
        // User not found
        return Response.json({ message: 'User not found' });
    }
  } catch (error) {
      // Handle any errors that occurred during the process
      console.error('An error occurred:', error);
      return Response.error({ message: 'An error occurred during login' });
  } finally {
      // Ensure the client is closed
      await client.close();
  }
}