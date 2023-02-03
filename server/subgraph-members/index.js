const { ApolloServer, gql, AuthenticationError } = require('@apollo/server');
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { startStandaloneServer } = require('@apollo/server/standalone')
const {member_list} = require('./datasources/members_data.js');



const { readFileSync } = require('fs');

//const typeDefs = gql(readFileSync('./members.graphql', { encoding: 'utf-8' }));
//const resolvers = require('./resolvers');

const typeDefs = readFileSync('./members.graphql', { encoding: 'utf-8' });
const resolvers = require('./resolvers');
const { parse } = require('graphql');

async function startApolloServer() {
    const server = new ApolloServer({
        schema: buildSubgraphSchema({ typeDefs: parse(typeDefs), resolvers }),
    });

    const port = 4002;
    const subgraphName = 'members';

    try {
    const { url } = await startStandaloneServer(server, {
      context: async ({req}) => {
        //Extract token from header
        const token = req.headers.authorization || '';
        //Check if user ID is null
        if (token == null) throw new AuthenticationError("account error");
        //return token
        
        return {
          dataSources: {
            members: member_list,
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