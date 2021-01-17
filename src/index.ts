import express from 'express';
import config from './config';
import routes from './routes';

const app = express();
const PORT = config.PORT; // Default port to listen

// Start the express server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
  // Register routes
  app.use(routes);
});
