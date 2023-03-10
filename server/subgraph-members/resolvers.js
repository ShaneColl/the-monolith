const { AuthenticationError } = require('apollo-server');
const { token } = require('./index.js')

const resolvers = {
    Query: {
        Member: (_,{name}, {dataSources, token}) => {
            console.log("Member Query");
            //Resolver level auth null check
            if (token == null) throw new AuthenticationError("auth error");
            return dataSources.members},
    },
    /*Member: {
        __resolveReference: ({locationId}, {dataSources}) => {
            console.log("Hello!!!");
            const locations = dataSources.find(l => l.locationId === locationId);
            return locations.locationId;
          },
    },*/
    Location: {
        __resolveReference: ({locationId}) => {
            console.log("location resolveref");

            return {id: locationId};
        },
        membersInLocation: (parent, {name}, {dataSources, token}) => {
            console.log("membersInLocation")
            const locations = dataSources.members.find(l => l.locationId === parent.id);
            return locations;
        },
    }
        /*__resolveReference: ({ locationId }, { dataSources }) => {
          console.log(locationId);
          console.log("A");
          const locations = dataSources.find(l => l.locationId === locationId);
          return locations;
        },
        Member: (parent, _, )*/
      
};

module.exports = resolvers;