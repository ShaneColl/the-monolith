import React from "react";
import { useQuery, gql } from '@apollo/client';

const GET_LOCATIONS = gql`
  query Location {
    Location {
      id
      name
    }
  }
`;

const GET_MEMBERS = gql`
  query Member {
    Member {
      id
      name
    }
  }
`;

function Homepage() {
    
    return (
        <div className="homepage">
        <h1>Team and Locations</h1>
        <DisplayLocations />
        <DisplayMembers />
        </div>
        );

}

function DisplayLocations() {
    const { loading, error, data } = useQuery(GET_LOCATIONS);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    /*return data.location.map(({ id, name}) => (
        <div key={id}>
          <h3>{name}</h3>
        </div>
      ));*/
    
    
    return(
        <p>{data.toString()}</p>
    );
}  

function DisplayMembers() {
    const { loading, error, data } = useQuery(GET_MEMBERS);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    /* return data.member.map(({ id, name}) => (
        <div key={id}>
          <h3>{name}</h3>
        </div>
      ));*/

    
      return(
        <p>{data.toString()}</p>
    );
}  

export default Homepage;