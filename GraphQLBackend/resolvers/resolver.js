// Resolvers define the technique for fetching the types in the schema.
import {v4 as uuidv4} from "uuid";
import Author from "../models/author.js";
import Book from "../models/book.js";
import InitialData from "../data/initial.js";

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
        addBook: async  (root, args) => {

            const author = await Author
                .findOne({name: args.author})
                .catch(err => console.log(err))
            if (!author) {
                const newAuthor = new Author({
                    name: args.author,
                    born: null,
                    bookCount: 1
                })
            }
            const book = new Book({
                title: args.title,
                published: args.published,
                author: author._id,
                genres: args.genres
            })


        },
        editAuthor: async (root, args) => {
          const author = await Author
              .findOne({name: args.name})
                .catch(err => console.log(err))
            if (!author) {
                return null
            }
            author.born = args.setBornTo
            await author.save()
            return author

        },
        initDataBase: async (root, args) => {
            // Delete all authors and books
            await Author.deleteMany({})
            await Book.deleteMany({})
            // Add authors and books
            const authors = InitialData.authors
            const books = InitialData.books
            for (const {name, born} of authors) {
                const newAuthor = new Author({
                    name,
                    born,
                    bookCount: 0
                })
                await newAuthor.save()
            }
        }


    }
}


