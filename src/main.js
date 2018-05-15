const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
// const { ApolloEngine } = require('apollo-engine');
const { makeExecutableSchema } = require('graphql-tools');
const cors = require('cors');

const ContextFactory = require('./contextFactory');
const resolvers = require('./resolvers');
const typeDefs = require('./typedefs');

// TODO: https://gist.github.com/i-like-robots/a4608cbdf21d979d9452
const app = express();
app.use(cors());

// const engine = new ApolloEngine({
//   apiKey: process.env.API_KEY
// });

// engine.listen({
//   port: 3000,
//   expressApp: app
// });
const PORT = 4001;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: ContextFactory.create(),
    // tracing: true,
    cacheControl: true
  })
);
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); //

// tfl
//   .place({ lat: 123, lon: 987, radius: 100 })
//   .then(r => console.log(r))
//   .catch(e => console.error(e));

// tfl.accidentstats(2015).then(r => console.log(r.headers));
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
