'use client';

import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

// Определяем URL для разных сред
const getGraphQLUri = () => {
  // Если указана переменная окружения, используем её
  if (process.env.NEXT_PUBLIC_GRAPHQL_URI) {
    return process.env.NEXT_PUBLIC_GRAPHQL_URI;
  }
  
  // Если в браузере и на localhost, используем localhost
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:4000/graphql';
  }
  
  // По умолчанию
  return 'http://localhost:4000/graphql';
};

const getWsUri = () => {
  if (process.env.NEXT_PUBLIC_GRAPHQL_WS_URI) {
    return process.env.NEXT_PUBLIC_GRAPHQL_WS_URI;
  }
  
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'ws://localhost:4000/graphql';
  }
  
  return 'ws://localhost:4000/graphql';
};

const httpLink = new HttpLink({
  uri: getGraphQLUri(),
});

const wsLink = typeof window !== 'undefined' 
  ? new GraphQLWsLink(
      createClient({
        url: getWsUri(),
      })
    )
  : null;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    console.log('GraphQL URI:', getGraphQLUri());
  }
});

const link = typeof window !== 'undefined' && wsLink 
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      from([errorLink, httpLink])
    )
  : from([errorLink, httpLink]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
});