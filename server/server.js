const { ApolloServer, gql, AuthenticationError } = require('apollo-server');
//const members_list = require('./datasources/team_members');
//const locations_list = require('./datasources/team_locations');

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

        //Member: (_,{name}, context) => members,
        Member: (_,{name}, context) => {return member_list},
        Location: {
            name: (_,{name}, context) => {dataSources.location_list[0].name}
        }
        //Location: (_,{name}, context) => {dataSources.location_list}
    }
    
};


//TODO understand how to get user
const server = new ApolloServer({
    typeDefs, 
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    context: ({ req }) => {
   
      // Get the user token from the headers.
      const token = req.headers.authorization || '';
        
      if (!token) throw new AuthenticationError('You must be logged in');

      // Add the user to the context
      return { token };

      
    },
    dataSources: () => {
        return {
          locations: location_list,
          members: member_list,
        };
      },
});

//let getMembers = function()

server.listen({port: 9000})
    .then(({url}) => console.log(`Server running at ${url}`))