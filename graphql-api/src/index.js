const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { PrismaClient } = require('@prisma/client')
const express = require('express')

const prisma = new PrismaClient()

const typeDefs = `
  type Author {
    id: Int
    name: String
    nationality: String
    birthYear: Int
    bio: String
    createdAt: String
    books: [Book]
  }

  type Book {
    id: Int
    title: String
    genre: String
    publishedYear: Int
    pages: Int
    summary: String
    available: Boolean
    createdAt: String
    author: Author
    authorId: Int
  }

  type Query {
    authors: [Author]
    author(id: Int!): Author
    books: [Book]
    book(id: Int!): Book
    booksByGenre(genre: String!): [Book]
  }
`

const resolvers = {
  Query: {
    authors: () => prisma.author.findMany({ include: { books: true } }),
    author: (_, { id }) => prisma.author.findUnique({ where: { id }, include: { books: true } }),
    books: () => prisma.book.findMany({ include: { author: true } }),
    book: (_, { id }) => prisma.book.findUnique({ where: { id }, include: { author: true } }),
    booksByGenre: (_, { genre }) => prisma.book.findMany({ where: { genre }, include: { author: true } }),
  },
}

async function startServer() {
  const app = express()

  const server = new ApolloServer({ typeDefs, resolvers })
  await server.start()

  app.use(express.json())

  app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>GraphQL Playground</title>
        <style>
          body { margin: 0; padding: 0; height: 100vh; }
          iframe { width: 100%; height: 100vh; border: none; }
        </style>
      </head>
      <body>
        <iframe src="https://studio.apollographql.com/sandbox/explorer?endpoint=https://assignment1-loadbalancer-production.up.railway.app/graphql"></iframe>
      </body>
      </html>
    `)
  })

  app.use('/graphql', (req, res, next) => {
    server.requestHandler(req, res)
  })

  const PORT = process.env.PORT || 4000
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
  })
}

startServer()
