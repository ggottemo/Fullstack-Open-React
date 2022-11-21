import mongoose  from "mongoose";
import Author from "./models/author.js";
import Book from "./models/book.js";
import InitialData from "./data/initial.js";
const MONGO_URI = 'mongodb+srv://ggg:M9fAh8tLF6tLkq8cGp@library.jqxctfk.mongodb.net/library?retryWrites=true&w=majority'


console.log('connecting to', MONGO_URI)
const ConfigMongo = async (uri, callback) => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    }).then(() => {
        console.log('connected to MongoDB')

    }).catch((error) => {
        console.log('error connecting to MongoDB:', error.message)

    })


        await Author.deleteMany({})
        await Book.deleteMany({})
        const authors = InitialData.authors
        const books = InitialData.books
        for (const author of authors) {
            const newAuthor = new Author({
                name: author.name,
                born: author.born,
                bookCount: 0
            })
            await newAuthor.save()
        }


    for (const book of books) {
            const author = await Author
                .findOne({name: book.author})
                .catch(err => console.log(err))
            const newBook = new Book({
                title: book.title,
                published: book.published,

            })
        }

}

export default ConfigMongo


