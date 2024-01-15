const { MongoClient, ServerApiVersion } = require('mongodb');
//const multer = require('multer');
const crypto = require("crypto");
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
    const { email, password1, password2 } = await request.json();

    try {
        // Connect to the MongoDB server
        await client.connect();
        //console.log('Connected successfully to server');

        const db = client.db(dbName);
        const collection = db.collection('users');

        // check for empty fields
        if (email === "" || password1 === "" || password2 === "") {
            return Response.json({ status: 'error', message: 'Please fill all the fields!' });
        }

        // check if email is actually an email address
        const validEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
        if (!validEmail.test(email)) {
            return Response.json({ status: 'error', message: 'Please enter a valid email address!' });
        }

        // check if both passwords match
        if (password1 != password2) {
            return Response.json({ status: 'error', message: 'The passwords are not matching!' });
        }

        // check if password is at least 6 chars long, contains lower, upper and numbers.
        const validPassword = new RegExp(/^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/g);
        if (!validPassword.test(password1)) {
            return Response.json({ status: 'error', message: 'Please enter a valid password!' });
        }

        // Find the not user is registered
        const user = await collection.findOne({ email: email });
        if (!user) {
            const password = await hash(password1);

            const res = await collection.insertOne({
                email: email, 
                password: password 
            });

            if (res) {
                return Response.json({ status: 'success', message: 'Register successful!' });
            }
        } else {
            return Response.json({ status: 'error', message: 'Email already registered!' });
        }
    } catch (error) {
        // Handle any errors that occurred during the process
        console.error('An error occurred:', error);
        return Response.error({ status: 'error', message: 'An error occurred during register!' });
    } finally {
        // Ensure the client is closed
        await client.close();
    }
}

async function hash(password) {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(8).toString("hex")

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString('hex'))
        });
    })
}