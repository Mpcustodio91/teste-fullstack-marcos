const request = require('supertest');
const app = require('./index');

describe('GET /movies', () => {
  test('should return a list of movies', async () => {
    const response = await request(app).get('/movies');

    expect(response.status).toBe(200);
    expect(response.body.movies.length).toBeGreaterThan(0);
  });

  test('should return the total number of movies', async () => {
    const response = await request(app).get('/movies');

    expect(response.status).toBe(200);
    expect(response.body.totalItems).toBeDefined();
  });

  test('should return the current page and the total number of pages', async () => {
    const response = await request(app).get('/movies?page=2&limit=10');

    expect(response.status).toBe(200);
    expect(response.body.totalPages).toBeDefined();
    expect(response.body.currentPage).toBe(2);
  });

  test('should return a specific movie by id', async () => {
    const response = await request(app).get('/movies/1');

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });

  test('should return a 404 error when the movie does not exist', async () => {
    const response = await request(app).get('/movies/999');

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Movie not found');
  });
});
