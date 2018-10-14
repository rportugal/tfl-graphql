import express from 'express';
import bodyParser from 'body-parser';
// const { ApolloEngine } = require('apollo-engine');
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import ContextFactory from './contextFactory';
import resolvers from './resolvers';
import typeDefs from './typedefs';

// TODO: https://gist.github.com/i-like-robots/a4608cbdf21d979d9452

// app.use(cors());

// const engine = new ApolloEngine({
//   apiKey: process.env.API_KEY
// });

// engine.listen({
//   port: 3000,
//   expressApp: app
// });
const PORT = 4001;

const server = new ApolloServer({ typeDefs, resolvers, context: ContextFactory.create(), cacheControl: true });

const app = express();
server.applyMiddleware({ app });

// tfl
//   .place({ lat: 123, lon: 987, radius: 100 })
//   .then(r => console.log(r))
//   .catch(e => console.error(e));

// tfl.accidentstats(2015).then(r => console.log(r.headers));
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
