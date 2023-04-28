const resolvers = {
    Query: {
        Locations: (_,{name}, {dataSources, token}) => {
            //Resolver level auth nullcheck
            console.log("Query location - location subgraph");
            if (token == null) throw new AuthenticationError("auth error");
            //console.log(dataSources.locations);
            return dataSources.locations;
        },
    },
    Member: {
        __resolveReference: ({locationId}) => {
            console.log("location resolver 2");
            
            return {id: locationId};
        },
        location: (parent, {name}, {dataSources, token}) => {
            console.log("membersInLocation2")
            const locations2 = dataSources.members.filter(l => l.locationId === parent.id);
            return locations2;
        },
    },
};
  
  module.exports = resolvers;