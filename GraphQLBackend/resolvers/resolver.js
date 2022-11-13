// Resolvers define the technique for fetching the types in the schema.
import {v4 as uuidv4} from "uuid";

export const resolvers = {
    Query: {
        bookCount: (
            root,
            args
        ) => {
            if (args.author) {
                return books.filter(book => book.author === args.author).length
            }
            if (args.genre) {
                return books.filter(book => book.genres.includes(args.genre)).length
            }
            return books.length
        },
        authorCount: () => authors.length,
        allBooks: (root, args ) => {
            if (!args.author && !args.genre) {
                return books
            }
            if (args.author) {
                return books.filter(book => book.author === args.author)

            }
            if (args.genre) {
                return books.filter(book =>book.genres.includes(args.genre))
            }

        },
        allAuthors: () => authors.map(author => {
            return {
                name: author.name,
                born: author.born,
                bookCount: books.filter(book => book.author === author.name).length
            }
        })
    },
    Mutation: {
        addBook: (root, args) => {
            if (!authors.find(author => author.name === args.name )) {
                const author = { name: args.author, id: uuidv4() }
            }
            const book = { ...args, id: uuidv4() }
            books = books.concat(book)
            return book

        },
        editAuthor: (root, args) => {
            console.log(` editAuthor: ${args.name} ${args.setBornTo}`)
            const author = authors.find( author => author.name === args.name)
            if (!author) {
                return null
            }
            const updatedAuthor = { ...author, born: args.setBornTo }
            authors = authors.map(author => author.name === args.name ? updatedAuthor : author)
            return updatedAuthor

        }
    }
}
