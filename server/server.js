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
        Member: (_,{name}, context) => {
            //Resolver level auth null check
            if (!context) throw new AuthenticationError("auth error");
            return context.dataSources.members},
        Location: (_,{name}, context) => {
            //Resolver level auth nullcheck
            if (!context) throw new AuthenticationError("auth error");
            return context.dataSources.locations}
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

        //extract userID
        const userId = token.split(' ')[1];

        //Check if user ID is null
        if (userId)! {
            throw: AuthenticationError("account error"),
        };

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