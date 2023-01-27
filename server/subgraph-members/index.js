const { ApolloServer, gql, AuthenticationError } = require('apollo-server');
const { buildSubgraphSchema } = require("@apollo/subgraph");

const { readFileSync } = require('fs');

const typeDefs = gql(readFileSync('./members.graphql', { encoding: 'utf-8' }));
const resolvers = require('./resolvers');

async function startApolloServer() {
    const server = new ApolloServer({
        schema: buildSubgraphSchema({ typeDefs, resolvers }),
    });

    const port = 4002;
    const subgraphName = 'members';

    try {
    const { url } = await startStandaloneServer(server, {
      context: async () => {
        return {
          dataSources: {
            locations: location_list,
          },
        };
      },
      listen: { port },
    });

    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  } catch (err) {
    console.error(err);
  }
    
}

startApolloServer();