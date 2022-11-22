import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";

const app = express();
const port = 4000;

// data
const data = {
  players: [
    { id: "001", name: "Jude" },
    { id: "002", name: "Bukayo" },
  ],
};

// schema
const typeDefs = `
type Player {
  id: ID!
  name: String!
}

type Query {
  players: [Player]
}
`;

// resolver
const resolvers = {
  Query: {
    players: (obj, args, context, info) => context.players,
  },
};

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (request, response) => {
//   response.send("Hello, GraphQL!");
// });

app.use(
  "/graphql",
  graphqlHTTP({
    schema: executableSchema,
    context: data,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Running a server at http://localhost:${port}`);
});
