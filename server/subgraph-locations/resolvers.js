const resolvers = {
    Query: {
        Location: (_,{name}, {dataSources, token}) => {
            //Resolver level auth nullcheck
            if (token == null) throw new AuthenticationError("auth error");
            return dataSources.locations}
    }
  };
  
  module.exports = resolvers;