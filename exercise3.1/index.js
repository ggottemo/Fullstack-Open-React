import express, { response } from 'express';
const PORT = 3001;
const app = express();
app.use(express.json());
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
/////////////////////////////////////////////////////////////////////////////////
app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    contacts = contacts.filter((contact) => contact.id !== id);
    if (contacts) {
        response.statusMessage = "Contact Deleted";
        response.status(204).end;
    } else {
        response.send("Contact not found");
        response.statusMessage = "No contacts found";
        response.status(404).end;
    }
} );



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});