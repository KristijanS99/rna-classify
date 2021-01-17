import * as faunadb from 'faunadb';
import config from '../config';

const client = new faunadb.Client({
  secret: config.DB_SECRET,
});

export default client;

export const q = faunadb.query;
