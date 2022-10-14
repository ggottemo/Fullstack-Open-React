import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import Contact from "./models/contact.js";

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    }
    next(error);
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
}

// setup morgan token
morgan.token("content", function getContent(req) {
  return `\n
    name: ${req.body.name} number: ${req.body.number}, id: ${req.body.id}
    --------------------------------------------------------`;
});

app.use(express.json());
app.use(cors());
app.use(express.static("build"));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content",
    {
      skip: function (req, res) {
        return req.method === "GET";
      },
    }
  )
);


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
app.get("/api/persons", (request, response, next) => {
  Contact.find({}).then((result) => {
    contacts = result;
    response.json(result);
  })
      .catch((error) => next(error));
});
/////////////////////////////////////////////////////////////////////////////////
app.get("/info", (request, response) => {
  const date = new Date();
  Contact.find({}).then((result) => {
    response.send(
        `<p>Phonebook has info for ${result.length} people</p>
      <p>${date}</p>`
    );
  });
});
/////////////////////////////////////////////////////////////////////////////////
app.get("/api/persons/:id", (request, response, next) => {
  Contact.findById(request.params.id)
    .then((result) => {
      if (result) {
        response.json(result);
      } else {
        response.send("Contact not found");
        response.statusMessage = "Contact not found";
        response.status(404).end();
      }
    })
    .catch((err) => next(err));
});
//////////////////////////////// DELETE /////////////////////////////////////////////////
app.delete("/api/persons/:id", (request, response, next) => {
  Contact.findByIdAndDelete(request.params.id).then((result) => {
    if (result) {
      response.statusMessage = "Contact Deleted";
      response.status(204).end();
    } else {
      response.send("Contact not found");
      response.statusMessage = "No contacts found";
      response.status(404).end();
    }
  }).catch((err) => next(err));

});
//////////////////////////////// POST /////////////////////////////////////////////////
app.post("/api/persons", (request, response, next) => {
  const body = request.body;
  if (!body.name || !body.number) {
    response.statusMessage = "Invalid Contact, name or number is missing";
    response.status(404).end();
  } else if (
    contacts.filter((contact) => contact.name === body.name).length > 0
  ) {
    // Send an error message
    response
      .status(418)
      .send({
        error: "Name already in contacts list",
      })
      .end();
  } else {
    let contact = new Contact({
      name: body.name,
      number: body.number,
    });
    contact.save().then((savedContact) => {
      contacts = contacts.concat(savedContact);
      console.log("contact saved");
      response.json(savedContact);
    }).catch((err) => next(err));
  }
});
///////////////////////////////// PUT /////////////////////////////////////////////////
app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  if (!body.name || !body.number) {
    response.statusMessage = "Invalid Contact, name or number is missing";
    response.status(404).end();
  } else {
    Contact.findByIdAndUpdate(request.params.id, {
      name: request.body.name,
      number: request.body.number,
      id: request.params.id,
    })
      .then((savedContact) => {
        response.json(savedContact);
      })
      .catch((err) => {
        next(err);
      });
  }
});

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
