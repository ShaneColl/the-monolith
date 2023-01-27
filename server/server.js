const { ApolloServer, gql, AuthenticationError } = require('apollo-server');
const { buildSubgraphSchema } = require("@apollo/subgraph");


member_list = [{
    "id": "1",
    "name": "Shane"
},
{
    "id": "2",
    "name": "Kyle"
},
{
    "id": "3",
    "name": "Mitch"
},
{
    "id": "4",
    "name": "Mario"
},
{
    "id": "5",
    "name": "Gaylen"
}];

location_list = [{
    "id": "1",
    "name": "Tampa"
},
{
    "id": "2",
    "name": "Austin"
},
{
    "id": "3",
    "name": "Phoenix"
},
{
    "id": "4",
    "name": "Vancouver"
},
{
    "id": "5",
    "name": "Austin"
}];

const typeDefs = gql`
    extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0",
    import: ["@key"])
    type Query {
        Member: [Member]
        Location: [Location]
    }

    type Member {
        id: ID!
        name: String!
    }

    type Location {
        id: ID!
        name: String!
    }
`;


const resolvers = {
    Query: {
        Member: (_,{name}, {dataSources, token}) => {
            //Resolver level auth null check
            if (token == null) throw new AuthenticationError("auth error");
            return dataSources.members},
        Location: (_,{name}, {dataSources, token}) => {
            //Resolver level auth nullcheck
            if (token == null) throw new AuthenticationError("auth error");
            return dataSources.locations}
    }
};


const server = new ApolloServer({
    schema: buildSubgraphSchema({
        typeDefs,
        resolvers,
    }),
    csrfPrevention: true,
    cache: 'bounded',
    context: async ({ req }) => {

        //Extract token from header
        const token = req.headers.authorization || '';

        //Check if user ID is null
        if (token == null) throw new AuthenticationError("account error");

        //return token
        return { token };

    },
    dataSources: () => {
        return {
          locations: location_list,
          members: member_list,
        };
      },
});

server.listen({port: 4001})
    .then(({url}) => console.log(`Server running at ${url}`))