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

    console.log(data.Location[0].name);

    const temp_location = [];

    data.Location.forEach(element => {
        temp_location.push(
            <div key={element.id}>
                <h3>name: {element.name}</h3>

                <hr />
            </div>
        );
    });

    return (
        <div>
          {temp_location}
        </div>
      );
}  

function DisplayMembers() {
    const { loading, error, data } = useQuery(GET_MEMBERS);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const temp_location = [];

    data.Member.forEach(element => {
        temp_location.push(
            <div key={element.id}>
                <h3>name: {element.name}</h3>

                <hr />
            </div>
        );
    });

    return (
        <div>
          {temp_location}
        </div>
      );

}  

export default Homepage;