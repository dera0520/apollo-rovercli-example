import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from 'graphql-tag';
import { buildSubgraphSchema } from '@apollo/subgraph';

const typeDefs = gql`#graphql
  type Product @key(fields: "id") {
    id: ID!
    name: String!
    price: Int!
  }

  extend type Query {
    products: [Product]
  }
`;

const products = [
  {
    id: "1",
    name: 'キャベツ太郎',
    price: 30,
  },
  {
    id: "2",
    name: 'うまい棒',
    price: 10,
  },
  {
    id: "3",
    name: 'ポテトフライ',
    price: 40,
  },
];

const resolvers = {
  Query: {
    products: () => products
  },
};
const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers })
});
const { url } = await startStandaloneServer(server, {
  listen: { port: 4002 },
});

console.log(`🚀 Product Gateway Server ready at: ${url}`);