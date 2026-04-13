const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const typeDefs = gql`
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
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  })

  await server.start()
  server.applyMiddleware({ app, path: '/' })

  const PORT = process.env.PORT || 4000
  app.listen(PORT, () => {
    console.log(`🚀 GraphQL API corriendo en http://localhost:${PORT}/`)
  })
}

startServer()
