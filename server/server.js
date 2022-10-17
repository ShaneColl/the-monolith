const { argumentsObjectFromField } = require("@apollo/client/utilities");
const { ApolloServer, gql, AuthenticationError } = require("apollo-server");

const member_list = [
  {
    id: "1",
    name: "Shane",
  },
  {
    id: "2",
    name: "Kyle",
  },
  {
    id: "3",
    name: "Mitch",
  },
  {
    id: "4",
    name: "Mario",
  },
  {
    id: "5",
    name: "Gaylen",
  },
];

const location_list = [
  {
    id: "1",
    name: "Tampa",
  },
  {
    id: "2",
    name: "Austin",
  },
  {
    id: "3",
    name: "Phoenix",
  },
  {
    id: "4",
    name: "Vancouver",
  },
  {
    id: "5",
    name: "Austin",
  },
];

const typeDefs = gql`
  type Query {
    Members: [Member]
    Location: [Location]
  }

  "look into including Location as field"
  type Member {
    id: ID!
    name: String!
    location: Location!
  }

  type Location {
    id: ID!
    name: String!
  }
`;

const resolvers = {
  Query: {
    Members: (_, { name }, { dataSources, token }) => {
      //Resolver level auth null check
      if (token == null) throw new AuthenticationError("auth error");
      return dataSources.members;
    },
    Location: (parent, args, { dataSources, token }) => {
      //Resolver level auth nullcheck
      if (token == null) throw new AuthenticationError("auth error");
      return dataSources.locations;
    },
  },
  Member: {
    location: (parent, args, { dataSources, token }) => {
      return dataSources.locations.find(
        (location) => location.id === parent.id
      );
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  context: async ({ req }) => {
    //Extract token from header
    const token = req.headers.authorization || "";

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

server
  .listen({ port: 9000 })
  .then(({ url }) => console.log(`Server running at ${url}`));
