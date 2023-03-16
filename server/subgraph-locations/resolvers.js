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
};
  
  module.exports = resolvers;