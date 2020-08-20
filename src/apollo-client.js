import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { setContext } from "apollo-link-context";
import { SubscriptionClient } from "subscriptions-transport-ws";

const httpAdress =
  process.env.NODE_ENV === "production"
    ? "https://workout-db.herokuapp.com/v1/graphql"
    : "http://192.168.178.24:8081/v1/graphql";

const wsAdress =
  process.env.NODE_ENV === "production"
    ? "wss://workout-db.herokuapp.com/v1/graphql"
    : "ws://192.168.178.24:8081/v1/graphql";

const httpLink = new HttpLink({
  uri: httpAdress,
});

//let token = localStorage.getItem("apollo-token");

async function getAuth(tokenName) {
  if (typeof window !== "undefined") {
    // get the authentication token from local storage if it exists
    const token = await window.localStorage.getItem(tokenName);
    // return the headers to the context so httpLink can read them
    return token ? `Bearer ${token}` : "";
  }
}

const authLink = setContext(async (_, { headers, ...context }) => {
  //if (!token) {
  const token = await getAuth("apollo-token");
  //}
  return {
    headers: {
      ...headers,
      ...(token ? { authorization: token } : {}),
    },
    ...context,
  };
});

//Create the subscription websocket link
const wsLink =
  // Get the authentication token from local storage if it exists
  //const token = localStorage.getItem("apollo-token");
  new WebSocketLink(
    new SubscriptionClient(wsAdress, {
      reconnect: true,
      timeout: 30000,
      lazy: true,
      // connectionParams: async () => {
      //   const token = await getAuth("apollo-token");
      //   return Authorization
      //     ? { Authorization, headers: { Authorization } }
      //     : {};
      // },
      connectionParams: async () => {
        const Authorization = await getAuth("apollo-token");
        return Authorization
          ? { Authorization, headers: { Authorization } }
          : {};
      },
    })
    // {
    // uri: "ws://localhost:8081/v1/graphql",
    // options: {
    //   reconnect: true,
    //   timeout: 30000,
    //   connectionParams: () => {
    //     const Authorization = getAuth("apollo-token");
    //     return Authorization
    //       ? { Authorization, headers: { Authorization } }
    //       : {};
    //   },
    //},
  );

//using the ability to split links, you can send data to each link
//depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

// Create the apollo client
export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
