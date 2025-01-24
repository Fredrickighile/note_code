// server.js
import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';



// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection pool
const pool = new pg.Pool({
    user: process.env.DB_USER, // use environment variable
    host: process.env.DB_HOST, // use environment variable
    database: process.env.DB_NAME, // use environment variable
    password: process.env.DB_PASSWORD, // use environment variable
    port: process.env.DB_PORT, // use environment variable
});

// Routes
app.get('/notes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM notes');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.post('/notes', async (req, res) => {
    const { title, content } = req.body;
    try {
        const result = await pool.query('INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *', [title, content]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.delete('/notes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM notes WHERE id = $1', [id]);
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Serve static files from React app

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
