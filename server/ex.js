const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    getProducts: [Product]
  }

  type Product {
    id: ID
    name: String
    # Need a field resolver
    reviews: [Review]
  }

  type Review {
    id: ID
    productId: ID
    text: String
  }
`;

const resolvers = {
  Query: {
    getProducts: (parent, args, { dataSources, token }) => {
      return dataSources.products();
    },
  },
  Product: {
    reviews: (parent, args, { dataSources, token }) => {
      return dataSources.reviews(parent.id);
    },
  },
};
