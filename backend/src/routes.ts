import { Router } from 'express';
import { fetchMovies, getMovies, getMovieById } from './controllers/moviesController';

export const moviesRouter = Router();

moviesRouter.get('/', getMovies);

moviesRouter.get('/fetch', fetchMovies);

moviesRouter.get('/:id', getMovieById);
