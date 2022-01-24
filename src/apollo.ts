import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TOKEN = "TOKEN";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const logUserIn = async (token: string) => {
  try {
    await AsyncStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
    tokenVar(token);
  } catch (error) {
    console.log(error);
  }
};

export const logUserOut = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN);
    isLoggedInVar(false);
    tokenVar("");
  } catch (error) {
    console.log(error);
  }
};

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  // uri: "https://nasty-monkey-89.loca.lt/graphql",
  cache: new InMemoryCache(),
});

export default client;
