const { AuthenticationError } = require('apollo-server');
const { token } = require('./index.js')

const resolvers = {
    Query: {
        Members: (_,{name}, {dataSources, token}) => {
            //Resolver level auth null check
            if (token == null) throw new AuthenticationError("auth error");
            return dataSources.members;
        },
        member: (_, { id }, { dataSources }) => {
            const mem = dataSources.members.find(element => element.id === id);
            return mem;
        },
    },
    Member: {
        realFoodWeight(parent, {name}, {dataSources, token}) {
            console.log("foodweight")
            return parent.foodWeight + 1;
        }
    },
    Location: {
        __resolveReference: ({locationId}) => {

            return {id: locationId};
        },
        membersInLocation: (parent, {name}, {dataSources, token}) => {
            const locations = dataSources.members.filter(l => l.locationId === parent.id);
            return locations;
        },
    },
    Food: {
        __resolveReference: ({foodId}) => {

            return {id: foodId};
        },
        favoriteFood: (parent, {name}, {dataSources, token}) => {
            const food = dataSources.members.find(l => l.foodId === parent.id);
            return food;
        },
    }, 
   
};

module.exports = resolvers;