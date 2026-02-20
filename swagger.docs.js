import express from 'express';

const app = express();

app.get('/api/', (req, res) => {
  /* #swagger.tags = ['Health']
     #swagger.description = 'Basic API health/info endpoint'
     #swagger.responses[200] = {
       description: 'API is reachable',
       schema: {
         msg: 'Game Tracker API'
       }
     }
  */
  res.status(200).json({});
});

app.post('/api/auth/register', (req, res) => {
  /* #swagger.tags = ['Authentication']
     #swagger.description = 'Register a new user account'
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: {
         $username: 'john_doe',
         $email: 'john@example.com',
         $password: 'secret123'
       }
     }
     #swagger.responses[201] = {
       description: 'User created'
     }
     #swagger.responses[409] = {
       description: 'Username already exists'
     }
  */
  res.status(201).json({});
});

app.post('/api/auth/login', (req, res) => {
  /* #swagger.tags = ['Authentication']
     #swagger.description = 'Login and receive a JWT'
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: {
         $username: 'john_doe',
         $password: 'secret123'
       }
     }
     #swagger.responses[200] = {
       description: 'Logged in successfully',
       schema: {
         success: true,
         msg: 'Logged in Successfully',
         token: 'jwt-token'
       }
     }
     #swagger.responses[401] = { description: 'Incorrect password' }
     #swagger.responses[404] = { description: 'Username not found' }
  */
  res.status(200).json({});
});

app.post('/api/auth/refresh', (req, res) => {
  /* #swagger.tags = ['Authentication']
     #swagger.description = 'Refresh JWT token'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.responses[200] = {
       description: 'New token generated',
       schema: {
         success: true,
         msg: 'New token generated Successfully',
         token: 'jwt-token'
       }
     }
     #swagger.responses[401] = { description: 'Missing/invalid token' }
  */
  res.status(200).json({});
});

app.post('/api/games', (req, res) => {
  /* #swagger.tags = ['Games']
     #swagger.description = 'Add a game to the authenticated user library'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: {
         $title: 'The Witcher 3',
         genre: 'RPG',
         platform: 'PC',
         releaseYear: 2015,
         coverURL: 'https://example.com/cover.jpg',
         status: 'PLAYING'
       }
     }
     #swagger.responses[201] = {
       description: 'Game created'
     }
     #swagger.responses[409] = { description: 'Game title already exists' }
  */
  res.status(201).json({});
});

app.get('/api/games', (req, res) => {
  /* #swagger.tags = ['Games']
     #swagger.description = 'List all games for authenticated user'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['genre'] = { in: 'query', type: 'string', required: false, description: 'Filter by genre' }
     #swagger.parameters['status'] = { in: 'query', type: 'string', required: false, enum: ['PLAYING', 'COMPLETED', 'DROPPED', 'WANT', 'ONHOLD'] }
     #swagger.parameters['platform'] = { in: 'query', type: 'string', required: false, description: 'Filter by platform' }
     #swagger.parameters['sort'] = { in: 'query', type: 'string', required: false, description: 'Sort field' }
     #swagger.parameters['order'] = { in: 'query', type: 'string', required: false, enum: ['asc', 'desc'] }
     #swagger.responses[200] = { description: 'Games fetched successfully' }
  */
  res.status(200).json({});
});

app.get('/api/games/:id', (req, res) => {
  /* #swagger.tags = ['Games']
     #swagger.description = 'Get one game by ID for authenticated user'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['id'] = { in: 'path', required: true, type: 'string', description: 'Game ID' }
     #swagger.responses[200] = { description: 'Game fetched successfully' }
     #swagger.responses[404] = { description: 'Game not found' }
  */
  res.status(200).json({});
});

app.put('/api/games/:id', (req, res) => {
  /* #swagger.tags = ['Games']
     #swagger.description = 'Update one game by ID for authenticated user'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['id'] = { in: 'path', required: true, type: 'string', description: 'Game ID' }
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: {
         title: 'The Witcher 3',
         genre: 'RPG',
         platform: 'PC',
         releaseYear: 2015,
         coverURL: 'https://example.com/cover.jpg',
         status: 'COMPLETED'
       }
     }
     #swagger.responses[200] = { description: 'Game updated successfully' }
  */
  res.status(200).json({});
});

app.delete('/api/games/:id', (req, res) => {
  /* #swagger.tags = ['Games']
     #swagger.description = 'Delete one game by ID for authenticated user'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['id'] = { in: 'path', required: true, type: 'string', description: 'Game ID' }
     #swagger.responses[200] = { description: 'Game deleted successfully' }
  */
  res.status(200).json({});
});

app.post('/api/games/:id/reviews', (req, res) => {
  /* #swagger.tags = ['Reviews']
     #swagger.description = 'Add a review for a completed game'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['id'] = { in: 'path', required: true, type: 'string', description: 'Game ID' }
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: {
         $rating: 9,
         $review_text: 'Amazing world building and quests.'
       }
     }
     #swagger.responses[201] = { description: 'Review added successfully' }
     #swagger.responses[403] = { description: 'Only completed games can be reviewed' }
     #swagger.responses[404] = { description: 'Game not found' }
  */
  res.status(201).json({});
});

app.put('/api/games/:id/reviews', (req, res) => {
  /* #swagger.tags = ['Reviews']
     #swagger.description = 'Update review for a game'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['id'] = { in: 'path', required: true, type: 'string', description: 'Game ID' }
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: {
         rating: 10,
         review_text: 'Updated review text'
       }
     }
     #swagger.responses[200] = { description: 'Review updated successfully' }
     #swagger.responses[404] = { description: 'Review not found for this game/user' }
  */
  res.status(200).json({});
});

app.delete('/api/games/:id/reviews', (req, res) => {
  /* #swagger.tags = ['Reviews']
     #swagger.description = 'Delete review for a game'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['id'] = { in: 'path', required: true, type: 'string', description: 'Game ID' }
     #swagger.responses[200] = { description: 'Review deleted successfully' }
     #swagger.responses[404] = { description: 'Review not found for this game/user' }
  */
  res.status(200).json({});
});

app.get('/api/stats', (req, res) => {
  /* #swagger.tags = ['Stats']
     #swagger.description = 'Get aggregated dashboard stats for the authenticated user'
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.responses[200] = {
       description: 'Stats fetched successfully',
       schema: {
         success: true,
         msg: 'Game Overview',
         result: {
           overview: {
             total_games: 24,
             PLAYING: 5,
             COMPLETED: 10,
             DROPPED: 2,
             WANT: 6,
             ONHOLD: 1
           },
           reviewStats: {
             total_reviews: 14,
             average_rating: '8.36'
           },
           thisYear: {
             gamesAdded: 7,
             games_completed: 3
           },
           topGames: [
             {
               id: 'uuid',
               title: 'The Witcher 3',
               rating: 10,
               genre: 'RPG',
               addedAt: '2026-02-20'
             }
           ]
         }
       }
     }
     #swagger.responses[401] = { description: 'Missing/invalid token' }
  */
  res.status(200).json({});
});

export default app;
