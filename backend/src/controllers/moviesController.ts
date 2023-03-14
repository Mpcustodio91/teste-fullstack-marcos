import axios from 'axios';
import { Request, Response } from 'express';
import mysql from 'mysql2/promise';

require('dotenv').config();

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

pool.query(`
  CREATE TABLE IF NOT EXISTS movies (
    id INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    banner VARCHAR(255) NOT NULL,
    description TEXT,
    director VARCHAR(255) NOT NULL,
    producer VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
  )
`).catch((err) => {
	console.error(err);
});

interface Movie {
	id: number;
	title: string;
	banner: string;
	description: string;
	director: string;
	producer: string;
}

interface CountResult {
  total: number;
}

export async function fetchMovies(req: Request, res: Response): Promise<void> {
	try {
		let movies: Movie[] = [];

		for (let page = 1; page <= 3; page++) {
			const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=${page}`);

			const pageMovies: Movie[] = response.data.results.map((movie: any) => ({
				title: movie.title,
				banner: movie.poster_path,
				description: movie.overview,
				director: 'Unknown',
				producer: 'Unknown',
			}));

			movies = [...movies, ...pageMovies];
		}

		const sql = `
      		INSERT INTO movies (title, banner, description, director, producer)
      		VALUES (?, ?, ?, ?, ?)
    	`;

		const conn = await pool.getConnection();
		try {
			await conn.query('DELETE FROM movies');
			for (const movie of movies) {
				await conn.query(sql, [movie.title, movie.banner, movie.description, movie.director, movie.producer]);
			}
			res.json({ success: true });
		} finally {
			conn.release();
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to fetch movies' });
	}
}

export async function getMovies(req: Request, res: Response): Promise<void> {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = Number(page) * Number(limit) - Number(limit);

    const countSql = `
      SELECT COUNT(*) AS total
      FROM movies
    `;

    const sql = `
      SELECT id, title, banner, description, director, producer
      FROM movies
      ORDER BY title
      LIMIT ?
      OFFSET ?
    `;

    const conn = await pool.getConnection();
    try {
      const [countRows]: any = await conn.query(countSql);
      const total = Array.isArray(countRows) && countRows.length > 0 ? countRows[0].total : 0;
      const totalPages = Math.ceil(total / Number(limit));

      const [rows] = await conn.query(sql, [limit, offset]);

      res.json({ 
        movies: rows,
        totalPages,
        currentPage: Number(page),
        totalItems: total
      });
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
}

export async function getMovieById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const sql = `
      SELECT id, title, banner, description, director, producer
      FROM movies
      WHERE id = ?
    `;

    const conn = await pool.getConnection();
    try {
      const [rows]: any = await conn.query(sql, [id]);

      if (!Array.isArray(rows) || rows.length === 0) {
        res.status(404).json({ error: 'Movie not found' });
      } else {
        res.json(rows[0]);
      }
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
}
