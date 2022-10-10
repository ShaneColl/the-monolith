const { argumentsObjectFromField } = require('@apollo/client/utilities');
const { ApolloServer, gql, AuthenticationError } = require('apollo-server');

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
    "name": "Bay Area"
},
{
    "id": "4",
    "name": "Bay Area"
},
{
    "id": "5",
    "name": "Austin"
}];

const typeDefs = gql`
    
    type Query {
        Member: [Member]
        Location(id: ID!): [Location]
    }

    "look into including Location as field"
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
            if (!token) throw new AuthenticationError("auth error");
            return dataSources.members},
        Location: (parent, args, {dataSources, token}) => {
            //Resolver level auth nullcheck
            if (!token) throw new AuthenticationError("auth error");
            return dataSources.locations}
            //return dataSources.locations.find(location => location.id === args.id)}
    }
};


const server = new ApolloServer({
    typeDefs, 
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    context: async ({ req }) => {

        //Extract token from header
        const token = req.headers.authorization || '';

        //Check if user ID is null
        if (!token) throw new AuthenticationError("account error");

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

server.listen({port: 9000})
    .then(({url}) => console.log(`Server running at ${url}`))