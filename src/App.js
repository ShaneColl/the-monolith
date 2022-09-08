import { ApolloClient, InMemoryCache, ApolloProvider, gql, HttpLink } from '@apollo/client';
import './App.css';
import Homepage from './pages/Homepage';

function App() {

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:9000/',
  })
  return (
    <ApolloProvider client={client}>
      <Homepage />
    </ApolloProvider>
  );
}

export default App;
