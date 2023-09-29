import fs from 'fs';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServer } from '@apollo/server';
import { ApolloGateway } from '@apollo/gateway';

const gateway = new ApolloGateway({
  supergraphSdl: fs.readFileSync('supergraph.graphql', 'utf8'),
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);