import express from 'express';
import config from './config';
import routes from './routes';
import parser from 'body-parser';

const app = express();
const PORT = config.PORT; // Default port to listen

app.use(parser.json({limit: '5000kb'}));

// Start the express server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
  // Register routes
  app.use(routes);
});
