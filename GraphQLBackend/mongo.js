import mongoose  from "mongoose";
const MONGO_URI = 'mongodb+srv://ggg:M9fAh8tLF6tLkq8cGp@library.jqxctfk.mongodb.net/?retryWrites=true&w=majority'

console.log('connecting to', MONGO_URI)
const ConfigMongo = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    }).then(() => {
        console.log('connected to MongoDB')

    }).catch((error) => {
        console.log('error connecting to MongoDB:', error.message)

    })
}

export default ConfigMongo


