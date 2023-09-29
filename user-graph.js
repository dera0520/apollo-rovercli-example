import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from 'graphql-tag';
import { buildSubgraphSchema } from '@apollo/subgraph';

const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    name: String!
    birthday: String!
  }

  extend type Query {
    users: [User]
  }
`;

const users = [
  {
    id: "1",
    name: '山田太郎',
    birthday: '1980-01-01',
  },
  {
    id: "2",
    name: '鈴木一郎',
    birthday: '1990-02-02',
  },
];

const resolvers = {
  Query: {
    users: () => users,
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers })
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4001 },
});

console.log(`🚀 User Server ready at: ${url}`);