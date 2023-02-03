const { AuthenticationError } = require('apollo-server');
const { token } = require('./index.js')

const resolvers = {
    Query: {
        Member: (_,{name}, {dataSources, token}) => {
            //Resolver level auth null check
            if (token == null) throw new AuthenticationError("auth error");
            return dataSources.members},
    }
};

module.exports = resolvers;