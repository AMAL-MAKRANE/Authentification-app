import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';

import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers';

const MONGODB = "mongodb+srv://cluster0.mjcuc.mongodb.net/myFirstDatabase";


const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log("MongoDB Connected");
        return server.listen({ port: 5000 });
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    });