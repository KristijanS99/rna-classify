import dotenv from 'dotenv';

// Initialize dotenv
dotenv.config();

export default {
  PORT: process.env.PORT || 8080,
  DB_SECRET: process.env.DB_SECRET || '',
};
