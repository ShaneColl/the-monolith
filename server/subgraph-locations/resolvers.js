const resolvers = {
    Query: {
        Location: (_,{name}, {dataSources, token}) => {
            //Resolver level auth nullcheck
            console.log("Query location - location subgraph");
            if (token == null) throw new AuthenticationError("auth error");
            //console.log(dataSources.locations);
            return dataSources.locations}
    },
    Location: {
        __resolveReference: ({locationId}) => {
            console.log("location ref resolve-location subgraph");
            return {id: locationId};
        },
    }
};
  
  module.exports = resolvers;