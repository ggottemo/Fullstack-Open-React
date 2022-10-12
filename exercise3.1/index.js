import express, { response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
const PORT = process.env.port || 3001;
const app = express();

// setup morgan token
morgan.token('content', function getContent (req) {
    return (`\n
    name: ${req.body.name} number: ${req.body.number}
    -------------------------------------------------`)
})

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content',
    {
        skip: function (req, res) { return req.method === 'GET'}
    }));
// List of contacts
let contacts = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];
/////////////////////////////////////////////////////////////////////////////////
app.get("/", (request, response) => {
    response.send("<h1>Homepage</h1>");
});
/////////////////////////////////////////////////////////////////////////////////
app.get("/api/persons", (request, response) => {
    response.json(contacts);
});
/////////////////////////////////////////////////////////////////////////////////
app.get("/info", (request, response) => {
    const date = new Date();
    response.send(`<p>Phonebook has info for ${contacts.length} people</p>
    <p>${date}</p>`);
    });
/////////////////////////////////////////////////////////////////////////////////
app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const contact = contacts.find((contact) => contact.id === id);
    if (contact) {
        response.json(contact);
    } else {
        response.send("Contact not found");
        response.statusMessage = "Contact not found";
        response.status(404).end();
    }
});
//////////////////////////////// DELETE /////////////////////////////////////////////////
app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    contacts = contacts.filter((contact) => contact.id !== id);
    if (contacts) {
        response.statusMessage = "Contact Deleted";
        response.status(204).end();
    } else {
        response.send("Contact not found");
        response.statusMessage = "No contacts found";
        response.status(404).end();
    }
} );
//////////////////////////////// POST /////////////////////////////////////////////////
app.post("/api/persons", (request, response) => {
    const body = request.body;
    if( !body.name || !body.number) {
        response.statusMessage ="Invalid Contact, name or number is missing";
        response.status(404).end();
    }
    else if(contacts.filter((contact) => contact.name === body.name).length > 0) {

        // Send an error message
        response.status(418).send( {
            error: "Name already in contacts list"
        }).end()
    }
    else {
        let contact = {
            id: Math.floor(Math.random() * 10000000 + (contacts.length > 0 ? Math.max(...contacts.map((n) => n.id)) : 0)),
            name: body.name,
            number: body.number
        }
        contacts = contacts.concat(contact);
        response.json(contact);
    }
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});