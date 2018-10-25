import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import ContextFactory from './contextFactory';
import resolvers from './resolvers';
import typeDefs from './typedefs';

if (!process.env.TFL_API_BASE_URL) {
  throw new Error('Add env file');
}

const PORT = process.env.PORT || 4001;

const server = new ApolloServer({ typeDefs, resolvers, context: ContextFactory.create(), cacheControl: true });

const app = express();
server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
