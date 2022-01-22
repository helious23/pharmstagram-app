import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  // uri: "https://plastic-gecko-72.loca.lt/graphql",
  cache: new InMemoryCache(),
});

export default client;
