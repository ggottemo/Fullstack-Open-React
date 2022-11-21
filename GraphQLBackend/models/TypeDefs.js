import {gql} from 'apollo-server';

// Type definitions define the "shape" of your data
const typeDefs = () => gql`
    type Query {
        bookCount: Int
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    },
    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
    },
    type Author {
        name: String!
        born: Int
        bookCount: Int!
    }
    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ) : Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ) : Author
        initDataBase(
            authors: [String]!
            books: [String!]!
        ) : Boolean
        


    }

`

export {typeDefs}