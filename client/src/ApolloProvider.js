import { ApolloClient, InMemoryCache, ApolloProvider as Provider } from '@apollo/client'
import React from 'react'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
})

export default function ApolloProvider(props) {
  return <Provider client={client} {...props}/>
}