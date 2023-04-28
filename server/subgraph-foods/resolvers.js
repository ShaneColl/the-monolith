const { AuthenticationError } = require('apollo-server');
const { token } = require('./index.js')

const resolvers = {
    Query: {
        foods: (_,{name}, {dataSources, token}) => {
            //Resolver level auth null check
            if (token == null) throw new AuthenticationError("auth error");
            return dataSources.foods;
        },
    },
  
};

module.exports = resolvers;