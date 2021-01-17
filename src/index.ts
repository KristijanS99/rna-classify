import express from "express";
import config from './config'

const app = express();
const PORT = config.PORT // Default port to listen

// Start the express server
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});