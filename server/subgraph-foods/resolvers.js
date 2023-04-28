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
    Member: {
        __resolveReference: ({foodId}) => {

            return {id: foodId};
        },
        foodWeight: (parent, {name}, {dataSources, token}) => {
            const weight = dataSources.foods.find(l => l.foodId === parent.id);
            return weight.foodWeight;
        },
    },
  
};

module.exports = resolvers;