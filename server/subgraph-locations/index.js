const { ApolloServer, gql } = require('@apollo/server');
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { startStandaloneServer } = require('@apollo/server/standalone');
const {location_list} = require('./datasources/locations_data.js');


const { readFileSync } = require('fs');

const typeDefs = readFileSync('./locations.graphql', { encoding: 'utf-8' });
const resolvers = require('./resolvers');
const { parse } = require('graphql');

console.log(typeDefs);



async function startApolloServer() {
    const server = new ApolloServer({
        schema: buildSubgraphSchema({ typeDefs: parse(typeDefs), resolvers }),
    });

    const port = 4001;
    const subgraphName = 'locations';

    try {
    const { url } = await startStandaloneServer(server, {
      context: async ({req}) => {
        //Extract token from header
        const token = req.headers.authorization || '';
        //Check if user ID is null
        if (token == null) throw new AuthenticationError("account error");
        return {
          dataSources: {
            locations: location_list,
          },
          token,
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