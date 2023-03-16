const { AuthenticationError } = require('apollo-server');
const { token } = require('./index.js')

const resolvers = {
    Query: {
        Members: (_,{name}, {dataSources, token}) => {
            console.log("Member Query");
            //Resolver level auth null check
            if (token == null) throw new AuthenticationError("auth error");
            return dataSources.members;
        },
    },
    Location: {
        __resolveReference: ({locationId}) => {
            console.log("location resolveref");

            return {id: locationId};
        },
        membersInLocation: (parent, {name}, {dataSources, token}) => {
            console.log("membersInLocation")
            const locations = dataSources.members.filter(l => l.locationId === parent.id);
            return locations;
        },
    },
};

module.exports = resolvers;