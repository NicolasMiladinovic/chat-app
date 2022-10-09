const { ApolloServer } = require('apollo-server');

const { sequelize } = require('./models/index.js')

const resolvers = require('./graphql/resolver.js')
const typeDefs = require('./graphql/typeDefs.js')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: (ctx) => ctx
})

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)

    sequelize
        .authenticate()
        .then(() => console.log('Database connected'))
        .catch((e) => console.log(e))
})