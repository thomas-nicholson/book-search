const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: String
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: String
        user: User
    }

    input BookInput {
        authorsArray: [String]
        description: String
        title: String
        bookId: String
        image: String
        link: Sstring
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: BookInput): User
        removeBook(bookId): User 
        
    }
`;

module.exports = typeDefs;