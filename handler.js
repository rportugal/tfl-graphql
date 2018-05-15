const { graphqlLambda, graphiqlLambda } = require('apollo-server-lambda');
const { makeExecutableSchema } = require('graphql-tools');
const { typeDefs } = require('./src/main');
const { resolvers } = require('./src/main');

const myGraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// function graphqlHandler(event, context, callback) {
//   function callbackWithHeaders(error, output) {
//     // eslint-disable-next-line no-param-reassign
//     output.headers['Access-Control-Allow-Origin'] = '*';
//     callback(error, output);
//   }

//   const handler = graphqlLambda({ schema: myGraphQLSchema });
//   return handler(event, context, callbackWithHeaders);
// }

exports.graphqlHandler = graphqlLambda({ schema: myGraphQLSchema });
exports.graphiqlHandler = graphiqlLambda({ endpointURL: '/dev/graphql' });
