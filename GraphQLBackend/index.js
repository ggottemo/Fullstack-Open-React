import {ApolloServer, gql} from 'apollo-server';

import { v4 as uuidv4 } from 'uuid';
import ConfigMongo from "./mongo.js";
import {typeDefs} from "./models/TypeDefs.js";
import InitialData from "./data/initial.js";
import {myPlugin} from "./plugins/plugin.js";
import {resolvers} from "./resolvers/resolver.js";
const authors = InitialData.authors
const books = InitialData.books


// The ApolloServer constructor
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [myPlugin]
})

server.listen().then(({ url }) => {
    ConfigMongo();
    console.log(`Server ready at ${url}`)
})
