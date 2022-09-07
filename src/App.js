import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import './App.css';
import Homepage from './pages/Homepage';

function App() {

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri:
  })
  return (
    <ApolloProvider client={}>
      <Homepage />
    </ApolloProvider>
  );
}

export default App;
