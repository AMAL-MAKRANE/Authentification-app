const { ApolloServer, PubSub } = require("apollo-server");

const mongoose = require("mongoose");

const { MONGODB } = require("./config.js");

const pubsub = new PubSub();

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub }),
});

mongoose
    .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DATABASE Connected");
        return server.listen({ port: PORT });
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    })
    .catch((err) => {
        console.error(err);
    });