const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const multer = require('multer');
const crypto = require('crypto');
import { config } from 'dotenv';

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create MySQL connection
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Handle POST request to '/login'
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Query to check user credentials
    const query = 'SELECT * FROM users WHERE email = ?';

    connection.query(query, [email], (err, res) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({ message: 'Server error' });
            return;
        }

        if (res.length == 1) {
            if (res.password == password) {
                // Successful login
                res.status(200).json({ message: 'Login successful' });
            }
        } else {
            // Failed login
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

// Handle POST request to '/register'
app.post('/register', (req, res) => {
    const { username, password, email } = req.body;

    // Check if the user already exists in the database
    const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
    connection.query(checkUserQuery, [username], (err, results) => {
        if (err) {
            console.error('Error checking user:', err);
            res.status(500).json({ message: 'Server error' });
            return;
        }

        if (results.length > 0) {
            // User already exists
            res.status(400).json({ message: 'User already exists' });
        } else {
            // If the user doesn't exist, insert a new user into the database
            const insertUserQuery = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
            connection.query(insertUserQuery, [username, password, email], (err) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    res.status(500).json({ message: 'Server error' });
                    return;
                }

                // User registration successful
                res.status(201).json({ message: 'User registered successfully' });
            });
        }
    });
});

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now(); // Get timestamp in milliseconds
        const uniqueId = crypto.randomBytes(16).toString('hex'); // Generate a unique ID

        // Encrypting the value "1_upload_timestamp in ms"
        const encryptedValue = crypto.createHash('sha256').update(`1_${timestamp}`).digest('hex');

        const fileName = `${encryptedValue}_${uniqueId}_${file.originalname}`; // Final filename
        cb(null, fileName);
    },
});

const upload = multer({ storage });

// Handle file upload on POST request to '/upload'
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    res.status(200).json({ message: 'File uploaded successfully' });
});

const fs = require('fs');
const path = require('path');

const uploadDirectory = path.join(__dirname, 'uploads'); // Path to the uploads directory


app.get('/download/:id', (req, res) => {
    const fileId = req.params.id;
    const filePath = path.join(uploadDirectory, fileId);

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File not found
            return res.status(404).json({ message: 'File not found' });
        }

        // Stream the file for download
        const fileStream = fs.createReadStream(filePath);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename=${fileId}`);
        fileStream.pipe(res);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
