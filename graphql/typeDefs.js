const {gql} = require('apollo-server')

// GraphQL schema
module.exports = gql`
type User {
    username: String!
    email: String!
}
type Query {
    getUsers: [User]!
}
`